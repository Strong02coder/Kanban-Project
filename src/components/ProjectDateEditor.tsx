
import React, { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProjectDateEditorProps {
  projectId: string;
  createdAt: Date;
  dueDate?: Date;
  onUpdate: (projectId: string, updates: { createdAt?: Date; dueDate?: Date }) => void;
}

const ProjectDateEditor: React.FC<ProjectDateEditorProps> = ({
  projectId,
  createdAt,
  dueDate,
  onUpdate,
}) => {
  const [editedCreatedAt, setEditedCreatedAt] = useState<Date>(new Date(createdAt));
  const [editedDueDate, setEditedDueDate] = useState<Date | undefined>(
    dueDate ? new Date(dueDate) : undefined
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    try {
      // Validate dates
      if (editedDueDate && editedCreatedAt > editedDueDate) {
        toast.error('Creation date cannot be after due date');
        return;
      }

      onUpdate(projectId, {
        createdAt: editedCreatedAt,
        dueDate: editedDueDate,
      });
      
      setIsEditing(false);
      toast.success('Project dates updated');
    } catch (error) {
      toast.error('Failed to update project dates');
    }
  };

  const handleCancel = () => {
    setEditedCreatedAt(new Date(createdAt));
    setEditedDueDate(dueDate ? new Date(dueDate) : undefined);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Creation Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editedCreatedAt && "text-muted-foreground"
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {editedCreatedAt ? format(editedCreatedAt, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={editedCreatedAt}
                    onSelect={(date) => date && setEditedCreatedAt(date)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date (optional)</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editedDueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editedDueDate ? format(editedDueDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={editedDueDate}
                    onSelect={setEditedDueDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
          </div>
        </>
      ) : (
        <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full">
          Edit Project Dates
        </Button>
      )}
    </div>
  );
};

export default ProjectDateEditor;
