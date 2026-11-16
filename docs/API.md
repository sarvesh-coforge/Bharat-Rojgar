# Bharat Rojgar REST API Documentation

## Public Endpoints

### 1. Global Search
- **Endpoint**: `GET /api/search?q={query}`
- **Description**: Returns published notifications matching query across title, postName, and organization.
- **Query Parameters**:
  - `q` (string, required): Search query (e.g. `UPSC`, `CGL`, `Police`)
- **Response**:
```json
{
  "items": [
    {
      "id": "cmwir...",
      "title": "UPSC Civil Services (IAS / IFS) Examination 2026 Online Form",
      "slug": "upsc-civil-services-ias-ifs-2026-online-form",
      "category": { "slug": "latest-jobs", "name": "Latest Jobs", "nameHi": "नवीनतम सरकारी नौकरियां" },
      "organization": { "shortName": "UPSC" }
    }
  ]
}
```

---

## Admin Endpoints (Protected by JWT Session Cookie)

### 1. Admin Authentication
- **Endpoint**: `POST /api/admin/auth/login`
- **Body**: `{ "email": "admin@bharatrojgar.gov.in", "password": "AdminPassword@2026" }`
- **Response**: Sets HTTP-only `bharat_admin_session` cookie and returns user details.

- **Endpoint**: `POST /api/admin/auth/logout`
- **Response**: Clears session cookie.

### 2. Dashboard Statistics
- **Endpoint**: `GET /api/admin/dashboard`
- **Response**:
```json
{
  "stats": {
    "totalNotifications": 27,
    "publishedJobs": 6,
    "publishedResults": 4,
    "publishedAdmitCards": 3,
    "pendingApprovals": 9,
    "activeSources": 7,
    "failedFetches": 0
  },
  "recentNotifications": [...],
  "recentLogs": [...]
}
```

### 3. Notification Management
- **Endpoint**: `GET /api/admin/notifications?category={cat}&status={status}&verification={ver}&search={q}&page={page}`
- **Endpoint**: `POST /api/admin/notifications`: Create new notification
- **Endpoint**: `PUT /api/admin/notifications/{id}`: Update notification
- **Endpoint**: `DELETE /api/admin/notifications/{id}`: Delete notification
- **Endpoint**: `POST /api/admin/notifications/{id}/publish`: Toggle published/draft
- **Endpoint**: `POST /api/admin/notifications/{id}/approve`: Approve pending item and publish
- **Endpoint**: `POST /api/admin/notifications/{id}/reject`: Reject pending item with reason

### 4. Official Sources & Synchronization
- **Endpoint**: `GET /api/admin/sources`: List official sources and recent fetch logs
- **Endpoint**: `POST /api/admin/sources/{id}/sync`: Trigger instant scraper synchronization

### 5. Advertisements & Banners
- **Endpoint**: `GET /api/admin/advertisements`: List banners
- **Endpoint**: `POST /api/admin/advertisements`: Create banner

### 6. Audit Logs
- **Endpoint**: `GET /api/admin/logs`: List security audit trail logs
