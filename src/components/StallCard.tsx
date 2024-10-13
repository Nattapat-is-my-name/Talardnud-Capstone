import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Stall } from "../types";

interface StallCardProps {
  stall: Stall;
  zoneId: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (zoneId: number, updatedStall: Stall) => void;
  onDelete: () => void;
  onCancelEdit: () => void;
}

const StallCard: React.FC<StallCardProps> = ({
  stall,
  zoneId,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancelEdit,
}) => {
  const [editedStall, setEditedStall] = useState<Stall>(stall);

  const handleInputChange = (field: keyof Stall, value: string | number) => {
    setEditedStall((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(zoneId, editedStall);
  };

  if (!isEditing) {
    return (
      <Box p={4} borderWidth={1} borderRadius="md">
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="bold">{stall.name}</Text>
          <Text>Number of Stalls: {stall.numberOfStalls}</Text>
          <Text>
            Dimensions: {stall.width}m x {stall.height}m
          </Text>
          <Text>Type: {stall.stallType}</Text>
          <Text>Price: ${stall.pricePerStall}</Text>
          <Button onClick={onEdit}>Edit</Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <VStack align="stretch" spacing={4}>
        <Input
          value={editedStall.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Stall Name"
        />
        <NumberInput
          value={editedStall.numberOfStalls}
          onChange={(_, value) => handleInputChange("numberOfStalls", value)}
          min={1}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <HStack>
          <NumberInput
            value={editedStall.width}
            onChange={(_, value) => handleInputChange("width", value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            value={editedStall.height}
            onChange={(_, value) => handleInputChange("height", value)}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <Input
          value={editedStall.stallType}
          onChange={(e) => handleInputChange("stallType", e.target.value)}
          placeholder="Stall Type"
        />
        <NumberInput
          value={editedStall.pricePerStall}
          onChange={(_, value) => handleInputChange("pricePerStall", value)}
          min={0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <HStack>
          <Button onClick={handleSave} colorScheme="green">
            Save
          </Button>
          <Button onClick={onCancelEdit}>Cancel</Button>
          <Button onClick={onDelete} colorScheme="red">
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default StallCard;
