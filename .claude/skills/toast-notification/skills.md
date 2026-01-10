name: Toast Notification
description: A feedback popup for API success/error messages.
model: sonnet
---
Reusable Skill:
Skill: Toast Notification – Input: title: string, message: string, type: 'success' | 'error'; Output: A floating alert that slides in.

Design Details:
- Position: Fixed bottom-right z-50
- Base: bg-zinc-900 border-l-4 shadow-2xl min-w-[300px] p-4 rounded-r-lg backdrop-blur-md
- Success: border-l-emerald-500 text-emerald-50
- Error: border-l-red-500 text-red-50
- Animation: animate-in slide-in-from-right duration-300 fade-in
- Close: Absolute top-2 right-2 text-zinc-500 hover:text-white cursor-pointer

Usage Example:
<div className="fixed bottom-4 right-4 bg-zinc-900 border-l-4 border-emerald-500 p-4 shadow-2xl animate-in slide-in-from-right">
  <h4 className="font-bold text-emerald-400">Success</h4>
  <p className="text-sm text-zinc-300">Task created successfully.</p>
</div>