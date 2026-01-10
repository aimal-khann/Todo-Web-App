'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTaskStore } from '@/store/useTaskStore';
import { apiClient } from '@/lib/api-client';

// --- 1. Icons (Matching Dashboard Style) ---
const Icons = {
  User: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Mail: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Lock: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  ArrowRight: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  ),
  Sparkles: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
};

// --- 2. Shared Dashboard Components ---

// Exact "AuroraCard" from your dashboard code to ensure a match
const AuroraCard = ({ children, className = "" }: any) => (
  <div className={`relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] border-t-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-[24px] ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
    {children}
  </div>
);

// Input styled exactly like the Dashboard "Search" bar
const DashboardInput = ({ icon: Icon, ...props }: any) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-indigo-400 transition-colors">
      <Icon className="w-5 h-5" />
    </div>
    <input 
      {...props}
      className="w-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl py-3.5 pl-12 pr-6 text-sm text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.08] focus:border-indigo-500/50 transition-all shadow-xl"
    />
  </div>
);

// --- 3. Main Page ---

export default function RegisterPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');
  const { fetchCurrentUser } = useTaskStore();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setStatus('loading');

    try {
        // First register the user
        await apiClient.register(formData.email, formData.password, formData.name);
        // Then log the user in to get the token
        const loginResponse = await apiClient.loginTyped(formData.email, formData.password);
        localStorage.setItem('access_token', loginResponse.data.access_token);
        await fetchCurrentUser();
        setStatus('success');
        setTimeout(() => { router.push('/dashboard'); }, 1500);
    } catch (err: any) {
        setStatus('idle');
        if (err.response?.data?.detail) setError(err.response.data.detail);
        else setError('Failed to register. Email may already be in use.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#020204] text-white font-sans selection:bg-indigo-500/30 flex overflow-hidden">
      
      {/* --- Exact Dashboard Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-2000 duration-[12s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-200 mix-blend-overlay"></div>
      </div>

      {/* --- Left Panel: Branding (Hidden on Mobile) --- */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center p-12 z-10">
         <div className="max-w-lg">
            <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.8 }}
            >
               <h1 className="text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-4">
                  Welcome<span className="text-indigo-500">.</span>
               </h1>
               <p className="text-white/40 text-xl font-medium leading-relaxed">
                  Your productivity journey starts here. <br />
                  <span className="text-indigo-400">Organize</span> your life with style.
               </p>
            </motion.div>
         </div>
      </div>

      {/* --- Right Panel: Form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[420px]"
         >
            <AuroraCard className="p-8 md:p-10">
                <div className="text-center mb-8">
                   <h2 className="text-2xl font-bold text-white">Create Account</h2>
                   <p className="text-white/40 text-sm mt-1">Join us to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                   <DashboardInput 
                      icon={Icons.User} 
                      name="name" 
                      placeholder="Full Name" 
                      type="text" 
                      value={formData.name} 
                      onChange={handleChange} 
                   />
                   <DashboardInput 
                      icon={Icons.Mail} 
                      name="email" 
                      placeholder="Email Address" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                   />
                   
                   {/* Grid layout for passwords */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DashboardInput 
                           icon={Icons.Lock} 
                           name="password" 
                           placeholder="Password" 
                           type="password" 
                           value={formData.password} 
                           onChange={handleChange} 
                        />
                        <DashboardInput 
                           icon={Icons.Lock} 
                           name="confirmPassword" 
                           placeholder="Confirm" 
                           type="password" 
                           value={formData.confirmPassword} 
                           onChange={handleChange} 
                        />
                   </div>

                   <AnimatePresence>
                      {error && (
                         <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center font-bold uppercase tracking-wide">
                               {error}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>

                   <div className="pt-4">
                      <motion.button 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        disabled={status !== 'idle'}
                        className="w-full bg-white text-black py-3.5 rounded-2xl font-bold text-sm shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 hover:bg-white/90"
                      >
                        {status === 'loading' ? 'Creating...' : status === 'success' ? 'Success!' : (
                           <>Create Account <Icons.ArrowRight className="w-4 h-4" /></>
                        )}
                      </motion.button>
                   </div>

                   <p className="text-center text-white/40 text-xs pt-4 font-medium">
                      Already have an account? <Link href="/login" className="text-white hover:text-indigo-400 transition-colors">Sign in</Link>
                   </p>
                </form>
            </AuroraCard>
         </motion.div>
      </div>
    </div>
  );
}