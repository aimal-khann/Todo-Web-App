# Quickstart Guide: Aurora Chat Widget

## Overview
The Aurora Chat Widget provides an AI assistant interface with a floating button that expands into a glassmorphic chat window. This guide explains how to implement and integrate the widget into your application.

## Prerequisites
- Node.js 18+ and npm/yarn
- Next.js 16+ with App Router
- Tailwind CSS configured
- Framer Motion installed
- Existing task store with `useTaskStore`

## Installation Steps

### 1. Install Dependencies
```bash
npm install react-markdown remark-gfm
```

### 2. Create Component Structure
Create the following directory structure:
```
src/
├── components/
│   ├── ai/
│   │   ├── ChatWindow.tsx
│   │   └── AiAssistant.tsx
│   └── ui/
│       └── aurora/
│           └── AuroraCard.tsx
```

### 3. Add to Layout
Integrate the `AiAssistant` component into your dashboard layout to ensure it persists across page navigations.

## Basic Usage

### AuroraCard Component
The AuroraCard provides the glassmorphism effect used throughout the chat interface:

```tsx
import { AuroraCard } from '@/components/ui/aurora/AuroraCard';

<AuroraCard className="p-4">
  <div>Your content here</div>
</AuroraCard>
```

### ChatWindow Component
The ChatWindow provides the main chat interface:

```tsx
import { ChatWindow } from '@/components/ai/ChatWindow';

<ChatWindow
  isOpen={true}
  onClose={() => setIsOpen(false)}
  taskId={taskId}
/>
```

### AiAssistant Component
The AiAssistant provides the floating widget:

```tsx
import { AiAssistant } from '@/components/ai/AiAssistant';

<AiAssistant />
```

## Integration with Dashboard
To make the widget persist across page navigations, add it to your dashboard layout:

```tsx
// src/app/dashboard/layout.tsx
import { AiAssistant } from '@/components/ai/AiAssistant';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <AiAssistant />
    </div>
  );
}
```

## Configuration Options
- Position: The floating button is fixed at the bottom-right by default
- Size: Responsive (full-screen on mobile, 350px-400px on desktop)
- Theme: Automatically follows Aurora aesthetic (deep black, indigo/purple accents)

## Styling
The widget uses Aurora's glassmorphism design:
- Background: `#020204` (Deep Space Black)
- Glass effect: `bg-white/[0.02]` with `backdrop-blur-2xl`
- Accents: Indigo (`#6366f1`) and Purple (`#a855f7`)

## Troubleshooting
- If the widget doesn't appear, ensure it's added to a layout component
- If animations are janky, check Framer Motion installation
- If chat doesn't connect to task store, verify `useTaskStore` import path