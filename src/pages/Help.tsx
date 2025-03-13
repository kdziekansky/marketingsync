
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pomoc</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Najczęściej zadawane pytania</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Jak dodać nowe zadanie?</AccordionTrigger>
              <AccordionContent>
                Aby dodać nowe zadanie, przejdź do sekcji "Zadania" i kliknij przycisk "Nowe zadanie".
                Wypełnij formularz i zatwierdź, aby utworzyć nowe zadanie w systemie.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Jak edytować dokumenty?</AccordionTrigger>
              <AccordionContent>
                Przejdź do sekcji "Dokumenty", a następnie kliknij na wybrany dokument lub utwórz nowy.
                W edytorze dokumentów możesz dodawać treść i formatować tekst według potrzeb.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Jak przeglądać faktury?</AccordionTrigger>
              <AccordionContent>
                W sekcji "Faktury" znajdziesz listę wszystkich faktur. Klienci mogą przeglądać swoje faktury,
                a administratorzy mają dostęp do wszystkich faktur w systemie i mogą tworzyć nowe.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Jak zmienić hasło?</AccordionTrigger>
              <AccordionContent>
                Aby zmienić hasło, przejdź do sekcji "Ustawienia", a następnie do zakładki "Profil użytkownika".
                Tam znajdziesz opcję zmiany hasła.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Kontakt z działem wsparcia</h2>
          <p className="mb-4">
            W przypadku problemów technicznych lub pytań dotyczących korzystania z platformy,
            skontaktuj się z nami:
          </p>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:support@digitalagency.pl" className="text-primary hover:underline">support@digitalagency.pl</a></li>
            <li>Telefon: +48 123 456 789 (pon-pt, 9:00-17:00)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
