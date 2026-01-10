name: Neon Glass Card
description: The fundamental layout container used for the Login Box, Dashboard Widgets, and Task Lists.
model: sonnet
---
Reusable Skill:
Skill: Neon Glass Card – Input: children: ReactNode, className?: string, hoverEffect?: boolean; Output: A container div with frosted glass effect and optional hover glow.

Design Details:
- Base: bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden
- Shadow: shadow-xl shadow-black/40
- Hover Effect (Optional): hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300
- Content Padding: p-6 (default)
- Dark Mode Optimization: Designed specifically to sit on top of bg-zinc-950

Usage Example:
<div className="relative bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-all">
  <h2 className="text-xl font-bold text-white mb-4">Login</h2>
  {children}
</div>