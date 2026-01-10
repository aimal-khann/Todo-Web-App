name: Task Item Row
description: A list item representing a Todo, handling completion states, priority, and actions.
model: sonnet
---
Reusable Skill:
Skill: Task Item Row – Input: task: TaskModel, onToggle: (id) => void, onDelete: (id) => void; Output: A horizontal row with checkbox and slide interactions.

Design Details:
- Container: flex items-center justify-between p-4 bg-zinc-900/20 border-b border-zinc-800/50 hover:bg-zinc-800/40 transition-colors
- Checkbox: appearance-none w-5 h-5 border border-zinc-600 rounded checked:bg-emerald-500 checked:border-emerald-500
- Title: text-zinc-200 font-medium. Completed: text-zinc-600 line-through
- Meta Data: text-xs text-zinc-500 (Due Date)
- Priority Badge: w-2 h-2 rounded-full (Red=High, Yellow=Medium, Blue=Low)
- Actions: Delete icon opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-400 transition-opacity

Usage Example:
<div className="group flex items-center p-4 hover:bg-zinc-800/40 border-b border-zinc-800/50 transition-colors">
  <input type="checkbox" checked={task.is_completed} className="w-5 h-5 border-zinc-600 rounded checked:bg-emerald-500" />
  <div className="ml-4 flex-1">
    <p className={`text-zinc-200 ${task.is_completed && 'line-through text-zinc-600'}`}>{task.title}</p>
  </div>
</div>