
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Help = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pomoc</h1>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Jak korzystać z platformy</h2>
          <p className="mb-4">
            Ta platforma umożliwia zarządzanie zadaniami, dokumentami, fakturami oraz kampaniami marketingowymi.
          </p>
          <p>
            W razie potrzeby, skontaktuj się z działem wsparcia pod adresem <a href="mailto:support@digitalagency.pl" className="text-primary hover:underline">support@digitalagency.pl</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
