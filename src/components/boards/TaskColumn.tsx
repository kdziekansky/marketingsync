
import React from "react";
import { Task, TaskStatus } from "@/utils/types";
import TaskCard from "./TaskCard";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddTask?: () => void;
}

const statusColors: Record<TaskStatus, string> = {
  pending: "bg-yellow-500",
  in_progress: "bg-blue-500",
  review: "bg-purple-500",
  completed: "bg-green-500",
};

export const TaskColumn = ({ title, status, tasks, onAddTask }: TaskColumnProps) => {
  const filteredTasks = tasks.filter(task => task.status === status);
  
  return (
    <div className="task-column animate-fade-in" style={{ animationDelay: `${Math.random() * 0.3}s` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", statusColors[status])}></span>
          <h3 className="text-sm font-medium">{title}</h3>
          <Badge variant="outline">{filteredTasks.length}</Badge>
        </div>
        {onAddTask && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full" 
            onClick={onAddTask}
          >
            <Plus size={14} />
          </Button>
        )}
      </div>
      <div className="space-y-3 min-h-[200px]">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
