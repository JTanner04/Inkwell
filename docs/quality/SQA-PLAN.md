# Inkwell SQA Plan - v1

## Standards

- All code changes follow the PR checklist ([.github/PULL_REQUEST_TEMPLATE.md](../../.github/PULL_REQUEST_TEMPLATE.md)).
- Architecture conforms to [ADR-001](../architecture/adr-001-modular.monolith.md).
- API contract conventions follow [docs/design/api-contract.md](../design/api-contract.md).

## Reviews

- Every merged change is self-reviewed by the author and peer-reviewed before merge.
- Review findings are logged in [docs/reviews/](../reviews/).

## Testing

Testing practices will be expanded in Lectures 12-14.

- Unit tests: Services and Repositories (Jest) - starting Lecture 12.
- Integration tests: Routes (Supertest) - starting Lecture 13.
- End-to-end tests: critical user flows (Playwright) - starting Lecture 14.

## Defect Tracking

- All discovered defects, whether found through review, testing, or manual use, are recorded in [DEFECT-LOG.md](DEFECT-LOG.md).
- Each entry records the cause category, discovery stage, and remediation.

## Metrics Tracked

- Defects per lecture/increment.
- Defect cause category distribution.
- Review turnaround, tracked qualitatively at this project's scale.

## Metrics Snapshot

_As of October 7, 2026, before this Workshop 11 documentation increment:_

- Commits: 16
- Logged defects: 1
- Backlog items marked "Requirements Defined" or later: 0

## Ownership

- For this course project, the student/team implementing Inkwell owns adherence to this SQA plan.
