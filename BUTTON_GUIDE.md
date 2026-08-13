# How to Add a Button to the Main Page

This guide shows you multiple ways to add a button to the main page (`src/web/app/page.tsx`) of this Next.js application.

## Quick Overview

The main page is a **Server Component** that displays a To-Do List. It currently has:
- A "Say Hello" button (interactive client component)
- A "Showcase" link button
- An "Add" button for the form

---

## Method 1: Simple Static Button (Easiest)

Add a basic button directly to the JSX in `page.tsx`:

```tsx
<button
  className="rounded-lg bg-green-600 dark:bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-sm"
  onClick={() => alert('Button clicked!')}
>
  My New Button
</button>
```

**Note:** This won't work directly in a Server Component. See Method 2 for the proper approach.

---

## Method 2: Create a Client Component Button (Recommended)

### Step 1: Create a new button component file

Create `src/web/app/my-button.tsx`:

```tsx
'use client';

import { useState } from 'react';

/**
 * MyButton Component
 *
 * A reusable button component that demonstrates interactive functionality.
 * This is a client component, so it can use React hooks and event handlers.
 *
 * @example
 * ```tsx
 * import { MyButton } from './my-button';
 *
 * export default function Home() {
 *   return <MyButton />;
 * }
 * ```
 */
export function MyButton() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <button
      onClick={() => setClickCount(clickCount + 1)}
      className="rounded-lg bg-purple-600 dark:bg-purple-500 px-4 py-2 font-medium text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-zinc-900"
      aria-label="Click counter button"
    >
      Clicked {clickCount} times
    </button>
  );
}
```

### Step 2: Import and use in `page.tsx`

Add to the imports at the top:
```tsx
import { MyButton } from './my-button';
```

Add to the button area (next to HelloButton and Showcase):
```tsx
<div className="flex items-center gap-2">
  <HelloButton />
  <MyButton />
  <a href="/showcase" ...>
    Showcase
  </a>
</div>
```

---

## Method 3: Button with Modal Dialog

### Step 1: Create a button component with modal

Create `src/web/app/my-modal-button.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Modal } from './modal';

export function MyModalButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-indigo-600 dark:bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-900"
        aria-label="Open information modal"
      >
        More Info
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Information 📋
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This is a modal dialog triggered by a button!
        </p>
      </Modal>
    </>
  );
}
```

### Step 2: Import and use in `page.tsx`

```tsx
import { MyModalButton } from './my-modal-button';

// Then add to the button area:
<MyModalButton />
```

---

## Method 4: Button with Server Action

### Step 1: Add a server action to `actions.ts`

Add to `src/web/app/actions.ts`:

```tsx
'use server';

export async function handleButtonClick() {
  console.log('Button clicked on server!');
  // Add your server-side logic here
  return { success: true, message: 'Action completed' };
}
```

### Step 2: Create a client component that uses the action

Create `src/web/app/server-action-button.tsx`:

```tsx
'use client';

import { handleButtonClick } from './actions';
import { useState } from 'react';

export function ServerActionButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await handleButtonClick();
      setResult(response.message);
    } catch (error) {
      setResult('Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="rounded-lg bg-orange-600 dark:bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Server Action'}
      </button>
      {result && <p className="text-sm text-zinc-600 dark:text-zinc-400">{result}</p>}
    </div>
  );
}
```

### Step 3: Import and use in `page.tsx`

```tsx
import { ServerActionButton } from './server-action-button';

// Then add to the button area:
<ServerActionButton />
```

---

## Styling Reference

The application uses **Tailwind CSS** for styling. Here are common button styles used:

### Color Variants:
- **Blue**: `bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600`
- **Green**: `bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600`
- **Purple**: `bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600`
- **Amber**: `bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600`
- **Indigo**: `bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600`

### Base Button Classes:
```tsx
className="rounded-lg px-4 py-2 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
```

---

## Complete Example: Adding Multiple Buttons

Here's how to add all three button types to your main page:

### 1. Create the button components (as shown above)

### 2. Update `src/web/app/page.tsx`:

```tsx
import { getTasks, createTask, toggleTask } from './actions';
import { HelloButton } from './hello-button';
import { MyButton } from './my-button';
import { MyModalButton } from './my-modal-button';
import { ServerActionButton } from './server-action-button';

export default async function Home() {
  const tasks = await getTasks();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            To-Do List
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <HelloButton />
            <MyButton />
            <MyModalButton />
            <ServerActionButton />
            <a
              href="/showcase"
              className="rounded-lg bg-amber-600 dark:bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors text-sm"
              title="View component showcase and demos"
            >
              Showcase
            </a>
          </div>
        </div>

        {/* Rest of the page remains the same */}
        {/* ... */}
      </div>
    </div>
  );
}
```

---

## Testing Your Button

After adding a button:

1. **Start the development server:**
   ```bash
   cd src/web
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:3000
   ```

3. **Test your button:**
   - Click it to verify it works
   - Check the browser console for any errors
   - Test dark mode (if applicable)
   - Test on mobile devices

---

## Best Practices

✅ **Do:**
- Use `'use client'` directive for interactive components
- Add `aria-label` for accessibility
- Include focus states with `focus:ring-2`
- Support dark mode with `dark:` classes
- Add TypeScript types for props
- Document components with JSDoc comments

❌ **Don't:**
- Add `onClick` handlers directly in Server Components
- Forget to import components before using them
- Use inline styles instead of Tailwind classes
- Forget accessibility attributes
- Make buttons too large or too small (use `px-4 py-2` as base)

---

## Need Help?

- Check existing components in `src/web/app/` for patterns
- Review the `Modal` component in `modal.tsx` for modal patterns
- Look at `hello-button.tsx` for a complete example
- Check `COMPONENTS.md` in the web directory for more documentation
