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
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";

const Market = () => {
  const { isAuthenticated, token, providerId } = useAuth();
  const [markets, setMarkets] = useState<EntitiesMarket[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<EntitiesMarket | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
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

    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const api = new MarketApi(config);
      const response = await api.marketsCreatePost(newMarket);
      console.log("Market created:", response.data);
      toast({
        title: "Market created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchMarkets(); // Refresh the market list
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
      onCreateClose(); // Close the create market modal
    } catch (error) {
      console.error("Error creating market:", error);
      toast({
        title: "Failed to create market.",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewMarket((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewDetails = (market: EntitiesMarket) => {
    setSelectedMarket(market);
    onDetailOpen();
  };

  const MarketCard = ({ market }: { market: EntitiesMarket }) => (
    <Box
      borderWidth={1}
      borderRadius="lg"
      p={4}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", transform: "translateY(-5px)" }}
    >
      <VStack align="stretch" spacing={3}>
        <Heading as="h3" size="md">
          {market.name}
        </Heading>
        {market.image && (
          <Image
            src={market.image}
            alt={market.name}
            borderRadius="md"
            objectFit="cover"
            height="200px"
            width="100%"
          />
        )}
        <Text>
          <strong>Address:</strong> {market.address || "Not available"}
        </Text>
        <Button onClick={() => handleViewDetails(market)} colorScheme="blue">
          View Details
        </Button>
      </VStack>
    </Box>
  );

  const CreateMarketCard = () => (
    <Box
      borderWidth={1}
      borderRadius="lg"
      p={4}
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", transform: "translateY(-5px)" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      cursor="pointer"
      onClick={onCreateOpen}
    >
      <Icon as={AddIcon} w={10} h={10} mb={4} />
      <Heading as="h3" size="md" textAlign="center">
        Create New Market
      </Heading>
    </Box>
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
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
      <Heading as="h1" size="xl" mb={6}>
        Your Markets
      </Heading>
      <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
        <CreateMarketCard />
      </SimpleGrid>

      {/* Create Market Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Market</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  value={newMarket.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={newMarket.address}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Open Time</FormLabel>
                <Input
                  name="open_time"
                  type="time"
                  value={newMarket.open_time}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Close Time</FormLabel>
                <Input
                  name="close_time"
                  type="time"
                  value={newMarket.close_time}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={newMarket.description}
                  onChange={handleInputChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateMarket}>
              Create
            </Button>
            <Button variant="ghost" onClick={onCreateClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Market Details Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedMarket?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {selectedMarket?.image && (
                <Image
                  src={selectedMarket.image}
                  alt={selectedMarket.name}
                  borderRadius="md"
                  objectFit="cover"
                  maxHeight="300px"
                  width="100%"
                />
              )}
              <Text>
                <strong>Address:</strong>{" "}
                {selectedMarket?.address || "Not available"}
              </Text>
              <Text>
                <strong>Description:</strong>{" "}
                {selectedMarket?.description || "No description available"}
              </Text>
              <Text>
                <strong>Open Time:</strong>{" "}
                {selectedMarket?.open_time || "Not specified"}
              </Text>
              <Text>
                <strong>Close Time:</strong>{" "}
                {selectedMarket?.close_time || "Not specified"}
              </Text>
              {selectedMarket?.latitude && selectedMarket?.longitude && (
                <Text>
                  <strong>Location:</strong> {selectedMarket.latitude},{" "}
                  {selectedMarket.longitude}
                </Text>
              )}
              <Text>
                <strong>Phone:</strong>{" "}
                {selectedMarket?.phone || "Not provided"}
              </Text>
              <Text>
                <strong>Created At:</strong>{" "}
                {selectedMarket?.created_at
                  ? new Date(selectedMarket.created_at).toLocaleString()
                  : "N/A"}
              </Text>
              <Text>
                <strong>Updated At:</strong>{" "}
                {selectedMarket?.updated_at
                  ? new Date(selectedMarket.updated_at).toLocaleString()
                  : "N/A"}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onDetailClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Market;
