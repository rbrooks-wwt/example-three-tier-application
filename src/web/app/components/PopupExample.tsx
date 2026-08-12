'use client';

import { useState } from 'react';

/**
 * PopupExample Component
 * 
 * This demonstrates how to:
 * 1. Add a button to the screen
 * 2. Show a popup/modal when the button is clicked
 * 3. Close the popup with a close button or overlay click
 */
export function PopupExample() {
  // State to track if the popup is open
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handler to open the popup
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // Handler to close the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Handler for overlay click (close popup when clicking outside)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the overlay, not the modal content
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  };

  return (
    <div>
      {/* BUTTON - This is what appears on the screen */}
      <button
        onClick={handleOpenPopup}
        className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        Open Popup
      </button>

      {/* POPUP/MODAL - Conditionally rendered based on isPopupOpen state */}
      {isPopupOpen && (
        // Overlay - semi-transparent background that covers the entire screen
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          {/* Modal content - the actual popup box */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Popup Title
              </h2>
              {/* Close button (X) */}
              <button
                onClick={handleClosePopup}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                aria-label="Close popup"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <p className="text-zinc-600 dark:text-zinc-300 mb-6">
              This is a popup/modal example. Click outside or the X button to close it.
            </p>

            {/* Footer with action buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleClosePopup}
                className="rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClosePopup}
                className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
