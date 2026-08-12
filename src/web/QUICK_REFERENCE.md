# Quick Reference: Button + Popup Implementation

## The Absolute Minimum (5 lines of logic)

```typescript
'use client';
import { useState } from 'react';

export function MyPopup() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      {open && (
        <div onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()}>
            <p>Popup content</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
```

## Step-by-Step Breakdown

### Step 1: Make it a Client Component
```typescript
'use client';  // ← Required for useState
```

### Step 2: Import useState
```typescript
import { useState } from 'react';
```

### Step 3: Create state for popup visibility
```typescript
const [isOpen, setIsOpen] = useState(false);
```

### Step 4: Add a button that opens the popup
```typescript
<button onClick={() => setIsOpen(true)}>
  Open Popup
</button>
```

### Step 5: Conditionally render the popup
```typescript
{isOpen && (
  <div>
    {/* Popup content here */}
  </div>
)}
```

### Step 6: Add a close button
```typescript
<button onClick={() => setIsOpen(false)}>
  Close
</button>
```

## Common Patterns

### Pattern: Close on overlay click
```typescript
<div onClick={() => setIsOpen(false)}>
  {/* Overlay */}
  <div onClick={e => e.stopPropagation()}>
    {/* Modal - stops click from bubbling to overlay */}
  </div>
</div>
```

### Pattern: Styled with Tailwind
```typescript
<button className="bg-blue-600 text-white px-4 py-2 rounded">
  Open
</button>

{isOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 max-w-md">
      <h2>Title</h2>
      <p>Content</p>
      <button onClick={() => setIsOpen(false)}>Close</button>
    </div>
  </div>
)}
```

### Pattern: With loading state
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleConfirm = async () => {
  setIsLoading(true);
  await doSomething();
  setIsLoading(false);
  setIsOpen(false);
};

<button onClick={handleConfirm} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Confirm'}
</button>
```

### Pattern: With form data
```typescript
const [formData, setFormData] = useState({ name: '' });

<input
  value={formData.name}
  onChange={e => setFormData({ ...formData, name: e.target.value })}
/>
```

## Files in This Repository

1. **PopupExample.tsx** - Full-featured example with all best practices
2. **MinimalPopupExample.tsx** - Bare minimum implementation
3. **POPUP_IMPLEMENTATION.md** - Detailed guide with explanations

## Key Concepts

| Concept | What it does |
|---------|-------------|
| `'use client'` | Enables React hooks (required for interactive components) |
| `useState(false)` | Creates state variable, starts as false (popup closed) |
| `setIsOpen(true)` | Opens popup |
| `setIsOpen(false)` | Closes popup |
| `{isOpen && <div>}` | Only renders popup if isOpen is true |
| `onClick={e => e.stopPropagation()}` | Prevents click from bubbling to parent |
| `fixed inset-0` | Full screen overlay |
| `z-50` | Appears on top of other content |

## Testing

1. Create a component file: `src/web/app/components/MyPopup.tsx`
2. Copy one of the examples above
3. Import in `src/web/app/page.tsx`: `import { MyPopup } from './components/MyPopup';`
4. Add to page: `<MyPopup />`
5. Run: `npm run dev`
6. Visit: `http://localhost:3000`
7. Click button to test

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "useState is not defined" | Add `'use client'` at top of file |
| Popup doesn't appear | Check `isOpen` state is true, check z-index |
| Can't close popup | Make sure close button calls `setIsOpen(false)` |
| Clicking outside doesn't close | Add `onClick={() => setIsOpen(false)}` to overlay |
| Popup closes when clicking inside | Add `onClick={e => e.stopPropagation()}` to modal content |
