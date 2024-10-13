import { useCallback } from "react";
import { useMarket } from "../contexts/MarketProvider";
import { useToast } from "@chakra-ui/react";

const useZoneManagement = () => {
  const { setZones } = useMarket();
  const toast = useToast();

  const handleDeleteZone = useCallback(
    (zoneId: number) => {
      setZones((prevZones) => prevZones.filter((zone) => zone.id !== zoneId));
      toast({
        title: "Zone deleted",
        description: "The zone has been successfully deleted.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    },
    [setZones, toast]
  );

  return { handleDeleteZone };
};

export default useZoneManagement;