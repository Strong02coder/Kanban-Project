import { nanoid } from "nanoid";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Website Redesign",
    description: "Complete redesign of the company website with new branding.",
    tasks: [
      {
        id: nanoid(),
        title: "Design homepage layout",
        completed: true,
        createdAt: new Date("2023-05-20"),
      },
      {
        id: nanoid(),
        title: "Create product page templates",
        completed: true,
        createdAt: new Date("2023-05-22"),
      },
      {
        id: nanoid(),
        title: "Implement responsive navigation",
        completed: false,
        createdAt: new Date("2023-05-23"),
      },
      {
        id: nanoid(),
        title: "Test across all devices",
        completed: false,
        createdAt: new Date("2023-05-25"),
      },
    ],
    progress: 50,
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-25"),
    dueDate: new Date("2023-07-01"),
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Develop a new mobile app for iOS and Android platforms.",
    tasks: [
      {
        id: nanoid(),
        title: "Finalize wireframes",
        completed: true,
        createdAt: new Date("2023-06-01"),
      },
      {
        id: nanoid(),
        title: "Create UI components",
        completed: true,
        createdAt: new Date("2023-06-05"),
      },
      {
        id: nanoid(),
        title: "Implement user authentication",
        completed: true,
        createdAt: new Date("2023-06-10"),
      },
      {
        id: nanoid(),
        title: "Add payment gateway integration",
        completed: false,
        createdAt: new Date("2023-06-15"),
      },
      {
        id: nanoid(),
        title: "Perform QA testing",
        completed: false,
        createdAt: new Date("2023-06-20"),
      },
    ],
    progress: 60,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2023-06-20"),
    dueDate: new Date("2023-08-15"),
  },
  {
    id: "3",
    title: "Marketing Campaign",
    description: "Launch a new marketing campaign for Q3.",
    tasks: [
      {
        id: nanoid(),
        title: "Define target audience",
        completed: true,
        createdAt: new Date("2023-07-01"),
      },
      {
        id: nanoid(),
        title: "Create social media assets",
        completed: true,
        createdAt: new Date("2023-07-05"),
      },
      {
        id: nanoid(),
        title: "Schedule email campaigns",
        completed: false,
        createdAt: new Date("2023-07-10"),
      },
      {
        id: nanoid(),
        title: "Prepare analytics dashboard",
        completed: false,
        createdAt: new Date("2023-07-15"),
      },
    ],
    progress: 40,
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-15"),
    dueDate: new Date("2023-09-30"),
  },
];

// Local storage helper functions
export function getProjectsFromStorage(): Project[] {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : mockProjects;
}

export function saveProjectsToStorage(projects: Project[]): void {
  localStorage.setItem("projects", JSON.stringify(projects));
}

// Project management functions
export function getProjectById(id: string): Project | undefined {
  const projects = getProjectsFromStorage();
  return projects.find(project => project.id === id);
}

export function addProject(project: Omit<Project, "id" | "createdAt" | "updatedAt" | "progress">): Project {
  const projects = getProjectsFromStorage();
  const newProject: Project = {
    ...project,
    id: nanoid(),
    progress: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  saveProjectsToStorage([...projects, newProject]);
  return newProject;
}

export function updateProject(updatedProject: Project): Project {
  const projects = getProjectsFromStorage();
  const index = projects.findIndex(project => project.id === updatedProject.id);
  
  if (index !== -1) {
    projects[index] = {
      ...updatedProject,
      updatedAt: new Date(),
    };
    saveProjectsToStorage(projects);
  }
  
  return updatedProject;
}

export function deleteProject(id: string): void {
  const projects = getProjectsFromStorage();
  const filteredProjects = projects.filter(project => project.id !== id);
  saveProjectsToStorage(filteredProjects);
}

export function calculateProjectProgress(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.completed).length;
  return Math.round((completedTasks / tasks.length) * 100);
}

export function addTaskToProject(projectId: string, taskTitle: string): Project | undefined {
  const projects = getProjectsFromStorage();
  const index = projects.findIndex(project => project.id === projectId);
  
  if (index !== -1) {
    const newTask: Task = {
      id: nanoid(),
      title: taskTitle,
      completed: false,
      createdAt: new Date(),
    };
    
    projects[index].tasks.push(newTask);
    projects[index].progress = calculateProjectProgress(projects[index].tasks);
    projects[index].updatedAt = new Date();
    
    saveProjectsToStorage(projects);
    return projects[index];
  }
  
  return undefined;
}

export function toggleTaskCompletion(projectId: string, taskId: string): Project | undefined {
  const projects = getProjectsFromStorage();
  const projectIndex = projects.findIndex(project => project.id === projectId);
  
  if (projectIndex !== -1) {
    const taskIndex = projects[projectIndex].tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
      projects[projectIndex].tasks[taskIndex].completed = !projects[projectIndex].tasks[taskIndex].completed;
      projects[projectIndex].progress = calculateProjectProgress(projects[projectIndex].tasks);
      projects[projectIndex].updatedAt = new Date();
      
      saveProjectsToStorage(projects);
      return projects[projectIndex];
    }
  }
  
  return undefined;
}

export function updateProjectDates(
  projectId: string, 
  updates: { createdAt?: Date; dueDate?: Date }
): Project | undefined {
  const projects = getProjectsFromStorage();
  const index = projects.findIndex(project => project.id === projectId);
  
  if (index !== -1) {
    if (updates.createdAt) {
      projects[index].createdAt = updates.createdAt;
    }
    
    if (updates.dueDate !== undefined) {
      projects[index].dueDate = updates.dueDate;
    }
    
    projects[index].updatedAt = new Date();
    saveProjectsToStorage(projects);
    
    return projects[index];
  }
  
  return undefined;
}
