import { ModalShowcase } from './modal-showcase';

/**
 * Component Showcase Page
 *
 * This page demonstrates all Modal component variants and features.
 * It serves as a reference for developers and a showcase for users.
 */
export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Component Showcase
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Explore the Modal component and all its features, variants, and capabilities.
          </p>
        </div>

        {/* Navigation */}
        <nav className="mb-8 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
            Quick Links:
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/"
              className="inline-block rounded-lg bg-zinc-900 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              ← Back to Home
            </a>
            <a
              href="#size-variants"
              className="inline-block rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              Size Variants
            </a>
            <a
              href="#features"
              className="inline-block rounded-lg border border-zinc-300 dark:border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              Features
            </a>
          </div>
        </nav>

        {/* Showcase Component */}
        <ModalShowcase />

        {/* Documentation Section */}
        <section className="mt-16 p-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Documentation
          </h2>
          <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Getting Started
              </h3>
              <p>
                The Modal component is a flexible, accessible overlay component that can be used throughout your application. 
                It supports multiple size variants, smooth animations, and full keyboard navigation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Basic Usage
              </h3>
              <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded overflow-x-auto text-sm">
                <code>{`import { useState } from 'react';
import { Modal } from './modal';

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content</p>
      </Modal>
    </>
  );
}`}</code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Props
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">isOpen: boolean</code> - Controls modal visibility</li>
                <li><code className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">onClose: () =&gt; void</code> - Close handler</li>
                <li><code className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">size?: 'small' | 'medium' | 'large'</code> - Modal size (default: 'medium')</li>
                <li><code className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">animationDuration?: number</code> - Animation duration in ms (default: 300)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Learn More
              </h3>
              <p>
                For detailed documentation, see the{' '}
                <code className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">COMPONENTS.md</code> file in the project root.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            Modal Component Showcase • Built with React, Next.js, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
