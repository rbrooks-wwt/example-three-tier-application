# Components Documentation

This document describes the reusable components in the web application.

## Modal Component

### Overview
The `Modal` component is a reusable overlay/dialog component that displays content in a centered modal with a semi-transparent backdrop. It supports keyboard navigation, full accessibility features, smooth animations, and multiple size variants.

### Location
`src/web/app/modal.tsx`

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls whether the modal is visible |
| `onClose` | `() => void` | Yes | Callback function triggered when the modal should close |
| `children` | `ReactNode` | Yes | Content to display inside the modal |
| `title` | `string` | No | Optional title for accessibility (aria-labelledby) |
| `description` | `string` | No | Optional description for accessibility (aria-describedby) |
| `animationDuration` | `number` | No | Animation duration in milliseconds (default: 300) |
| `size` | `'small' \| 'medium' \| 'large'` | No | Size variant of the modal (default: 'medium') |

### Features
- ✅ Conditional rendering based on `isOpen` prop
- ✅ Semi-transparent backdrop (50% black opacity)
- ✅ Click backdrop to close functionality
- ✅ **ESC key support** - press ESC to close modal
- ✅ Built-in close button with focus management
- ✅ Centered positioning with responsive padding
- ✅ Dark mode support via Tailwind CSS
- ✅ Proper z-index layering (z-50)
- ✅ **Smooth animations**:
  - Fade-in/fade-out for backdrop
  - Slide-in/slide-out for modal content
  - Customizable animation duration
  - Proper animation cleanup on unmount
- ✅ **Size variants**:
  - Small (320px max-width)
  - Medium (384px max-width) - default
  - Large (672px max-width)
- ✅ **Full accessibility support**:
  - ARIA attributes (role, aria-modal, aria-labelledby, aria-describedby)
  - Focus management (auto-focus close button)
  - Keyboard support (ESC key)
  - Semantic HTML structure
  - Screen reader friendly

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

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="My Modal"
        description="This is my modal description"
        animationDuration={300}
        size="large"
      >
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

### Size Variants

The modal supports three size variants to accommodate different content types:

**Small (max-width: 320px)**
- Best for: Simple confirmations, alerts, brief messages
- Use case: "Are you sure?" dialogs, quick notifications
- Example:
  ```tsx
  <Modal isOpen={isOpen} onClose={onClose} size="small">
    <p>Confirm this action?</p>
  </Modal>
  ```

**Medium (max-width: 384px) - Default**
- Best for: Standard forms, typical content, most use cases
- Use case: Login forms, settings, standard dialogs
- Example:
  ```tsx
  <Modal isOpen={isOpen} onClose={onClose} size="medium">
    <form>...</form>
  </Modal>
  ```

**Large (max-width: 672px)**
- Best for: Complex forms, detailed content, multiple sections
- Use case: Detailed forms, rich content, multi-step dialogs
- Example:
  ```tsx
  <Modal isOpen={isOpen} onClose={onClose} size="large">
    <div>
      <h2>Detailed Information</h2>
      <p>Long form content...</p>
    </div>
  </Modal>
  ```

### Animation Details

The modal includes smooth animations for a polished user experience:

**Backdrop Animation:**
- **Enter**: Fades in from 0% to 100% opacity
- **Exit**: Fades out from 100% to 0% opacity
- Duration: Customizable (default: 300ms)

**Modal Content Animation:**
- **Enter**: Slides up from 20px below with fade-in
- **Exit**: Slides down 20px with fade-out
- Duration: Customizable (default: 300ms)

**Animation Lifecycle:**
1. When `isOpen` becomes `true`: Component renders and immediately applies enter animations
2. When `isOpen` becomes `false`: Exit animations play, then component unmounts after animation completes
3. Animation duration can be customized via `animationDuration` prop

### Keyboard Support
- **ESC Key**: Closes the modal when pressed
- **Tab Key**: Navigates through focusable elements within the modal
- **Enter Key**: Activates buttons and form elements

### Styling
The component uses Tailwind CSS classes for styling:
- Backdrop: `fixed inset-0 z-50 flex items-center justify-center`
- Overlay: `absolute inset-0 bg-black/50 transition-opacity`
- Modal Box: `relative z-10 rounded-lg bg-white dark:bg-zinc-800 shadow-lg p-6 {sizeClass} mx-4`
- Close Button: Standard button styling with hover and focus effects

### Animation Classes
Animation classes are defined in `globals.css`:
- `.modal-backdrop-enter` - Fade-in animation for backdrop
- `.modal-backdrop-exit` - Fade-out animation for backdrop
- `.modal-content-enter` - Slide-in animation for modal content
- `.modal-content-exit` - Slide-out animation for modal content

### Accessibility Features
- **ARIA Attributes**:
  - `role="dialog"` - identifies the element as a dialog
  - `aria-modal="true"` - indicates this is a modal dialog
  - `aria-labelledby` - links to the modal title
  - `aria-describedby` - links to the modal description
  - `aria-hidden="true"` on backdrop - hides from screen readers
- **Focus Management**: Close button receives focus when modal opens
- **Keyboard Navigation**: ESC key closes the modal
- **Semantic HTML**: Proper heading hierarchy and button labels
- **Animation Accessibility**: Animations respect `prefers-reduced-motion` (via CSS)

---

## HelloButton Component

### Overview
The `HelloButton` component is a client-side component that displays a button which, when clicked, opens a modal with a friendly "Hello" greeting message. It demonstrates best practices for accessible interactive components with smooth animations.

### Location
`src/web/app/hello-button.tsx`

### Props
None - this is a self-contained component.

### Features
- ✅ Client-side state management with React hooks
- ✅ "Say Hello" button with blue styling
- ✅ Integrated Modal component with animations
- ✅ Displays greeting message with emoji
- ✅ Dark mode support
- ✅ Responsive design
- ✅ **Keyboard support** (ESC to close)
- ✅ **Smooth animations** (fade-in/slide-in)
- ✅ **Full accessibility support**:
  - ARIA labels on button
  - Proper heading structure
  - Focus management
  - Keyboard navigation

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
1. Renders a blue "Say Hello" button with accessible label
2. On click, opens the Modal component with smooth animation
3. Modal displays "Hello! 👋" heading and welcome message
4. User can close by:
   - Clicking the "Close" button
   - Clicking the backdrop
   - **Pressing the ESC key**
5. Button can be clicked again to reopen the modal with animation

### Styling
- Button: Blue background (`bg-blue-600 dark:bg-blue-500`) with hover and focus effects
- Modal Content: Centered heading with emoji and descriptive text
- Responsive: Works on all screen sizes
- Focus Indicators: Visible focus rings for keyboard navigation
- Animations: Smooth fade-in/slide-in effects

### State Management
Uses React's `useState` hook to manage modal visibility:
```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Accessibility Features
- **ARIA Labels**: Button has `aria-label="Open greeting overlay"`
- **Semantic IDs**: Modal title and description have proper IDs for accessibility
- **Focus Management**: Proper focus handling when modal opens/closes
- **Keyboard Support**: ESC key closes the modal
- **Animation Accessibility**: Animations are smooth and non-intrusive

---

## Integration

### Current Usage
Both components are integrated into the main page (`src/web/app/page.tsx`):
- `HelloButton` is placed in the page header next to the "To-Do List" title
- Provides a quick way for users to see a greeting overlay
- Demonstrates accessible modal pattern with animations

### How to Add More Modals
To add additional modals to the application:

1. Create a new client component that uses the `Modal` component
2. Manage state with `useState`
3. Import and use the `Modal` component
4. Pass your custom content as children
5. Add proper ARIA labels and IDs
6. Optionally customize animation duration and size

Example:
```tsx
'use client';

import { useState } from 'react';
import { Modal } from './modal';

export function InfoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Open information modal"
      >
        Show Info
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Information"
        animationDuration={400}
        size="large"
      >
        <h2 id="modal-title">Information</h2>
        <p id="modal-description">Your custom content here</p>
      </Modal>
    </>
  );
}
```

---

## Testing

Both components have comprehensive test suites with full coverage of keyboard, accessibility, animation, and size variant features:

### Modal Tests
Location: `src/web/app/__tests__/modal.test.tsx`
- Tests for rendering/hiding based on props
- Tests for close button functionality
- Tests for backdrop click handling
- Tests for children content rendering
- **Tests for ESC key functionality**
- **Tests for ARIA attributes**
- **Tests for focus management**
- **Tests for animation classes**
- **Tests for custom animation duration**
- **Tests for animation completion and unmounting**
- **Tests for size variants (small, medium, large)**
- **Tests for size class application**

### HelloButton Tests
Location: `src/web/app/__tests__/hello-button.test.tsx`
- Tests for button rendering
- Tests for modal visibility toggling
- Tests for modal content display
- Tests for multiple open/close cycles
- **Tests for ESC key functionality**
- **Tests for ARIA labels**
- **Tests for modal IDs**

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
7. **Add ARIA labels** - provide descriptive labels for screen readers
8. **Test keyboard navigation** - ensure ESC key and Tab work properly
9. **Manage focus** - ensure focus is properly managed when modal opens/closes
10. **Use semantic IDs** - give elements proper IDs for accessibility
11. **Customize animations** - adjust `animationDuration` for different use cases
12. **Test animations** - verify animations work smoothly across browsers
13. **Choose appropriate size** - select size variant based on content type
14. **Test responsive behavior** - verify modals work on all screen sizes

---

## Keyboard Shortcuts

### Modal Keyboard Support
| Key | Action |
|-----|--------|
| ESC | Close the modal |
| Tab | Navigate between focusable elements |
| Enter | Activate buttons and form elements |
| Space | Activate buttons |

---

## Accessibility Checklist

When using these components, ensure:

- [ ] Modal has proper ARIA attributes (role, aria-modal)
- [ ] Modal title is linked with aria-labelledby
- [ ] Modal description is linked with aria-describedby
- [ ] Buttons have descriptive aria-labels
- [ ] Focus is managed properly (auto-focus on open)
- [ ] ESC key closes the modal
- [ ] Backdrop click closes the modal
- [ ] Close button is always visible and accessible
- [ ] Color contrast meets WCAG standards
- [ ] Keyboard navigation works properly
- [ ] Animations are smooth and not jarring
- [ ] Animations respect user preferences (prefers-reduced-motion)
- [ ] Size variant is appropriate for content
- [ ] Modal is responsive on all screen sizes

---

## Animation Customization

### Adjusting Animation Duration

To use a different animation duration, pass the `animationDuration` prop:

```tsx
// Slower animation (500ms)
<Modal isOpen={isOpen} onClose={onClose} animationDuration={500}>
  Content
</Modal>

// Faster animation (200ms)
<Modal isOpen={isOpen} onClose={onClose} animationDuration={200}>
  Content
</Modal>
```

### Custom Animation Styles

To customize animations, modify the keyframes in `globals.css`:

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px); /* Adjust distance */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Size Variant Reference

### Tailwind Max-Width Classes

| Size | Class | Max-Width | Use Case |
|------|-------|-----------|----------|
| Small | `max-w-xs` | 320px | Alerts, confirmations |
| Medium | `max-w-sm` | 384px | Standard forms, dialogs |
| Large | `max-w-2xl` | 672px | Complex forms, rich content |

---

## Future Enhancements

Potential improvements for these components:

- [ ] Add position variants (top, center, bottom)
- [ ] Add custom styling props
- [ ] Add loading state support
- [ ] Add form support in modals
- [ ] Add stacking support for multiple modals
- [ ] Add custom backdrop colors
- [ ] Add onOpen callback
- [ ] Add transition easing options
- [ ] Add scroll behavior customization
- [ ] Add custom close button styling
