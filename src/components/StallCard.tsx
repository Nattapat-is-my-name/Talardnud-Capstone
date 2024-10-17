import React, { useState } from "react";
import { Box, VStack, HStack, Input, Button, Text } from "@chakra-ui/react";
import { Slot } from "../types";

interface StallCardProps {
  slot: Slot;
  zoneId: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (zoneId: string, updatedSlot: Slot) => void;
  onDelete: () => void;
  onCancelEdit: () => void;
}

const StallCard: React.FC<StallCardProps> = ({
  slot,
  zoneId,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancelEdit,
}) => {
  const [editedSlot, setEditedSlot] = useState<Slot>(slot);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSlot((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(zoneId, editedSlot);
  };

  if (isEditing) {
    return (
      <Box borderWidth={1} borderRadius="lg" p={4}>
        <VStack spacing={4} align="stretch">
          <Input
            name="name"
            value={editedSlot.name}
            onChange={handleInputChange}
            placeholder="Stall Name"
          />
          <Input
            name="width"
            value={editedSlot.width}
            onChange={handleInputChange}
            placeholder="Width"
            type="number"
          />
          <Input
            name="height"
            value={editedSlot.height}
            onChange={handleInputChange}
            placeholder="Height"
            type="number"
          />
          <Input
            name="price"
            value={editedSlot.price}
            onChange={handleInputChange}
            placeholder="Price"
            type="number"
          />
          <HStack>
            <Button onClick={handleSave} colorScheme="blue">
              Save
            </Button>
            <Button onClick={onCancelEdit}>Cancel</Button>
          </HStack>
        </VStack>
      </Box>
    );
  }

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <VStack spacing={2} align="stretch">
        <Text>Name: {slot.name}</Text>
        <Text>Width: {slot.width}</Text>
        <Text>Height: {slot.height}</Text>
        <Text>Price: ${slot.price}</Text>
        <HStack>
          <Button onClick={onEdit} colorScheme="blue">
            Edit
          </Button>
          <Button onClick={onDelete} colorScheme="red">
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default StallCard;
