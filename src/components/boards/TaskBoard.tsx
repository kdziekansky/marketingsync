
import React, { useState } from "react";
import { Task, TaskStatus } from "@/utils/types";
import TaskColumn from "./TaskColumn";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "sonner";

interface TaskBoardProps {
  tasks: Task[];
  onTaskUpdate?: (updatedTask: Task) => void;
  onTaskCreate?: (newTask: Partial<Task>) => void;
}

const TaskBoard = ({ tasks, onTaskUpdate, onTaskCreate }: TaskBoardProps) => {
  const { user } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    clientId: user?.clientId || "",
  });

  const handleAddTask = () => {
    if (!newTask.title) {
      toast.error("Podaj tytuł zadania");
      return;
    }

    if (onTaskCreate) {
      onTaskCreate(newTask);
      toast.success("Zadanie zostało dodane");
    }
    setShowAddDialog(false);
    setNewTask({
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      clientId: user?.clientId || "",
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tablica zadań</h2>
        {user?.role === "client" && (
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus size={16} className="mr-2" />
            Nowe zadanie
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TaskColumn 
          title="Do zrobienia" 
          status="pending" 
          tasks={tasks} 
          onAddTask={user?.role === "client" ? () => setShowAddDialog(true) : undefined}
        />
        <TaskColumn 
          title="W trakcie" 
          status="in_progress" 
          tasks={tasks} 
        />
        <TaskColumn 
          title="Do weryfikacji" 
          status="review" 
          tasks={tasks} 
        />
        <TaskColumn 
          title="Ukończone" 
          status="completed" 
          tasks={tasks} 
        />
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Dodaj nowe zadanie</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Tytuł
              </Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Opis
              </Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priorytet
              </Label>
              <select
                id="priority"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "low" | "medium" | "high" })}
                className="col-span-3 input-fancy"
              >
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Anuluj
            </Button>
            <Button onClick={handleAddTask}>Dodaj zadanie</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskBoard;
