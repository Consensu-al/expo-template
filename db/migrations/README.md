# Database Migrations

This directory contains the migrations for your SQLite database.

To generate new migrations:

```bash
bun run db:generate
```

To apply migrations:

```bash
bun run db:push
```

To view your database with Drizzle Studio:

```bash
bun run db:studio
```