# Fiscal & Collection Period Service

A TypeScript microservice for managing fiscal periods and collection periods. The service follows Clean Architecture to keep domain logic isolated from infrastructure concerns.

## Architecture

```txt
src/
├── application/               # Use cases and DTOs
│   ├── collectionPeriod/      # Collection period services, queries and DTOs
│   └── fiscalPeriod/          # Fiscal period services and DTOs
├── domain/                    # Domain entities and repository interfaces
│   └── collectionPeriod/
├── infrastructure/            # External adapters
│   ├── cache/                 # Redis cache client
│   ├── database/              # Prisma client and unit of work
│   ├── repositories/          # Prisma repository implementations
│   ├── swagger/               # Swagger configuration
│   └── tracing/               # OpenTelemetry setup
├── middleware/                # Fastify middleware
├── presentation/              # HTTP layer
│   ├── controllers/
│   ├── routes/
│   ├── swagger/
│   └── validation/
├── shared/                    # Reusable helpers and types
│   ├── errors/
│   ├── regex/
│   ├── types/
│   └── utils/
├── tests/                     # Unit and integration tests
└── types/                     # Global TypeScript types
```

## Getting Started

```bash
npm install
npm run dev
```

Create an `.env` file with at least:

```
PORT=3000
DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
```

Run database migrations and generate the Prisma client:

```bash
npm run db:generate
npm run db:migrate
```

## Code Guidelines

- Respect Clean Architecture boundaries: the `domain` layer should not depend on Prisma or other infrastructure code.
- Controllers are thin; business logic lives in `application` services.
- Validate inputs with Zod schemas located alongside DTOs or under `presentation/validation`.
- Keep repository interfaces in `domain` and provide implementations under `infrastructure`.
- Run `npm test` and ensure all tests pass before committing changes.

## Testing

```
npm test
```

## License

ISC
