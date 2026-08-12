import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from './modal';

describe('Modal Component', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render the close button', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>\n        <p>Test Content</p>
      </Modal>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Test Content</p>
      </Modal>
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Test Content</p>
      </Modal>
    );
    const backdrop = container.querySelector('.absolute.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('should render children content', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <h2>Modal Title</h2>
        <p>Modal Description</p>
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Description')).toBeInTheDocument();
  });

  it('should call onClose when ESC key is pressed', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Test Content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when other keys are pressed', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <p>Test Content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should have proper ARIA attributes', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('should focus close button when modal opens', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveFocus();
  });

  it('should not respond to ESC key when modal is closed', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <p>Test Content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should apply enter animation class when opening', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );
    const backdrop = container.querySelector('.modal-backdrop-enter');
    const content = container.querySelector('.modal-content-enter');
    expect(backdrop).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('should apply exit animation class when closing', async () => {
    const { container, rerender } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );

    // Close the modal
    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Test Content</p>
      </Modal>
    );

    // Check for exit animation classes
    const backdrop = container.querySelector('.modal-backdrop-exit');
    const content = container.querySelector('.modal-content-exit');
    expect(backdrop).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('should accept custom animation duration', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={() => {}} animationDuration={500}>
        <p>Test Content</p>
      </Modal>
    );
    const backdrop = container.querySelector('.absolute.inset-0');
    const content = container.querySelector('[role="dialog"]');
    expect(backdrop).toHaveStyle('animationDuration: 500ms');
    expect(content).toHaveStyle('animationDuration: 500ms');
  });

  it('should unmount after animation completes on close', async () => {
    const { container, rerender } = render(
      <Modal isOpen={true} onClose={() => {}} animationDuration={100}>
        <p>Test Content</p>
      </Modal>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Close the modal
    rerender(
      <Modal isOpen={false} onClose={() => {}} animationDuration={100}>
        <p>Test Content</p>
      </Modal>
    );

    // Wait for animation to complete
    await waitFor(
      () => {
        expect(container.firstChild).toBeNull();
      },
      { timeout: 200 }
    );
  });
});
