This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- **To-Do List Application**: A simple task management interface
- **Modal/Overlay System**: Reusable modal component for displaying overlays
- **Hello Button**: Interactive button that displays a greeting overlay
- **Dark Mode Support**: Full dark mode support across all components
- **Responsive Design**: Works seamlessly on all screen sizes
- **Comprehensive Testing**: Jest and React Testing Library setup with full test coverage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
```

### Testing
```bash
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
```

### Code Quality
```bash
npm run lint         # Run ESLint
```

## Project Structure

```
src/web/
├── app/
│   ├── __tests__/           # Component tests
│   │   ├── modal.test.tsx
│   │   └── hello-button.test.tsx
│   ├── actions.ts           # Server actions for tasks
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   ├── modal.tsx            # Modal component
│   └── hello-button.tsx     # Hello button component
├── public/                  # Static assets
├── COMPONENTS.md            # Component documentation
├── jest.config.ts           # Jest configuration
├── jest.setup.ts            # Jest setup
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Components

The application includes reusable components:

### Modal Component
A flexible overlay/dialog component for displaying content in a centered modal with backdrop.

**Features:**
- Conditional rendering
- Click-to-close backdrop
- Built-in close button
- Dark mode support
- Responsive design

See [COMPONENTS.md](./COMPONENTS.md) for detailed documentation.

### HelloButton Component
An interactive button that displays a friendly greeting in a modal overlay.

**Features:**
- State management with React hooks
- Integrated modal system
- Dark mode support
- Reusable pattern for other modals

See [COMPONENTS.md](./COMPONENTS.md) for detailed documentation.

## Testing

The project includes comprehensive test coverage using Jest and React Testing Library.

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch   # Run tests in watch mode
```

### Test Files
- `app/__tests__/modal.test.tsx` - Modal component tests
- `app/__tests__/hello-button.test.tsx` - HelloButton component tests

### Test Coverage
- Modal rendering and visibility
- User interactions (clicks, backdrop)
- State management
- Content rendering
- Modal toggling

## Styling

The project uses [Tailwind CSS](https://tailwindcss.com/) for styling:

- **Responsive Design**: Mobile-first approach with responsive utilities
- **Dark Mode**: Built-in dark mode support with `dark:` prefix
- **Color Scheme**: Zinc and blue color palette
- **Spacing**: Consistent spacing system

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [React Documentation](https://react.dev) - learn about React.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
- [Jest Documentation](https://jestjs.io/docs/getting-started) - learn about Jest testing.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - learn about testing React components.

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
