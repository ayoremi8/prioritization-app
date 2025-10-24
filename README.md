# Eisenhower Matrix - Task Prioritization Tool

An interactive Next.js application that implements the Eisenhower Matrix for task prioritization using Konva.js for drag-and-drop functionality.

## Features

- **Interactive Drag & Drop**: Move tasks between quadrants by dragging them
- **Dark & Light Mode**: Toggle between themes with the button in the top-right corner
- **Persistent Storage**: Tasks are automatically saved to a local SQLite database
- **Four Priority Quadrants**:
  - 🔴 **Important & Urgent** (Do First) - High priority tasks requiring immediate attention
  - 🟢 **Important & Not Urgent** (Schedule) - Important tasks that can be planned
  - 🔵 **Not Important & Urgent** (Delegate) - Tasks that can be delegated
  - ⚪ **Not Important & Not Urgent** (Eliminate) - Tasks to minimize or eliminate
- **Task Management**: Add new tasks and delete existing ones (double-click to delete)
- **Real-time Updates**: Tasks automatically update their priority based on quadrant placement
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop compatibility
- **Theme Persistence**: Your preferred theme is remembered across sessions

## Technology Stack

- **Frontend Framework**: Next.js 16.0.0 with TypeScript
- **Database**: SQLite with Prisma ORM for data persistence
- **Graphics Library**: Konva.js with React Konva for interactive canvas
- **Styling**: Tailwind CSS with dark mode support
- **Theme Management**: next-themes for seamless theme switching
- **Build Tool**: Turbopack for fast development builds
- **API**: Next.js API routes for CRUD operations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

3. Seed the database (optional):
```bash
npx tsx prisma/seed.ts
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Adding Tasks**: Type your task in the input field and click "Add" or press Enter
2. **Moving Tasks**: Drag tasks between the four quadrants to change their priority
3. **Deleting Tasks**: Double-click any task to remove it
4. **Theme Toggle**: Click the sun/moon icon in the top-right corner to switch between light and dark modes
5. **Quadrant Guide**:
   - **Green (Top-Left)**: Do First - Crisis management, urgent deadlines
   - **Light Green (Top-Right)**: Schedule - Planning, personal development
   - **Blue (Bottom-Left)**: Delegate - Interruptions, some emails/calls
   - **Gray (Bottom-Right)**: Eliminate - Time wasters, excessive social media

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── tasks/              # API routes for task CRUD operations
│   │       ├── route.ts        # GET /api/tasks, POST /api/tasks
│   │       └── [id]/route.ts   # PUT /api/tasks/[id], DELETE /api/tasks/[id]
│   ├── layout.tsx              # Root layout component
│   ├── page.tsx                # Home page with Eisenhower Matrix
│   └── globals.css             # Global styles
├── components/
│   ├── EisenhowerMatrix.tsx    # Main matrix component with Konva canvas
│   ├── Providers.tsx           # Theme provider wrapper
│   └── ThemeToggle.tsx         # Dark/light mode toggle button
├── hooks/
│   └── useTasks.ts             # Custom hook for task operations
├── lib/
│   └── prisma.ts               # Prisma client configuration
└── types/
    └── task.ts                 # TypeScript interfaces for tasks and quadrants
prisma/
├── migrations/                 # Database migrations
├── schema.prisma              # Prisma schema definition
└── seed.ts                    # Database seeding script
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## VS Code Integration

The project includes a VS Code task for running the development server:
- Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
- Type "Tasks: Run Task"
- Select "Start Development Server"

## About the Eisenhower Matrix

The Eisenhower Matrix, also known as the Urgent-Important Matrix, is a decision-making framework developed by President Dwight D. Eisenhower. It helps prioritize tasks by categorizing them based on their urgency and importance, leading to better time management and productivity.
