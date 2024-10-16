import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MarketApi, Configuration, EntitiesMarket } from "../api";
import {
  Box,
  BoxProps,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
} from "@chakra-ui/react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaExpand,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { motion, MotionProps, isValidMotionProp } from "framer-motion";

export type MotionBoxProps = BoxProps & MotionProps;

export const MotionBox = React.forwardRef<HTMLDivElement, MotionBoxProps>(
  (props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );

    return <Box ref={ref} as={motion.div} {...chakraProps} />;
  }
);

const MarketDetail: React.FC = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const { isAuthenticated, token, providerId } = useAuth();
  const [market, setMarket] = useState<EntitiesMarket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const cardBgColor = useColorModeValue("white", "gray.800");

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
    if (market) {
      navigate("/configure", { state: { marketId: market.id } });
    } else {
      console.error("Cannot create stall: market is null");
    }
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
      <VStack spacing={8} align="stretch">
        <Card bg={cardBgColor} shadow="md">
          <CardHeader>
            <Heading as="h1" size="2xl">
              {market.name}
            </Heading>
          </CardHeader>
          <CardBody>
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
              <VStack align="start" spacing={4} flex={1}>
                <Text fontSize="xl">
                  {market.description || "No description available"}
                </Text>
                <Divider />
                <Flex align="center">
                  <Icon as={FaMapMarkerAlt} mr={2} color="blue.500" />
                  <Text>{market.address || "Not available"}</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaPhone} mr={2} color="green.500" />
                  <Text>{market.phone || "Not provided"}</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaClock} mr={2} color="orange.500" />
                  <Text>Open: {market.open_time || "Not specified"}</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaClock} mr={2} color="orange.500" />
                  <Text>Close: {market.close_time || "Not specified"}</Text>
                </Flex>
                {market.latitude && market.longitude && (
                  <Text>
                    <strong>Location:</strong> {market.latitude},{" "}
                    {market.longitude}
                  </Text>
                )}
              </VStack>
            </Stack>
          </CardBody>
        </Card>

        <Card bg={cardBgColor} shadow="md">
          <CardHeader>
            <Heading as="h2" size="xl">
              Market Layout
            </Heading>
          </CardHeader>
          <CardBody>
            {market.layout_image && market.layout_image.trim() !== "" ? (
              <MotionBox
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                onClick={handleOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box position="relative" maxWidth="800px" width="100%">
                  <Image
                    src={market.layout_image}
                    alt={`${market.name} Layout`}
                    objectFit="cover"
                    width="100%"
                    height="auto"
                    maxHeight="600px"
                    borderRadius="lg"
                  />
                  <Tooltip label="Click to expand">
                    <Icon
                      as={FaExpand}
                      position="absolute"
                      top={2}
                      right={2}
                      color="white"
                      bg="rgba(0,0,0,0.5)"
                      p={2}
                      borderRadius="md"
                      boxSize={8}
                    />
                  </Tooltip>
                </Box>
              </MotionBox>
            ) : (
              <Alert status="info">
                <AlertIcon />
                No layout image available for this market.
              </Alert>
            )}
          </CardBody>
        </Card>

        <Modal isOpen={isOpen} onClose={handleClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={market.layout_image}
                alt={`${market.name} Layout`}
                objectFit="contain"
                width="100%"
                height="100vh"
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Card bg={cardBgColor} shadow="md">
          <CardHeader>
            <Flex align="center" justify="space-between">
              <Heading as="h2" size="xl">
                Stalls
              </Heading>
              <Button
                colorScheme="blue"
                onClick={handleCreateStall}
                leftIcon={<Icon as={FaPlus} />}
              >
                Create Stalls
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            {market.slots && market.slots.length > 0 ? (
              <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                {market.slots.map((slot, index) => (
                  <MotionBox
                    key={index}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={4}
                    boxShadow="md"
                    bg={bgColor}
                    whileHover={{ y: -5 }}
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
                  </MotionBox>
                ))}
              </SimpleGrid>
            ) : (
              <Alert status="info">
                <AlertIcon />
                No stalls have been created for this market yet.
              </Alert>
            )}
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default MarketDetail;
