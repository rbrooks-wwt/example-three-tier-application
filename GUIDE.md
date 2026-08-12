# Project Guide: Three-Tier Application with Modal Components

A reference implementation of a three-tier web application featuring a Next.js frontend with reusable Modal components, an Express REST API, and a PostgreSQL database. It runs locally with Docker Compose and deploys to Google Cloud Platform (Cloud Run + Cloud SQL) via Terraform.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Frontend Features](#frontend-features)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## 🏗️ Architecture

```
Browser → Web (Next.js :3000) → API (Express :3001) → PostgreSQL
```

| Layer | Technology | Location |
|-------|-----------|----------|
| Frontend | Next.js 16, React 19, Tailwind CSS | `src/web/` |
| API | Express 5, Node.js 22 | `src/api/` |
| Database | PostgreSQL 17 | managed by Docker / Cloud SQL |
| Migrations | node-pg-migrate | `src/db/` |
| Infrastructure | Terraform (GCP) | `src/infrastructure/` |

The app is a simple task manager (to-do list) that demonstrates how the three tiers communicate, with interactive Modal components showcasing modern UI patterns.

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose plugin)
- Node.js 18+ (for local development without Docker)
- npm or yarn

### Start the Stack

```bash
# Clone the repository
git clone <repository-url>
cd example-three-tier-application

# Start all services with Docker Compose
docker compose up --build
```

This starts four services in order:

1. **postgres** — PostgreSQL 17 database, waits until healthy
2. **migrate** — runs `node-pg-migrate up` to apply schema migrations, then exits
3. **api** — Express API on port 3001 (internal only)
4. **web** — Next.js frontend on port 3000 (exposed to host)

Once running, open [http://localhost:3000](http://localhost:3000).

### Stop and Clean Up

```bash
# Stop containers (keeps the postgres_data volume)
docker compose down

# Stop and delete all data
docker compose down -v
```

### Rebuild After Code Changes

```bash
docker compose up --build
```

## ✨ Frontend Features

### Modal Component System

The frontend includes a comprehensive Modal component system with multiple variants and features:

#### Size Variants

- **Small (320px)**: Perfect for alerts and confirmations
- **Medium (384px)**: Default for standard forms and dialogs
- **Large (672px)**: For complex forms and detailed content

#### Features

- ✅ **Smooth Animations**: Fade-in/slide-in and fade-out/slide-out effects
- ✅ **Keyboard Support**: ESC key to close modals
- ✅ **Accessibility**: Full ARIA support, focus management, semantic HTML
- ✅ **Dark Mode**: Complete dark mode styling
- ✅ **Responsive**: Works seamlessly on all screen sizes
- ✅ **Customizable**: Animation duration and size variants

#### Quick Example

```tsx
import { useState } from 'react';
import { Modal } from './modal';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        size="large"
        animationDuration={300}
      >
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

### Component Showcase

Visit [http://localhost:3000/showcase](http://localhost:3000/showcase) to see interactive demonstrations of:

- All size variants
- Custom animation durations
- Form examples
- Accessibility features
- Keyboard interactions

### To-Do List Application

The main page at [http://localhost:3000](http://localhost:3000) features:

- Task creation and management
- Task completion tracking
- Progress indicator
- Hello Button (demonstrates Modal component)
- Showcase link (demonstrates all Modal variants)

## 📁 Project Structure

```
.
├── src/
│   ├── api/                    # Express REST API
│   │   ├── index.js            # Route handlers
│   │   ├── db.js               # PostgreSQL connection pool
│   │   └── Dockerfile
│   ├── db/                     # Database migrations
│   │   ├── migrations/         # node-pg-migrate migration files
│   │   └── Dockerfile
│   ├── web/                    # Next.js frontend
│   │   ├── app/
│   │   │   ├── __tests__/      # Component tests
│   │   │   ├── modal.tsx       # Modal component
│   │   │   ├── hello-button.tsx # Hello button component
│   │   │   ├── modal-showcase.tsx # Showcase component
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── showcase/       # Showcase page
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── globals.css     # Global styles and animations
│   │   │   └── actions.ts      # Server actions
│   │   ├── public/             # Static assets
│   │   ├── COMPONENTS.md       # Component documentation
│   │   ├── README.md           # Frontend README
│   │   ├── package.json
│   │   ├── jest.config.ts      # Jest configuration
│   │   ├── jest.setup.ts       # Jest setup
│   │   └── Dockerfile
│   └── infrastructure/         # Terraform for GCP deployment
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── docker-compose.yml
├── README.md                   # This file
└── GUIDE.md                    # Detailed project guide
```

## 🛠️ Development

### Frontend Development

```bash
cd src/web

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Build for production
npm run build
```

### API Development

```bash
cd src/api

# Install dependencies
npm install

# Start development server (requires DATABASE_URL)
DATABASE_URL=postgres://app:app@localhost:5432/app npm start
```

### Database Development

```bash
cd src/db

# Create a new migration
npx node-pg-migrate create migration_name

# Apply migrations
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate up

# Rollback last migration
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate down
```

## 🧪 Testing

### Frontend Tests

The frontend includes comprehensive test coverage using Jest and React Testing Library:

```bash
cd src/web

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test modal.test.tsx
```

#### Test Coverage

- **Modal Component**: 23 tests covering:
  - Rendering and visibility
  - User interactions (click, keyboard)
  - Animations and state management
  - Size variants
  - Accessibility features
  - Focus management

- **HelloButton Component**: 9 tests covering:
  - Button rendering
  - Modal toggling
  - Keyboard support
  - ARIA labels

### Running Tests in Docker

```bash
docker compose run web npm test
```

## 🚢 Deployment

### Local Docker Deployment

```bash
docker compose up --build
```

### GCP Deployment with Terraform

The `src/infrastructure/` directory contains Terraform that provisions:

- VPC network and subnet
- Cloud SQL PostgreSQL 17 instance (private IP)
- Cloud Run services for the API and web frontend
- Secret Manager secret for the database URL
- Service accounts and IAM bindings

#### Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) installed
- GCP project with billing enabled
- `gcloud` CLI configured with appropriate credentials

#### Required Variables

| Variable | Description |
|----------|-------------|
| `project_id` | GCP project ID |
| `api_image` | Container image URI for the API (e.g. `gcr.io/PROJECT/api:TAG`) |
| `web_image` | Container image URI for the web frontend |
| `region` | GCP region (default: `us-central1`) |
| `environment` | `dev`, `staging`, or `prod` (default: `dev`) |

#### Deploy

```bash
cd src/infrastructure

# Initialize Terraform
terraform init

# Plan the deployment
terraform plan \
  -var="project_id=my-project" \
  -var="api_image=gcr.io/my-project/api:latest" \
  -var="web_image=gcr.io/my-project/web:latest"

# Apply the deployment
terraform apply \
  -var="project_id=my-project" \
  -var="api_image=gcr.io/my-project/api:latest" \
  -var="web_image=gcr.io/my-project/web:latest"

# Get the web URL
terraform output web_url
```

#### Cleanup

```bash
terraform destroy \
  -var="project_id=my-project" \
  -var="api_image=gcr.io/my-project/api:latest" \
  -var="web_image=gcr.io/my-project/web:latest"
```

## 📡 API Reference

The API is not exposed directly to the host, but you can reach it through the web container or by temporarily mapping its port.

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks |
| POST | `/tasks` | Create a task (`{ "title": "..." }`) |
| PATCH | `/tasks/:id` | Update a task (`{ "completed": true }` or `{ "title": "..." }`) |

### Example Requests

```bash
# Health check
curl http://localhost:3001/health

# List tasks
curl http://localhost:3001/tasks

# Create a task
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My new task"}'

# Update a task
curl -X PATCH http://localhost:3001/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## 📚 Documentation

### Frontend Documentation

- **[COMPONENTS.md](src/web/COMPONENTS.md)** - Detailed Modal component documentation
- **[README.md](src/web/README.md)** - Frontend setup and usage
- **[Showcase](http://localhost:3000/showcase)** - Interactive component demonstrations

### Component Features

#### Modal Component

- **Props**: `isOpen`, `onClose`, `children`, `title`, `description`, `animationDuration`, `size`
- **Size Variants**: `small`, `medium`, `large`
- **Animations**: Customizable fade-in/slide-in effects
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Dark Mode**: Complete dark mode styling

#### HelloButton Component

- **Purpose**: Demonstrates Modal component with greeting message
- **Features**: Smooth animations, keyboard support, accessibility
- **Location**: Main page header

## 🔄 Database Migrations

Migrations live in `src/db/migrations/` and use [node-pg-migrate](https://salsita.github.io/node-pg-migrate/).

```bash
cd src/db

# Apply all pending migrations
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate up

# Roll back the last migration
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate down

# Create a new migration
npx node-pg-migrate create add_new_table
```

When running via Docker Compose, the `migrate` service handles this automatically on startup.

## 🤝 Contributing

### Code Style

- **Frontend**: TypeScript, React, Tailwind CSS
- **API**: Node.js, Express
- **Database**: PostgreSQL, node-pg-migrate

### Testing

All code changes should include tests:

```bash
# Frontend tests
cd src/web
npm test

# Run specific test
npm test modal.test.tsx
```

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add new feature
fix: fix bug
docs: update documentation
test: add tests
refactor: refactor code
```

## 📝 License

This project is provided as a reference implementation.

## 🆘 Troubleshooting

### Docker Issues

**Problem**: `docker compose up` fails with "port already in use"

**Solution**: Change the port in `docker-compose.yml` or stop the conflicting service:
```bash
lsof -i :3000  # Find process using port 3000
kill -9 <PID>  # Kill the process
```

**Problem**: Database connection errors

**Solution**: Ensure the database is healthy:
```bash
docker compose ps  # Check service status
docker compose logs postgres  # View database logs
```

### Frontend Issues

**Problem**: Tests fail with "Cannot find module"

**Solution**: Reinstall dependencies:
```bash
cd src/web
rm -rf node_modules package-lock.json
npm install
npm test
```

**Problem**: Styles not loading

**Solution**: Clear Next.js cache:
```bash
cd src/web
rm -rf .next
npm run dev
```

## 📞 Support

For issues or questions:

1. Check the [COMPONENTS.md](src/web/COMPONENTS.md) for component documentation
2. Review the [README.md](src/web/README.md) for frontend setup
3. Check Docker logs: `docker compose logs`
4. Visit the [Showcase](http://localhost:3000/showcase) for interactive examples

---

**Last Updated**: 2024
**Version**: 1.0.0
