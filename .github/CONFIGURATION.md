# GitHub Actions Configuration Guide

This guide explains how to configure GitHub branch protection and status checks.

## Branch Protection Rules

To enforce CI/CD checks before merging, configure branch protection rules:

### For `main` branch:

1. Go to **Settings** → **Branches** → **Add rule**
2. Configure the following:

```
Branch name pattern: main

✓ Require a pull request before merging
  ✓ Require approvals (1)
  ✓ Dismiss stale pull request approvals when new commits are pushed
  ✓ Require review from code owners

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
✓ Dismiss stale pull request approvals when new commits are pushed
```

### For `develop` branch:

Use the same configuration but with fewer required approvals (0-1).

## Status Check Configuration

GitHub automatically detects status checks from workflow jobs. The following checks will be available:

### CI Checks
- `Frontend (Lint & Test)` - Frontend linting and testing
- `API (Lint & Test)` - API validation
- `Docker Build Validation` - Docker image builds
- `Docker Compose Validation` - Docker Compose syntax

### Security Checks
- `Security Scanning` - Trivy vulnerability scanning

### Integration Checks
- `Integration Tests (Docker Compose)` - End-to-end tests

### Quality Checks
- `Dependency Check` - npm audit
- `Code Analysis` - ESLint
- `Type Checking` - TypeScript
- `Documentation Check` - Required docs
- `Dockerfile Linting` - Hadolint

### Performance Checks
- `Bundle Size Analysis` - Build size
- `Accessibility Audit` - A11y tests
- `Performance Metrics` - Performance report

## Workflow Permissions

Configure workflow permissions in **Settings** → **Actions** → **General**:

```
Workflow permissions:
✓ Read and write permissions
✓ Allow GitHub Actions to create and approve pull requests
```

## Environment Secrets

For deployment workflows, configure environment-specific secrets:

### Development Environment
- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`
- `GCP_PROJECT_ID`
- `TF_STATE_BUCKET`

### Staging Environment
- Same as development (different GCP project)

### Production Environment
- Same as development (different GCP project)
- Consider adding additional approval requirements

## Codecov Integration

To enable code coverage tracking:

1. Visit [codecov.io](https://codecov.io)
2. Connect your GitHub repository
3. Codecov will automatically process coverage reports from CI

## Dependabot Configuration

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/src/web"
    schedule:
      interval: "weekly"
    allow:
      - dependency-type: "all"

  - package-ecosystem: "npm"
    directory: "/src/api"
    schedule:
      interval: "weekly"

  - package-ecosystem: "npm"
    directory: "/src/db"
    schedule:
      interval: "weekly"

  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
```

## Pull Request Templates

Create `.github/pull_request_template.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

## Issue Templates

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Report a bug
---

## Description
Clear description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: 
- Node version:
- Docker version:
```

## Workflow Badges

Add to README.md:

```markdown
[![CI](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/ci.yml/badge.svg)](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/ci.yml)
[![Build & Push Images](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/build.yml/badge.svg)](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/build.yml)
[![Integration Tests](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/integration-tests.yml/badge.svg)](https://github.com/rbrooks-wwt/example-three-tier-application/actions/workflows/integration-tests.yml)
```

## Monitoring and Alerts

### GitHub Notifications
- Enable notifications for workflow failures
- Configure notification preferences in GitHub settings

### Slack Integration
Create a GitHub App for Slack notifications:

1. Go to **Settings** → **Integrations & services**
2. Add Slack workspace
3. Configure notifications for:
   - Workflow failures
   - Pull request reviews
   - Deployment status

## Troubleshooting

### Workflows not running
- Check `.github/workflows/` directory exists
- Verify YAML syntax is valid
- Check branch protection rules don't block workflows
- Ensure GitHub Actions is enabled

### Status checks not appearing
- Wait a few minutes for GitHub to detect new workflows
- Check workflow file names match expected patterns
- Verify job names match status check requirements

### Permissions errors
- Check workflow permissions in repository settings
- Verify secrets are configured correctly
- Check service account has required IAM roles

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
