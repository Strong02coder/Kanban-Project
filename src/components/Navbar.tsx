
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  className?: string;
  openCreateDialog?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ className, openCreateDialog }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isMobile = useIsMobile();
  
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold">ProjectTrack</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            {!isHome && (
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Back to Projects
              </Link>
            )}
            {isHome && openCreateDialog && !isMobile && (
              <button
                onClick={openCreateDialog}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                New Project
              </button>
            )}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
