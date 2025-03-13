
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthContext";
import { getAdsDataByClientId, adsData } from "@/utils/dummyData";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Badge } from "@/components/ui/badge";

export const Campaigns = () => {
  const { user } = useAuth();
  
  // Pobierz dane kampanii w zależności od roli użytkownika
  const getCampaignData = () => {
    if (!user) return [];
    
    if (user.role === "client" && user.clientId) {
      return getAdsDataByClientId(user.clientId);
    } else if (user.role === "admin" || user.role === "superadmin" || user.role === "employee") {
      // Pracownicy i administratorzy widzą wszystkie kampanie
      return adsData;
    }
    
    return [];
  };
  
  const campaignData = getCampaignData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Przygotuj dane dla wykresów
  const impressionsData = campaignData.map(campaign => ({
    name: campaign.campaignName,
    value: campaign.impressions
  }));
  
  const clicksAndConversionsData = campaignData.map(campaign => ({
    name: campaign.campaignName,
    clicks: campaign.clicks,
    conversions: campaign.conversions
  }));
  
  const ctrData = campaignData.map(campaign => ({
    name: campaign.campaignName,
    ctr: campaign.ctr
  }));
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kampanie Google Ads</h1>
        <Badge variant="outline">Ostatnie 30 dni</Badge>
      </div>
      
      {campaignData.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="text-lg font-medium mb-2">Brak danych kampanii</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nie masz jeszcze żadnych danych kampanii Google Ads.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Podsumowanie kampanii */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {campaignData.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{campaign.campaignName}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Wyświetlenia</p>
                    <p className="text-lg font-medium">{campaign.impressions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Kliknięcia</p>
                    <p className="text-lg font-medium">{campaign.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">CTR</p>
                    <p className="text-lg font-medium">{campaign.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Koszt</p>
                    <p className="text-lg font-medium">{campaign.cost} PLN</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Wykres wyświetleń */}
          <Card>
            <CardHeader>
              <CardTitle>Wyświetlenia kampanii</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={impressionsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Wyświetlenia" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Wykres kliknięć i konwersji */}
          <Card>
            <CardHeader>
              <CardTitle>Kliknięcia i konwersje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={clicksAndConversionsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="clicks"
                      stroke="#3b82f6"
                      name="Kliknięcia"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="conversions"
                      stroke="#ef4444"
                      name="Konwersje"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Wykres CTR */}
          <Card>
            <CardHeader>
              <CardTitle>CTR kampanii</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ctrData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="ctr"
                    >
                      {ctrData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-8 mt-6 md:mt-0">
                <p className="text-sm mb-4">
                  CTR (Click-Through Rate) to stosunek liczby kliknięć do liczby wyświetleń reklamy.
                  Wyższy CTR oznacza, że Twoje reklamy są bardziej atrakcyjne dla użytkowników.
                </p>
                <ul className="space-y-2">
                  {ctrData.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span>{item.name}: {item.ctr}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Campaigns;
