# Components Documentation

This document describes the reusable components in the web application.

## Modal Component

### Overview
The `Modal` component is a reusable overlay/dialog component that displays content in a centered modal with a semi-transparent backdrop.

### Location
`src/web/app/modal.tsx`

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls whether the modal is visible |
| `onClose` | `() => void` | Yes | Callback function triggered when the modal should close |
| `children` | `ReactNode` | Yes | Content to display inside the modal |

### Features
- ✅ Conditional rendering based on `isOpen` prop
- ✅ Semi-transparent backdrop (50% black opacity)
- ✅ Click backdrop to close functionality
- ✅ Built-in close button
- ✅ Centered positioning with responsive padding
- ✅ Dark mode support via Tailwind CSS
- ✅ Proper z-index layering (z-50)
- ✅ Smooth transitions

### Usage Example

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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

### Styling
The component uses Tailwind CSS classes for styling:
- Backdrop: `fixed inset-0 z-50 flex items-center justify-center`
- Overlay: `absolute inset-0 bg-black/50 transition-opacity`
- Modal Box: `relative z-10 rounded-lg bg-white dark:bg-zinc-800 shadow-lg p-6 max-w-sm mx-4`
- Close Button: Standard button styling with hover effects

### Accessibility
- Backdrop has `aria-hidden="true"` to hide from screen readers
- Close button has descriptive text
- Proper semantic HTML structure

---

## HelloButton Component

### Overview
The `HelloButton` component is a client-side component that displays a button which, when clicked, opens a modal with a friendly "Hello" greeting message.

### Location
`src/web/app/hello-button.tsx`

### Props
None - this is a self-contained component.

### Features
- ✅ Client-side state management with React hooks
- ✅ "Say Hello" button with blue styling
- ✅ Integrated Modal component
- ✅ Displays greeting message with emoji
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Smooth interactions

### Usage Example

```tsx
import { HelloButton } from './hello-button';

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <HelloButton />
    </div>
  );
}
```

### Component Behavior
1. Renders a blue "Say Hello" button
2. On click, opens the Modal component
3. Modal displays "Hello! 👋" heading and welcome message
4. User can close by:
   - Clicking the "Close" button
   - Clicking the backdrop
5. Button can be clicked again to reopen the modal

### Styling
- Button: Blue background (`bg-blue-600 dark:bg-blue-500`) with hover effects
- Modal Content: Centered heading with emoji and descriptive text
- Responsive: Works on all screen sizes

### State Management
Uses React's `useState` hook to manage modal visibility:
```tsx
const [isOpen, setIsOpen] = useState(false);
```

---

## Integration

### Current Usage
Both components are integrated into the main page (`src/web/app/page.tsx`):
- `HelloButton` is placed in the page header next to the "To-Do List" title
- Provides a quick way for users to see a greeting overlay

### How to Add More Modals
To add additional modals to the application:

1. Create a new client component that uses the `Modal` component
2. Manage state with `useState`
3. Import and use the `Modal` component
4. Pass your custom content as children

Example:
```tsx
'use client';

import { useState } from 'react';
import { Modal } from './modal';

export function InfoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Show Info
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Information</h2>
        <p>Your custom content here</p>
      </Modal>
    </>
  );
}
```

---

## Testing

Both components have comprehensive test suites:

### Modal Tests
Location: `src/web/app/__tests__/modal.test.tsx`
- Tests for rendering/hiding based on props
- Tests for close button functionality
- Tests for backdrop click handling
- Tests for children content rendering

### HelloButton Tests
Location: `src/web/app/__tests__/hello-button.test.tsx`
- Tests for button rendering
- Tests for modal visibility toggling
- Tests for modal content display
- Tests for multiple open/close cycles

### Running Tests
```bash
npm test              # Run tests once
npm run test:watch   # Run tests in watch mode
```

---

## Best Practices

1. **Always use `'use client'` directive** in components that use React hooks
2. **Keep Modal content simple** - complex content should be in separate components
3. **Provide clear onClose handlers** - ensure users can always close the modal
4. **Test user interactions** - verify open/close functionality works as expected
5. **Consider accessibility** - use semantic HTML and ARIA attributes
6. **Support dark mode** - use Tailwind's dark mode classes

---

## Future Enhancements

Potential improvements for these components:

- [ ] Add animation transitions (fade-in/fade-out)
- [ ] Add keyboard support (ESC key to close)
- [ ] Add size variants (small, medium, large)
- [ ] Add position variants (top, center, bottom)
- [ ] Add custom styling props
- [ ] Add loading state support
- [ ] Add form support in modals
- [ ] Add stacking support for multiple modals
