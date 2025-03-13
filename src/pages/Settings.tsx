
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ustawienia</h1>
      
      <Card>
        <CardContent className="pt-6">
          <p>Ta funkcjonalność jest w trakcie implementacji.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
