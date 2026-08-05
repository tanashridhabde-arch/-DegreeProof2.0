import { useState } from 'react';
import { useMultiWallet, WalletType } from '../hooks/useMultiWallet';
import { WalletModal } from '../components/WalletModal';
import { BalanceWidget } from '../components/BalanceWidget';
import { issueCredential } from '../lib/contracts';
import { toUserMessage } from '../utils/errors';
import { Link } from 'react-router-dom';

export function IssuerPortal() {
  const { publicKey, isConnected, connect, availableWallets } = useMultiWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentialId, setCredentialId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [degreeName, setDegreeName] = useState('');
  const [graduationYear, setGraduationYear] = useState('2024');
  const [status, setStatus] = useState<'idle' | 'issuing' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      setError('Please connect your wallet first.');
      return;
    }
    if (!publicKey) return;

    setError(null);
    const year = parseInt(graduationYear);
    if (isNaN(year) || year < 1900 || year > 2100) {
      setError('Please enter a valid graduation year.');
      return;
    }

    try {
      setStatus('issuing');
      // Pass studentName if added, else just a placeholder like "Student"
      await issueCredential(publicKey, credentialId, studentName || "Student", degreeName, year);
      setStatus('success');
      setCredentialId('');
      setStudentName('');
      setDegreeName('');
    } catch (err) {
      setError(toUserMessage(err));
      setStatus('idle');
    }
  };

  return (
    <>
      
{/* TopAppBar */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-xs max-w-7xl mx-auto bg-surface/90 dark:bg-surface/90 backdrop-blur-md border-b border-on-primary-container/10 shadow-sm">
<div className="flex items-center gap-base">
<span className="material-symbols-outlined text-secondary dark:text-secondary-fixed-dim" data-icon="verified_user">verified_user</span>
<span className="text-headline-sm font-headline-sm font-bold text-primary dark:text-on-primary-fixed">DegreeProof</span>
</div>
<nav className="hidden md:flex gap-lg items-center">
<Link className="text-primary dark:text-primary-fixed font-label-md text-label-md hover:bg-primary-container/5 px-3 py-2 transition-all" to="/">Home</Link>
<Link className="text-on-surface-variant dark:text-outline font-label-md text-label-md hover:bg-primary-container/5 px-3 py-2 transition-all" to="/issuer">Credentials</Link>
<Link className="text-on-surface-variant dark:text-outline font-label-md text-label-md hover:bg-primary-container/5 px-3 py-2 transition-all" to="/verifier">Verify</Link>
</nav>
<div className="flex items-center gap-base">
{!isConnected ? (
  <button onClick={() => setIsModalOpen(true)} className="bg-secondary text-white px-4 py-2 rounded-lg font-label-md">Connect Wallet</button>
) : (
  <div className="flex items-center gap-sm">
    <BalanceWidget publicKey={publicKey} isConnected={isConnected} />
    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant" title={publicKey || ''}>
      <img className="w-full h-full object-cover" data-alt="A professional headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaKLTwEQRvsCQcIKQ-51LiZ8SGCYr9cJL5_TPuIZhdtoy8p9tTVD23kcCkX6nh1D9VPkCNOR6yIEMHrRMzmtvmcErcLNQYL9-SGMXRa9EjjW5t8haVmz69mcLm2FpfARC0f9a_MwNPjC9vjefLlJTxETSRKmhgPRt-AmZj4XA294XnQT00z55K8hSau6VwMc4I_rNuNv8iI4iGzEA9v12F-ONbq_fA9hlUldIDnHW-ZycARPUQDnNDyBdUpZ3hjPx_jnHD9fx9-T90"/>
    </div>
  </div>
)}
</div>
</header>
{/* Main Content Canvas */}
<main className="max-w-7xl mx-auto pt-xl px-margin-mobile md:px-margin-desktop">
{/* Hero Section / Header */}
<section className="py-lg">
<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-xs">Issue New Credential</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Securely anchor academic achievements to the Stellar blockchain. Ensure lifelong portability and instant verification for your graduates.</p>
</section>
{/* Bento Grid Layout */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/* Form Section (Larger Column) */}
<div className="lg:col-span-7 glass-panel rounded-xl p-lg shadow-sm">
<div className="flex items-center gap-base mb-lg">
<span className="material-symbols-outlined text-secondary" data-icon="edit_note">edit_note</span>
<h2 className="font-headline-sm text-headline-sm">Credential Details</h2>
</div>
{error && <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-lg">{error}</div>}
{status === 'success' && <div className="mb-4 p-3 bg-tertiary-container text-on-tertiary-container rounded-lg">Successfully issued credential!</div>}
<form className="space-y-md" onSubmit={handleIssue}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-md">
<div className="space-y-xs">
<label className="font-label-md text-label-md text-on-surface-variant block">STUDENT ID</label>
<input className="w-full bg-surface-container-lowest border-outline-variant focus:border-secondary focus:ring-0 rounded-lg p-base font-label-md transition-all" placeholder="e.g. STU-2024-001" type="text" value={credentialId} onChange={e => setCredentialId(e.target.value)} required/>
</div>
<div className="space-y-xs">
<label className="font-label-md text-label-md text-on-surface-variant block">GRADUATION YEAR</label>
<select className="w-full bg-surface-container-lowest border-outline-variant focus:border-secondary focus:ring-0 rounded-lg p-base font-label-md transition-all" value={graduationYear} onChange={e => setGraduationYear(e.target.value)}>
<option value="2024">2024</option>
<option value="2023">2023</option>
<option value="2022">2022</option>
</select>
</div>
</div>
<div className="space-y-xs">
<label className="font-label-md text-label-md text-on-surface-variant block">DEGREE NAME</label>
<input className="w-full bg-surface-container-lowest border-outline-variant focus:border-secondary focus:ring-0 rounded-lg p-base font-label-md transition-all" placeholder="Bachelor of Science in Computer Science" type="text" value={degreeName} onChange={e => setDegreeName(e.target.value)} required/>
</div>
<div className="space-y-xs">
<label className="font-label-md text-label-md text-on-surface-variant block">STUDENT NAME (OPTIONAL)</label>
<input className="w-full bg-surface-container-lowest border-outline-variant focus:border-secondary focus:ring-0 rounded-lg p-base font-label-md transition-all" placeholder="John Doe" type="text" value={studentName} onChange={e => setStudentName(e.target.value)} />
</div>
<div className="pt-md">
<button className="w-full bg-primary text-on-primary font-headline-sm text-headline-sm py-md rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-base shadow-lg active:scale-[0.98]" type="submit" disabled={status === 'issuing' || !isConnected}>
<span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
{status === 'issuing' ? 'Minting...' : 'Mint on Stellar'}
</button>
</div>
</form>
</div>
{/* Side Visual/Info Panel */}
<div className="lg:col-span-5 flex flex-col gap-gutter">
{/* Institutional Branding Card */}
<div className="relative h-48 rounded-xl overflow-hidden group shadow-sm">
<div className="absolute inset-0 z-10 bg-gradient-to-t from-primary/80 to-transparent"></div>
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="A grand, neoclassical university library hall with soaring ceilings, rows of mahogany tables, and warm, atmospheric lighting. The image captures the weight of institutional tradition and academic excellence. The color palette is composed of rich wood tones, deep navy blues, and pristine whites, aligning perfectly with the modern corporate academic branding." style={{}} /* TODO: fix style background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAg4E_aGDPxW2ziSvzFamYcvpdA6El45g0mQyz2TCt6PuWSvqPeKhwFeZ2M5wApkT_YarZs6Vfba53Iw2_4ocQ8MBZ21tmzQt2wi40ygpsOP2EaT9bIavaMIvC3VJasBBvXbxIzy-WH4f5OF6Fy-NzimeO-rHT2_i4dw-kTJi5LAqbvpPlSRGY5Qaewcm0BBOZYnBrS4_U7Z6DAhNOoWuK6JETaLHxoOiwzhak4Legc5qcSWvvZLcG6svHox5nJxbWkARiPbAoUpUH5') */></div>
<div className="absolute bottom-base left-base z-20 flex items-center gap-sm">
<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-secondary" data-icon="account_balance">account_balance</span>
</div>
<div>
<p className="text-white font-headline-sm text-label-md leading-tight">Global Institute of Technology</p>
<p className="text-white/70 font-label-sm text-label-sm">Authorized Issuer Portal</p>
</div>
</div>
</div>
{/* Status Tracker Panel */}
<div className="glass-panel rounded-xl p-md flex-1 shadow-sm">
<div className="flex items-center justify-between mb-md">
<h3 className="font-headline-sm text-label-md font-bold uppercase tracking-wider text-on-surface-variant">Status Tracker</h3>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="sync">sync</span>
</div>
<div className="space-y-sm">
{/* Item 1 */}
<div className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-container" data-icon="check_circle">check_circle</span>
</div>
<div>
<p className="font-label-md text-label-md">ID: STU-2024-982</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">B.S. Mathematics</p>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-on-tertiary-container text-white font-label-sm text-[10px] uppercase tracking-tighter">Anchored</span>
</div>
{/* Item 2 */}
<div className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-secondary-container/20 flex items-center justify-center animate-pulse">
<span className="material-symbols-outlined text-secondary" data-icon="pending">pending</span>
</div>
<div>
<p className="font-label-md text-label-md">ID: STU-2024-771</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">M.A. Economics</p>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] uppercase tracking-tighter">Pending</span>
</div>
{/* Item 3 */}
<div className="flex items-center justify-between p-sm rounded-lg bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container-high transition-colors opacity-80">
<div className="flex items-center gap-sm">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-container" data-icon="check_circle">check_circle</span>
</div>
<div>
<p className="font-label-md text-label-md">ID: STU-2024-550</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">PhD Physics</p>
</div>
</div>
<span className="px-2 py-0.5 rounded-full bg-on-tertiary-container text-white font-label-sm text-[10px] uppercase tracking-tighter">Anchored</span>
</div>
</div>
<button className="w-full mt-md text-secondary font-label-md text-label-md flex items-center justify-center gap-xs hover:underline">
                        View Full Ledger <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</div>
{/* Verification Timeline (Institutional Path) */}
<section className="mt-xl py-lg border-t border-outline-variant/30">
<h3 className="font-headline-sm text-headline-sm mb-lg">Verification Path</h3>
<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-lg relative">
{/* Path Line (Desktop Only) */}
<div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-secondary-container/30 -z-10"></div>
{/* Step 1 */}
<div className="flex flex-col items-center text-center gap-sm bg-background p-base z-10">
<div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined" data-icon="domain">domain</span>
</div>
<div>
<p className="font-label-md text-label-md font-bold">Issuer Validation</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Identity verified via DIDs</p>
</div>
</div>
{/* Step 2 */}
<div className="flex flex-col items-center text-center gap-sm bg-background p-base z-10">
<div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined" data-icon="token">token</span>
</div>
<div>
<p className="font-label-md text-label-md font-bold">Blockchain Minting</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Immutable record on Stellar</p>
</div>
</div>
{/* Step 3 */}
<div className="flex flex-col items-center text-center gap-sm bg-background p-base z-10">
<div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined" data-icon="qr_code_2">qr_code_2</span>
</div>
<div>
<p className="font-label-md text-label-md font-bold">Access Granted</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Ready for student sharing</p>
</div>
</div>
</div>
</section>
</main>
{/* BottomNavBar */}
<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe pt-2 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border-t border-on-primary-container/10 shadow-lg rounded-t-xl">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary dark:hover:text-secondary-fixed-dim scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-sm text-label-sm">Home</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-fixed text-on-secondary-container dark:text-on-secondary-fixed rounded-full px-4 py-1 scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined" data-icon="school">school</span>
<span className="font-label-sm text-label-sm">Credentials</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary dark:hover:text-secondary-fixed-dim scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined" data-icon="qr_code_scanner">qr_code_scanner</span>
<span className="font-label-sm text-label-sm">Verify</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary dark:hover:text-secondary-fixed-dim scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-sm text-label-sm">Profile</span>
</div>
</nav>

      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelectWallet={async (wallet: WalletType) => {
          await connect(wallet);
          setIsModalOpen(false);
        }}
        availableWallets={availableWallets}
      />
    </>
  );
}
