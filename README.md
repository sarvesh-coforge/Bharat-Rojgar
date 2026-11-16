# Bharat Rojgar (भारत रोज़गार)
## Official Indian Government Jobs, Results, Admit Cards & Recruitment Portal 2026

A modern, production-ready, full-stack government recruitment and examination results portal inspired by the familiar information architecture of Sarkari Result, enhanced with a professional design system, dark mode, English/Hindi multilingual routing, Prisma ORM (SQLite/PostgreSQL), automated official-source scrapers, duplicate detection, and a secure administrator dashboard with pending approval workflows.

---

## 🌟 Key Highlights & Architecture

- **Sarkari Result-Inspired Layout with Modern Polish**:
  - Deep maroon/red header (`#8b0000`) with authentic portal emblem, tagline, live toll-free helpline, and quick controls.
  - Jet-black sticky navigation bar with active indicators, dropdown categories, and global search trigger.
  - Trending breaking-news ticker with pause-on-hover marquee.
  - Vibrant 8-card quick access grid (UP Police, SSC CGL, RRB NTPC, UPSC IAS, SSC GD, IBPS PO, NEET UG, etc.).
  - Iconic **Three-Column Homepage**:
    - **RESULTS** (Final results, merit lists, score cards, cutoff marks)
    - **ADMIT CARD** (Hall tickets, exam city intimation slips, exam dates)
    - **LATEST JOB** (Active central and state vacancies with last date highlights)
  - Secondary 4-module grid for Answer Key, Syllabus, Admission, and Scholarships.
  - Table-based job detail layout with Important Dates box, Application Fee box, Age Limit box, Vacancy & Category breakdown table, and verified Important Official Links table.
- **Strict Government Safety & Compliance**:
  - Informational and notification platform only.
  - **Zero credential or fee collection**: Never accepts candidate applications, documents, or fee payments on this portal.
  - Every application link directs to the verified official government portal (e.g. `upsc.gov.in`, `ssc.gov.in`, `indianrailways.gov.in`, `nta.ac.in`, `upsssc.gov.in`).
- **Global Theme Engine**:
  - Light Mode, Dark Mode (charcoal/slate palette with high-contrast accessible links), and System Default.
  - Persisted in localStorage and synced via CSS variables.
- **Multilingual Support (English & Hindi)**:
  - Powered by `next-intl` with clean locale-prefixed routes (`/en/`, `/hi/`, `/en/latest-jobs/`, `/hi/latest-jobs/`).
  - Localized navigation, category headers, labels, and safety advisories.
- **Official Data Connectors & Scrapers**:
  - Connectors for UPSC, SSC, Railways (RRB), IBPS, NTA, UPSSSC, UPPSC.
  - Automated duplicate detection prevents duplicate notifications from being queued.
  - Strict ingestion rule: Scraped items enter the `PENDING` approval queue and cannot be published until verified by an administrator.
  - Background worker: `pnpm worker`.
- **Complete Secure Admin Panel**:
  - Admin login (`/admin/login`) with bcrypt password hashing and HTTP-only JWT session cookie.
  - Dashboard (`/admin/dashboard`): Real-time metrics, active sources status, quick source synchronization.
  - Pending Approvals (`/admin/approvals`): Review incoming notices, verify official URLs, approve/reject.
  - Notification Management (`/admin/notifications`): Full CRUD, publish toggle, category filtering.
  - Source Connectors (`/admin/sources`): Manual "Sync Now" trigger, check intervals, error counters.
  - Advertisements (`/admin/advertisements`): Promotional banners and placement manager.
  - Security Audit Logs (`/admin/logs`): Complete audit trail of all administrative actions.
- **Technical SEO & Structured Data**:
  - Dynamic OpenGraph and Twitter Cards for all notification pages.
  - Google-compliant `JobPosting` JSON-LD structured data with organization, validThrough, employmentType, and salary information.
  - Dynamic XML sitemap generator (`/sitemap.xml`) and `robots.txt`.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js Route Handlers, TypeScript, Service-Based Architecture
- **Database**: PostgreSQL / SQLite (configured for zero-friction local execution), Prisma ORM
- **Authentication**: Secure Session JWT with Web Crypto & bcryptjs, Role-Based Access Control
- **Multilingual**: `next-intl` (English & Hindi)
- **Icons & UI**: Lucide Icons, Custom accessible design tokens
- **Background Processing**: TypeScript worker (`workers/source-sync.worker.ts`)
- **Testing**: Automated integration test runner (`test-endpoints.js`)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js v20+
- pnpm v10+ (or npm)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Setup Database & Seed Data
The database is configured out-of-the-box with SQLite (`dev.db`) for immediate zero-config execution.
```bash
# Push schema and generate Prisma client
pnpm db:push

# Seed categories, organizations, sources, and real recruitment notices
pnpm db:seed
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Source Scraper Worker
```bash
pnpm worker
```

### 6. Run Production Build & Integration Tests
```bash
pnpm build
node test-endpoints.js
```

---

## 🔐 Default Administrator Credentials

- **Admin Login URL**: `/admin/login`
- **Email**: `admin@bharatrojgar.gov.in`
- **Password**: `AdminPassword@2026`

---

## 📁 Project Folder Structure

```
bharat-rojgar/
├── messages/                    # Multilingual dictionaries
│   ├── en.json                  # English translations
│   └── hi.json                  # Hindi translations
├── prisma/                      # Database schema and seeds
│   ├── schema.prisma            # Dev & local schema (SQLite)
│   ├── schema.postgresql.prisma # Production PostgreSQL schema
│   └── seed.ts                  # Comprehensive database seeder
├── public/                      # Static assets & icons
├── src/
│   ├── app/
│   │   ├── [locale]/            # Multilingual public routes
│   │   │   ├── layout.tsx       # Public header, navbar, footer
│   │   │   ├── page.tsx         # Homepage with 3-column content
│   │   │   ├── latest-jobs/     # Latest Jobs listing & filters
│   │   │   ├── results/         # Results listing & score cards
│   │   │   ├── admit-cards/     # Admit cards & hall tickets
│   │   │   ├── answer-keys/     # Answer keys & response sheets
│   │   │   ├── admissions/      # University & entrance exams
│   │   │   ├── scholarships/    # Scholarship schemes
│   │   │   ├── syllabus/        # Exam pattern & syllabus PDFs
│   │   │   └── notification/[slug]/ # Job detail with JSON-LD
│   │   ├── admin/               # Administrator control desk
│   │   │   ├── login/           # Secure admin login
│   │   │   ├── dashboard/       # Metrics & pending approvals
│   │   │   ├── notifications/   # Notification CRUD
│   │   │   ├── approvals/       # Scraper verification queue
│   │   │   ├── sources/         # Source connectors & manual sync
│   │   │   ├── advertisements/  # Banner manager
│   │   │   └── logs/            # Audit trail logs
│   │   ├── api/                 # REST Route Handlers
│   │   │   ├── search/          # Global search API
│   │   │   └── admin/           # Auth, notifications, sources APIs
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic XML sitemap
│   ├── components/              # Modular UI components
│   │   ├── header/              # Red header & branding
│   │   ├── navigation/          # Jet-black navbar & mobile menu
│   │   ├── homepage/            # Ticker, 3-column section, grids
│   │   ├── notifications/       # Job detail view & listing view
│   │   ├── search/              # Global search modal dialog
│   │   ├── theme/               # ThemeProvider & ThemeToggle
│   │   └── admin/               # Admin sidebar & forms
│   ├── i18n/                    # next-intl configuration
│   ├── lib/                     # Prisma singleton, JWT auth, utils
│   ├── modules/
│   │   └── data-collection/     # Official connectors & manager
│   └── services/                # Database query services
├── workers/
│   └── source-sync.worker.ts    # Background scheduled worker
├── test-endpoints.js            # Automated integration test suite
├── .env.example                 # Environment variables template
└── README.md
```

---

## 🏛️ Supported Official Government Sources

| Source | Organization | Official Portal | Monitoring Type |
|---|---|---|---|
| **UPSC** | Union Public Service Commission | https://upsc.gov.in | Public HTML & Press Notices |
| **SSC** | Staff Selection Commission | https://ssc.gov.in | Public Candidate Notices |
| **RRB** | Indian Railways Recruitment Boards | https://indianrailways.gov.in | Central Railway Notices |
| **IBPS** | Institute of Banking Personnel Selection | https://www.ibps.in | Public Banking Bulletins |
| **NTA** | National Testing Agency | https://nta.ac.in | Public Examination Notices |
| **UPSSSC** | UP Subordinate Services Selection Commission | https://upsssc.gov.in | State Recruitment Notices |
| **UPPSC** | UP Public Service Commission | https://uppsc.up.nic.in | State Public Notices |

---

## 📄 License & Safety Disclaimer

This website is developed exclusively for educational and informational aggregation purposes. Bharat Rojgar is not affiliated with or endorsed by any government entity. All trademarks and official logos belong to their respective government commissions and departments.
