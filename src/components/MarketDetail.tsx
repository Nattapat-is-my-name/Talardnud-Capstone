import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MarketApi, Configuration, EntitiesMarket } from "../api";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Code,
  Button,
  SimpleGrid,
  Stack,
  Container,
  Divider,
  Icon,
  Flex,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const MarketDetail = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const { isAuthenticated, token, providerId } = useAuth();
  const [market, setMarket] = useState<EntitiesMarket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && token && providerId) {
      fetchMarketDetails();
    } else {
      setError("Authentication information or market ID is missing.");
      setDebugInfo(
        `isAuthenticated: ${isAuthenticated}, token: ${
          token ? "exists" : "missing"
        }, providerId: ${providerId}`
      );
      setIsLoading(false);
    }
  }, [isAuthenticated, token, providerId]);

  const fetchMarketDetails = async () => {
    if (!token || !providerId) {
      setError("Authentication information or market ID is missing.");
      setDebugInfo(
        `token: ${token ? "exists" : "missing"}, providerId: ${providerId}`
      );
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

      console.log("API Response:", response);
      setDebugInfo(JSON.stringify(response, null, 2));

      if (response.data) {
        console.log("Response data:", response.data);
        if (response.data.data) {
          console.log("Response data.data:", response.data.data);
          if (
            Array.isArray(response.data.data) &&
            response.data.data.length > 0
          ) {
            console.log("Setting market:", response.data.data[0]);
            setMarket(response.data.data[0]);
          } else if (typeof response.data.data === "object") {
            console.log("Setting market (object):", response.data.data);
            setMarket(response.data.data as EntitiesMarket);
          } else {
            setError("Market data is in an unexpected format.");
          }
        } else {
          setError("No market data found in the response.");
        }
      } else {
        setError("No data in the response.");
      }
    } catch (err) {
      setError("Failed to fetch market details. Please try again later.");
      console.error("Error fetching market details:", err);
      setDebugInfo(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStall = () => {
    navigate("/configure");
  };

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
        <VStack align="start" spacing={3}>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Text fontWeight="bold">Debug Information:</Text>
          <Code whiteSpace="pre-wrap" width="100%">
            {debugInfo}
          </Code>
        </VStack>
      </Alert>
    );
  }

  if (!market) {
    return (
      <Alert status="warning">
        <AlertIcon />
        <VStack align="start" spacing={3}>
          <AlertTitle>Market Not Found</AlertTitle>
          <AlertDescription>
            The requested market could not be found.
          </AlertDescription>
          <Text fontWeight="bold">Debug Information:</Text>
          <Code whiteSpace="pre-wrap" width="100%">
            {debugInfo}
          </Code>
        </VStack>
      </Alert>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <Stack spacing={8}>
        <Flex align="center" justify="space-between">
          <Heading as="h1" size="2xl">
            {market.name}
          </Heading>
          <Button colorScheme="blue" onClick={handleCreateStall}>
            Create Stalls
          </Button>
        </Flex>
        <Stack direction={["column", "row"]} spacing={8}>
          {market.image && (
            <Image
              src={market.image}
              alt={market.name}
              borderRadius="lg"
              objectFit="cover"
              maxHeight={["300px", "400px"]}
              maxWidth={["100%", "50%"]}
            />
          )}
          <Box flex={1}>
            <VStack align="start" spacing={4}>
              <Text fontSize="xl">
                {market.description || "No description available"}
              </Text>
              <Divider />
              <Flex align="center">
                <Icon as={FaMapMarkerAlt} mr={2} />
                <Text>{market.address || "Not available"}</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaPhone} mr={2} />
                <Text>{market.phone || "Not provided"}</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaClock} mr={2} />
                <Text>Open: {market.open_time || "Not specified"}</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaClock} mr={2} />
                <Text>Close: {market.close_time || "Not specified"}</Text>
              </Flex>
              {market.latitude && market.longitude && (
                <Text>
                  <strong>Location:</strong> {market.latitude},{" "}
                  {market.longitude}
                </Text>
              )}
            </VStack>
          </Box>
        </Stack>
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Stalls
          </Heading>
          {market.slots && market.slots.length > 0 ? (
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
              {market.slots.map((slot, index) => (
                <Box
                  key={index}
                  borderWidth={1}
                  borderRadius="lg"
                  p={4}
                  boxShadow="md"
                >
                  <Heading as="h3" size="md" mb={2}>
                    Slot {index + 1}
                  </Heading>
                  <VStack align="start" spacing={2}>
                    <Text>
                      <strong>Date:</strong>{" "}
                      {new Date(slot.date).toLocaleDateString()}
                    </Text>
                    <Text>
                      <strong>Category:</strong> {slot.category}
                    </Text>
                    <Text>
                      <strong>Price:</strong> ${slot.price}
                    </Text>
                    <Badge
                      colorScheme={
                        slot.status === "available" ? "green" : "red"
                      }
                    >
                      {slot.status}
                    </Badge>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Alert status="info">
              <AlertIcon />
              No stalls have been created for this market yet.
            </Alert>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default MarketDetail;
