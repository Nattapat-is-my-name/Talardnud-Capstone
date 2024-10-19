import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useToast,
  Select,
} from "@chakra-ui/react";
import { Slot } from "../types";
import {
  SlotsApi,
  Configuration,
  DtosSlotUpdateDTO,
  EntitiesSlotStatus,
  EntitiesCategory,
} from "../api";

interface StallCardProps {
  slot: Slot;
  zoneId: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (zoneId: string, updatedSlot: Slot) => void;
  onDelete: (slotId: string) => Promise<void>;
  onCancelEdit: () => void;
  refetchMarketDetails: () => Promise<void>;
}

const StallCard: React.FC<StallCardProps> = ({
  slot,
  zoneId,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  onCancelEdit,
  refetchMarketDetails,
}) => {
  const [editedSlot, setEditedSlot] = useState<Slot>(slot);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedSlot((prev) => ({ ...prev, [name]: value }));
  };

  const createUpdateDTO = (): DtosSlotUpdateDTO => {
    const dto: DtosSlotUpdateDTO = {
      name: editedSlot.name !== slot.name ? editedSlot.name : undefined,
      width:
        editedSlot.width !== slot.width
          ? parseFloat(editedSlot.width.toString())
          : undefined,
      height:
        editedSlot.height !== slot.height
          ? parseFloat(editedSlot.height.toString())
          : undefined,
      price:
        editedSlot.price !== slot.price
          ? parseFloat(editedSlot.price.toString())
          : undefined,
      category:
        editedSlot.category !== slot.category
          ? (editedSlot.category as EntitiesCategory)
          : undefined,
      status:
        editedSlot.status !== slot.status
          ? (editedSlot.status as EntitiesSlotStatus)
          : undefined,
    };

    return dto;
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
      });
      const slotsApi = new SlotsApi(config);
      console.log("Updating slot:", slot.id);

      const updateDTO = createUpdateDTO();
      console.log("Update DTO:", updateDTO);
      const response = await slotsApi.slotsEditIdPatch(slot.id, updateDTO);

      console.log("Updated slot:", response.data);
      if (response.data) {
        onSave(zoneId, response.data as Slot);
        toast({
          title: "Stall updated",
          description: "The stall has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        await refetchMarketDetails();
      } else {
        throw new Error("No data returned from API");
      }
    } catch (error) {
      console.error("Error updating stall:", error);
      toast({
        title: "Error",
        description: "Failed to update the stall. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(slot.id);
      toast({
        title: "Stall deleted",
        description: "The stall has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await refetchMarketDetails();
    } catch (error) {
      console.error("Error deleting stall:", error);
      toast({
        title: "Error",
        description: "Failed to delete the stall. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
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
            step="0.01"
          />
          <Select
            name="category"
            value={editedSlot.category}
            onChange={handleInputChange}
          >
            {Object.values(EntitiesCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Select
            name="status"
            value={editedSlot.status}
            onChange={handleInputChange}
          >
            {Object.values(EntitiesSlotStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>

          <HStack>
            <Button
              onClick={handleSave}
              colorScheme="blue"
              isLoading={isLoading}
            >
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
        <Text>Category: {slot.category}</Text>
        <Text>Status: {slot.status}</Text>
        <HStack>
          <Button onClick={onEdit} colorScheme="blue">
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            colorScheme="red"
            isLoading={isLoading}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default StallCard;
