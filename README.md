# example-three-tier-application

A reference implementation of a three-tier web application: a Next.js frontend with reusable Modal components, an Express REST API, and a PostgreSQL database. It runs locally with Docker Compose and deploys to Google Cloud Platform (Cloud Run + Cloud SQL) via Terraform.

## 🎯 Quick Links

- **[📖 Full Project Guide](GUIDE.md)** - Comprehensive documentation
- **[🎨 Component Documentation](src/web/COMPONENTS.md)** - Modal component details
- **[🚀 Frontend README](src/web/README.md)** - Frontend setup and features
- **[🎪 Component Showcase](http://localhost:3000/showcase)** - Interactive demos (after running locally)
- **[🔄 CI/CD Pipeline](.github/WORKFLOWS.md)** - GitHub Actions workflows
- **[⚙️ CI/CD Setup Guide](.github/SETUP.md)** - Setup and configuration

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
| CI/CD | GitHub Actions | `.github/workflows/` |

The app is a simple task manager (to-do list) that demonstrates how the three tiers communicate, with interactive Modal components showcasing modern UI patterns.

## ✨ Features

### Frontend
- ✅ **Modal Component System** with size variants (small, medium, large)
- ✅ **Smooth Animations** (fade-in/slide-in effects)
- ✅ **Full Accessibility** (ARIA, keyboard support, focus management)
- ✅ **Dark Mode Support** across all components
- ✅ **Responsive Design** for all screen sizes
- ✅ **Comprehensive Tests** (Jest + React Testing Library)
- ✅ **Component Showcase** with interactive demos
- ✅ **To-Do List Application** demonstrating the modal system

### Backend
- ✅ **Express REST API** with task management endpoints
- ✅ **PostgreSQL Database** with migrations
- ✅ **Docker Compose** for local development
- ✅ **Terraform Infrastructure** for GCP deployment

### CI/CD
- ✅ **Automated Testing** - Frontend and API validation
- ✅ **Code Quality Checks** - Linting, type checking, security scanning
- ✅ **Docker Image Building** - Automated builds and pushes to GHCR
- ✅ **Integration Tests** - End-to-end testing with Docker Compose
- ✅ **Performance Monitoring** - Bundle size and accessibility audits
- ✅ **Dependency Management** - Automated updates via Dependabot
- ✅ **Security Scanning** - Trivy vulnerability detection
- ✅ **Deployment Automation** - GCP deployment with Terraform

## 🚀 Quick Start

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Start the Stack

```bash
# Clone and navigate to the repository
git clone <repository-url>
cd example-three-tier-application

# Start all services
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Explore Features

- **Main App**: [http://localhost:3000](http://localhost:3000) - To-do list with Modal components
- **Component Showcase**: [http://localhost:3000/showcase](http://localhost:3000/showcase) - Interactive modal demonstrations
- **Say Hello Button**: Click the "Say Hello" button on the main page to see a modal in action

### Stop the Stack

```bash
docker compose down
```

## 📚 Documentation

### For Frontend Development

```bash
cd src/web

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

See [src/web/README.md](src/web/README.md) for detailed frontend documentation.

### For Component Details

See [src/web/COMPONENTS.md](src/web/COMPONENTS.md) for:
- Modal component API
- Size variants and customization
- Accessibility features
- Usage examples
- Best practices

### For Full Project Guide

See [GUIDE.md](GUIDE.md) for:
- Complete architecture overview
- Development setup
- Testing instructions
- Deployment to GCP
- API reference
- Troubleshooting

### For CI/CD Pipeline

See [.github/WORKFLOWS.md](.github/WORKFLOWS.md) for:
- Workflow descriptions and triggers
- Job details and status checks
- Monitoring and troubleshooting

See [.github/SETUP.md](.github/SETUP.md) for:
- Complete setup instructions
- Branch protection configuration
- Secrets and environment setup
- Debugging and monitoring

See [.github/QUICK_REFERENCE.md](.github/QUICK_REFERENCE.md) for:
- Common commands and tasks
- Quick troubleshooting
- Performance tips

## 🧪 Testing

The frontend includes comprehensive test coverage:

```bash
cd src/web

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test
npm test modal.test.tsx
```

**Test Coverage**:
- Modal component: 23 tests
- HelloButton component: 9 tests
- Total: 32+ tests covering all features

## 🌐 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks |
| POST | `/tasks` | Create a task |
| PATCH | `/tasks/:id` | Update a task |

## 🚢 Deployment

### Local Docker

```bash
docker compose up --build
```

### GCP with Terraform

```bash
cd src/infrastructure
terraform init
terraform apply \
  -var="project_id=my-project" \
  -var="api_image=gcr.io/my-project/api:latest" \
  -var="web_image=gcr.io/my-project/web:latest"
```

See [GUIDE.md](GUIDE.md) for detailed deployment instructions.

### Automated Deployment with GitHub Actions

The CI/CD pipeline automatically:
1. Builds and tests code on every push
2. Builds Docker images and pushes to GHCR
3. Runs integration tests
4. Deploys to GCP on push to main branch

See [.github/SETUP.md](.github/SETUP.md) for deployment configuration.

## 📁 Project Structure

```
.github/
├── workflows/              # GitHub Actions workflows
│   ├── ci.yml             # Continuous Integration
│   ├── build.yml          # Build & Push Images
│   ├── integration-tests.yml
│   ├── code-quality.yml
│   ├── performance.yml
│   └── deploy.yml         # Deployment
├── ISSUE_TEMPLATE/        # GitHub issue templates
├── WORKFLOWS.md           # Workflow documentation
├── SETUP.md              # Setup guide
├── CONFIGURATION.md      # Configuration guide
├── QUICK_REFERENCE.md    # Quick reference
└── dependabot.yml        # Dependabot configuration

src/
├── api/            # Express REST API
├── db/             # Database migrations
├── web/            # Next.js frontend
│   ├── app/
│   │   ├── modal.tsx              # Modal component
│   │   ├── hello-button.tsx       # Hello button component
│   │   ├── modal-showcase.tsx     # Showcase component
│   │   ├── showcase/              # Showcase page
│   │   └── __tests__/             # Component tests
│   ├── COMPONENTS.md              # Component documentation
│   └── README.md                  # Frontend README
└── infrastructure/ # Terraform for GCP
```

## 🎨 Modal Component Highlights

### Size Variants

```tsx
// Small modal (320px)
<Modal size="small" isOpen={isOpen} onClose={onClose}>
  Content
</Modal>

// Medium modal (384px) - default
<Modal size="medium" isOpen={isOpen} onClose={onClose}>
  Content
</Modal>

// Large modal (672px)
<Modal size="large" isOpen={isOpen} onClose={onClose}>
  Content
</Modal>
```

### Features

- **Keyboard Support**: Press ESC to close
- **Click to Close**: Click the backdrop
- **Smooth Animations**: Customizable duration
- **Accessibility**: Full ARIA support
- **Dark Mode**: Complete styling
- **Responsive**: Works on all screens

## 🔄 Database Migrations

```bash
cd src/db

# Apply migrations
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate up

# Rollback
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate down
```

## 🔄 CI/CD Workflows

### Available Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI** | PR, push | Lint, test, validate |
| **Build & Push** | Push to main/develop | Build Docker images, push to GHCR |
| **Integration Tests** | PR, push | End-to-end tests with Docker Compose |
| **Code Quality** | PR, push | Dependency checks, linting, type checking |
| **Performance** | PR, push (web) | Bundle size, accessibility audits |
| **Deploy** | Push to main, manual | Deploy to GCP with Terraform |

### Status Checks

All of the following checks must pass before merging to `main`:

- ✓ Frontend (Lint & Test)
- ✓ API (Lint & Test)
- ✓ Docker Build Validation
- ✓ Docker Compose Validation
- ✓ Security Scanning
- ✓ Integration Tests
- ✓ Dependency Check
- ✓ Code Analysis
- ✓ Type Checking
- ✓ Documentation Check
- ✓ Dockerfile Linting
- ✓ Bundle Size Analysis
- ✓ Accessibility Audit
- ✓ Performance Metrics

## 🆘 Troubleshooting

**Port already in use?**
```bash
docker compose down
docker compose up --build
```

**Tests failing?**
```bash
cd src/web
rm -rf node_modules package-lock.json
npm install
npm test
```

**Database connection errors?**
```bash
docker compose logs postgres
docker compose down -v
docker compose up --build
```

**Workflow not running?**
- Check workflow file syntax in `.github/workflows/`
- Verify GitHub Actions is enabled in repository settings
- Check branch protection rules
- See [.github/SETUP.md](.github/SETUP.md) for troubleshooting

See [GUIDE.md](GUIDE.md) for more troubleshooting tips.

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express Documentation](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Terraform Documentation](https://www.terraform.io/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com)

## 📝 License

This project is provided as a reference implementation.

---

**Version**: 1.0.0  
**Last Updated**: 2024
