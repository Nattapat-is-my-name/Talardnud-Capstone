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
import { Zone, Stall } from "../types";

interface ZoneCardProps {
  zone: Zone;
  onDeleteZone: (zoneId: number) => void;
  onEditStall: (zoneId: number, stall: Stall) => void;
  onAddStall: (zone: Zone, stallName: string) => void;
}

const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  onDeleteZone,
  onEditStall,
  onAddStall,
}) => {
  const [newStallName, setNewStallName] = useState("");

  return (
    <Box bg="white" p={4} borderRadius="md" shadow="md">
      <VStack align="stretch" spacing={4}>
        <HStack justifyContent="space-between">
          <Heading size="md">Zone {zone.zone}</Heading>
          <Badge colorScheme="blue">
            {moment(zone.date).format("MMM D, YYYY")}
          </Badge>
        </HStack>
        <Text>Number of Stalls: {zone.stalls.length}</Text>
        <Text>
          Stall Names: {zone.stalls.map((s: Stall) => s.name).join(", ")}
        </Text>
        <VStack align="stretch" spacing={2}>
          {zone.stalls.map((stall: Stall) => (
            <HStack
              key={stall.id}
              justifyContent="space-between"
              bg="gray.50"
              p={2}
              borderRadius="md"
            >
              <Text>{stall.name}</Text>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => onEditStall(zone.id, stall)}
              >
                Edit
              </Button>
            </HStack>
          ))}
        </VStack>
        <HStack>
          <Input
            placeholder="New stall name"
            value={newStallName}
            onChange={(e) => setNewStallName(e.target.value)}
          />
          <Button
            colorScheme="green"
            onClick={() => {
              onAddStall(zone, newStallName);
              setNewStallName("");
            }}
          >
            Add Stall
          </Button>
        </HStack>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => onDeleteZone(zone.id)}
        >
          Delete Zone
        </Button>
      </VStack>
    </Box>
  );
};

export default ZoneCard;
