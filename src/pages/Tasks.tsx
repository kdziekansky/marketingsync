
import React from "react";
import TaskBoard from "@/components/boards/TaskBoard";
import { useAuth } from "@/components/auth/AuthContext";
import { getTasksByClientId, getTasksByAssigneeId } from "@/utils/dummyData";

export const Tasks = () => {
  const { user } = useAuth();

  // Pobierz odpowiednie zadania w zależności od roli użytkownika
  const getTasks = () => {
    if (!user) return [];
    
    if (user.role === "client" && user.clientId) {
      return getTasksByClientId(user.clientId);
    } else if (user.role === "employee" && user.id) {
      return getTasksByAssigneeId(user.id);
    } else if (user.role === "admin" || user.role === "superadmin") {
      // Administratorzy widzą wszystkie zadania
      return [...getTasksByClientId("1"), ...getTasksByClientId("2")];
    }
    
    return [];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Zadania</h1>
      </div>
      
      <TaskBoard tasks={getTasks()} />
    </div>
  );
};

export default Tasks;
