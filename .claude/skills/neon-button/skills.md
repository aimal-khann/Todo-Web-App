name: Neon Primary Button
description: High-contrast action button for "Create Task" or "Submit", featuring a distinct glow.
model: sonnet
---
Reusable Skill:
Skill: Neon Primary Button – Input: label: string, onClick?: () => void, isLoading?: boolean, variant?: 'primary' | 'danger'; Output: An interactive button that glows when hovered.

Design Details:
- Shape: rounded-lg px-6 py-2.5 font-semibold text-sm tracking-wide
- Primary: bg-indigo-600 text-white border border-indigo-400/20 shadow-[0_0_15px_rgba(79,70,229,0.4)]
- Primary Hover: hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] hover:scale-[1.02] active:scale-[0.98]
- Danger: bg-red-900/30 text-red-200 border border-red-500/50 hover:bg-red-900/50
- Loading: opacity-70 cursor-not-allowed flex items-center justify-center gap-2
- Transition: transition-all duration-200 ease-out

Usage Example:
<button
  onClick={handleSubmit}
  className="bg-indigo-600 text-white rounded-lg px-6 py-2.5 shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] transition-all"
>
  {isLoading ? <Spinner /> : "Create Task"}
</button>