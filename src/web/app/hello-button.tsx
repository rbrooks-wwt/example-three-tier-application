'use client';

import { useState } from 'react';
import { Modal } from './modal';

export function HelloButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        Say Hello
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Hello! 👋
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Welcome to the overlay!
        </p>
      </Modal>
    </>
  );
}
