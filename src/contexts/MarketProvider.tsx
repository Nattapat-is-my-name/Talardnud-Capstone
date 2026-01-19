import React, { createContext, useContext, useEffect, useState } from "react";
import { Zone } from "../types";
interface MarketContextType {
  zones: Zone[];
  setZones: React.Dispatch<React.SetStateAction<Zone[]>>;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  marketId: string | null; // Add this line
  setMarketId: React.Dispatch<React.SetStateAction<string | null>>; // Add this line
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [marketId, setMarketId] = useState<string | null>(null);

  useEffect(() => {
    const storedZones = localStorage.getItem("generatedZones");
    if (storedZones) {
      setZones(JSON.parse(storedZones));
    }
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("generatedZones", JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    if (selectedImage) {
      localStorage.setItem("selectedImage", selectedImage);
    } else {
      localStorage.removeItem("selectedImage");
    }
  }, [selectedImage]);

  return (
    <MarketContext.Provider
      value={{
        zones,
        setZones,
        selectedImage,
        setSelectedImage,
        marketId,
        setMarketId,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
};
