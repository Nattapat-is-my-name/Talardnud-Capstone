import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Button,
  Input,
} from "@chakra-ui/react";
import moment from "moment";
import { Slot } from "../types";

interface ZoneCardProps {
  slot: Slot;
  onDeleteZone: (zoneId: string) => void;
  onEditStall: (zoneId: string, slot: Slot) => void;
  onAddStall: (slot: Slot, stallName: string) => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  slot,
  onDeleteZone,
  onEditStall,
  onAddStall,
}) => {
  const [newStallName, setNewStallName] = useState("");

  return (
    <Box bg="white" p={4} borderRadius="md" shadow="md">
      <VStack align="stretch" spacing={4}>
        <HStack justifyContent="space-between">
          <Heading size="md">Zone {slot.zone}</Heading>
          <Badge colorScheme="blue">
            {moment(slot.date).format("MMM D, YYYY")}
          </Badge>
        </HStack>
        <Text>Stall Name: {slot.name}</Text>
        <Text>Width: {slot.width}</Text>
        <Text>Height: {slot.height}</Text>
        <Text>Price: ${slot.price}</Text>
        <Text>Status: {slot.status}</Text>
        <Text>Category: {slot.category}</Text>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => onEditStall(slot.zone, slot)}
        >
          Edit
        </Button>
        <HStack>
          <Input
            placeholder="New stall name"
            value={newStallName}
            onChange={(e) => setNewStallName(e.target.value)}
          />
          <Button
            colorScheme="green"
            onClick={() => {
              onAddStall(slot, newStallName);
              setNewStallName("");
            }}
          >
            Add Stall
          </Button>
        </HStack>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => onDeleteZone(slot.zone)}
        >
          Delete Zone
        </Button>
      </VStack>
    </Box>
  );
};

export default ZoneCard;
