import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import ProgressBar from '@/components/ProgressBar';
import TaskList from '@/components/TaskList';
import ProjectDateEditor from '@/components/ProjectDateEditor';
import { 
  getProjectById, 
  addTaskToProject, 
  toggleTaskCompletion, 
  deleteProject,
  updateProjectDates,
  Project 
} from '@/lib/data';
import { toast } from 'sonner';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    try {
      const projectData = getProjectById(id);
      if (projectData) {
        setProject(projectData);
      } else {
        toast.error('Project not found');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to load project:', error);
      toast.error('Failed to load project');
    } finally {
      setLoading(false);
    }

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = () => {
      if (id) {
        const updatedProject = getProjectById(id);
        if (updatedProject) {
          setProject(updatedProject);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [id, navigate]);

  const handleToggleTask = (taskId: string) => {
    if (!id) return;
    
    try {
      const updatedProject = toggleTaskCompletion(id, taskId);
      if (updatedProject) {
        setProject(updatedProject);
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleAddTask = (taskTitle: string) => {
    if (!id) return;
    
    try {
      const updatedProject = addTaskToProject(id, taskTitle);
      if (updatedProject) {
        setProject(updatedProject);
        toast.success('Task added');
      }
    } catch (error) {
      console.error('Failed to add task:', error);
      toast.error('Failed to add task');
    }
  };

  const handleDeleteProject = () => {
    if (!id) return;
    
    try {
      deleteProject(id);
      toast.success('Project deleted');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleUpdateDates = (projectId: string, updates: { createdAt?: Date; dueDate?: Date }) => {
    if (!id) return;
    
    try {
      const updatedProject = updateProjectDates(id, updates);
      if (updatedProject) {
        setProject(updatedProject);
      }
    } catch (error) {
      console.error('Failed to update project dates:', error);
      toast.error('Failed to update project dates');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="animate-pulse w-full max-w-3xl mx-auto p-8">
          <div className="h-10 bg-secondary/50 rounded-md w-1/3 mb-4"></div>
          <div className="h-6 bg-secondary/50 rounded-md w-2/3 mb-8"></div>
          <div className="h-4 bg-secondary/30 rounded-md w-full mb-2"></div>
          <div className="h-4 bg-secondary/30 rounded-md w-5/6 mb-8"></div>
          <div className="h-64 bg-secondary/40 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <header className="w-full p-4 border-b border-border/40 backdrop-blur-sm bg-background/80 fixed top-0 z-10">
        <div className="container max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center text-sm font-medium hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Projects
          </Link>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Trash className="h-4 w-4" />
            <span>Delete</span>
          </Button>
        </div>
      </header>
      
      <main className="container max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6">
        <div className="flex flex-col gap-8 animate-slide-up">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-6">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
              </div>
              
              {project.dueDate && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>Due {format(new Date(project.dueDate), 'MMM d, yyyy')}</span>
                </div>
              )}
            </div>
            
            {project.description && (
              <p className="text-muted-foreground mb-4">{project.description}</p>
            )}

            <div className="bg-card p-4 rounded-lg border border-border/50 shadow-sm mb-8">
              <h2 className="text-lg font-medium mb-4">Project Timeline</h2>
              <ProjectDateEditor 
                projectId={project.id}
                createdAt={new Date(project.createdAt)}
                dueDate={project.dueDate ? new Date(project.dueDate) : undefined}
                onUpdate={handleUpdateDates}
              />
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-xl border border-border/50 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-medium mb-1">Progress</h2>
                <p className="text-sm text-muted-foreground">
                  {project.progress}% complete
                </p>
              </div>
              <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                {project.tasks.filter(t => t.completed).length}/{project.tasks.length} tasks
              </span>
            </div>
            
            <ProgressBar value={project.progress} className="h-2 mb-8" />
            
            <TaskList
              tasks={project.tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
            />
          </div>
        </div>
      </main>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg animate-scale-in">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProject}
              className="flex-1"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
