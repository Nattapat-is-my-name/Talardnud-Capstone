import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Image,
  useDisclosure,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";

interface ImageUploadProps {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  setSelectedImage,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <VStack spacing={8} align="stretch" height="100%">
      <Heading as="h2" size="xl">
        Layout Upload
      </Heading>
      <FormControl>
        <FormLabel fontSize="xl">Choose a layout image</FormLabel>
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
      <Button
        onClick={onOpen}
        isDisabled={!selectedImage}
        colorScheme="blue"
        size="lg"
        height="60px"
        fontSize="xl"
        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
      >
        View Full Image
      </Button>
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
