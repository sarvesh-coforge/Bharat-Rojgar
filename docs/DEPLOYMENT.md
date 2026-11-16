# Production Deployment & Database Setup Guide

## PostgreSQL Setup & Migration

### 1. Configure PostgreSQL Environment Variable
In `.env` or production server environment variables:
```bash
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_HOST:5432/bharat_rojgar?schema=public"
```

### 2. Switch to PostgreSQL Schema
Replace `prisma/schema.prisma` with `prisma/schema.postgresql.prisma`:
```bash
cp prisma/schema.postgresql.prisma prisma/schema.prisma
```

### 3. Run Migrations & Database Seed
```bash
# Push schema to live PostgreSQL database
pnpm exec prisma db push

# Run initial seed data
pnpm db:seed
```

---

## Production Deployment Options

### Option A: Vercel / Railway
1. Push project repository to GitHub or GitLab.
2. Connect repository in Vercel or Railway.
3. Configure Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string (Neon, Supabase, Railway, RDS)
   - `JWT_SECRET`: Secure 64-character random string
   - `NEXT_PUBLIC_APP_URL`: Your production domain (`https://bharatrojgar.gov.in`)
4. Build command:
   ```bash
   pnpm build
   ```
5. Deploy.

---

### Option B: Docker Container Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine AS base
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm exec prisma generate
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
```

Build and run:
```bash
docker build -t bharat-rojgar .
docker run -p 3000:3000 --env-file .env bharat-rojgar
```

---

## Scheduled Background Scraping Worker (Cron)

To keep government notices synchronized continuously, schedule the worker script:

### Linux Cron (crontab -e):
```cron
# Run official source check every 2 hours
0 */2 * * * cd /path/to/bharat-rojgar && /usr/bin/pnpm worker >> /var/log/bharat-worker.log 2>&1
```

All scraped items enter the `PENDING` queue in the Admin Panel (`/admin/approvals`) for human review before becoming visible on the live public portal.
