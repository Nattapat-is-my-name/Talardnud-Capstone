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
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Divider,
  Tooltip,
  Badge,
  Card,
  CardBody,
  Grid,
  GridItem,
  IconButton,
  Tag,
  TagLeftIcon,
  Flex,
  Icon,
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
import { FaDollarSign, FaRuler, FaTag } from "react-icons/fa";

interface StallCardProps {
  slot: Slot;
  zoneId: string;
  onSave: (zoneId: string, updatedSlot: Slot) => void;
  onDelete: (slotId: string) => Promise<void>;
  refetchMarketDetails: () => Promise<void>;
  isDeleteDisabled?: boolean;
  deleteDisabledMessage?: string;
}

const StallCard: React.FC<StallCardProps> = ({
  slot,
  zoneId,
  onSave,
  onDelete,
  refetchMarketDetails,
  isDeleteDisabled = slot.status === "booked",
  deleteDisabledMessage = "Cannot delete a booked stall",
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
    if (isDeleteDisabled) return;

    setIsLoading(true);
    try {
      await onDelete(slot.id);
      await refetchMarketDetails();
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
    <Card
      variant="outline"
      shadow="md"
      borderRadius="xl"
      transition="all 0.2s"
      _hover={{ shadow: "xl", transform: "translateY(-2px)" }}
    >
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Flex justify="space-between" align="center">
            <HStack spacing={2}>
              <Text fontSize="xl" fontWeight="bold">
                {slot.name}
              </Text>
              <Badge
                colorScheme={slot.status === "booked" ? "red" : "green"}
                variant="subtle"
                fontSize="sm"
                px={2}
                py={1}
                borderRadius="full"
              >
                {slot.status === "booked" ? "Book" : "Available"}
              </Badge>
            </HStack>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Tag size="lg" variant="subtle" colorScheme="blue">
              <TagLeftIcon as={FaRuler} />
              <Text>
                {slot.width}m × {slot.height}m
              </Text>
            </Tag>
            <Tag size="lg" variant="subtle" colorScheme="green">
              <TagLeftIcon as={FaDollarSign} />
              <Text>${slot.price}</Text>
            </Tag>
          </Grid>

          <Tag size="lg" variant="subtle" colorScheme="purple">
            <TagLeftIcon as={FaTag} />
            <Text>{slot.category}</Text>
          </Tag>

          <Divider />

          <Flex justify="space-between" align="center">
            <Button
              leftIcon={<EditIcon />}
              colorScheme="blue"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Tooltip
              isDisabled={!isDeleteDisabled}
              label={deleteDisabledMessage}
              placement="top"
              hasArrow
            >
              <IconButton
                aria-label="Delete stall"
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                size="sm"
                isLoading={isLoading}
                isDisabled={isDeleteDisabled}
                onClick={handleDelete}
              />
            </Tooltip>
          </Flex>
        </VStack>
      </CardBody>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent borderRadius="xl">
          <ModalHeader>
            <HStack spacing={2}>
              <Text>Edit Stall</Text>
              <Badge
                colorScheme={slot.status === "booked" ? "red" : "green"}
                variant="subtle"
              >
                {slot.status}
              </Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={editedSlot.name}
                  onChange={handleInputChange}
                  variant="filled"
                  size="lg"
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel>Width (m)</FormLabel>
                  <Input
                    name="width"
                    type="number"
                    value={editedSlot.width}
                    onChange={handleInputChange}
                    variant="filled"
                    size="lg"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Height (m)</FormLabel>
                  <Input
                    name="height"
                    type="number"
                    value={editedSlot.height}
                    onChange={handleInputChange}
                    variant="filled"
                    size="lg"
                  />
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup size="lg">
                  <InputLeftAddon children="$" />
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    value={editedSlot.price}
                    onChange={handleInputChange}
                    variant="filled"
                  />
                </InputGroup>
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    name="category"
                    value={editedSlot.category}
                    onChange={handleInputChange}
                    variant="filled"
                    size="lg"
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
                    variant="filled"
                    size="lg"
                  >
                    {Object.values(EntitiesSlotStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={3}>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(false)}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSave}
                isLoading={isLoading}
                leftIcon={<EditIcon />}
              >
                Save Changes
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default StallCard;
