# Development Guide

This guide covers development workflows, testing, and best practices for the three-tier application.

## 📋 Table of Contents

- [Frontend Development](#frontend-development)
- [Backend Development](#backend-development)
- [Database Development](#database-development)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Git Workflow](#git-workflow)
- [Debugging](#debugging)

## 🎨 Frontend Development

### Setup

```bash
cd src/web

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

### Project Structure

```
src/web/
├── app/
│   ├── __tests__/              # Component tests
│   ├── modal.tsx               # Modal component
│   ├── hello-button.tsx        # Hello button component
│   ├── modal-showcase.tsx      # Showcase component
│   ├── showcase/               # Showcase page
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   └── actions.ts              # Server actions
├── public/                     # Static assets
├── COMPONENTS.md               # Component documentation
├── jest.config.ts              # Jest configuration
├── jest.setup.ts               # Jest setup
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

### Component Development

#### Creating a New Component

1. Create a new `.tsx` file in `src/web/app/`
2. Add `'use client'` directive if using React hooks
3. Add JSDoc comments for documentation
4. Create corresponding test file in `src/web/app/__tests__/`

Example:

```tsx
'use client';

import { useState } from 'react';

/**
 * MyComponent
 *
 * Description of what this component does.
 *
 * @returns The component
 */
export function MyComponent() {
  const [state, setState] = useState(false);

  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

#### Using the Modal Component

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
        size="medium"
        animationDuration={300}
      >
        <h2>Modal Title</h2>
        <p>Modal content</p>
      </Modal>
    </>
  );
}
```

### Styling

The project uses Tailwind CSS with dark mode support:

```tsx
<div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50">
  Content with dark mode support
</div>
```

### Accessibility

Always include accessibility features:

```tsx
<button
  onClick={handleClick}
  aria-label="Descriptive label"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  Click me
</button>
```

## 🔧 Backend Development

### API Setup

```bash
cd src/api

# Install dependencies
npm install

# Start development server (requires DATABASE_URL)
DATABASE_URL=postgres://app:app@localhost:5432/app npm start
```

### Adding New Endpoints

Edit `src/api/index.js`:

```javascript
// GET endpoint
app.get('/api/resource', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM resource');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint
app.post('/api/resource', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO resource (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Database Connection

The API uses a connection pool defined in `src/api/db.js`:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
```

## 🗄️ Database Development

### Creating Migrations

```bash
cd src/db

# Create a new migration
npx node-pg-migrate create add_new_table

# This creates a file like: migrations/1234567890_add_new_table.js
```

### Migration Template

```javascript
exports.up = (pgm) => {
  pgm.createTable('new_table', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('new_table');
};
```

### Running Migrations

```bash
# Apply all pending migrations
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate up

# Rollback last migration
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate down

# Check migration status
DATABASE_URL=postgres://app:app@localhost:5432/app npx node-pg-migrate status
```

## 🧪 Testing

### Frontend Tests

```bash
cd src/web

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test modal.test.tsx

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

Use Jest and React Testing Library:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('should render the component', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('Updated text')).toBeInTheDocument();
  });
});
```

### Test Coverage

Current test coverage:

- **Modal Component**: 23 tests
  - Rendering and visibility
  - User interactions
  - Animations
  - Size variants
  - Accessibility
  - Focus management

- **HelloButton Component**: 9 tests
  - Button rendering
  - Modal toggling
  - Keyboard support
  - ARIA labels

### Running Tests in Docker

```bash
docker compose run web npm test
```

## ✅ Code Quality

### Linting

```bash
cd src/web

# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### TypeScript

The project uses TypeScript for type safety:

```bash
cd src/web

# Check types
npx tsc --noEmit
```

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use semantic HTML
- Include ARIA attributes
- Support dark mode
- Write tests for new features

## 🔄 Git Workflow

### Branch Naming

```
feature/description      # New features
fix/description         # Bug fixes
docs/description        # Documentation
test/description        # Tests
refactor/description    # Refactoring
```

### Commit Messages

```
feat: add new feature
fix: fix bug
docs: update documentation
test: add tests
refactor: refactor code
style: fix formatting
chore: update dependencies
```

### Pull Request Process

1. Create a feature branch
2. Make changes and commit
3. Write or update tests
4. Update documentation
5. Create a pull request
6. Address review comments
7. Merge when approved

## 🐛 Debugging

### Frontend Debugging

#### Browser DevTools

1. Open Chrome DevTools (F12)
2. Use the React DevTools extension
3. Set breakpoints in the Sources tab
4. Use the Console for debugging

#### Next.js Debug Mode

```bash
cd src/web
NODE_OPTIONS='--inspect' npm run dev
```

Then open `chrome://inspect` in Chrome.

#### Console Logging

```typescript
console.log('Debug message:', variable);
console.error('Error message:', error);
console.table(arrayOfObjects);
```

### Backend Debugging

#### Node.js Debug Mode

```bash
cd src/api
node --inspect index.js
```

Then open `chrome://inspect` in Chrome.

#### Database Debugging

```bash
# Connect to the database
docker compose exec postgres psql -U app -d app

# List tables
\dt

# Query data
SELECT * FROM tasks;

# Exit
\q
```

### Docker Debugging

```bash
# View logs
docker compose logs -f web      # Frontend logs
docker compose logs -f api      # API logs
docker compose logs -f postgres # Database logs

# Execute commands in container
docker compose exec web npm test
docker compose exec api npm start

# Inspect container
docker compose exec web sh
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Jest Documentation](https://jestjs.io)
- [React Testing Library](https://testing-library.com/react)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express Documentation](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## 🆘 Common Issues

### Tests Failing

```bash
# Clear cache and reinstall
cd src/web
rm -rf node_modules package-lock.json .next
npm install
npm test
```

### Port Already in Use

```bash
# Find and kill process
lsof -i :3000
kill -9 <PID>

# Or use Docker
docker compose down
docker compose up --build
```

### Database Connection Errors

```bash
# Check database status
docker compose ps

# View database logs
docker compose logs postgres

# Reset database
docker compose down -v
docker compose up --build
```

### Styles Not Loading

```bash
# Clear Next.js cache
cd src/web
rm -rf .next
npm run dev
```

---

**Last Updated**: 2024
