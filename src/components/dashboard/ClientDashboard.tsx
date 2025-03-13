
import React from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clients, getTasksByClientId, getAdsDataByClientId } from "@/utils/dummyData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { ClipboardList, CheckCircle, Clock, BarChart4 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Ensure we have a client user
  if (!user || user.role !== "client" || !user.clientId) {
    return <div>Błąd: Brak dostępu do danych klienta</div>;
  }
  
  const clientId = user.clientId;
  const client = clients.find(c => c.id === clientId);
  const tasks = getTasksByClientId(clientId);
  const adsData = getAdsDataByClientId(clientId);
  
  // Calculate task statistics
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const inProgressTasks = tasks.filter(task => task.status === "in_progress").length;
  const reviewTasks = tasks.filter(task => task.status === "review").length;
  
  // Prepare chart data
  const taskStatusData = [
    { name: "Do zrobienia", value: pendingTasks, color: "#eab308" },
    { name: "W trakcie", value: inProgressTasks, color: "#3b82f6" },
    { name: "Do weryfikacji", value: reviewTasks, color: "#8b5cf6" },
    { name: "Ukończone", value: completedTasks, color: "#22c55e" },
  ];
  
  // Format campaign performance data
  const campaignPerformanceData = adsData.map(campaign => ({
    name: campaign.campaignName,
    impressions: campaign.impressions,
    clicks: campaign.clicks,
    conversions: campaign.conversions,
    ctr: campaign.ctr,
    cost: campaign.cost,
  }));
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Witaj, {user.name}!</h1>
              <p className="text-muted-foreground mt-1">
                Panel klienta {client?.name}
              </p>
            </div>
            <Button onClick={() => navigate("/tasks")} className="gap-2">
              <ClipboardList size={16} />
              <span>Przejdź do zadań</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Task statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full p-3 bg-yellow-100">
                <ClipboardList size={24} className="text-yellow-600" />
              </div>
              <h3 className="mt-3 text-3xl font-bold">{pendingTasks}</h3>
              <p className="text-sm text-muted-foreground">Zadania do zrobienia</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full p-3 bg-blue-100">
                <Clock size={24} className="text-blue-600" />
              </div>
              <h3 className="mt-3 text-3xl font-bold">{inProgressTasks}</h3>
              <p className="text-sm text-muted-foreground">Zadania w trakcie</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full p-3 bg-purple-100">
                <BarChart4 size={24} className="text-purple-600" />
              </div>
              <h3 className="mt-3 text-3xl font-bold">{reviewTasks}</h3>
              <p className="text-sm text-muted-foreground">Zadania do weryfikacji</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full p-3 bg-green-100">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <h3 className="mt-3 text-3xl font-bold">{completedTasks}</h3>
              <p className="text-sm text-muted-foreground">Zadania ukończone</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Task chart */}
      <Card>
        <CardHeader>
          <CardTitle>Postęp zadań</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={taskStatusData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Liczba zadań">
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Google Ads stats */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Wyniki kampanii Google Ads</CardTitle>
          <Badge variant="outline">Ostatnie 30 dni</Badge>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={campaignPerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="clicks"
                  stroke="#3b82f6"
                  name="Kliknięcia"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  stroke="#ef4444"
                  name="Konwersje"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
