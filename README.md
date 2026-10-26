# Inkwell

Inkwell is a Medium-like blog publishing platform built for CS 415/515.

## Getting Started

### Prerequisites

- Node.js 22 or later
- Docker, for local PostgreSQL

### Database

Create the local development database once:

```bash
docker run --name inkwell-postgres \
  -e POSTGRES_USER=inkwell \
  -e POSTGRES_PASSWORD=inkwell \
  -e POSTGRES_DB=inkwell_dev \
  -p 5432:5432 \
  -d postgres:16
```

On later runs, start the existing container instead:

```bash
docker start inkwell-postgres
```

### Server

```bash
cd server
npm install
cp .env.example .env
npx prisma migrate deploy
npm run dev
```

The API runs at `http://localhost:4000`.

### Client

Open another terminal from the repository root:

```bash
cd client
npm install
npm run dev
```

The client runs at `http://localhost:5173`.

## Running Tests

Install the root end-to-end test dependencies once:

```bash
npm install
npx playwright install
```

The server's integration tests use a separate `inkwell_test` database. Create and migrate it once:

```bash
docker exec inkwell-postgres psql -U inkwell -d inkwell_dev -c "CREATE DATABASE inkwell_test;"
cd server
cp .env.example .env.test
DATABASE_URL="postgresql://inkwell:inkwell@localhost:5432/inkwell_test" npx prisma migrate deploy
```

Edit `server/.env.test` so that `DATABASE_URL` uses `inkwell_test` instead of `inkwell_dev` before running `npm test`.

Run each suite:

```bash
cd server && npm test
cd client && npx vitest run
npx playwright test
```

Playwright starts the server and client automatically. Its end-to-end suite covers login and publishing at mobile, tablet, and desktop viewport sizes, plus an automated accessibility scan.

## Definition of Done

A backlog item is Done when:

- [ ] Code is committed with a descriptive message.
- [ ] It runs locally per the relevant workshop's code walkthrough.
- [ ] It does not break previously passing verification steps.
- [ ] New setup steps are documented here.

## Process

Inkwell follows an incremental process: one lecture, one increment. See [docs/BACKLOG.md](docs/BACKLOG.md) for the current product backlog.
