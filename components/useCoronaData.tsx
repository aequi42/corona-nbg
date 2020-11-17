import React, { useCallback, useEffect, useState } from "react";

export function useCoronaData() {
  const baseUrl = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=IdLandkreis%3D09564&outFields=*&outSR=4326&f=json`;
  var [values, setValues] = useState<Array<{ attributes: Entry }>>([]);
  useEffect(() => {
    console.log(`in callback`);
    fetch(baseUrl)
      .then((result) => result.json())
      .then((json) => setValues(json.features));
  }, []);
  return values;
}

export type ApiResponse = {
  features: Array<{ attributes: Entry }>;
};
export type Entry = {
  Altersgruppe: string;
  Altersgruppe2: string;
  AnzahlFall: number;
  AnzahlGenesen: number;
  AnzahlTodesfall: number;
  Bundesland: "Bayern" | string;
  Datenstand: string;
  Geschlecht: "W" | "M";
  IdBundesland: number;
  IdLandkreis: string;
  IstErkrankungsbeginn: number;
  Landkreis: string;
  Meldedatum: number;
  NeuGenesen: number;
  NeuerFall: number;
  NeuerTodesfall: number;
  ObjectId: number;
  Refdatum: number;
};
