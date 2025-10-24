'use client';

import React, { useState, useCallback } from 'react';
import { Task, Quadrant } from '../types/task';
import { useTasks } from '../hooks/useTasks';

const getQuadrants = (): Quadrant[] => [
  {
    id: 'urgent-important',
    name: 'Important & Urgent\nDo First',
    color: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  {
    id: 'not-urgent-important', 
    name: 'Important & Not Urgent\nSchedule',
    color: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  {
    id: 'urgent-not-important',
    name: 'Not Important & Urgent\nDelegate',
    color: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  {
    id: 'not-urgent-not-important',
    name: 'Not Important & Not Urgent\nEliminate',
    color: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
];

interface TaskCardProps {
  task: Task;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update editText when task.text changes (after successful save)
  React.useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSaveEdit = async () => {
    if (editText.trim() !== task.text && editText.trim()) {
      setIsSaving(true);
      try {
        await onEdit(task.id, editText.trim());
      } catch (error) {
        console.error('Failed to save task edit:', error);
        // Revert text on error
        setEditText(task.text);
      } finally {
        setIsSaving(false);
      }
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleBlur = async () => {
    await handleSaveEdit();
  };

  const handleDeleteClick = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-blue-500 rounded-lg p-2 m-1 shadow-lg">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          disabled={isSaving}
          className="w-full text-sm bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none disabled:opacity-50"
          placeholder={isSaving ? "Saving..." : "Enter task text"}
        />
      </div>
    );
  }

  return (
    <div 
      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 m-1 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 relative group"
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDeleteConfirm(false);
      }}
    >
      <div className="text-sm text-gray-900 dark:text-gray-100 pr-6">
        {task.text}
      </div>
      
      {isHovered && (
        <>
          <button
            onClick={handleDeleteClick}
            className={`absolute top-1 right-1 w-5 h-5 rounded-full ${showDeleteConfirm ? 'bg-red-600' : 'bg-red-500'} text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors`}
          >
            {showDeleteConfirm ? '?' : '×'}
          </button>
          
          {showDeleteConfirm && (
            <div className="absolute -top-8 left-0 right-0 text-xs text-red-500 font-bold text-center bg-white dark:bg-gray-800 rounded px-1">
              Click × again to delete
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface QuadrantProps {
  quadrant: Quadrant;
  tasks: Task[];
  onTaskEdit: (id: string, newText: string) => void;
  onTaskDelete: (id: string) => void;
  onDrop: (quadrantId: string, taskId: string) => void;
}

const QuadrantComponent: React.FC<QuadrantProps> = ({ 
  quadrant, 
  tasks, 
  onTaskEdit, 
  onTaskDelete, 
  onDrop
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    onDrop(quadrant.id, taskId);
  };

  const handleTaskDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  // Define colors using Tailwind classes that respond to theme
  const getQuadrantStyles = (quadrantId: string) => {
    switch (quadrantId) {
      case 'urgent-important':
        return 'bg-emerald-600 dark:bg-emerald-800';
      case 'not-urgent-important':
        return 'bg-emerald-400 dark:bg-emerald-600';
      case 'urgent-not-important':
        return 'bg-blue-500 dark:bg-blue-700';
      case 'not-urgent-not-important':
        return 'bg-slate-400 dark:bg-slate-600';
      default:
        return 'bg-gray-400 dark:bg-gray-600';
    }
  };

  return (
    <div 
      className={`rounded-lg border-2 border-white dark:border-gray-300 p-4 min-h-[400px] transition-all duration-200 ${getQuadrantStyles(quadrant.id)} ${
        isDragOver ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className="text-white font-bold text-lg mb-4 whitespace-pre-line">
        {quadrant.name}
      </h3>
      
      <div className="space-y-2">
        {tasks
          .filter(task => task.quadrant === quadrant.id)
          .map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleTaskDragStart(e, task.id)}
              className="cursor-move"
            >
              <TaskCard
                task={task}
                onEdit={onTaskEdit}
                onDelete={onTaskDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export const EisenhowerMatrix: React.FC = () => {
  const quadrants = getQuadrants();
  
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [newTaskText, setNewTaskText] = useState('');

  const handleTaskMove = useCallback(async (quadrantId: string, taskId: string) => {
    try {
      await updateTask(taskId, { quadrant: quadrantId as Task['quadrant'] });
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  }, [updateTask]);

  const handleAddTask = async () => {
    if (newTaskText.trim()) {
      try {
        await createTask({
          text: newTaskText.trim(),
          x: 0,
          y: 0,
          quadrant: 'urgent-important'
        });
        setNewTaskText('');
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
  };

  const handleDeleteTask = useCallback(async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }, [deleteTask]);

  const handleEditTask = useCallback(async (id: string, newText: string) => {
    try {
      await updateTask(id, { text: newText });
    } catch (error) {
      console.error('Failed to update task text:', error);
    }
  }, [updateTask]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-gray-600 dark:text-gray-400">Loading tasks...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-red-600 dark:text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Task Input */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new task..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        />
        <button
          onClick={handleAddTask}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Eisenhower Matrix Grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {quadrants.map(quadrant => (
          <QuadrantComponent
            key={quadrant.id}
            quadrant={quadrant}
            tasks={tasks}
            onTaskEdit={handleEditTask}
            onTaskDelete={handleDeleteTask}
            onDrop={handleTaskMove}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 transition-colors">
        <p>• Drag tasks between quadrants to prioritize them</p>
        <p>• Double-click a task to edit its text (auto-saves on Enter or blur)</p>
        <p>• Hover over a task to see the delete button (× in red circle)</p>
        <p>• Green (top-left): Do First - Important & Urgent</p>
        <p>• Light green (top-right): Schedule - Important & Not Urgent</p>
        <p>• Blue (bottom-left): Delegate - Not Important & Urgent</p>
        <p>• Gray (bottom-right): Eliminate - Not Important & Not Urgent</p>
      </div>
    </div>
  );
};