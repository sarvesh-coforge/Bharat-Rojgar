'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileCheck,
  Briefcase,
  Globe,
  Image as ImageIcon,
  History,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navLinks = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Pending Approvals', href: '/admin/approvals', icon: FileCheck, badge: 'VERIFY' },
    { label: 'All Notifications', href: '/admin/notifications', icon: Briefcase },
    { label: 'Official Sources', href: '/admin/sources', icon: Globe },
    { label: 'Advertisements', href: '/admin/advertisements', icon: ImageIcon },
    { label: 'Security Audit Logs', href: '/admin/logs', icon: History },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 min-h-screen border-r border-slate-800">
      <div>
        {/* Brand header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-700 flex items-center justify-center font-black text-white text-xs">
              BR
            </div>
            <div>
              <div className="font-extrabold text-sm leading-tight text-white tracking-wide">
                BHARAT ROJGAR
              </div>
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                Admin Control Desk
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-red-800 text-yellow-300'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-black bg-amber-500 text-slate-950 px-1 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom tools & logout */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
        >
          <span>View Public Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-white text-xs font-semibold border border-red-800/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
