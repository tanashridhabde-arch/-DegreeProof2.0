import { useState } from 'react';
import { getCredential, type Credential } from '../lib/contracts';
import { Link } from 'react-router-dom';

export function VerificationSearch() {
  const [credentialId, setCredentialId] = useState('');
  const [status, setStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [credential, setCredential] = useState<Credential | null>(null);

  const handleVerify = async () => {
    if (!credentialId) return;
    setError(null);
    setCredential(null);
    
    try {
      setStatus('fetching');
      const cred = await getCredential(credentialId);
      setCredential(cred);
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'Verification failed or credential not found.');
      setStatus('error');
    }
  };

  return (
    <>
      
{/* TopAppBar */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile py-xs max-w-7xl mx-auto bg-surface/90 dark:bg-surface/90 backdrop-blur-md border-b border-on-primary-container/10 shadow-sm">
<div className="flex items-center gap-base">
<span className="material-symbols-outlined text-secondary dark:text-secondary-fixed-dim" data-icon="verified_user">verified_user</span>
<h1 className="text-headline-sm font-headline-sm font-bold text-primary dark:text-on-primary-fixed">DegreeProof</h1>
</div>
<div className="hidden md:flex items-center gap-lg">
<Link className="text-on-surface-variant dark:text-outline font-label-md text-label-md hover:bg-primary-container/5 transition-all" to="/">Home</Link>
<Link className="text-on-surface-variant dark:text-outline font-label-md text-label-md hover:bg-primary-container/5 transition-all" to="/issuer">Credentials</Link>
<Link className="text-primary dark:text-primary-fixed font-label-md text-label-md hover:bg-primary-container/5 transition-all" to="/search">Verify</Link>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A professional user profile avatar for a security-focused academic verification platform. The lighting is crisp and modern, matching a dark-themed corporate aesthetic with deep blues and subtle neon highlights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBe9gfhw8NjS8sI0dDZKhr5Rpn8HzVZD8Uyla_NfWM8vpT57l5KrJ4wFULT9Xxzcnnzsm6fQPy9UJbX2IfW_buCP0JGaZZ2vAtMZ-sGhMGaHyxPgc6MUkSwc2lBAgnR5Z4EZqfaVKpO6jNLy2UXjtVLkE4Hp6R8yPH7sIOkQUM-7mBwQv1nAB49aYAt4HgPm9LpExdUwv5lHbfJbArYeckF-qRoq0_pRR8JUKS45oR5AgYD0uZCPWYJcaQyf7FklVFwLdT1YTv5uL7"/>
</div>
</header>
{/* Main Content Canvas */}
<main className="flex-grow flex flex-col items-center justify-center relative pt-24 pb-32 px-margin-mobile">
{/* Background Animation/Decoration */}
<div className="absolute inset-0 geometric-grid -z-10"></div>
<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10"></div>
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary-fixed-dim/5 rounded-full blur-[120px] -z-10"></div>
{/* Verification Search Card */}
<section className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
<div className="glass-card rounded-xl p-8 md:p-12 space-y-8">
<div className="text-center space-y-xs">
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-tertiary leading-tight">Verify Academic Authenticity</h2>
<p className="text-on-surface-variant dark:text-outline font-body-lg text-body-lg">Immutable ledger verification for institutional degrees.</p>
</div>
{/* Input Field Group */}
<div className="space-y-md">
<div className="relative group">
<span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="search">search</span>
<input className="w-full bg-white/5 border border-white/10 rounded-lg py-5 pl-12 pr-4 font-label-md text-label-md text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all placeholder:text-outline/60" placeholder="Enter Credential ID..." type="text" value={credentialId} onChange={e => setCredentialId(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleVerify()}/>
</div>
{error && <div className="p-3 bg-error-container text-on-error-container rounded-lg">{error}</div>}
{status === 'success' && credential && (
  <div className="p-4 bg-tertiary-container text-on-tertiary-container rounded-lg text-left">
    <div className="flex items-center gap-2 mb-2"><span className="material-symbols-outlined">check_circle</span><strong>Verified Credential</strong></div>
    <p><strong>Student:</strong> {credential.studentName}</p>
    <p><strong>Degree:</strong> {credential.degreeTitle}</p>
    <p><strong>Year:</strong> {credential.graduationYear}</p>
    <p><strong>Issuer:</strong> {credential.institution}</p>
  </div>
)}
<button className="w-full bg-secondary hover:bg-secondary/90 text-white font-headline-sm text-headline-sm py-4 rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-secondary/20" onClick={handleVerify} disabled={status === 'fetching'}>
{status === 'fetching' ? 'Verifying on Ledger...' : 'Verify Credential'}
</button>
</div>
<div className="flex items-center gap-base">
<div className="h-px flex-grow bg-white/10"></div>
<span className="text-label-sm font-label-sm text-outline uppercase tracking-widest">or</span>
<div className="h-px flex-grow bg-white/10"></div>
</div>
{/* QR Scan Action */}
<div className="flex justify-center">
<button className="group flex items-center gap-sm px-8 py-3 bg-white/5 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all">
<span className="material-symbols-outlined text-white" data-icon="qr_code_scanner">qr_code_scanner</span>
<span className="font-label-md text-label-md text-white">Scan QR Code</span>
</button>
</div>
</div>
{/* Info Section: How to find ID */}
<div className="mt-lg md:mt-xl space-y-md">
<h3 className="font-headline-sm text-headline-sm text-center text-white/90">How to find your ID</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-md">
{/* Step 1 */}
<div className="glass-card rounded-xl p-6 flex gap-md items-start group hover:bg-white/5 transition-colors">
<div className="bg-secondary/20 p-3 rounded-lg text-secondary">
<span className="material-symbols-outlined" data-icon="description">description</span>
</div>
<div className="space-y-xs">
<h4 className="font-label-md text-label-md text-white">Degree Document</h4>
<p className="text-label-sm font-label-sm text-outline">Check the bottom footer of your issued digital PDF for a 64-character alphanumeric hash.</p>
</div>
</div>
{/* Step 2 */}
<div className="glass-card rounded-xl p-6 flex gap-md items-start group hover:bg-white/5 transition-colors">
<div className="bg-tertiary-fixed-dim/20 p-3 rounded-lg text-tertiary-fixed-dim">
<span className="material-symbols-outlined" data-icon="link">link</span>
</div>
<div className="space-y-xs">
<h4 className="font-label-md text-label-md text-white">Blockchain Explorer</h4>
<p className="text-label-sm font-label-sm text-outline">Search the Stellar network ledger using the transaction hash provided in your issuance email.</p>
</div>
</div>
</div>
</div>
</section>
{/* Aesthetic Verification Visualization (Hidden on small screens) */}
<div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-64 space-y-4 opacity-40">
<div className="glass-card p-4 rounded-lg border-l-4 border-tertiary-container">
<div className="flex justify-between mb-2">
<span className="text-[10px] text-outline font-label-sm">BLOCK_HEIGHT</span>
<span className="text-[10px] text-tertiary-container font-label-sm">VERIFIED</span>
</div>
<div className="h-1 bg-white/10 rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container w-full animate-pulse"></div>
</div>
</div>
<div className="glass-card p-4 rounded-lg border-l-4 border-secondary">
<div className="flex justify-between mb-2">
<span className="text-[10px] text-outline font-label-sm">NODE_STATUS</span>
<span className="text-[10px] text-secondary font-label-sm">SYNCED</span>
</div>
<div className="h-1 bg-white/10 rounded-full overflow-hidden">
<div className="h-full bg-secondary w-3/4"></div>
</div>
</div>
</div>
</main>
{/* BottomNavBar */}
<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe pt-2 bg-surface/90 dark:bg-surface/90 backdrop-blur-md rounded-t-xl border-t border-on-primary-container/10 shadow-lg md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary dark:hover:text-secondary-fixed-dim transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-sm text-label-sm-mobile">Home</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary dark:hover:text-secondary-fixed-dim transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="school">school</span>
<span className="font-label-sm text-label-sm-mobile">Credentials</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-fixed text-on-secondary-container dark:text-on-secondary-fixed rounded-full px-4 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="qr_code_scanner">qr_code_scanner</span>
<span className="font-label-sm text-label-sm-mobile">Verify</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary dark:hover:text-secondary-fixed-dim transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-sm text-label-sm-mobile">Profile</span>
</a>
</nav>


    </>
  );
}
