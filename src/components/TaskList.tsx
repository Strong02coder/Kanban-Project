
import React, { useState } from 'react';
import { Check, Plus, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Task } from '@/lib/data';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (taskTitle: string) => void;
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  className,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-medium">Tasks</h3>
      
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground text-sm">
            No tasks yet. Add a task to get started.
          </div>
        ) : (
          <ul className="space-y-2 animate-fade-in">
            {tasks.map((task) => (
              <li 
                key={task.id}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                  className="h-5 w-5 transition-all"
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "flex-1 text-sm cursor-pointer transition-all",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.title}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <form onSubmit={handleAddTask} className="flex gap-2 pt-2">
        <Input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={!newTaskTitle.trim()}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </form>
    </div>
  );
};

export default TaskList;
