
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const CampaignDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isNewCampaign = id === "new" || !id;
  
  const [campaign, setCampaign] = useState({
    id: isNewCampaign ? `campaign-${Date.now()}` : "",
    name: "",
    description: "",
    status: "draft",
    clientId: user?.clientId || "",
    startDate: "",
    endDate: "",
    budget: 0,
    platform: "google_ads"
  });

  useEffect(() => {
    if (!isNewCampaign && id) {
      // In a real app, fetch campaign data from API
      // For demo, we'll just show a toast
      toast.info("Ładowanie danych kampanii...");
    }
  }, [id, isNewCampaign]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!campaign.name.trim()) {
      toast.error("Nazwa kampanii jest wymagana");
      return;
    }

    // In a real app, this would save to an API or database
    toast.success(`Kampania "${campaign.name}" została zapisana`);
    
    // For demo purposes, let's simply go back to the campaigns list
    navigate("/campaigns");
  };

  const canEditCampaign = user && (
    user.role === "admin" || 
    user.role === "superadmin" || 
    user.role === "employee"
  );

  if (!canEditCampaign) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/campaigns")}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">Brak dostępu</h1>
        </div>
        <p>Nie masz uprawnień do edycji kampanii.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => navigate("/campaigns")}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-bold">
            {isNewCampaign ? "Nowa kampania" : "Edycja kampanii"}
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
            <label htmlFor="name" className="font-medium">Nazwa kampanii</label>
            <Input 
              id="name"
              name="name"
              value={campaign.name}
              onChange={handleInputChange}
              placeholder="Wprowadź nazwę kampanii"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">Opis</label>
            <Textarea 
              id="description"
              name="description"
              value={campaign.description}
              onChange={handleInputChange}
              placeholder="Wprowadź opis kampanii"
              rows={5}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="platform" className="font-medium">Platforma</label>
              <select 
                id="platform"
                name="platform"
                value={campaign.platform}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="google_ads">Google Ads</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="font-medium">Status</label>
              <select 
                id="status"
                name="status"
                value={campaign.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="draft">Szkic</option>
                <option value="active">Aktywna</option>
                <option value="paused">Wstrzymana</option>
                <option value="completed">Zakończona</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="font-medium">Data rozpoczęcia</label>
              <Input 
                id="startDate"
                name="startDate"
                type="date"
                value={campaign.startDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="endDate" className="font-medium">Data zakończenia</label>
              <Input 
                id="endDate"
                name="endDate"
                type="date"
                value={campaign.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="budget" className="font-medium">Budżet (PLN)</label>
            <Input 
              id="budget"
              name="budget"
              type="number"
              value={campaign.budget.toString()}
              onChange={handleInputChange}
              min="0"
              step="100"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetails;
