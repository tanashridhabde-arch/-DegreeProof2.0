
export function VerifierTool() {
  return (
    <>
      
{/* TopAppBar */}
<header className="fixed top-0 left-0 w-full z-50 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border-b border-on-primary-container/10 shadow-sm">
<div className="max-w-7xl mx-auto flex justify-between items-center px-margin-mobile md:px-margin-desktop py-sm">
<div className="flex items-center gap-base">
<span className="material-symbols-outlined text-secondary text-headline-sm" data-icon="verified_user">verified_user</span>
<span className="text-headline-sm font-headline-sm font-bold text-primary">DegreeProof</span>
</div>
{/* Desktop Nav Cluster */}
<nav className="hidden md:flex items-center gap-lg">
<a className="text-on-surface-variant font-label-md text-label-md hover:bg-primary-container/5 px-4 py-2 transition-all" href="#">Home</a>
<a className="text-on-surface-variant font-label-md text-label-md hover:bg-primary-container/5 px-4 py-2 transition-all" href="#">Credentials</a>
<a className="text-primary font-label-md text-label-md hover:bg-primary-container/5 px-4 py-2 transition-all font-bold" href="#">Verify</a>
<a className="text-on-surface-variant font-label-md text-label-md hover:bg-primary-container/5 px-4 py-2 transition-all" href="#">Profile</a>
</nav>
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A clean, professional headshot of a female admissions officer in her late 30s, wearing a neutral business casual blazer. The background is a soft-focus academic office with books and a window. The image has a crisp, high-contrast corporate aesthetic with cool daylight lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBghqwDdseW8pSJ7eBcEekJ1OI-kiVYKles984SnXxy4PjJj5gj1oG96elwI6kC2dhAmxOvLstTPPl1uGIcE-6Fx_b87axJFNC54cBCMd0LLfRkrZDDZLmuuZCt-4zAvwen3pcRZzNdcoSTdlvgBvwh8Oyd67F1Qh0tUKvKHfXfegyPE99Ftzw5HaWYOgHN88RgSd2lSFSpZMMjZGnRhq7jiv58wOrkcVUZa6pCufl1JjLnTme4dvPinZkFedNWDcho_jKc9i1jAVX"/>
</div>
</div>
</header>
<main className="pt-32 px-margin-mobile max-w-5xl mx-auto">
{/* Hero Section */}
<section className="mb-xl text-center">
<h1 className="font-display-lg text-display-lg mb-base text-primary">Verify a Credential</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Instantly validate academic credentials using decentralized ledger technology. Scan a physical certificate or enter a unique verification hash.
            </p>
</section>
{/* Main Verifier Interface */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
{/* Input Controls (Bento Style) */}
<div className="lg:col-span-5 space-y-gutter">
{/* Scan QR Code */}
<button className="glass-card w-full group p-lg rounded-xl flex flex-col items-center justify-center text-center transition-all hover:shadow-lg hover:-translate-y-1">
<div className="w-16 h-16 rounded-full bg-secondary-container/10 flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-secondary text-4xl" data-icon="qr_code_scanner">qr_code_scanner</span>
</div>
<span className="font-headline-sm text-headline-sm text-primary mb-xs">Scan QR Code</span>
<span className="font-body-md text-body-md text-on-surface-variant">Use your device camera to scan a certificate QR code.</span>
</button>
{/* Enter Hash */}
<div className="glass-card p-lg rounded-xl">
<div className="flex items-center gap-base mb-md">
<span className="material-symbols-outlined text-secondary" data-icon="key">key</span>
<h2 className="font-headline-sm text-headline-sm text-primary">Verification Hash</h2>
</div>
<div className="relative">
<input className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-label-md text-label-md focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none" placeholder="Enter 64-character hash..." type="text"/>
<button className="mt-md w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-xl font-bold flex items-center justify-center gap-sm hover:bg-primary-container transition-colors">
                            Verify Now
                            <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</div>
{/* Result Section (Empty State) */}
<div className="lg:col-span-7">
<div className="glass-card h-full min-h-[400px] rounded-xl flex flex-col items-center justify-center p-xl border-dashed border-2 border-outline-variant/30">
<div className="relative mb-lg">
<div className="absolute inset-0 bg-secondary/5 blur-3xl rounded-full"></div>
<span className="material-symbols-outlined text-outline-variant text-6xl relative z-10" data-icon="manage_search">manage_search</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-sm">Ready to verify</h3>
<p className="font-body-md text-body-md text-on-surface-variant text-center max-w-xs">
                        Enter a hash or scan to begin the institutional verification process.
                    </p>
</div>
</div>
</div>
{/* Verification Path Visualization */}
<section className="mt-xl glass-card p-xl rounded-xl">
<h3 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-lg text-center">Verification Path</h3>
<div className="relative flex flex-col md:flex-row items-center justify-between gap-xl">
{/* Connector Line (Desktop) */}
<div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] verification-path-line -translate-y-1/2 -z-10 opacity-30"></div>
{/* Step 1 */}
<div className="flex flex-col items-center text-center max-w-[200px]">
<div className="w-14 h-14 rounded-full bg-surface-container-highest border-2 border-secondary flex items-center justify-center mb-md z-10">
<span className="material-symbols-outlined text-secondary" data-icon="school">school</span>
</div>
<h4 className="font-label-md text-label-md text-primary font-bold">University Issuance</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Digital record signed by registrar</p>
</div>
{/* Step 2 */}
<div className="flex flex-col items-center text-center max-w-[200px]">
<div className="w-14 h-14 rounded-full bg-surface-container-highest border-2 border-secondary flex items-center justify-center mb-md z-10">
<span className="material-symbols-outlined text-secondary" data-icon="hub">hub</span>
</div>
<h4 className="font-label-md text-label-md text-primary font-bold">Blockchain Hashing</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Immutable cryptographic proof</p>
</div>
{/* Step 3 */}
<div className="flex flex-col items-center text-center max-w-[200px]">
<div className="w-14 h-14 rounded-full bg-secondary text-on-secondary flex items-center justify-center mb-md z-10 shadow-lg">
<span className="material-symbols-outlined" data-icon="check_circle">check_circle</span>
</div>
<h4 className="font-label-md text-label-md text-secondary font-bold">Live Verification</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Real-time status confirmation</p>
</div>
</div>
</section>
{/* Informational Banner */}
<div className="mt-lg grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="p-lg bg-secondary-container/10 rounded-xl border border-secondary/10 flex gap-md">
<span className="material-symbols-outlined text-secondary" data-icon="security">security</span>
<div>
<h4 className="font-label-md text-label-md text-primary font-bold mb-xs">Privacy First</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant">We only store hashes. Personal identity remains private until shared by the owner.</p>
</div>
</div>
<div className="p-lg bg-tertiary-fixed-dim/10 rounded-xl border border-on-tertiary-container/10 flex gap-md">
<span className="material-symbols-outlined text-on-tertiary-container" data-icon="flash_on">flash_on</span>
<div>
<h4 className="font-label-md text-label-md text-primary font-bold mb-xs">Instant Results</h4>
<p className="font-label-sm text-label-sm text-on-surface-variant">Validation happens in under 2 seconds via the high-speed distributed ledger.</p>
</div>
</div>
</div>
</main>
{/* BottomNavBar (Mobile Only) */}
<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe pt-2 bg-surface/90 backdrop-blur-md border-t border-on-primary-container/10 shadow-lg rounded-t-xl">
<button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-sm text-label-sm">Home</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined" data-icon="school">school</span>
<span className="font-label-sm text-label-sm">Credentials</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined" data-icon="qr_code_scanner" style={{}} /* TODO: fix style font-variation-settings: 'FILL' 1; */>qr_code_scanner</span>
<span className="font-label-sm text-label-sm">Verify</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-sm text-label-sm">Profile</span>
</button>
</nav>


    </>
  );
}
