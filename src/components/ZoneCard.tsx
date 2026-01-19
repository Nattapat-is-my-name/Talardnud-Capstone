import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Slot } from "../types";
import AddStallModal from "./AddStallModal";

interface ZoneCardProps {
  zone: string;
  slots: Slot[];
  date: string;
  onDeleteZone: (zoneId: string, date: string) => void;
  onEditStall: (zoneId: string, slot: Slot) => void;
  onAddStall: (newStall: Partial<Slot>) => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  slots,
  date,
  onDeleteZone,
  onEditStall,
  onAddStall,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddStall = (newStall: Partial<Slot>) => {
    onAddStall(newStall);
    setIsAddModalOpen(false);
  };

  // Check if there are any booked stalls
  const hasBookedStalls = slots.some((slot) => slot.status === "booked");

  return (
    <Box bg="white" p={4} borderRadius="md" shadow="md">
      <VStack align="stretch" spacing={4}>
        <HStack justifyContent="space-between">
          <Heading size="md">Zone {zone}</Heading>
          <Badge colorScheme="blue">{date}</Badge>
        </HStack>
        <Text>Number of Stalls: {slots.length}</Text>
        <Text>
          Available:{" "}
          {slots.filter((slot) => slot.status === "available").length} / Booked:{" "}
          {slots.filter((slot) => slot.status === "booked").length}
        </Text>

        {slots.map((slot) => (
          <HStack key={slot.id} justifyContent="space-between">
            <Flex justify="space-between" alignItems="center" w="100%">
              <Text>{slot.name}</Text>
              <Flex alignItems="center">
                <Badge
                  colorScheme={slot.status === "available" ? "green" : "red"}
                >
                  {slot.status === "booked" ? "Book" : slot.status}
                </Badge>
                <Button
                  size="sm"
                  ml={2}
                  colorScheme="blue"
                  onClick={() => onEditStall(zone, slot)}
                >
                  Edit
                </Button>
              </Flex>
            </Flex>
          </HStack>
        ))}
        <Button colorScheme="green" onClick={() => setIsAddModalOpen(true)}>
          Add Stall
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          isDisabled={hasBookedStalls}
          onClick={() => onDeleteZone(zone, date)}
          title={
            hasBookedStalls
              ? "Cannot delete zone with booked stalls"
              : "Delete zone"
          }
        >
          Delete Zone
        </Button>
      </VStack>

      <AddStallModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStall={handleAddStall}
        zoneId={zone}
        date={date}
      />
    </Box>
  );
};

export default ZoneCard;
