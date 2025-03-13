
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { Task } from "@/utils/types";
import { tasks } from "@/utils/dummyData";
import { toast } from "sonner";

// Helper function to get task by ID since it's missing from dummyData
const getTaskById = (id: string) => {
  return tasks.find(task => task.id === id) || null;
};

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isNewTask = id === "new" || !id;
  
  const [task, setTask] = useState<Task>({
    id: isNewTask ? `task-${Date.now()}` : "",
    title: "",
    description: "",
    status: "todo",
    assigneeId: "",
    clientId: user?.clientId || "",
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    tags: []
  });

  useEffect(() => {
    if (!isNewTask && id) {
      const existingTask = getTaskById(id);
      if (existingTask) {
        setTask(existingTask);
      } else {
        toast.error("Zadanie nie zostało znalezione");
        navigate("/tasks");
      }
    }
  }, [id, isNewTask, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Zadanie ${isNewTask ? "utworzone" : "zaktualizowane"}`);
    navigate("/tasks");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => navigate("/tasks")}>
          <ArrowLeft size={16} />
        </Button>
        <h1 className="text-2xl font-bold">
          {isNewTask ? "Nowe zadanie" : "Edycja zadania"}
        </h1>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">{task.title || "Szczegóły zadania"}</h2>
              <p className="text-muted-foreground">
                To zadanie jest obecnie w fazie implementacji.
              </p>
            </div>
            <Button type="submit">
              {isNewTask ? "Utwórz zadanie" : "Zapisz zmiany"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
