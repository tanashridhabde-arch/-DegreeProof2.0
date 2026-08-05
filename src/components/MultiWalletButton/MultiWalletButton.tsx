import { useState, useRef, useEffect } from 'react';
import { useMultiWallet, type WalletType } from '../../hooks/useMultiWallet';
import { truncateAddress } from '../../utils/validation';
import styles from './MultiWalletButton.module.css';

export function MultiWalletButton() {
  const {
    publicKey,
    isConnected,
    isConnecting,
    availableWallets,
    walletType,
    connect,
    disconnect,
    error,
  } = useMultiWallet();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleConnect = async (wallet: WalletType) => {
    setShowMenu(false);
    await connect(wallet);
  };

  if (availableWallets.length === 0) {
    return (
      <div className={styles.container}>
        <a
          href="https://freighter.app/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.installBtn}`}
        >
          Install Wallet
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container} ref={menuRef}>
      {error && <div className={styles.errorMsg}>{error}</div>}

      {isConnected ? (
        <div className={styles.connectedWrapper}>
          <div className={styles.badge}>
            <span className={styles.statusDot}></span>
            {walletType && (
              <span style={{ textTransform: 'capitalize', marginRight: '0.5rem' }}>
                {walletType}
              </span>
            )}
            {truncateAddress(publicKey, 5, 5)}
          </div>
          <button
            onClick={disconnect}
            className={`${styles.button} ${styles.disconnectBtn}`}
            title="Disconnect"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              if (availableWallets.length === 1) {
                handleConnect(availableWallets[0]);
              } else {
                setShowMenu(!showMenu);
              }
            }}
            disabled={isConnecting}
            className={`${styles.button} ${styles.connectBtn}`}
          >
            {isConnecting ? (
              <span className={styles.loader}>Connecting...</span>
            ) : (
              'Connect Wallet'
            )}
          </button>

          {showMenu && availableWallets.length > 1 && (
            <div className={styles.walletMenu}>
              {availableWallets.includes('freighter') && (
                <button
                  onClick={() => handleConnect('freighter')}
                  className={styles.walletOption}
                  disabled={isConnecting}
                >
                  Freighter
                </button>
              )}
              {availableWallets.includes('albedo') && (
                <button
                  onClick={() => handleConnect('albedo')}
                  className={styles.walletOption}
                  disabled={isConnecting}
                >
                  Albedo
                </button>
              )}
              {availableWallets.includes('xbull') && (
                <button
                  onClick={() => handleConnect('xbull')}
                  className={styles.walletOption}
                  disabled={isConnecting}
                >
                  xBull
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
