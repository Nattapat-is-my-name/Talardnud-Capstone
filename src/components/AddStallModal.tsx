import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { Slot } from "../types";
import { EntitiesCategory, EntitiesSlotStatus } from "../api";

interface AddStallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStall: (newStall: Partial<Slot>) => void;
  zoneId: string;
  date: string;
}

const AddStallModal: React.FC<AddStallModalProps> = ({
  isOpen,
  onClose,
  onAddStall,
  zoneId,
  date,
}) => {
  const [newStall, setNewStall] = useState<Partial<Slot>>({
    name: "",
    width: 0,
    height: 0,
    price: 0,
    category: EntitiesCategory.CategoryFood,
    status: EntitiesSlotStatus.StatusAvailable,
    zone: zoneId,
    date: date,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStall((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (name: string, value: number) => {
    setNewStall((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAddStall(newStall);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Stall</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={newStall.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Width</FormLabel>
              <NumberInput
                min={0}
                onChange={(valueAsString, valueAsNumber) =>
                  handleNumberInputChange("width", valueAsNumber)
                }
                value={newStall.width}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Height</FormLabel>
              <NumberInput
                min={0}
                onChange={(valueAsString, valueAsNumber) =>
                  handleNumberInputChange("height", valueAsNumber)
                }
                value={newStall.height}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <NumberInput
                min={0}
                onChange={(valueAsString, valueAsNumber) =>
                  handleNumberInputChange("price", valueAsNumber)
                }
                value={newStall.price}
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={newStall.category}
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
                value={newStall.status}
                onChange={handleInputChange}
              >
                {Object.values(EntitiesSlotStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add Stall
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddStallModal;
