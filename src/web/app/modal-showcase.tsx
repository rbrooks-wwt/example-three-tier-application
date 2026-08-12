'use client';

import { useState } from 'react';
import { Modal } from './modal';

/**
 * ModalShowcase Component
 *
 * Demonstrates all Modal component variants and features including:
 * - Size variants (small, medium, large)
 * - Animation durations
 * - Accessibility features
 * - Keyboard support
 *
 * @returns The showcase component with multiple modal examples
 */
export function ModalShowcase() {
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({
    small: false,
    medium: false,
    large: false,
    custom: false,
    form: false,
  });

  const toggleModal = (key: string) => {
    setOpenModals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Modal Component Showcase
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Explore different modal variants and features. Click any button to open a modal.
        </p>
      </div>

      {/* Size Variants Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Size Variants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Small Modal */}
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Small (320px)
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Best for alerts and confirmations
            </p>
            <button
              onClick={() => toggleModal('small')}
              className="w-full rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Open Small Modal
            </button>
          </div>

          {/* Medium Modal */}
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Medium (384px)
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Default for standard forms
            </p>
            <button
              onClick={() => toggleModal('medium')}
              className="w-full rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Open Medium Modal
            </button>
          </div>

          {/* Large Modal */}
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Large (672px)
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              For complex forms and content
            </p>
            <button
              onClick={() => toggleModal('large')}
              className="w-full rounded-lg bg-blue-600 dark:bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Open Large Modal
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custom Animation Duration */}
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Custom Animation Duration
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Slower animation (500ms) for emphasis
            </p>
            <button
              onClick={() => toggleModal('custom')}
              className="w-full rounded-lg bg-green-600 dark:bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
            >
              Open Custom Animation Modal
            </button>
          </div>

          {/* Form Example */}
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Form Example
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Large modal with form content
            </p>
            <button
              onClick={() => toggleModal('form')}
              className="w-full rounded-lg bg-purple-600 dark:bg-purple-500 px-4 py-2 font-medium text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
            >
              Open Form Modal
            </button>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Features & Interactions
        </h3>
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Keyboard Support:</strong> Press ESC to close any modal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Click Backdrop:</strong> Click the semi-transparent background to close</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Smooth Animations:</strong> Fade-in/slide-in effects on open, fade-out/slide-out on close</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Accessibility:</strong> Full ARIA support, focus management, and semantic HTML</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Dark Mode:</strong> Fully styled for both light and dark themes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
              <span><strong>Responsive:</strong> Works seamlessly on all screen sizes</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Modals */}

      {/* Small Modal */}
      <Modal
        isOpen={openModals.small}
        onClose={() => toggleModal('small')}
        size="small"
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Small Modal
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This is a small modal, perfect for alerts and confirmations.
        </p>
      </Modal>

      {/* Medium Modal */}
      <Modal
        isOpen={openModals.medium}
        onClose={() => toggleModal('medium')}
        size="medium"
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Medium Modal
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This is the default medium modal, suitable for most forms and dialogs.
        </p>
        <div className="mt-4 p-3 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 Tip: Try pressing ESC or clicking the backdrop to close this modal.
          </p>
        </div>
      </Modal>

      {/* Large Modal */}
      <Modal
        isOpen={openModals.large}
        onClose={() => toggleModal('large')}
        size="large"
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Large Modal
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This is a large modal, ideal for complex forms and detailed content.
        </p>
        <div className="mt-4 space-y-3">
          <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-700">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Section 1: Introduction
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              This large modal provides plenty of space for detailed content and complex forms.
            </p>
          </div>
          <div className="p-3 rounded bg-zinc-100 dark:bg-zinc-700">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Section 2: Features
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              You can include multiple sections, forms, and rich content in large modals.
            </p>
          </div>
        </div>
      </Modal>

      {/* Custom Animation Modal */}
      <Modal
        isOpen={openModals.custom}
        onClose={() => toggleModal('custom')}
        size="medium"
        animationDuration={500}
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Custom Animation Duration
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This modal has a slower animation duration (500ms) for a more deliberate feel.
        </p>
        <div className="mt-4 p-3 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            ⏱️ Notice the smoother, slower animation when opening and closing this modal.
          </p>
        </div>
      </Modal>

      {/* Form Modal */}
      <Modal
        isOpen={openModals.form}
        onClose={() => toggleModal('form')}
        size="large"
      >
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Example Form
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-1">
              Message
            </label>
            <textarea
              placeholder="Enter your message"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            This is an example form in a large modal. The close button at the bottom will close the modal.
          </p>
        </form>
      </Modal>
    </div>
  );
}
