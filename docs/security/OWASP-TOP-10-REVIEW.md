# OWASP Top 10 Review - Lecture 16

| # | Category | Status in Inkwell | Action |
|---|---|---|---|
| A01 | Broken Access Control | Authenticated ownership checks and server-derived post authorship. | Fixed and regression-tested. |
| A02 | Cryptographic Failures | bcrypt passwords and required token-secret configuration. | Fixed. |
| A03 | Injection | Prisma parameterized queries; no user-composed raw SQL. | Verified. |
| A04 | Insecure Design | Lecture 15 threat model remains applicable. | Verified. |
| A05 | Security Misconfiguration | Generic production errors; detail is logged internally. | Fixed. |
| A06 | Vulnerable Components | `npm audit --audit-level=high` reviewed. | Verified. |
| A07 | Authentication Failures | JWT required for protected post operations. | Fixed. |
| A08 | Software/Data Integrity | Pipeline controls deferred to later CI work. | Deferred. |
| A09 | Logging/Monitoring Failures | Failed logins emit structured warnings. | Fixed. |
| A10 | SSRF | No user-controlled URL fetching feature. | Flagged. |
