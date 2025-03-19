
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProgressBar from './ProgressBar';
import { type Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const { id, title, description, progress, tasks, dueDate } = project;
  const completedTasks = tasks.filter(task => task.completed).length;
  
  return (
    <Link
      to={`/project/${id}`}
      className={cn(
        "block p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300 transform hover:-translate-y-1 group animate-scale-in",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {completedTasks}/{tasks.length} tasks
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
        </div>
        
        <div className="mt-auto">
          <ProgressBar value={progress} className="mb-4" />
          
          {dueDate && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>Due {format(new Date(dueDate), 'MMM d, yyyy')}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
