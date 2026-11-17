import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, signSession, getSessionCookieOptions } from '@/lib/auth';

const ROOT_ADMIN_EMAILS = [
  'admin@sarkariselection.com',
  'admin@bharatrojgar.gov.in',
];
const ROOT_ADMIN_PASSWORD = 'AdminPassword@2026';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check Root Administrator Fallback
    // Allows instant, reliable login even if MongoDB Atlas is cold or in initial setup
    const isRootEmail = ROOT_ADMIN_EMAILS.includes(cleanEmail);
    if (isRootEmail && password === ROOT_ADMIN_PASSWORD) {
      const token = await signSession({
        userId: 'root-admin',
        email: cleanEmail,
        name: 'Chief Administrator',
        role: 'ADMIN',
      });

      // Try creating audit log asynchronously without blocking login
      prisma.auditLog
        .create({
          data: {
            userId: 'root-admin',
            userName: 'Chief Administrator',
            action: 'ADMIN_LOGIN',
            entityType: 'USER',
            details: 'Root administrator signed in',
          },
        })
        .catch(() => {});

      const response = NextResponse.json({
        success: true,
        user: {
          id: 'root-admin',
          email: cleanEmail,
          name: 'Chief Administrator',
          role: 'ADMIN',
        },
      });

      const cookieOptions = getSessionCookieOptions();
      response.cookies.set(cookieOptions.name, token, cookieOptions);
      return response;
    }

    // 2. Query Database with a 5-second timeout safeguard
    let user: any = null;
    try {
      const dbPromise = prisma.user.findUnique({
        where: { email: cleanEmail },
      });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('DB_TIMEOUT')), 5000)
      );
      user = await Promise.race([dbPromise, timeoutPromise]);
    } catch (dbErr) {
      console.warn('Database query bypassed or timed out during login:', dbErr);
    }

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = await signSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    prisma.auditLog
      .create({
        data: {
          userId: user.id,
          userName: user.name,
          action: 'ADMIN_LOGIN',
          entityType: 'USER',
          entityId: user.id,
          details: 'Successful administrator login',
        },
      })
      .catch(() => {});

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    const cookieOptions = getSessionCookieOptions();
    response.cookies.set(cookieOptions.name, token, cookieOptions);

    return response;
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Authentication failed due to server error' },
      { status: 500 }
    );
  }
}
