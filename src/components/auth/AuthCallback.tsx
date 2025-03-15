
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        
        if (error) {
          setError(error.message);
          toast.error(`Błąd logowania: ${error.message}`);
          setTimeout(() => navigate("/login"), 3000);
        } else {
          toast.success("Zalogowano pomyślnie");
          navigate("/");
        }
      } catch (e: any) {
        setError(e.message);
        toast.error(`Wystąpił nieoczekiwany błąd: ${e.message}`);
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      {error ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Wystąpił błąd</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <p className="mt-4">Przekierowywanie do strony logowania...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <h2 className="text-2xl font-semibold">Logowanie...</h2>
          <p className="text-muted-foreground">Przetwarzanie logowania, proszę czekać.</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallback;
