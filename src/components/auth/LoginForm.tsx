import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "./SupabaseAuthContext";
import { toast } from "sonner";
import { Loader2, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithProvider, user, isAuthenticated } = useSupabaseAuth();
  const navigate = useNavigate();

  // Dodane: Efekt do przekierowania zalogowanego użytkownika
  useEffect(() => {
    console.log("Sprawdzanie autentykacji:", { isAuthenticated, user });
    
    if (isAuthenticated && user) {
      console.log("Użytkownik zalogowany, przekierowuję na stronę główną");
      // Użyj setTimeout, aby dać czas na zakończenie renderowania
      setTimeout(() => navigate("/"), 100);
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Próba logowania z danymi:", { email });
      
      const { success, error } = await login(email, password);
      
      if (success) {
        console.log("Logowanie zakończone sukcesem, toast zostanie wyświetlony");
        toast.success("Zalogowano pomyślnie");
        // Nie robimy przekierowania tutaj, przekierowanie jest obsługiwane przez useEffect
      } else {
        console.error("Błąd logowania:", error);
        toast.error(`Błąd logowania: ${error || "Nieprawidłowe dane logowania"}`);
      }
    } catch (error: any) {
      console.error("Nieoczekiwany błąd:", error);
      toast.error("Wystąpił nieoczekiwany błąd podczas logowania");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'github' | 'facebook') => {
    try {
      await loginWithProvider(provider);
    } catch (error) {
      toast.error("Wystąpił błąd podczas logowania z dostawcą zewnętrznym");
    }
  };

  // Funkcja do szybkiego logowania dla celów demonstracyjnych
  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    setIsLoading(true);
    
    try {
      console.log("Logowanie demo z użytkownikiem:", demoEmail);
      
      // Bezpośrednie logowanie z Supabase zamiast korzystania z funkcji pomocniczej
      const { data, error } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: "password"
      });
      
      if (error) {
        console.error("Błąd logowania demo:", error);
        toast.error(`Błąd logowania: ${error.message || "Nieprawidłowe dane logowania"}`);
      } else if (data && data.user) {
        console.log("Logowanie demo zakończone sukcesem", data);
        toast.success("Zalogowano pomyślnie");
        // Przekierowanie obsługiwane przez useEffect
      } else {
        toast.error("Nieznany błąd podczas logowania");
      }
    } catch (error: any) {
      console.error("Nieoczekiwany błąd:", error);
      toast.error("Wystąpił nieoczekiwany błąd podczas logowania");
    } finally {
      setIsLoading(false);
    }
  };

  // ... keep existing code (render method)
