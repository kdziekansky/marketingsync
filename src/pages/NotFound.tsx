
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Strona nie znaleziona</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Wróć do poprzedniej strony</span>
        </Button>
        <Button className="gap-2" onClick={() => navigate("/")}>
          <Home size={16} />
          <span>Strona główna</span>
        </Button>
      </div>
    </div>
  );
}
