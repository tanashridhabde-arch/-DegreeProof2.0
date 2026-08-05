import { useMultiWallet } from '../hooks/useMultiWallet';
import { BalanceWidget } from '../components/BalanceWidget';

export function StudentDashboard() {
  const { publicKey, isConnected } = useMultiWallet();
  return (
    <>
      
{/* TopAppBar */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-xs bg-surface/90 dark:bg-surface/90 backdrop-blur-md border-b border-on-primary-container/10 shadow-sm">
<div className="flex items-center gap-base">
<span className="material-symbols-outlined text-secondary" style={{}} /* TODO: fix style font-variation-settings: 'FILL' 1; */>verified_user</span>
<span className="text-headline-sm font-headline-sm font-bold text-primary">DegreeProof</span>
</div>
<div className="flex items-center gap-md">
<nav className="hidden md:flex items-center gap-lg">
<a className="font-label-md text-label-md text-primary" href="#">Home</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:bg-primary-container/5 px-2 py-1 transition-all" href="#">Credentials</a>
<a className="font-label-md text-label-md text-on-surface-variant hover:bg-primary-container/5 px-2 py-1 transition-all" href="#">Verify</a>
</nav>
<BalanceWidget publicKey={publicKey} isConnected={isConnected} />
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional, clean close-up portrait of a young male professional in a minimalist white studio. Soft, high-key lighting creates a sophisticated corporate aesthetic. The image is crisp and clear, maintaining the light-mode theme of DegreeProof's academic and blockchain environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8iW3rH7WWifr6PrjSVSZNrFnLlsdOakCgcmycVvGcKF5xqPJlJaWk5Ml6H32Bp05d2Xvuc8CsLuxA6YNRxpj3hcDollj0x2_Kc6TNh8N8ldjNt4qQ_ffbr0K7-P5FbsMzXCs_NQanJxPbOBOSuGrotNbPwvtI5E_7AlTh92oT0GHOt2o7y5aoYlC29WvVDi0VhxnOcg06Yo39PoXT2wF6aDj8Hb_fEc1zz2sXTN-WfoDu294utunXE9a3PIo8K21kQYuCMiDrWASm"/>
</div>
</div>
</header>
{/* Main Canvas */}
<main className="max-w-7xl mx-auto pt-24 px-margin-mobile md:px-margin-desktop">
{/* Welcome Section */}
<section className="mb-lg animate-fade-in">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
<div>
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">Welcome back, Alex.</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-xs">Your academic achievements are secured and verified on the blockchain.</p>
</div>
<div className="glass-panel px-md py-sm rounded-xl flex items-center gap-md">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Total Verified</span>
<span className="font-headline-md text-headline-md text-secondary">3</span>
</div>
<div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-3xl">verified</span>
</div>
</div>
</div>
</section>
{/* Credentials Bento Grid */}
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter mb-xl">
{/* Major Credential 1 */}
<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-lg border border-on-primary-container/5 shadow-sm relative overflow-hidden credential-card group">
<div className="absolute top-0 right-0 p-md">
<span className="inline-flex items-center gap-xs px-sm py-xs bg-on-tertiary-container/10 text-on-tertiary-container rounded-full font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm" style={{}} /* TODO: fix style font-variation-settings: 'FILL' 1; */>stars</span>
                        Verified on Stellar
                    </span>
</div>
<div className="flex flex-col h-full justify-between">
<div>
<span className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-xs block">Engineering &amp; Technology</span>
<h2 className="font-headline-md text-headline-md text-primary mb-xs">B.S. in Computer Science</h2>
<p className="font-body-md text-body-md text-on-surface-variant">University of Tech • Class of 2022</p>
</div>
<div className="mt-lg flex flex-wrap gap-md items-center justify-between">
<div className="flex gap-xs">
<span className="px-sm py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm">Software Architecture</span>
<span className="px-sm py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm">Blockchain</span>
</div>
<div className="flex gap-sm">
<button className="bg-primary text-on-primary px-md py-sm rounded-xl font-label-md text-label-md flex items-center gap-xs hover:bg-primary/90 transition-colors">
<span className="material-symbols-outlined text-md">share</span>
                                Share Link
                            </button>
<button className="border border-outline-variant text-primary px-md py-sm rounded-xl font-label-md text-label-md flex items-center gap-xs hover:bg-primary-container/5 transition-colors">
<span className="material-symbols-outlined text-md">qr_code_scanner</span>
                                View QR
                            </button>
</div>
</div>
</div>
</div>
{/* Stats/Status Card */}
<div className="lg:col-span-4 bg-primary-container text-on-primary-container rounded-xl p-lg flex flex-col justify-between">
<div>
<h3 className="font-headline-sm text-headline-sm text-white mb-md">Credential Status</h3>
<div className="space-y-md">
<div className="flex items-center gap-md">
<div className="w-2 h-2 rounded-full bg-tertiary-fixed"></div>
<span className="font-label-md text-label-md text-on-primary-container">Blockchain Confirmed</span>
</div>
<div className="flex items-center gap-md">
<div className="w-2 h-2 rounded-full bg-tertiary-fixed"></div>
<span className="font-label-md text-label-md text-on-primary-container">Institution Authenticated</span>
</div>
<div className="flex items-center gap-md">
<div className="w-2 h-2 rounded-full bg-tertiary-fixed"></div>
<span className="font-label-md text-label-md text-on-primary-container">Encryption Active</span>
</div>
</div>
</div>
<div className="mt-lg pt-lg border-t border-on-primary-fixed-variant/30">
<p className="font-label-sm text-label-sm opacity-70">Secured by decentralized ledger technology</p>
</div>
</div>
{/* Major Credential 2 */}
<div className="lg:col-span-12 bg-surface-container-lowest rounded-xl p-lg border border-on-primary-container/5 shadow-sm relative overflow-hidden credential-card group">
<div className="flex flex-col md:flex-row gap-lg">
<div className="md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A minimalist architectural photograph of a modern design institute building. Features clean lines, glass facades, and a bright, airy aesthetic. The photography is high-contrast and professional, with a cool blue and crisp white palette that matches the DegreeProof institutional branding." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBuZk6sVvU8FKAObIk0pBPrA_LWKr4WknJWIdKFfJQ-2jMJ7p4AXCSRdUh9pVb_vL9F91E5njwjGXL9VpvXR0Y92MwagQ0Ffoa3BoQFYHPriHCF3bbgeGN0jY9lDRUK5d36D9uGCkncgy4dn-68oTw01-nab_XnUPoD0NpXtTzfUuMhp1YCmZlawFYxibvtBHMf8k7td3QAWwF4EGk0y6L_jLPFbuUQFe69lDb-rWOXhjDlvr3zYfPQsI8pFjbhGqAmlT1qrMxXDVo"/>
</div>
<div className="md:w-2/3 flex flex-col justify-between">
<div>
<div className="flex justify-between items-start">
<div>
<span className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-xs block">Arts &amp; Multimedia</span>
<h2 className="font-headline-md text-headline-md text-primary mb-xs">M.A. in Digital Design</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Creative Arts Institute • Class of 2024</p>
</div>
<span className="inline-flex items-center gap-xs px-sm py-xs bg-on-tertiary-container/10 text-on-tertiary-container rounded-full font-label-sm text-label-sm">
<span className="material-symbols-outlined text-sm" style={{}} /* TODO: fix style font-variation-settings: 'FILL' 1; */>stars</span>
                                    Verified on Stellar
                                </span>
</div>
</div>
<div className="mt-lg flex flex-wrap gap-md items-center justify-between">
<div className="flex gap-xs">
<span className="px-sm py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm">Visual Identity</span>
<span className="px-sm py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm">UX Research</span>
</div>
<div className="flex gap-sm">
<button className="bg-primary text-on-primary px-md py-sm rounded-xl font-label-md text-label-md flex items-center gap-xs hover:bg-primary/90 transition-colors">
<span className="material-symbols-outlined text-md">share</span>
                                    Share Link
                                </button>
<button className="border border-outline-variant text-primary px-md py-sm rounded-xl font-label-md text-label-md flex items-center gap-xs hover:bg-primary-container/5 transition-colors">
<span className="material-symbols-outlined text-md">qr_code_scanner</span>
                                    View QR
                                </button>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Verification Timeline (Institutional Authority) */}
<section className="mb-xl">
<h3 className="font-headline-sm text-headline-sm text-primary mb-lg">Verification Path</h3>
<div className="relative">
<div className="absolute left-6 top-0 bottom-0 w-0.5 bg-secondary/20"></div>
<div className="space-y-lg">
<div className="relative pl-16">
<div className="absolute left-3 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white z-10">
<span className="material-symbols-outlined text-xs">school</span>
</div>
<h4 className="font-headline-sm text-[18px] text-primary">University Issuance</h4>
<p className="font-body-md text-body-md text-on-surface-variant">The degree was officially issued and signed by the registrar's digital key.</p>
</div>
<div className="relative pl-16">
<div className="absolute left-3 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white z-10">
<span className="material-symbols-outlined text-xs">hub</span>
</div>
<h4 className="font-headline-sm text-[18px] text-primary">Blockchain Hashing</h4>
<p className="font-body-md text-body-md text-on-surface-variant">A unique cryptographic fingerprint (SHA-256) was created and anchored to the ledger.</p>
</div>
<div className="relative pl-16">
<div className="absolute left-3 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white z-10">
<span className="material-symbols-outlined text-xs">check_circle</span>
</div>
<h4 className="font-headline-sm text-[18px] text-primary">Live Verification</h4>
<p className="font-body-md text-body-md text-on-surface-variant">DegreeProof maintains real-time consensus with the Stellar network nodes.</p>
</div>
</div>
</div>
</section>
</main>
{/* BottomNavBar */}
<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe pt-2 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border-t border-on-primary-container/10 shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-fixed text-on-secondary-container dark:text-on-secondary-fixed rounded-full px-4 py-1 scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-label-sm-mobile">Home</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-sm text-label-sm-mobile">Credentials</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">qr_code_scanner</span>
<span className="font-label-sm text-label-sm-mobile">Verify</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:text-secondary scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm-mobile">Profile</span>
</a>
</nav>
{/* FAB (Contextual for Dashboard) */}
<button className="fixed bottom-24 right-margin-mobile md:bottom-12 md:right-margin-desktop bg-primary text-on-primary p-4 rounded-full shadow-lg flex items-center gap-sm group hover:pr-6 transition-all duration-300">
<span className="material-symbols-outlined">add</span>
<span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-label-md text-label-md whitespace-nowrap">Add Credential</span>
</button>


    </>
  );
}
