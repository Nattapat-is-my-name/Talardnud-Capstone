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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Divider,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
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
  onSave: (zoneId: string, updatedSlot: Slot) => void;
  onDelete: (slotId: string) => Promise<void>;
  refetchMarketDetails: () => Promise<void>;
}

const StallCard: React.FC<StallCardProps> = ({
  slot,
  zoneId,
  onSave,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
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
      const updateDTO = createUpdateDTO();
      const response = await slotsApi.slotsEditIdPatch(slot.id, updateDTO);

      if (response.data) {
        onSave(zoneId, response.data as Slot);
        toast({
          title: "Stall updated",
          description: "The stall has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setIsEditing(false);
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

  return (
    <>
      <Box
        borderWidth={1}
        borderRadius="lg"
        p={4}
        boxShadow="md"
        bg="white"
        transition="all 0.2s"
        _hover={{ boxShadow: "lg" }}
      >
        <VStack spacing={3} align="stretch">
          <Text fontSize="xl" fontWeight="bold">
            {slot.name}
          </Text>
          <Divider />
          <Text>
            Size: {slot.width} x {slot.height}
          </Text>
          <Text>Price: ${slot.price}</Text>
          <Text>Category: {slot.category}</Text>
          <Text>Status: {slot.status}</Text>
          <HStack justifyContent="space-between">
            <Button
              leftIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
              colorScheme="blue"
              size="sm"
            >
              Edit
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              onClick={handleDelete}
              colorScheme="red"
              size="sm"
              isLoading={isLoading}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Stall</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={editedSlot.name}
                  onChange={handleInputChange}
                  placeholder="Stall Name"
                />
              </FormControl>
              <HStack>
                <FormControl>
                  <FormLabel>Width</FormLabel>
                  <Input
                    name="width"
                    value={editedSlot.width}
                    onChange={handleInputChange}
                    placeholder="Width"
                    type="number"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Height</FormLabel>
                  <Input
                    name="height"
                    value={editedSlot.height}
                    onChange={handleInputChange}
                    placeholder="Height"
                    type="number"
                  />
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="$" />
                  <Input
                    name="price"
                    value={editedSlot.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    type="number"
                    step="0.01"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
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
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
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
              </FormControl>
              <HStack justifyContent="flex-end" mt={4}>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button
                  onClick={handleSave}
                  colorScheme="blue"
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StallCard;
