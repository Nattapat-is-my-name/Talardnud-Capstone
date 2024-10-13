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
import { Stall } from "../types";
import StallCard from "./StallCard";

interface EditStallModalProps {
  isOpen: boolean;
  onClose: () => void;
  stall: Stall | null;
  zoneId: number | null;
  onSave: (zoneId: number, updatedStall: Stall) => void;
  onDelete: (zoneId: number, stallId: number) => void;
}

const EditStallModal: React.FC<EditStallModalProps> = ({
  isOpen,
  onClose,
  stall,
  zoneId,
  onSave,
  onDelete,
}) => {
  if (!stall || !zoneId) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Stall</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StallCard
            stall={stall}
            zoneId={zoneId}
            isEditing={true}
            onEdit={() => {}}
            onSave={onSave}
            onDelete={() => {
              onDelete(zoneId, stall.id);
              onClose();
            }}
            onCancelEdit={onClose}
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
