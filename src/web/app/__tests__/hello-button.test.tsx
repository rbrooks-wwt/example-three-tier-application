import { render, screen, fireEvent } from '@testing-library/react';
import { HelloButton } from './hello-button';

describe('HelloButton Component', () => {
  it('should render the Say Hello button', () => {
    render(<HelloButton />);
    expect(screen.getByRole('button', { name: /say hello/i })).toBeInTheDocument();
  });

  it('should not show modal initially', () => {
    render(<HelloButton />);
    expect(screen.queryByText(/hello/i)).not.toBeInTheDocument();
  });

  it('should show modal when button is clicked', () => {
    render(<HelloButton />);
    const button = screen.getByRole('button', { name: /say hello/i });
    fireEvent.click(button);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it('should display the hello message in the modal', () => {
    render(<HelloButton />);
    const button = screen.getByRole('button', { name: /say hello/i });
    fireEvent.click(button);
    expect(screen.getByText(/welcome to the overlay/i)).toBeInTheDocument();
  });

  it('should close modal when close button is clicked', () => {
    render(<HelloButton />);
    const sayHelloButton = screen.getByRole('button', { name: /say hello/i });
    fireEvent.click(sayHelloButton);
    
    // Modal should be visible
    expect(screen.getByText(/welcome to the overlay/i)).toBeInTheDocument();
    
    // Click close button
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Modal should be hidden
    expect(screen.queryByText(/welcome to the overlay/i)).not.toBeInTheDocument();
  });

  it('should toggle modal visibility multiple times', () => {
    render(<HelloButton />);
    const sayHelloButton = screen.getByRole('button', { name: /say hello/i });
    
    // Open modal
    fireEvent.click(sayHelloButton);
    expect(screen.getByText(/welcome to the overlay/i)).toBeInTheDocument();
    
    // Close modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(screen.queryByText(/welcome to the overlay/i)).not.toBeInTheDocument();
    
    // Open modal again
    fireEvent.click(sayHelloButton);
    expect(screen.getByText(/welcome to the overlay/i)).toBeInTheDocument();
  });
});
