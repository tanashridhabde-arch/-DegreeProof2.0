import { useWallet } from '../../hooks/useWallet';
import { truncateAddress } from '../../utils/validation';
import styles from './WalletButton.module.css';

export function WalletButton() {
  const { publicKey, isConnected, isConnecting, isFreighterInstalled, connect, disconnect, error } = useWallet();

  if (!isFreighterInstalled) {
    return (
      <div className={styles.container}>
        <a 
          href="https://freighter.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.installBtn}`}
        >
          Install Freighter
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && <div className={styles.errorMsg}>{error}</div>}
      
      {isConnected ? (
        <div className={styles.connectedWrapper}>
          <div className={styles.badge}>
            <span className={styles.statusDot}></span>
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
        <button 
          onClick={connect} 
          disabled={isConnecting}
          className={`${styles.button} ${styles.connectBtn}`}
        >
          {isConnecting ? (
            <span className={styles.loader}>Connecting...</span>
          ) : (
            'Connect Wallet'
          )}
        </button>
      )}
    </div>
  );
}
