# Component Showcase

The component showcase is an interactive demonstration of all Modal component variants and features.

## Location

- **Showcase Page**: `/showcase` route
- **Showcase Component**: `src/web/app/modal-showcase.tsx`
- **Page Component**: `src/web/app/showcase/page.tsx`

## Features Demonstrated

### Size Variants
- **Small (320px)**: Best for alerts and confirmations
- **Medium (384px)**: Default for standard forms and dialogs
- **Large (672px)**: For complex forms and detailed content

### Features
- **Keyboard Support**: ESC key to close modals
- **Click to Close**: Click the backdrop to close
- **Smooth Animations**: Fade-in/slide-in and fade-out/slide-out effects
- **Accessibility**: Full ARIA support and focus management
- **Dark Mode**: Complete dark mode styling
- **Responsive**: Works on all screen sizes

### Interactive Examples
1. **Size Variants Section**: Try all three size variants
2. **Custom Animation Duration**: See slower animations (500ms)
3. **Form Example**: Large modal with form content
4. **Features List**: Quick reference of all capabilities

## How to Use

1. Navigate to `/showcase` in your browser
2. Click any button to open a modal
3. Try different interactions:
   - Press ESC to close
   - Click the backdrop to close
   - Click the Close button
4. Observe the smooth animations and responsive behavior

## Component Props Reference

```typescript
interface ModalProps {
  isOpen: boolean;                    // Controls visibility
  onClose: () => void;                // Close handler
  children: ReactNode;                // Modal content
  title?: string;                     // Accessibility title
  description?: string;               // Accessibility description
  animationDuration?: number;         // Animation duration in ms (default: 300)
  size?: 'small' | 'medium' | 'large'; // Size variant (default: 'medium')
}
```

## Code Examples

### Basic Modal
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2>Modal Title</h2>
  <p>Modal content</p>
</Modal>
```

### Large Modal with Custom Animation
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  size="large"
  animationDuration={500}
>
  <h2>Large Modal</h2>
  <p>Content with custom animation</p>
</Modal>
```

### Modal with Form
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
  <h2>Form Modal</h2>
  <form>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
    <textarea placeholder="Message" />
  </form>
</Modal>
```

## Accessibility Features

- ✅ ARIA attributes (role, aria-modal, aria-labelledby, aria-describedby)
- ✅ Focus management (auto-focus on close button)
- ✅ Keyboard support (ESC key)
- ✅ Semantic HTML structure
- ✅ Screen reader friendly
- ✅ Color contrast compliance

## Testing

The showcase component is fully tested with Jest and React Testing Library. See `src/web/app/__tests__/modal.test.tsx` for test examples.

## Documentation

For detailed documentation, see:
- `COMPONENTS.md` - Complete component documentation
- `README.md` - Project overview and setup instructions

## Navigation

- **Back to Home**: Click "← Back to Home" to return to the main To-Do List
- **Quick Links**: Use the navigation bar to jump to different sections
