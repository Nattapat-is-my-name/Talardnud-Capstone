import React, { useState, useCallback } from "react";
import {
  Box,
  Text,
  Image,
  useDisclosure,
  VStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Center,
  Flex,
  IconButton,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { FaCloudUploadAlt, FaTrash, FaExpand } from "react-icons/fa";

interface ImageUploadProps {
  selectedImage: string | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedImage,
  setSelectedImage,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const dragBg = useColorModeValue("blue.50", "blue.900");

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        handleFile(file);
      }
    },
    [toast]
  );

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      toast({
        title: "Image uploaded",
        description: "Image has been successfully uploaded",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      handleFile(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(undefined);
    setFileName(undefined);
    toast({
      title: "Image removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="stretch" height="100%">
      <Box
        position="relative"
        borderWidth={2}
        borderStyle="dashed"
        borderColor={isDragging ? "blue.400" : borderColor}
        borderRadius="xl"
        bg={isDragging ? dragBg : "transparent"}
        _hover={{ bg: hoverBg }}
        transition="all 0.2s"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        height="auto"
      >
        {selectedImage ? (
          <Box justifyContent={"center"} h="100%">
            <Flex justifyContent={"center"} alignContent={"center"} h="100%">
              <Image
                src={selectedImage}
                alt={fileName || "Uploaded image"}
                objectFit="contain"
                maxH="100%"
                maxW="100%"
                p={4}
              />
            </Flex>

            {/* Controls */}
            <Flex
              position="absolute"
              top={4}
              right={4}
              gap={2}
              bg="blackAlpha.200"
              p={2}
              borderRadius="xl"
            >
              <Tooltip label="View full size" placement="top">
                <IconButton
                  aria-label="View full size"
                  icon={<Icon as={FaExpand} />}
                  onClick={onOpen}
                  colorScheme="blue"
                  variant="solid"
                  size="md"
                  isRound
                />
              </Tooltip>
              <Tooltip label="Remove image" placement="top">
                <IconButton
                  aria-label="Remove image"
                  icon={<Icon as={FaTrash} />}
                  onClick={handleRemoveImage}
                  colorScheme="red"
                  variant="solid"
                  size="md"
                  isRound
                />
              </Tooltip>
            </Flex>

            {/* Filename */}
            {fileName && (
              <Text
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="blackAlpha.600"
                color="white"
                p={2}
                fontSize="sm"
                textAlign="center"
              >
                {fileName}
              </Text>
            )}
          </Box>
        ) : (
          <Center height="100%">
            <VStack spacing={4} p={8} textAlign="center">
              <Icon
                as={FaCloudUploadAlt}
                w={16}
                h={16}
                color="blue.500"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.1)" }}
              />
              <Text fontSize="lg" fontWeight="medium">
                Drag and drop your image here or{" "}
                <Text
                  as="span"
                  color="blue.500"
                  textDecoration="underline"
                  cursor="pointer"
                >
                  browse
                </Text>
              </Text>
              <Text fontSize="sm" color="gray.500">
                Supports: JPG, PNG, GIF (Max 5MB)
              </Text>
            </VStack>
          </Center>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </Box>

      {/* Full screen preview modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="transparent" m={0}>
          <ModalCloseButton
            size="lg"
            color="white"
            bg="blackAlpha.500"
            _hover={{ bg: "blackAlpha.600" }}
            zIndex={9999}
          />
          <ModalBody p={0}>
            <Flex
              align="center"
              justify="center"
              width="100vw"
              height="100vh"
              bg="blackAlpha.900"
              onClick={onClose}
            >
              <Image
                src={selectedImage}
                alt={fileName || "Full size image"}
                maxW="95%"
                maxH="95vh"
                objectFit="contain"
                onClick={(e) => e.stopPropagation()}
                boxShadow="dark-lg"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ImageUpload;
