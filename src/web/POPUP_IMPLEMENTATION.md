# Button and Popup Implementation Guide

This guide shows you how to add a button on screen and display a popup in this Next.js application.

## Overview

The implementation uses:
- **React Hooks** (`useState`) for state management
- **Client Component** (`'use client'`) for interactivity
- **Tailwind CSS** for styling
- **Conditional Rendering** to show/hide the popup

## Key Components

### 1. State Management
```typescript
const [isPopupOpen, setIsPopupOpen] = useState(false);
```
- Tracks whether the popup is visible
- `isPopupOpen = true` → popup is shown
- `isPopupOpen = false` → popup is hidden

### 2. Button
```typescript
<button
  onClick={handleOpenPopup}
  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
>
  Open Popup
</button>
```
- Simple button that triggers `handleOpenPopup`
- Sets `isPopupOpen` to `true`

### 3. Popup Structure
The popup consists of three layers:

#### Layer 1: Overlay (Background)
```typescript
<div
  onClick={handleOverlayClick}
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
>
```
- Covers entire screen with semi-transparent black
- Clicking it closes the popup
- `fixed inset-0` = full screen coverage
- `z-50` = appears above other content

#### Layer 2: Modal (The Box)
```typescript
<div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
```
- The actual popup box
- White background (dark mode support)
- Rounded corners and shadow for depth
- Max width of 28rem (md breakpoint)

#### Layer 3: Content
- Header with title and close button
- Body with message/content
- Footer with action buttons

### 4. Close Handlers

**Close Button (X):**
```typescript
<button onClick={handleClosePopup} aria-label="Close popup">
  {/* X icon */}
</button>
```

**Overlay Click:**
```typescript
const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  if (e.target === e.currentTarget) {
    handleClosePopup();
  }
};
```
- Only closes if clicking the overlay itself, not the modal content

**Cancel/Confirm Buttons:**
```typescript
<button onClick={handleClosePopup}>Cancel</button>
<button onClick={handleClosePopup}>Confirm</button>
```

## How to Use This Component

### 1. Import the component
```typescript
import { PopupExample } from './components/PopupExample';
```

### 2. Add it to your page
```typescript
export default function Home() {
  return (
    <div>
      <h1>My Page</h1>
      <PopupExample />
    </div>
  );
}
```

### 3. Customize it
- Change button text: `Open Popup` → your text
- Change popup title: `Popup Title` → your title
- Change popup content: Replace the `<p>` tag
- Add form fields inside the modal
- Handle button clicks with custom logic

## Styling Details

### Tailwind Classes Used
- `fixed inset-0` - Full screen overlay
- `bg-opacity-50` - Semi-transparent background
- `z-50` - Stacking order (appears on top)
- `rounded-lg` - Rounded corners
- `shadow-lg` - Drop shadow
- `transition-colors` - Smooth color changes on hover
- `dark:` prefix - Dark mode support

### Dark Mode
The component supports dark mode with `dark:` prefixed classes:
```typescript
className="bg-white dark:bg-zinc-800"
className="text-zinc-900 dark:text-zinc-50"
```

## Advanced Patterns

### Pattern 1: Popup with Form
```typescript
const [formData, setFormData] = useState({ name: '', email: '' });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  handleClosePopup();
};

// Inside modal:
<form onSubmit={handleSubmit}>
  <input
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    placeholder="Enter name"
  />
  <button type="submit">Submit</button>
</form>
```

### Pattern 2: Popup with Async Action
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleConfirm = async () => {
  setIsLoading(true);
  try {
    await someAsyncAction();
    handleClosePopup();
  } finally {
    setIsLoading(false);
  }
};

// In button:
<button onClick={handleConfirm} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Confirm'}
</button>
```

### Pattern 3: Multiple Popups
```typescript
const [activePopup, setActivePopup] = useState<'popup1' | 'popup2' | null>(null);

{activePopup === 'popup1' && <Popup1 />}
{activePopup === 'popup2' && <Popup2 />}
```

### Pattern 4: Popup with Confirmation
```typescript
const handleDelete = async () => {
  if (confirm('Are you sure?')) {
    await deleteItem();
    handleClosePopup();
  }
};
```

## Important Notes

1. **'use client' directive**: Required because we use `useState` (React Hook)
2. **Accessibility**: Includes `aria-label` for screen readers
3. **Click outside**: Overlay click closes popup (UX best practice)
4. **Dark mode**: Fully supported with Tailwind dark mode
5. **Responsive**: Works on mobile and desktop

## Testing the Implementation

1. Navigate to the component file: `src/web/app/components/PopupExample.tsx`
2. Import it in `src/web/app/page.tsx`
3. Add `<PopupExample />` to the page
4. Run `npm run dev` and test in browser
5. Click the button to open popup
6. Try closing with: X button, overlay click, or Cancel button

## File Structure
```
src/web/app/
├── components/
│   └── PopupExample.tsx    ← The popup component
├── page.tsx                ← Main page (import PopupExample here)
├── layout.tsx              ← Root layout
└── globals.css             ← Global styles
```
