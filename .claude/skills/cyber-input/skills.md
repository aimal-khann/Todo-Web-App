name: Cyber Input Field
description: A futuristic form input with a floating label, glass background, and neon glow focus states.
model: sonnet
---
Reusable Skill:
Skill: Cyber Input Field – Input: label: string, type: string, id: string, register: UseFormRegisterReturn, error?: string, placeholder?: string; Output: A dark-mode optimized input with floating label animation and validation states.

Design Details:
- Background: bg-zinc-900/40 (default), bg-zinc-900/80 (focus)
- Border: border border-zinc-700, focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50
- Text: text-zinc-100 (input), text-zinc-500 (placeholder)
- Label: text-zinc-400 absolute left-4 top-3.5 transition-all peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-indigo-400 bg-zinc-950/80 px-1
- Error State: border-red-500/60 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]
- Height: h-12 rounded-lg
- Backdrop: backdrop-blur-md

Usage Example:
<div className="relative group">
  <input
    {...register('email')}
    type="email"
    className="peer w-full h-12 bg-zinc-900/40 border border-zinc-700 rounded-lg px-4 text-zinc-100 focus:border-indigo-500 outline-none transition-all backdrop-blur-sm"
    placeholder=" "
  />
  <label className="absolute left-4 top-3 text-zinc-500 transition-all peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-indigo-400">
    Email Address
  </label>
  {errors.email && <span className="text-xs text-red-400 mt-1">{errors.email.message}</span>}
</div>