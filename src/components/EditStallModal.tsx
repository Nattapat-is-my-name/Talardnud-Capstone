import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Stall</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StallCard
            slot={slot}
            zoneId={zoneId}
            isEditing={true}
            onEdit={() => {}}
            onSave={onSave}
            onDelete={onDelete}
            onCancelEdit={onClose}
            refetchMarketDetails={refetchMarketDetails}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditStallModal;
