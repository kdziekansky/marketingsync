
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";

export const useRequireAuth = (redirectUrl = "/login") => {
  const { user, isLoading } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Przekieruj tylko gdy proces ładowania się zakończył i nie ma użytkownika
    if (!isLoading && !user) {
      console.log("useRequireAuth: Brak zalogowanego użytkownika, przekierowuję do", redirectUrl);
      navigate(redirectUrl);
    }
  }, [user, isLoading, navigate, redirectUrl]);

  return { user, isLoading };
};

export default useRequireAuth;
