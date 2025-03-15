
import React, { useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";
import { useNavigate } from "react-router-dom";
import { testAuth } from "@/integrations/supabase/client";

export const Login = () => {
  const { isAuthenticated, isLoading } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Testujemy stan autoryzacji na stronie logowania
    testAuth().then(({ data }) => {
      console.log("Test auth na stronie logowania:", data);
    });

    // Jeśli użytkownik jest już zalogowany, przekieruj go na stronę główną
    if (!isLoading && isAuthenticated) {
      console.log("Użytkownik już zalogowany, przekierowuję na stronę główną");
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <LoginForm />
    </div>
  );
};

export default Login;
