# CI/CD Setup Guide

This guide walks you through setting up the complete CI/CD pipeline for the three-tier application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Repository Setup](#github-repository-setup)
3. [Workflow Configuration](#workflow-configuration)
4. [Branch Protection](#branch-protection)
5. [Secrets and Environments](#secrets-and-environments)
6. [Monitoring and Debugging](#monitoring-and-debugging)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- GitHub repository with admin access
- Docker and Docker Compose installed locally
- Node.js 22+ installed
- GCP account (for deployment workflows)
- Terraform knowledge (for infrastructure)

## GitHub Repository Setup

### 1. Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Ensure "Actions permissions" is set to "Allow all actions and reusable workflows"
3. Set "Workflow permissions" to:
   - ✓ Read and write permissions
   - ✓ Allow GitHub Actions to create and approve pull requests

### 2. Configure Repository Settings

1. Go to **Settings** → **General**
2. Enable:
   - ✓ Automatically delete head branches
   - ✓ Allow auto-merge
3. Set default branch to `main`

### 3. Enable Security Features

1. Go to **Settings** → **Code security and analysis**
2. Enable:
   - ✓ Dependabot alerts
   - ✓ Dependabot security updates
   - ✓ Secret scanning
   - ✓ Push protection

## Workflow Configuration

### 1. Verify Workflow Files

All workflow files should be in `.github/workflows/`:

```bash
ls -la .github/workflows/
```

Expected files:
- `ci.yml` - Continuous Integration
- `build.yml` - Build and Push Images
- `integration-tests.yml` - Integration Tests
- `code-quality.yml` - Code Quality Checks
- `performance.yml` - Performance & Accessibility
- `deploy.yml` - Deployment (already exists)

### 2. Test Workflows Locally

Use [act](https://github.com/nektos/act) to test workflows locally:

```bash
# Install act
brew install act  # macOS
# or
choco install act  # Windows

# Run all workflows
act

# Run specific workflow
act -j frontend

# Run with specific event
act pull_request
```

### 3. Validate Workflow Syntax

```bash
# Check YAML syntax
docker compose config

# Or use a YAML validator
npm install -g yaml-validator
yaml-validator .github/workflows/*.yml
```

## Branch Protection

### 1. Create Branch Protection Rule for `main`

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Configure:

```
Branch name pattern: main

✓ Require a pull request before merging
  ✓ Require approvals (1)
  ✓ Require review from code owners
  ✓ Dismiss stale pull request approvals

✓ Require status checks to pass before merging
  Required status checks:
  - Frontend (Lint & Test)
  - API (Lint & Test)
  - Docker Build Validation
  - Docker Compose Validation
  - Security Scanning
  - Integration Tests (Docker Compose)
  - Dependency Check
  - Code Analysis
  - Type Checking
  - Documentation Check
  - Dockerfile Linting
  - Bundle Size Analysis
  - Accessibility Audit
  - Performance Metrics

✓ Require branches to be up to date before merging
✓ Require conversation resolution before merging
✓ Require signed commits
```

### 2. Create Branch Protection Rule for `develop`

Use the same configuration but with fewer required approvals (0).

## Secrets and Environments

### 1. Configure Repository Secrets

For the deployment workflow, add these secrets to **Settings** → **Secrets and variables** → **Actions**:

```
GCP_WORKLOAD_IDENTITY_PROVIDER = <your-workload-identity-provider>
GCP_SERVICE_ACCOUNT = <your-service-account-email>
GCP_PROJECT_ID = <your-gcp-project-id>
TF_STATE_BUCKET = <your-terraform-state-bucket>
```

### 2. Create Environments

Create three environments: `dev`, `staging`, `prod`

For each environment, go to **Settings** → **Environments** → **New environment**

Configure environment-specific secrets:

**Development**
- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`
- `GCP_PROJECT_ID`
- `TF_STATE_BUCKET`

**Staging**
- Same as development (different GCP project)

**Production**
- Same as development (different GCP project)
- Add required reviewers for approval

### 3. Configure Deployment Protection Rules

For production environment:

1. Go to **Settings** → **Environments** → **Production**
2. Enable "Required reviewers"
3. Add team members who can approve deployments
4. Enable "Prevent self-review"

## Monitoring and Debugging

### 1. View Workflow Runs

1. Go to **Actions** tab
2. Select workflow to view runs
3. Click on a run to see detailed logs

### 2. Check Workflow Status

Add status badges to README.md:

```markdown
[![CI](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/ci.yml/badge.svg)](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/ci.yml)
[![Build & Push Images](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/build.yml/badge.svg)](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/build.yml)
[![Integration Tests](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/integration-tests.yml/badge.svg)](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/integration-tests.yml)
```

### 3. Enable Notifications

1. Go to **Settings** → **Notifications**
2. Configure notification preferences:
   - Email for workflow failures
   - GitHub notifications for pull requests

### 4. Slack Integration

To receive Slack notifications:

1. Install GitHub App for Slack
2. Configure notifications for:
   - Workflow failures
   - Pull request reviews
   - Deployment status

## Troubleshooting

### Workflows Not Running

**Problem**: Workflows don't trigger on push/PR

**Solutions**:
1. Check workflow file syntax: `docker compose config`
2. Verify branch protection rules don't block workflows
3. Check GitHub Actions is enabled in repository settings
4. Wait a few minutes for GitHub to detect new workflows
5. Check workflow file is in `.github/workflows/` directory

### Status Checks Not Appearing

**Problem**: Required status checks don't show up

**Solutions**:
1. Run workflow at least once to register checks
2. Verify job names match exactly in branch protection rules
3. Check workflow file has correct syntax
4. Wait 5-10 minutes for GitHub to sync

### Build Failures

**Problem**: Docker builds fail in CI

**Solutions**:
1. Test build locally: `docker compose build`
2. Check for environment variable issues
3. Verify Dockerfile syntax with Hadolint
4. Check Docker layer caching
5. Review build logs in GitHub Actions

### Test Failures

**Problem**: Tests fail in CI but pass locally

**Solutions**:
1. Check Node.js version matches: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Check for environment-specific issues
5. Review test logs in GitHub Actions

### Permission Errors

**Problem**: Workflows fail with permission errors

**Solutions**:
1. Check workflow permissions in repository settings
2. Verify secrets are configured correctly
3. Check service account has required IAM roles
4. Verify GITHUB_TOKEN has correct permissions
5. Check branch protection rules

### Container Registry Issues

**Problem**: Docker push fails to GHCR

**Solutions**:
1. Verify GitHub token has `write:packages` permission
2. Check container registry is enabled
3. Verify image naming follows GHCR format
4. Check authentication in workflow

## Next Steps

1. **Test locally**: Run workflows with `act`
2. **Create PR**: Test workflows on a feature branch
3. **Monitor**: Watch workflow runs in GitHub Actions
4. **Iterate**: Adjust workflows based on results
5. **Document**: Update team documentation

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Security Hardening Guide](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Setup Node Action](https://github.com/actions/setup-node)

## Support

For issues or questions:

1. Check GitHub Actions logs
2. Review workflow files in `.github/workflows/`
3. Consult `.github/WORKFLOWS.md` for workflow details
4. Check `.github/CONFIGURATION.md` for setup details
