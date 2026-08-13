# Quick Reference: Adding Buttons to Main Page

## 📋 Summary

I've created a comprehensive guide and working example for adding buttons to your main page. Here's what you got:

---

## 📁 Files Created/Modified

### 1. **BUTTON_GUIDE.md** (New)
   - Complete guide with 4 different methods to add buttons
   - Styling reference with Tailwind CSS
   - Best practices and accessibility tips
   - Testing instructions

### 2. **src/web/app/example-button.tsx** (New)
   - Working example button component
   - Click counter functionality
   - Demonstrates best practices
   - Ready to use or customize

### 3. **src/web/app/page.tsx** (Modified)
   - Added import for ExampleButton
   - Integrated ExampleButton into the header
   - Now displays between HelloButton and Showcase link

---

## 🚀 Quick Start

### Option A: Use the Example Button (Already Done!)
The example button is already added to your main page. Just run:
```bash
cd src/web
npm run dev
```
Then visit `http://localhost:3000` and you'll see the new "Click Me" button!

### Option B: Create Your Own Button

1. **Create a new file** `src/web/app/my-button.tsx`:
```tsx
'use client';

import { useState } from 'react';

export function MyButton() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="rounded-lg bg-purple-600 dark:bg-purple-500 px-4 py-2 font-medium text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
    >
      Clicked {count} times
    </button>
  );
}
```

2. **Import in page.tsx**:
```tsx
import { MyButton } from './my-button';
```

3. **Add to JSX**:
```tsx
<div className="flex items-center gap-2">
  <HelloButton />
  <MyButton />
  <a href="/showcase">Showcase</a>
</div>
```

---

## 🎨 Button Styling Presets

Copy-paste ready button styles:

### Blue Button
```tsx
className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900"
```

### Green Button
```tsx
className="rounded-lg bg-green-600 dark:bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-zinc-900"
```

### Purple Button
```tsx
className="rounded-lg bg-purple-600 dark:bg-purple-500 px-4 py-2 font-medium text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-zinc-900"
```

### Red Button
```tsx
className="rounded-lg bg-red-600 dark:bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-700 dark:hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-zinc-900"
```

---

## 📚 4 Methods Explained

### Method 1: Simple Static Button
❌ **Won't work** - Server Components can't have onClick handlers

### Method 2: Client Component Button ✅ **RECOMMENDED**
- Create a `.tsx` file with `'use client'` directive
- Use React hooks (useState, etc.)
- Import and use in page.tsx
- **Best for:** Interactive buttons with state

### Method 3: Button with Modal
- Use the existing `Modal` component
- Show/hide with useState
- **Best for:** Buttons that open dialogs

### Method 4: Button with Server Action
- Call server functions from client
- Handle async operations
- **Best for:** Buttons that need backend logic

---

## ✅ Checklist for Adding a Button

- [ ] Create component file with `'use client'` directive
- [ ] Add JSDoc comment explaining the component
- [ ] Use Tailwind classes for styling
- [ ] Add `aria-label` for accessibility
- [ ] Include focus states (`focus:ring-2`)
- [ ] Support dark mode (`dark:` classes)
- [ ] Import component in page.tsx
- [ ] Add to JSX in the button area
- [ ] Test in browser
- [ ] Test dark mode
- [ ] Test on mobile

---

## 🔗 Related Files

- `src/web/app/hello-button.tsx` - Example with modal
- `src/web/app/modal.tsx` - Modal component
- `src/web/app/page.tsx` - Main page
- `src/web/app/actions.ts` - Server actions
- `BUTTON_GUIDE.md` - Full documentation

---

## 💡 Pro Tips

1. **Reuse the Modal component** for consistent dialogs
2. **Copy styling from HelloButton** for consistency
3. **Use server actions** for database operations
4. **Test dark mode** - use `dark:` prefix for all colors
5. **Add aria-labels** for screen readers
6. **Keep buttons in a flex container** with `gap-2` for spacing

---

## 🧪 Testing

```bash
# Start dev server
cd src/web
npm run dev

# Visit http://localhost:3000
# Click your button
# Check browser console for errors
# Test dark mode (usually Ctrl+Shift+L or in dev tools)
```

---

## 📖 Full Documentation

See **BUTTON_GUIDE.md** for:
- Complete code examples
- All 4 methods with full implementations
- Styling reference
- Best practices
- Accessibility guidelines
- Troubleshooting

---

## 🎯 Next Steps

1. ✅ Review the example button on the main page
2. ✅ Read BUTTON_GUIDE.md for detailed instructions
3. ✅ Create your own button using one of the 4 methods
4. ✅ Customize styling and functionality
5. ✅ Test and deploy!

---

**Questions?** Check the BUTTON_GUIDE.md file for comprehensive documentation!
