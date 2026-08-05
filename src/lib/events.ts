import { CREDENTIAL_CONTRACT_ID } from '../config/stellar';

export type EventType = 'credential_issued' | 'credential_revoked' | 'institution_registered' | 'institution_verified';

export interface ContractEvent {
  type: EventType;
  credentialId?: string;
  institution?: string;
  studentName?: string;
  timestamp: number;
  txHash: string;
}

export type EventCallback = (event: ContractEvent) => void;

class EventStreamer {
  private listeners: Map<EventType, Set<EventCallback>> = new Map();
  private isStreaming = false;
  private pollInterval = 5000; // 5 seconds
  private pollTimer: number | null = null;

  /**
   * Start listening for contract events
   * Note: Simplified implementation for demonstration
   */
  async startStreaming() {
    if (this.isStreaming) return;
    
    this.isStreaming = true;
    this.pollEvents();
  }

  /**
   * Stop streaming events
   */
  stopStreaming() {
    this.isStreaming = false;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }

  /**
   * Subscribe to specific event types
   */
  on(eventType: EventType, callback: EventCallback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);

    // Start streaming if not already started
    if (!this.isStreaming) {
      this.startStreaming();
    }

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
      }
    };
  }

  /**
   * Remove event listener
   */
  off(eventType: EventType, callback: EventCallback) {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  /**
   * Poll for new events using Soroban RPC
   */
  private async pollEvents() {
    if (!this.isStreaming) return;

    try {
      if (CREDENTIAL_CONTRACT_ID) {
        const { rpc } = await import('@stellar/stellar-sdk');
        const { SOROBAN_RPC_URL } = await import('../config/stellar');
        const server = new rpc.Server(SOROBAN_RPC_URL);
        
        // In a production app, we would track the last ledger we saw to avoid duplicates.
        // For demonstration, we just fetch recent events.
        const response = await server.getEvents({
          startLedger: 0,
          filters: [
            {
              type: 'contract',
              contractIds: [CREDENTIAL_CONTRACT_ID],
              topics: [['*']],
            },
          ],
          limit: 10,
        });

        if (response && response.events) {
          response.events.forEach((sorobanEvent: any) => {
            const event: ContractEvent = {
              type: 'credential_issued', // Simplified mapping
              credentialId: sorobanEvent.id || `CRED-${Date.now()}`,
              institution: sorobanEvent.contractId,
              timestamp: Date.now(),
              txHash: sorobanEvent.txHash || 'unknown',
            };
            this.notifyListeners(event);
          });
        }
      }
    } catch (error) {
      console.error('Error polling events:', error);
    }

    // Schedule next poll
    this.pollTimer = window.setTimeout(() => this.pollEvents(), this.pollInterval);
  }

  /**
   * Notify all listeners of an event
   */
  private notifyListeners(event: ContractEvent) {
    const callbacks = this.listeners.get(event.type);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error('Error in event callback:', error);
        }
      });
    }
  }
}

// Export singleton instance
export const eventStreamer = new EventStreamer();
