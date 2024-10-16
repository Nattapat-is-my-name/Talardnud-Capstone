import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MarketApi, Configuration, EntitiesMarket, EntitiesSlot } from "../api";
import {
  Box,
  Heading,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Code,
  Button,
  SimpleGrid,
  Container,
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
  Icon,
  Stack,
  Image,
  Tooltip,
  BoxProps,
} from "@chakra-ui/react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaExpand,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { isValidMotionProp, motion, MotionProps } from "framer-motion";
import { DateRangePicker } from "react-dates";
import moment, { Moment } from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

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

  // Date filter states
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const bgColor = useColorModeValue("gray.50", "gray.700");
  const cardBgColor = useColorModeValue("white", "gray.800");

  useEffect(() => {
    if (isAuthenticated && token && marketId) {
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
    if (!token || !marketId) {
      setError("Authentication information or market ID is missing.");
      setDebugInfo(
        `token: ${token ? "exists" : "missing"}, marketId: ${marketId}`
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
      console.log("Fetching market details for marketId :", marketId);
      const response = await api.marketsGetIdGet(marketId);
      console.log("API Response:", response);
      setDebugInfo(JSON.stringify(response, null, 2));

      if (response.data && response.data.data) {
        setMarket(response.data.data[0] || null);
      } else {
        setError("No market data found in the response.");
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

  // Group slots by date and then by zone
  const groupedSlots =
    market?.slots?.reduce((acc, slot) => {
      const slotDate = moment(slot.date).format("YYYY-MM-DD");
      if (!acc[slotDate]) acc[slotDate] = {};
      const zone = slot.zone || "Uncategorized";
      if (!acc[slotDate][zone]) acc[slotDate][zone] = [];
      acc[slotDate][zone].push(slot);
      return acc;
    }, {} as Record<string, Record<string, EntitiesSlot[]>>) || {};

  // Filter slots by date range
  const filteredDates = Object.keys(groupedSlots).filter((date) => {
    if (startDate && endDate) {
      const slotDate = moment(date);
      return slotDate.isBetween(startDate, endDate, "day", "[]");
    }
    return true; // Show all dates if no range is selected
  });

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
    <Container maxW="8xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Card bg={cardBgColor} shadow="md">
          <CardHeader>
            <Heading as="h1" size="2xl">
              {market.name}
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack direction={["column", "row"]} spacing={8}>
              <Image
                src={market.image}
                alt={market.name}
                borderRadius="lg"
                objectFit="cover"
                maxH={["300px", "400px"]}
                maxW={["100%", "50%"]}
              />

              <VStack align="start" spacing={4} flex={1}>
                <Text fontSize="xl">
                  {market.description || "No description available"}
                </Text>
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
                No layout image available for this market. Please upload
              </Alert>
            )}
          </CardBody>
        </Card>

        <Flex align="center" justify="space-between" mb={4}>
          <Box>
            <DateRangePicker
              startDate={startDate}
              startDateId="start-date-id"
              endDate={endDate}
              endDateId="end-date-id"
              onDatesChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
              focusedInput={focusedInput}
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
              isOutsideRange={() => false} // Allow past dates
              displayFormat="YYYY-MM-DD"
            />
          </Box>

          <Button
            colorScheme="blue"
            onClick={handleCreateStall}
            leftIcon={<Icon as={FaPlus} />}
            ml={4} // Adds space between DateRangePicker and Button
          >
            Create Stalls
          </Button>
        </Flex>

        {/* Render grouped stalls by date and zone */}
        {filteredDates.length > 0 ? (
          filteredDates.map((date) => (
            <Box key={date} mb={8}>
              <Heading as="h2" size="xl" mb={4}>
                {moment(date).format("MMMM D, YYYY")}
              </Heading>

              {Object.entries(groupedSlots[date]).map(([zoneName, slots]) => (
                <Card key={zoneName} bg={cardBgColor} shadow="md" mb={4}>
                  <CardHeader>
                    <Flex justify="space-between" align="center">
                      <Heading as="h3" size="lg">
                        Zone {zoneName}
                      </Heading>
                      <Text>Number of Stalls: {slots.length}</Text>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
                      {slots.map((slot, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.02 }}>
                          <Box
                            borderWidth="1px"
                            borderRadius="lg"
                            p={4}
                            boxShadow="md"
                            bg={bgColor}
                          >
                            <Heading as="h4" size="md" mb={2}>
                              Slot {slot.name}
                            </Heading>
                            <VStack align="start" spacing={2}>
                              <Text>
                                <strong>Width:</strong> {slot.width} meters
                              </Text>
                              <Text>
                                <strong>Height:</strong> {slot.height} meters
                              </Text>
                              <Text>
                                <strong>Price:</strong> ${slot.price}
                              </Text>
                              <Badge colorScheme="green">Available</Badge>
                            </VStack>
                          </Box>
                        </motion.div>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
              ))}
            </Box>
          ))
        ) : (
          <Alert status="info">
            <AlertIcon />
            No stalls are available for the selected date range.
          </Alert>
        )}
      </VStack>
    </Container>
  );
};

export default MarketDetail;
