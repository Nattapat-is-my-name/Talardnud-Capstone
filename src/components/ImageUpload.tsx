import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Image,
  useDisclosure,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ImageUploadProps {
  selectedImage: string | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  setSelectedImage,
}) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <VStack spacing={8} align="stretch" height="100%">
      <FormControl>
        <FormLabel fontSize="xl">Choose a market image</FormLabel>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          p={4}
          fontSize="lg"
          height="auto"
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="xl"
        />
      </FormControl>
      {fileName && (
        <Text fontSize="lg" color="gray.600">
          File selected: {fileName}
        </Text>
      )}
      {selectedImage && (
        <Box overflow="hidden" w="100%" h="auto" mt={6} flex="1">
          <Image
            src={selectedImage}
            alt={fileName || "Uploaded image"}
            objectFit="contain"
            w="100%"
            h="100%"
            maxH="500px"
            rounded="lg"
            cursor="pointer"
            onClick={onOpen}
          />
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="rgba(0,0,0,0.0)">
          <ModalCloseButton size="lg" color="white" />
          <ModalBody p={0}>
            <Flex
              align="center"
              justify="center"
              width="100vw"
              height="100vh"
              onClick={handleBackdropClick}
            >
              <Image
                src={selectedImage || ""}
                alt={fileName || "Zoomed image"}
                maxW="95%"
                maxH="95vh"
                objectFit="contain"
                onClick={(e) => e.stopPropagation()}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ImageUpload;
