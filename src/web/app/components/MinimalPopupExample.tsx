'use client';

import { useState } from 'react';

/**
 * MINIMAL POPUP EXAMPLE
 * 
 * This is the simplest possible implementation of a button + popup.
 * Use this as a starting point and customize from here.
 */
export function MinimalPopupExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* BUTTON */}
      <button onClick={() => setIsOpen(true)}>
        Click Me
      </button>

      {/* POPUP */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
            <h2>Hello!</h2>
            <p>This is a popup.</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
