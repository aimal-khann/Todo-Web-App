'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// --- 1. Icons ---
const Icons = {
  Sparkles: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Zap: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Shield: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Layers: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
};

// --- 2. Components ---

const AuroraCard = ({ children, className = "" }: any) => (
  <div className={`relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] border-t-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-[24px] ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
    {children}
  </div>
);

// --- 3. Home Page ---

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen bg-[#020204] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-2000 duration-[12s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-200 mix-blend-overlay"></div>
      </div>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center backdrop-blur-md">
               <Icons.Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="font-bold text-lg tracking-tight">TaskFlow</span>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/login" className="text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">Sign In</Link>
            <Link href="/register" className="bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-white/90 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                v2.0 is now live
              </div>
              
              <h1 className="text-7xl font-extrabold tracking-tighter leading-[1.1] mb-6">
                Organize your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                  life with style.
                </span>
              </h1>
              
              <p className="text-lg text-white/40 leading-relaxed max-w-md mb-8">
                The most beautiful way to manage tasks. Focused, fast, and designed for the modern workflow.
              </p>

              <div>
                {/* View Demo Removed */}
                <Link href="/register" className="group bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] inline-flex items-center gap-2">
                  Start for free <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* 3D Visuals */}
          <div className="relative z-10 h-[500px] hidden lg:flex items-center justify-center perspective-[1000px]">
             {/* Floating Elements controlled by scroll */}
             <motion.div style={{ y: y1 }} className="absolute right-10 top-20 z-20">
                <AuroraCard className="p-4 w-64 rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
                   <div className="flex justify-between items-start mb-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><Icons.Check className="w-4 h-4 text-emerald-400" /></div>
                      <span className="text-[10px] uppercase font-bold text-white/30 bg-white/5 px-2 py-1 rounded">High Priority</span>
                   </div>
                   <h4 className="font-bold text-white">Complete Project</h4>
                   <div className="h-1 w-full bg-white/10 rounded-full mt-3 overflow-hidden">
                      <div className="h-full w-3/4 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                   </div>
                </AuroraCard>
             </motion.div>

             <motion.div style={{ y: y2 }} className="absolute left-10 bottom-20 z-10">
                <AuroraCard className="p-4 w-64 rotate-[6deg] hover:rotate-0 transition-transform duration-500">
                   <div className="flex justify-between items-start mb-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center"><Icons.Zap className="w-4 h-4 text-amber-400" /></div>
                      <span className="text-[10px] uppercase font-bold text-white/30 bg-white/5 px-2 py-1 rounded">Pending</span>
                   </div>
                   <h4 className="font-bold text-white">Design Review</h4>
                   <p className="text-xs text-white/40 mt-1">Tomorrow, 10:00 AM</p>
                </AuroraCard>
             </motion.div>
             
             {/* Central Glow */}
             <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* --- Features Grid (Bento) --- */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Built for <span className="text-indigo-400">Flow</span></h2>
              <p className="text-white/40">Everything you need to stay productive, nothing you don't.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <AuroraCard className="p-8 md:col-span-2 group">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icons.Zap className="w-6 h-6 text-indigo-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Lightning Fast</h3>
                 <p className="text-white/40">
                    Engineered for speed. Tasks load instantly, interactions are fluid, and your data syncs in real-time across all your devices using our Neon DB infrastructure.
                 </p>
              </AuroraCard>

              {/* Feature 2 */}
              <AuroraCard className="p-8 group">
                 <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icons.Shield className="w-6 h-6 text-purple-400" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Secure by Design</h3>
                 <p className="text-white/40 text-sm">
                    Enterprise-grade encryption keeps your data safe.
                 </p>
              </AuroraCard>

              {/* Feature 3 */}
              <AuroraCard className="p-8 group">
                 <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icons.Layers className="w-6 h-6 text-pink-400" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Smart Organization</h3>
                 <p className="text-white/40 text-sm">
                    Tags, priority levels, and smart filters.
                 </p>
              </AuroraCard>

              {/* Feature 4 */}
              <AuroraCard className="p-8 md:col-span-2 group">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icons.Check className="w-6 h-6 text-emerald-400" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">Productivity Analytics</h3>
                 <p className="text-white/40">
                    Visualize your progress with beautiful charts. Track completion rates and see how you improve over time directly from your dashboard.
                 </p>
              </AuroraCard>
           </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-20 px-6 text-center relative z-10">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">Ready to focus?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link href="/login" className="bg-white/10 text-white px-6 py-3.5 rounded-2xl font-bold text-base hover:bg-white/20 transition-all border border-white/20">
                  Sign In
               </Link>
               <Link href="/register" className="bg-white text-black px-6 py-3.5 rounded-2xl font-bold text-base hover:bg-indigo-50 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]">
                  Get Started for Free
               </Link>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/5 py-12 px-6 relative z-10">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
               <Icons.Sparkles className="w-5 h-5" />
               <span className="font-bold">TaskFlow</span>
            </div>
            <p className="text-white/20 text-sm">© 2024 TaskFlow Inc. All rights reserved.</p>
         </div>
      </footer>

    </div>
  );
}