# Quickstart Guide: Aurora UI Refinements

## Overview
This guide explains how to implement the Aurora UI refinements including compact sizing, new chat functionality, and enhanced visual polish.

## Prerequisites
- Existing Aurora ChatWindow component
- Next.js 16+ with Tailwind CSS
- Lucide React icons
- Framer Motion for animations

## Implementation Steps

### 1. Dimension Reduction
Modify the main AuroraCard container in `src/components/ai/ChatWindow.tsx`:
```jsx
// Before
<AuroraCard className="w-full max-w-md md:w-[400px] h-[600px] ...">

// After
<AuroraCard className="w-full max-w-md md:w-[380px] h-[500px] ...">
```

### 2. New Chat Button Implementation
1. Import the Plus icon: `import { X, Send, Bot, Circle, Sparkles, History, Menu, Plus } from 'lucide-react';`
2. Add a handleNewChat function to clear messages:
```jsx
const handleNewChat = () => {
  setMessages([]);
  setShowHistory(false); // Optionally hide history panel
};
```
3. Add the button to the header next to the History button:
```jsx
<button
  onClick={handleNewChat}
  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/[0.1]"
  aria-label="Start new chat"
>
  <Plus size={20} />
</button>
```

### 3. Enhanced Header Styling
Replace the simple border with a gradient border effect using a pseudo-element or box-shadow technique:
```jsx
// Add a div with gradient background as the header's border
<div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-purple-600" />
```

### 4. Enhanced Input Styling
Modify the textarea's background transparency and focus effects:
```jsx
<textarea
  className="flex-1 bg-white/[0.03] border border-white/[0.1] ... focus:ring-1 focus:ring-indigo-400/30"
  ...
/>
```

## Verification
1. Check that the chat window is now 500px tall and 380px wide
2. Verify the new "New Chat" button clears all messages when clicked
3. Confirm the header has a subtle gradient border
4. Test that the input field has increased transparency and subtle glow on focus

## Troubleshooting
- If the gradient border doesn't appear, ensure proper z-indexing
- If the new chat button doesn't clear messages, verify the handleNewChat function is properly connected
- If input styling doesn't apply, check that the Tailwind classes are correctly formatted