import type { WalletType } from '../hooks/useMultiWallet';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWallet: (wallet: WalletType) => void;
  availableWallets: WalletType[];
}

export function WalletModal({ isOpen, onClose, onSelectWallet, availableWallets }: WalletModalProps) {
  if (!isOpen) return null;

  const walletDetails: Record<WalletType, { name: string; icon: string; link: string; description: string }> = {
    freighter: {
      name: 'Freighter',
      icon: 'account_balance_wallet',
      link: 'https://freighter.app',
      description: 'The official Stellar wallet'
    },
    albedo: {
      name: 'Albedo',
      icon: 'vpn_key',
      link: 'https://albedo.link',
      description: 'Browser-based delegated signer'
    },
    xbull: {
      name: 'xBull',
      icon: 'token',
      link: 'https://xbull.app',
      description: 'Stellar & Soroban wallet'
    }
  };

  const walletOptions: WalletType[] = ['freighter', 'albedo', 'xbull'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest rounded-xl p-md w-full max-w-md shadow-lg border border-outline-variant animate-fade-in relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <h2 className="font-headline-sm text-headline-sm text-primary mb-xs">Connect Wallet</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
          Select a wallet provider to connect to DegreeProof.
        </p>

        <div className="flex flex-col gap-sm">
          {walletOptions.map((wallet) => {
            const isAvailable = availableWallets.includes(wallet);
            const details = walletDetails[wallet];
            
            return (
              <button
                key={wallet}
                onClick={() => isAvailable ? onSelectWallet(wallet) : window.open(details.link, '_blank')}
                className={`flex items-center gap-md p-md rounded-lg border text-left transition-all ${
                  isAvailable 
                    ? 'border-outline-variant hover:border-secondary hover:bg-secondary-container/10 cursor-pointer' 
                    : 'border-surface-variant bg-surface opacity-75 hover:bg-surface-container cursor-pointer'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isAvailable ? 'bg-secondary-container/30 text-secondary' : 'bg-surface-variant text-on-surface-variant'}`}>
                  <span className="material-symbols-outlined">{details.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className={`font-label-md text-label-md ${isAvailable ? 'text-primary' : 'text-on-surface'}`}>
                    {details.name}
                  </h3>
                  <p className="font-body-sm text-sm text-on-surface-variant">{details.description}</p>
                </div>
                {!isAvailable && (
                  <span className="font-label-sm text-xs px-2 py-1 bg-surface-variant rounded-full text-on-surface-variant">
                    Install
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
