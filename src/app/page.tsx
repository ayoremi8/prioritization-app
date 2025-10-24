import { EisenhowerMatrix } from '../components/EisenhowerMatrix';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Eisenhower Matrix
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Prioritize your tasks based on urgency and importance
          </p>
        </header>
        
        <EisenhowerMatrix />
        
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Drag tasks between quadrants • Double-click to edit • Hover to delete</p>
        </footer>
      </div>
    </div>
  );
}
