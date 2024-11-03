import React, { useState, useEffect } from "react";
import {
  MarketApi,
  Configuration,
  EntitiesMarket,
  DtosMarketRequest,
} from "../api";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Image,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  Grid,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Link,
  HStack,
  Divider,
  useToast,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaCloudUploadAlt, FaImage, FaPlus } from "react-icons/fa";

const Market = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token, providerId } = useAuth();
  const [markets, setMarkets] = useState<EntitiesMarket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const toast = useToast();

  const [newMarket, setNewMarket] = useState<DtosMarketRequest>({
    name: "",
    address: "",
    open_time: "",
    close_time: "",
    provider_id: providerId || "",
    description: "",
    image: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (isAuthenticated && token && providerId) {
      fetchMarkets();
    } else {
      setError("Please log in to view markets.");
      setIsLoading(false);
    }
  }, [isAuthenticated, token, providerId]);

  const fetchMarkets = async () => {
    if (!token || !providerId) {
      setError("Authentication information is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const api = new MarketApi(config);
      const response = await api.marketsProviderGetIdGet(providerId);

      if (response.data && response.data.data) {
        setMarkets(response.data.data);
      } else {
        setError("No market data found.");
      }
    } catch (err) {
      setError("Failed to fetch market data. Please try again later.");
      console.error("Error fetching markets:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const file = e.target.files[0];

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please choose an image under 5MB",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please choose an image file",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setNewMarket((prev) => ({
          ...prev,
          image: result,
        }));
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: "Your image has been successfully selected",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateMarket = async () => {
    if (!token || !providerId) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a market.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Validate required fields
    if (
      !newMarket.name ||
      !newMarket.address ||
      !newMarket.open_time ||
      !newMarket.close_time
    ) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsCreating(true);

    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const api = new MarketApi(config);
      await api.marketsCreatePost(newMarket);

      toast({
        title: "Success",
        description: "Market created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      await fetchMarkets();

      setNewMarket({
        name: "",
        address: "",
        open_time: "",
        close_time: "",
        provider_id: providerId,
        description: "",
        image: "",
        latitude: "",
        longitude: "",
      });
      setPreviewUrl("");
      setSelectedFile(null);
      onCreateClose();
    } catch (error) {
      console.error("Error creating market:", error);
      toast({
        title: "Error",
        description: "Failed to create market. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMarket((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewDetails = (market: EntitiesMarket) => {
    navigate(`/market/${market.id}`, { state: { marketId: market.id } });
  };

  // Continue with Part 2...
  // Component definitions

  const MarketCard = ({ market }: { market: EntitiesMarket }) => (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: "translateY(-8px)",
        shadow: "2xl",
      }}
      position="relative"
      shadow="md"
    >
      {market.image ? (
        <Box position="relative" height="200px">
          <Image
            src={market.image}
            alt={market.name}
            objectFit="cover"
            width="100%"
            height="100%"
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)"
          />
        </Box>
      ) : (
        <Box
          height="200px"
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.400">No Image Available</Text>
        </Box>
      )}

      <Box p={6}>
        <VStack align="stretch" spacing={4}>
          <Heading as="h3" size="md" noOfLines={1} color="gray.800">
            {market.name}
          </Heading>
          <Text color="gray.600" fontSize="sm" noOfLines={2}>
            <strong>Address:</strong> {market.address || "Not available"}
          </Text>
          <Button
            onClick={() => handleViewDetails(market)}
            colorScheme="blue"
            size="md"
            width="100%"
            _hover={{
              transform: "translateY(-2px)",
              shadow: "md",
            }}
          >
            View Details
          </Button>
        </VStack>
      </Box>
    </Box>
  );

  const CreateMarketCard = () => (
    <Box
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="blue.500"
      borderRadius="xl"
      bg="white"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: "translateY(-8px)",
        shadow: "2xl",
        borderColor: "blue.600",
        bg: "blue.50",
      }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      minHeight="360px"
      cursor="pointer"
      onClick={onCreateOpen}
      shadow="md"
    >
      <VStack spacing={4}>
        <Box
          bg="blue.50"
          p={4}
          borderRadius="full"
          transition="all 0.2s"
          _groupHover={{ bg: "blue.100" }}
        >
          <Icon
            as={FaPlus}
            w={8}
            h={8}
            color="blue.500"
            transition="all 0.2s"
            _groupHover={{ transform: "rotate(90deg)" }}
          />
        </Box>
        <Heading as="h3" size="md" color="blue.600" textAlign="center">
          Create New Market
        </Heading>
        <Text color="gray.500" fontSize="sm" textAlign="center" px={4}>
          Click here to add a new market location
        </Text>
      </VStack>
    </Box>
  );

  // Render logic

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="blue.500" thickness="6px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!isAuthenticated) {
    return (
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle mr={2}>Authentication Required</AlertTitle>
        <AlertDescription>
          Please log in to view and manage markets.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Box maxWidth="1200px" margin="auto" mt={10} p={6}>
      <Flex justifyContent="center" mb={6}>
        <Heading
          as="h1"
          size="xl"
          mb={6}
          justifyContent={"center"}
          bgGradient="linear(to-r, blue.500, blue.600)"
          bgClip="text"
          fontWeight="extrabold"
        >
          Market Management
        </Heading>
      </Flex>

      <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
        <CreateMarketCard />
      </SimpleGrid>

      <Modal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(10px)" />
        <ModalContent borderRadius="xl" p={3}>
          <ModalHeader>
            <VStack align="start" spacing={2}>
              <Heading size="lg">Create New Market</Heading>
              <Text fontSize="sm" color="gray.500">
                Fill in the details to create a new market location
              </Text>
            </VStack>
          </ModalHeader>
          <ModalCloseButton size="lg" />
          <Divider my={3} />

          <ModalBody>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel fontWeight="medium">Market Name</FormLabel>
                <Input
                  name="name"
                  value={newMarket.name}
                  onChange={handleInputChange}
                  placeholder="Enter market name"
                  size="lg"
                  variant="filled"
                  isDisabled={isCreating}
                  _hover={{ bg: "gray.100" }}
                  _focus={{ bg: "white", borderColor: "blue.500" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="medium">Address</FormLabel>
                <Input
                  name="address"
                  value={newMarket.address}
                  onChange={handleInputChange}
                  placeholder="Enter market address"
                  size="lg"
                  variant="filled"
                  isDisabled={isCreating}
                  _hover={{ bg: "gray.100" }}
                  _focus={{ bg: "white", borderColor: "blue.500" }}
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
                <FormControl isRequired>
                  <FormLabel fontWeight="medium">Opening Time</FormLabel>
                  <Input
                    name="open_time"
                    type="time"
                    value={newMarket.open_time}
                    onChange={handleInputChange}
                    size="lg"
                    variant="filled"
                    isDisabled={isCreating}
                    _hover={{ bg: "gray.100" }}
                    _focus={{ bg: "white", borderColor: "blue.500" }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="medium">Closing Time</FormLabel>
                  <Input
                    name="close_time"
                    type="time"
                    value={newMarket.close_time}
                    onChange={handleInputChange}
                    size="lg"
                    variant="filled"
                    isDisabled={isCreating}
                    _hover={{ bg: "gray.100" }}
                    _focus={{ bg: "white", borderColor: "blue.500" }}
                  />
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel fontWeight="medium">Description</FormLabel>
                <Textarea
                  name="description"
                  value={newMarket.description}
                  onChange={handleInputChange}
                  placeholder="Enter market description"
                  size="lg"
                  variant="filled"
                  rows={4}
                  isDisabled={isCreating}
                  _hover={{ bg: "gray.100" }}
                  _focus={{ bg: "white", borderColor: "blue.500" }}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="medium">
                  <HStack spacing={2}>
                    <Icon as={FaImage} />
                    <Text>Market Image</Text>
                  </HStack>
                </FormLabel>
                <Box
                  borderWidth={2}
                  borderStyle="dashed"
                  borderColor="gray.300"
                  borderRadius="lg"
                  p={8}
                  textAlign="center"
                  position="relative"
                  opacity={isCreating ? 0.7 : 1}
                  _hover={
                    !isCreating
                      ? {
                          borderColor: "blue.500",
                          bg: "blue.50",
                        }
                      : undefined
                  }
                  transition="all 0.2s"
                  cursor={isCreating ? "not-allowed" : "pointer"}
                >
                  {previewUrl ? (
                    <Box position="relative">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        maxH="200px"
                        mx="auto"
                        borderRadius="md"
                      />
                      <Button
                        position="absolute"
                        top={2}
                        right={2}
                        size="sm"
                        colorScheme="red"
                        isDisabled={isCreating}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewUrl("");
                          setSelectedFile(null);
                          setNewMarket((prev) => ({
                            ...prev,
                            image: "",
                          }));
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ) : (
                    <VStack spacing={3}>
                      <Icon
                        as={FaCloudUploadAlt}
                        w={10}
                        h={10}
                        color="blue.500"
                      />
                      <Text fontWeight="medium">
                        Drop your image here or{" "}
                        <Link color="blue.500">browse</Link>
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Supports: JPG, PNG, GIF (Max 5MB)
                      </Text>
                    </VStack>
                  )}
                  <Input
                    type="file"
                    height="100%"
                    width="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    aria-hidden="true"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isCreating}
                  />
                </Box>
              </FormControl>
            </VStack>
          </ModalBody>

          <Divider my={3} />

          <ModalFooter>
            <HStack spacing={3}>
              <Button
                variant="ghost"
                size="lg"
                onClick={onCreateClose}
                isDisabled={isCreating}
                _hover={{ bg: "gray.100" }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleCreateMarket}
                isLoading={isCreating}
                loadingText="Creating Market"
                leftIcon={!isCreating ? <FaPlus /> : undefined}
              >
                Create Market
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Market;
