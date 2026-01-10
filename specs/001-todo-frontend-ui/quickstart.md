# Quickstart Guide: Professional Todo Manager (Frontend UI/UX)

## Overview
This guide provides instructions for setting up and running the todo manager application locally.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Setup Instructions

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
# Next.js Environment Variables
NEXT_PUBLIC_APP_NAME="Todo Manager"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Better Auth Configuration (for mock auth)
AUTH_SECRET="your-auth-secret-here"
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure
```
frontend/
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and helpers
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Zustand stores
│   ├── types/               # TypeScript definitions
│   └── styles/              # Global styles
├── public/                  # Static assets
└── package.json
```

## Key Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run test` - Run tests

## Technology Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started with Development
1. Create a new component in `src/components/atoms/` for small UI elements
2. Build pages in `src/app/` using the Next.js App Router
3. Add custom hooks in `src/hooks/` for reusable logic
4. Define types in `src/types/` for TypeScript interfaces
5. Create mock data in `src/store/` using Zustand

## Running Tests
```bash
npm run test
# or for watch mode
npm run test:watch
```

## Building for Production
```bash
npm run build
npm run start
```

## Troubleshooting
- If you encounter Tailwind styling issues, ensure the global styles are properly imported
- For animation issues, verify Framer Motion is properly configured
- For state management problems, check Zustand store implementation