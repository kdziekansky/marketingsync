
import React from "react";
import { Task } from "@/utils/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Paperclip } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const formattedDate = task.dueDate
    ? format(new Date(task.dueDate), "d MMM", { locale: pl })
    : null;

  return (
    <div className="task-card stagger-item" style={{ animationDelay: `${Math.random() * 0.5}s` }}>
      <div className="flex flex-col space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium line-clamp-2">{task.title}</h3>
          <Badge variant="outline" className={cn("ml-2 text-xs", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {task.description}
        </p>
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {task.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs rounded-full px-2 py-0 h-5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {task.assigneeId ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          ) : (
            <div className="w-6" />
          )}
          
          <div className="flex items-center gap-3">
            {task.attachments && task.attachments.length > 0 && (
              <div className="flex items-center text-xs text-slate-500">
                <Paperclip size={12} className="mr-1" />
                {task.attachments.length}
              </div>
            )}
            
            {formattedDate && (
              <div className="flex items-center text-xs text-slate-500">
                <CalendarDays size={12} className="mr-1" />
                {formattedDate}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
