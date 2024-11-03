import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Badge,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Slot } from "../types";
import StallCard from "./StallCard";

interface EditStallModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: Slot | null;
  zoneId: string | null;
  onSave: (zoneId: string, updatedSlot: Slot) => void;
  onDelete: (slotId: string) => Promise<void>;
  refetchMarketDetails: () => Promise<void>;
}

const EditStallModal: React.FC<EditStallModalProps> = ({
  isOpen,
  onClose,
  slot,
  zoneId,
  onSave,
  onDelete,
  refetchMarketDetails,
}) => {
  if (!slot || !zoneId) return null;
  const isBooked = slot.status === "booked";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius="xl">
        <ModalHeader>
          <HStack spacing={2}>
            <Text fontSize="lg">Edit Stall Details</Text>
            <Badge
              colorScheme={isBooked ? "red" : "green"}
              variant="subtle"
              px={2}
              py={1}
              borderRadius="full"
            >
              {isBooked ? "Book" : "Available"}
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <StallCard
            slot={slot}
            zoneId={zoneId}
            onSave={(zoneId, updatedSlot) => {
              onSave(zoneId, updatedSlot);
              onClose();
            }}
            onDelete={async (slotId) => {
              await onDelete(slotId);
              onClose();
            }}
            refetchMarketDetails={refetchMarketDetails}
            isDeleteDisabled={isBooked}
            deleteDisabledMessage={
              isBooked ? "Cannot delete a booked stall" : undefined
            }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditStallModal;
