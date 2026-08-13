# CI/CD Pipeline Documentation

This document describes the GitHub Actions CI/CD pipeline for the three-tier application.

## Overview

The pipeline consists of multiple workflows that run automatically on push and pull requests to ensure code quality, security, and reliability.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers**: Pull requests and pushes to `main` and `develop` branches

**Jobs**:
- **Frontend (Lint & Test)**
  - Installs dependencies
  - Runs ESLint
  - Runs Jest tests with coverage
  - Builds the Next.js application
  - Uploads coverage to Codecov

- **API (Lint & Test)**
  - Installs dependencies
  - Validates syntax with Node.js

- **Docker Build Validation**
  - Validates Docker builds for API, Web, and DB services
  - Uses GitHub Actions cache for faster builds

- **Docker Compose Validation**
  - Validates `docker-compose.yml` syntax

- **Security Scanning**
  - Runs Trivy vulnerability scanner
  - Uploads results to GitHub Security tab

### 2. Build & Push Images Workflow (`.github/workflows/build.yml`)

**Triggers**: 
- Pushes to `main` and `develop` branches (when service files change)
- Manual workflow dispatch

**Jobs**:
- **Build and Push**
  - Builds Docker images for API, Web, and DB services
  - Pushes to GitHub Container Registry (GHCR)
  - Tags images with:
    - Branch name
    - Semantic version (if tagged)
    - Git SHA
    - `latest` (for main branch)

- **Create Release Notes**
  - Generates changelog from commits
  - Creates GitHub release with image references

### 3. Integration Tests Workflow (`.github/workflows/integration-tests.yml`)

**Triggers**: Pull requests and pushes to `main` and `develop` branches

**Jobs**:
- **Integration Tests (Docker Compose)**
  - Starts all services with Docker Compose
  - Waits for services to be healthy
  - Tests API endpoints:
    - `GET /health` - Health check
    - `GET /tasks` - List tasks
    - `POST /tasks` - Create task
  - Verifies web service is running
  - Collects logs on failure

### 4. Code Quality Workflow (`.github/workflows/code-quality.yml`)

**Triggers**: Pull requests and pushes to `main` and `develop` branches

**Jobs**:
- **Dependency Check**
  - Audits npm dependencies for vulnerabilities
  - Checks all three services (web, api, db)

- **Code Analysis**
  - Runs ESLint on frontend code
  - Uploads ESLint report as artifact

- **Type Checking**
  - Validates TypeScript types with `tsc`

- **Documentation Check**
  - Verifies required documentation files exist:
    - `README.md`
    - `GUIDE.md`
    - `src/web/README.md`
    - `src/web/COMPONENTS.md`

- **Dockerfile Linting**
  - Lints all Dockerfiles with Hadolint

### 5. Performance & Accessibility Workflow (`.github/workflows/performance.yml`)

**Triggers**: Pull requests and pushes to `main` and `develop` branches (web changes only)

**Jobs**:
- **Bundle Size Analysis**
  - Builds Next.js application
  - Analyzes bundle size
  - Uploads build artifacts

- **Accessibility Audit**
  - Runs component tests
  - Validates accessibility features

- **Performance Metrics**
  - Generates performance report
  - Shows build statistics

## Workflow Status

All workflows are configured to:
- Run on pull requests for early feedback
- Run on pushes to main/develop for continuous validation
- Use GitHub Actions cache for faster builds
- Upload artifacts for debugging
- Provide detailed summaries in GitHub UI

## Required Secrets

For the deployment workflow (`.github/workflows/deploy.yml`), configure these secrets:

- `GCP_WORKLOAD_IDENTITY_PROVIDER` - GCP Workload Identity Provider
- `GCP_SERVICE_ACCOUNT` - GCP Service Account email
- `GCP_PROJECT_ID` - GCP Project ID
- `TF_STATE_BUCKET` - Terraform state bucket name

## Environment Configuration

The deployment workflow supports multiple environments:
- `dev` - Development environment
- `staging` - Staging environment
- `prod` - Production environment

Configure environment-specific secrets in GitHub repository settings.

## Local Testing

To test workflows locally, you can use [act](https://github.com/nektos/act):

```bash
# Run all workflows
act

# Run specific workflow
act -j frontend

# Run with specific event
act pull_request
```

## Best Practices

1. **Keep workflows DRY**: Reuse common steps and actions
2. **Cache dependencies**: Use `actions/setup-node@v4` with cache
3. **Fail fast**: Run quick checks first (lint, type check)
4. **Parallel execution**: Run independent jobs in parallel
5. **Clear naming**: Use descriptive job and step names
6. **Artifact retention**: Set appropriate retention periods
7. **Security**: Use least-privilege permissions
8. **Documentation**: Keep this file updated with workflow changes

## Troubleshooting

### Workflow not triggering
- Check branch protection rules
- Verify workflow file syntax with `docker compose config`
- Check GitHub Actions is enabled in repository settings

### Build failures
- Check logs in GitHub Actions tab
- Verify Docker images build locally: `docker compose build`
- Check for environment variable issues

### Test failures
- Run tests locally: `npm test` in respective service directory
- Check Docker Compose logs: `docker compose logs`
- Verify database migrations: `npm run migrate`

## Monitoring

Monitor workflow runs in the GitHub Actions tab:
- View real-time logs
- Check artifact uploads
- Review security scanning results
- Track deployment status

## Future Enhancements

Potential improvements to the pipeline:

1. **Automated testing on multiple Node versions**
2. **Performance regression detection**
3. **Automated dependency updates with Dependabot**
4. **Slack notifications for workflow status**
5. **Automated rollback on deployment failure**
6. **Load testing for API endpoints**
7. **E2E testing with Playwright or Cypress**
8. **Database backup before migrations**
9. **Cost analysis for GCP resources**
10. **Automated security patches**

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Setup Node Action](https://github.com/actions/setup-node)
- [Trivy Security Scanner](https://github.com/aquasecurity/trivy-action)
- [Hadolint Dockerfile Linter](https://github.com/hadolint/hadolint-action)
