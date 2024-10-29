import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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

  // Check if the stall is booked
  const isBooked = slot.status === "booked";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Stall</ModalHeader>
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
            isDeleteDisabled={isBooked} // Pass the booked status to StallCard
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
