import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BalanceWidget } from './BalanceWidget';
import '@testing-library/jest-dom';

describe('BalanceWidget', () => {
  it('renders nothing when not connected', () => {
    const { container } = render(<BalanceWidget publicKey="GA7YV..." isConnected={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders loading state initially when connected', () => {
    render(<BalanceWidget publicKey="GA7YV..." isConnected={true} />);
    expect(screen.getByTitle('Your XLM Testnet Balance')).toBeInTheDocument();
  });
});
