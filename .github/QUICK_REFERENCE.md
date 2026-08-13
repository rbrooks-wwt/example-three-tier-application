# CI/CD Quick Reference

Quick reference for common CI/CD tasks and commands.

## Workflow Files

| File | Purpose | Triggers |
|------|---------|----------|
| `ci.yml` | Lint, test, validate | PR, push to main/develop |
| `build.yml` | Build & push images | Push to main/develop |
| `integration-tests.yml` | End-to-end tests | PR, push to main/develop |
| `code-quality.yml` | Code quality checks | PR, push to main/develop |
| `performance.yml` | Performance & a11y | PR, push to main/develop (web only) |
| `deploy.yml` | Deploy to GCP | Push to main, manual dispatch |

## Common Commands

### Test Locally

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test
npm test modal.test.tsx

# Run linter
npm run lint

# Build application
npm run build
```

### Docker Commands

```bash
# Build all services
docker compose build

# Start all services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Remove volumes
docker compose down -v

# Rebuild and start
docker compose up --build
```

### GitHub Actions Commands

```bash
# Test workflows locally with act
act

# Run specific job
act -j frontend

# Run with specific event
act pull_request

# View available jobs
act -l
```

## Status Checks

### Required for Merge to `main`

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

## Troubleshooting

### Workflow Not Running

```bash
# Check workflow syntax
docker compose config

# Validate YAML
npm install -g yaml-validator
yaml-validator .github/workflows/*.yml
```

### Build Failing

```bash
# Test build locally
docker compose build

# Check specific service
docker compose build api

# View build logs
docker compose build --verbose
```

### Tests Failing

```bash
# Run tests locally
cd src/web
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test modal.test.tsx
```

### Docker Issues

```bash
# Clean up Docker
docker system prune -a

# Remove all containers
docker container prune

# Remove all images
docker image prune -a

# Check Docker status
docker ps
docker images
```

## Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### API (.env)

```
PORT=3001
DATABASE_URL=postgres://app:app@localhost:5432/app
```

### Database (.env)

```
DATABASE_URL=postgres://app:app@localhost:5432/app
```

## Deployment

### Manual Deployment

```bash
# Deploy to dev
gh workflow run deploy.yml -f environment=dev

# Deploy to staging
gh workflow run deploy.yml -f environment=staging

# Deploy to prod
gh workflow run deploy.yml -f environment=prod
```

### Check Deployment Status

```bash
# View workflow runs
gh run list --workflow=deploy.yml

# View specific run
gh run view <run-id>

# View logs
gh run view <run-id> --log
```

## Secrets Management

### Add Repository Secret

```bash
gh secret set SECRET_NAME --body "secret_value"
```

### List Secrets

```bash
gh secret list
```

### Add Environment Secret

```bash
gh secret set SECRET_NAME --env ENVIRONMENT --body "secret_value"
```

## Monitoring

### View Workflow Status

- GitHub Actions tab: https://github.com/rbrooks-wwt/example-three-tier-application/actions
- Specific workflow: https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/ci.yml

### Check Build Status

```bash
# Get latest run status
gh run list --limit 1

# Get run details
gh run view <run-id>
```

## Performance Tips

### Speed Up Builds

1. Use GitHub Actions cache
2. Use Docker layer caching
3. Run jobs in parallel
4. Skip unnecessary checks
5. Use smaller base images

### Reduce Costs

1. Limit concurrent jobs
2. Use self-hosted runners for heavy workloads
3. Cache dependencies
4. Clean up old artifacts
5. Monitor usage

## Security

### Best Practices

1. Use least-privilege permissions
2. Rotate secrets regularly
3. Use environment protection rules
4. Enable branch protection
5. Require code reviews
6. Sign commits
7. Scan for vulnerabilities
8. Use OIDC for cloud authentication

### Secrets

- Never commit secrets
- Use GitHub Secrets for sensitive data
- Rotate secrets regularly
- Use environment-specific secrets
- Audit secret access

## Links

- [Workflows Documentation](.github/WORKFLOWS.md)
- [Setup Guide](.github/SETUP.md)
- [Configuration Guide](.github/CONFIGURATION.md)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Docs](https://docs.docker.com)
- [Terraform Docs](https://www.terraform.io/docs)

## Getting Help

1. Check workflow logs in GitHub Actions
2. Review `.github/WORKFLOWS.md` for workflow details
3. Check `.github/SETUP.md` for setup instructions
4. Review `.github/CONFIGURATION.md` for configuration
5. Check GitHub Actions documentation
6. Review Docker documentation
7. Check Terraform documentation
