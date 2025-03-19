
import React, { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import CreateProjectDialog from '@/components/CreateProjectDialog';
import { getProjectsFromStorage, Project } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load projects from localStorage
    const loadProjects = () => {
      try {
        const projectsData = getProjectsFromStorage();
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'projects') {
        loadProjects();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Navbar openCreateDialog={handleOpenCreateDialog} />
      
      <main className="container max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-row items-center justify-between gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
            {isMobile && (
              <Button size="sm" onClick={handleOpenCreateDialog} className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>New</span>
              </Button>
            )}
          </div>
          <p className="text-muted-foreground">
            Track and manage all your projects in one place.
          </p>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-secondary/50"></div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-medium mb-2">No projects yet</h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Get started by creating your first project to track tasks and progress.
              </p>
              <Button onClick={handleOpenCreateDialog}>Create a Project</Button>
            </div>
          )}
        </div>
      </main>
      
      <CreateProjectDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default Index;
