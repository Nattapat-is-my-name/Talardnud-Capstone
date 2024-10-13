import { useCallback } from "react";
import { useMarket } from "../contexts/MarketProvider";
import { useToast } from "@chakra-ui/react";
import { Zone, Stall } from "../types";

const useStallManagement = () => {
  const { setZones } = useMarket();
  const toast = useToast();

  const handleEditStall = useCallback(
    (zoneId: number, stall: Stall) => {
      return { zoneId, stall };
    },
    []
  );

  const handleSaveStall = useCallback(
    (zoneId: number, updatedStall: Stall) => {
      setZones((prevZones) =>
        prevZones.map((zone) =>
          zone.id === zoneId
            ? {
                ...zone,
                stalls: zone.stalls.map((stall) =>
                  stall.id === updatedStall.id ? updatedStall : stall
                ),
              }
            : zone
        )
      );
      toast({
        title: "Stall updated",
        description: "The stall has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [setZones, toast]
  );

  const handleDeleteStall = useCallback(
    (zoneId: number, stallId: number) => {
      setZones((prevZones) =>
        prevZones.map((zone) =>
          zone.id === zoneId
            ? {
                ...zone,
                stalls: zone.stalls.filter((stall) => stall.id !== stallId),
              }
            : zone
        )
      );
      toast({
        title: "Stall deleted",
        description: "The stall has been successfully deleted.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    },
    [setZones, toast]
  );

  const handleAddStall = useCallback(
    (zone: Zone, newStallName: string) => {
      if (!newStallName.trim()) {
        toast({
          title: "Invalid stall name",
          description: "Please enter a valid stall name.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setZones((prevZones) =>
        prevZones.map((z) => {
          if (z.id === zone.id) {
            const newStall: Stall = {
              ...z.stallConfiguration,
              id: Date.now(),
              name: newStallName.trim(),
            };
            return {
              ...z,
              stalls: [...z.stalls, newStall],
            };
          }
          return z;
        })
      );
      toast({
        title: "Stall added",
        description: "A new stall has been successfully added to the zone.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [setZones, toast]
  );

  return {
    handleEditStall,
    handleSaveStall,
    handleDeleteStall,
    handleAddStall,
  };
};

export default useStallManagement;