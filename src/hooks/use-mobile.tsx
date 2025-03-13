
import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Sprawdź przy pierwszym renderowaniu
    checkDevice();

    // Dodaj event listener na zmiany rozmiaru okna
    window.addEventListener("resize", checkDevice);

    // Wyczyść event listener przy odmontowaniu
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return isMobile;
};

// Dodajemy alias dla kompatybilności wstecznej
export const useIsMobile = useMobile;
