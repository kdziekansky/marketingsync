
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { getTaskById } from "@/utils/dummyData";
import { Task, TaskStatus, TaskPriority } from "@/utils/types";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNewTask = id === "new" || !id;
  
  const [task, setTask] = useState<Task>({
    id: isNewTask ? `task-${Date.now()}` : "",
    title: "",
    description: "",
    status: "pending" as TaskStatus,
    priority: "medium" as TaskPriority,
    clientId: user?.clientId || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assigneeId: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value, updatedAt: new Date().toISOString() }));
  };

  const handleSave = () => {
    if (!task.title.trim()) {
      toast.error("Tytuł zadania jest wymagany");
      return;
    }

    // In a real app, this would save to an API or database
    toast.success(`Zadanie "${task.title}" zostało zapisane`);
    
    // For demo purposes, let's simply go back to the tasks list
    navigate("/tasks");
  };

  const canEditTask = user && (
    user.role === "admin" || 
    user.role === "superadmin" || 
    (user.role === "employee" && task.assigneeId === user.id) ||
    (user.role === "client" && task.clientId === user.clientId && isNewTask)
  );

  if (!canEditTask) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/tasks")}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">Brak dostępu</h1>
        </div>
        <p>Nie masz uprawnień do edycji tego zadania.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/tasks")}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">
            {isNewTask ? "Nowe zadanie" : "Edycja zadania"}
          </h1>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save size={16} />
          <span>Zapisz</span>
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium">Tytuł</label>
            <Input 
              id="title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              placeholder="Wprowadź tytuł zadania"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">Opis</label>
            <Textarea 
              id="description"
              name="description"
              value={task.description}
              onChange={handleInputChange}
              placeholder="Wprowadź opis zadania"
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="status" className="font-medium">Status</label>
              <select 
                id="status"
                name="status"
                value={task.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="pending">Do zrobienia</option>
                <option value="in_progress">W trakcie</option>
                <option value="review">Do weryfikacji</option>
                <option value="completed">Ukończone</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="priority" className="font-medium">Priorytet</label>
              <select 
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
