# Niaz Blog API

A backend service for a blog platform built with **NestJS** and **TypeScript**, using **PostgreSQL** with **TypeORM**.

## Features

- Modular NestJS architecture
- Blog domain module
- User domain module
- Pagination support
- JWT package included for authentication workflows
- Docker support for containerized runs

## Tech Stack

- NestJS 11
- TypeScript
- PostgreSQL
- TypeORM
- Jest (unit + e2e testing)

## Project Structure

```text
src/
├── Blog/
├── User/
├── common/
├── app.module.ts
└── main.ts
```

## Prerequisites

- Docker
- Docker Compose (optional, if using compose)

## Installation

No local Node.js installation is required for running the project.
Use Docker to build and run the service.

## Environment Variables

Create a `.env` file in the project root and set values like:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=niaz_blog
JWT_SECRET=your-secret
```

> Adjust variable names and values based on your actual `typeorm` / config setup.

## Running the Project

Run the project with Docker only:

```bash
docker build -t niaz-blog .
docker run -p 3000:3000 niaz-blog
```

Or with Docker Compose:

```bash
docker compose up --build
```

## Lint & Format

```bash
# lint
npm run lint

# format
npm run format
```

## Architecture

This project follows a **Hexagonal Architecture** (Ports and Adapters):

- **Domain layer**: core business rules and entities
- **Application layer**: use cases and orchestration
- **Ports**: interfaces/contracts for external communication
- **Adapters**: implementations for infrastructure concerns (database, messaging, HTTP)

This structure keeps business logic independent from frameworks and infrastructure details.

## CQRS

The application uses **CQRS (Command Query Responsibility Segregation)**:

- **Commands** handle state-changing operations (create, update, delete)
- **Queries** handle read-only operations

This separation improves clarity, scalability, and maintainability of business flows.

## RabbitMQ

The system includes **RabbitMQ** for asynchronous messaging between components/services.

RabbitMQ can be used to:

- publish domain/integration events
- process background tasks
- decouple producers and consumers for better reliability and scalability

## API Notes

- Entry point: `src/main.ts`
- Main module: `src/app.module.ts`
- Blog module: `src/Blog/blog.module.ts`
- User module: `src/User/user.module.ts`

You can extend this README with endpoint documentation (for example, request/response samples) once routes are finalized.

## License

Currently marked as **UNLICENSED** in `package.json`.
