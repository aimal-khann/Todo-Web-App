name: Dashboard Stat Widget
description: A small card displaying a single metric (e.g., "Total Tasks") for the Analytics page.
model: sonnet
---
Reusable Skill:
Skill: Dashboard Stat Widget – Input: label: string, value: number, icon: LucideIcon, trend?: string; Output: A compact glass card with a large metric.

Design Details:
- Base: Matches "Neon Glass Card" style but smaller padding (p-4)
- Layout: Flex column, icon top-right (opacity 50%)
- Typography: Label (text-xs text-zinc-400 uppercase), Value (text-2xl font-bold text-white)
- Trend Indicator: text-xs font-medium (Green if positive, Red if negative)
- Icon: w-8 h-8 text-indigo-500/50 absolute top-4 right-4

Usage Example:
<div className="relative bg-zinc-900/40 border border-white/5 rounded-xl p-5">
  <p className="text-xs text-zinc-500 uppercase">Tasks Completed</p>
  <h3 className="text-2xl font-bold text-white mt-1">12</h3>
  <CheckCircle className="absolute top-5 right-5 w-6 h-6 text-indigo-500/40" />
</div>