
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupabaseAuth } from "@/components/auth/SupabaseAuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { success, error } = await resetPassword(email);
      
      if (success) {
        setIsSubmitted(true);
        toast.success("Link do zresetowania hasła został wysłany na podany adres email");
      } else {
        toast.error(`Błąd: ${error}`);
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh] py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Email wysłany</CardTitle>
            <CardDescription>
              Sprawdź swoją skrzynkę email, aby zresetować hasło
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Wysłaliśmy instrukcje resetowania hasła na adres {email}. Jeśli nie otrzymasz maila w ciągu kilku minut, sprawdź folder spam.
            </p>
            <Button onClick={() => navigate("/login")} className="w-full">
              Wróć do logowania
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Zresetuj hasło</CardTitle>
          <CardDescription>
            Podaj swój adres email, aby otrzymać link do zresetowania hasła
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="twoj@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Przetwarzanie...
                </>
              ) : (
                "Wyślij link resetujący"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => navigate("/login")}>
            Wróć do logowania
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
