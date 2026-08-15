import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMultiWallet } from './useMultiWallet';

describe('useMultiWallet', () => {
  it('should initialize with disconnected state', () => {
    const { result } = renderHook(() => useMultiWallet());
    
    expect(result.current.isConnected).toBe(false);
    expect(result.current.publicKey).toBeNull();
    expect(result.current.isConnecting).toBe(false);
  });
});
