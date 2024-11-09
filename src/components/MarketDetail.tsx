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
  Card,
  CardBody,
  CardHeader,
  Icon,
  Stack,
  Image,
  BoxProps,
  Select,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
  StackDivider,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaPlus,
  FaArrowLeft,
  FaExpand,
  FaDollarSign,
  FaRuler,
  FaTag,
  FaUser,
  FaLock,
  FaShoppingCart,
  FaUnlock,
} from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { isValidMotionProp, motion, MotionProps } from "framer-motion";
import moment, { Moment } from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { EditIcon } from "@chakra-ui/icons";

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
  const [selectedDate, setSelectedDate] = useState<string>(""); // State to store selected date
  const [selectedZone, setSelectedZone] = useState<string | null>(null); // State to store selected zone
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
    refetchMarketDetails();
  }, [isAuthenticated, token, providerId, marketId]);

  const refetchMarketDetails = async () => {
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

      const marketData =
        Array.isArray((response.data as any)?.data) &&
        (response.data as any).data.length > 0
          ? (response.data as any).data[0]
          : null;
      console.log("Market data:", marketData?.address);

      if (marketData) {
        setMarket(marketData);
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

  const handleEditProfile = () => {
    if (market) {
      navigate(`/market/${market.id}/edit`);
    } else {
      console.error("Cannot edit profile: market is null");
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

  // Find the closest upcoming date
  const today = moment();

  const hasSlots = market?.slots && market.slots.length > 0;
  const allDates = Object.keys(groupedSlots)
    .filter((date) => {
      const slotDate = moment(date);
      if (startDate && endDate) {
        return slotDate.isBetween(startDate, endDate, "day", "[]");
      }
      return slotDate.isSameOrAfter(today); // Only consider future or today dates
    })
    .sort((a, b) => moment(a).diff(moment(b))); // Sort all dates

  // Default the selected date to the closest date or the first available date
  useEffect(() => {
    if (allDates.length > 0 && !selectedDate) {
      setSelectedDate(allDates[0]);
    }
  }, [allDates, selectedDate]);

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
      <Button
        leftIcon={<Icon as={FaArrowLeft} />}
        variant="ghost"
        _hover={{
          transform: "translateX(-4px)",
          transition: "all 0.2s",
        }}
        onClick={() => navigate(`/market`)}
      >
        Back to All Market
      </Button>
      <Box width="40px" />
      <VStack spacing={8} align="stretch">
        <Flex justify="end" align="center">
          <Flex gap={4}>
            <Button
              leftIcon={<Icon as={MdOutlineAnalytics} />}
              colorScheme="orange"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md",
              }}
              onClick={() => {
                navigate(`/report`, {
                  state: { marketId: market.id },
                });
              }}
            >
              Market Report
            </Button>
            <Button
              leftIcon={<Icon as={EditIcon} />}
              colorScheme="blue"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md",
              }}
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </Flex>
        </Flex>
        <Card bg={cardBgColor} shadow="md">
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
                <Heading as="h1" size="2xl">
                  {market.name}
                </Heading>
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
              <Alert
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  No layout image available for this market. Please upload
                </AlertTitle>
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={() =>
                    navigate("/configure", {
                      state: { marketId: market.id },
                    })
                  }
                >
                  Upload Layout
                </Button>
              </Alert>
            )}
          </CardBody>
        </Card>

        <Modal isOpen={isOpen} onClose={handleClose} size="7xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={market.layout_image}
                alt={`${market.name} Layout`}
                objectFit="contain"
                width="100%"
                height="auto"
                maxHeight="80vh"
                borderRadius="lg"
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Flex align="center" justify="flex-end" mb={4}>
          <Flex align="center">
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate("/generated-zones", { state: { marketId: marketId } });
              }}
              leftIcon={<Icon as={EditIcon} />}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md",
              }}
              ml={4}
            >
              Edit Stall
            </Button>

            <Button
              colorScheme="blue"
              onClick={handleCreateStall}
              leftIcon={<Icon as={FaPlus} />}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md",
              }}
              ml={4}
            >
              Create Stalls
            </Button>
          </Flex>
        </Flex>

        {market.slots && market.slots.length > 0 ? (
          <>
            <Flex align="center" justify="space-between" mb={4}>
              <Select
                placeholder="Select date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                variant="filled"
                borderRadius="md"
                bg={cardBgColor}
                _hover={{ bg: "gray.200" }}
                _focus={{ boxShadow: "outline" }}
              >
                {allDates.map((date) => (
                  <option key={date} value={date}>
                    {moment(date).format("MMMM D, YYYY")}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="All Zones"
                value={selectedZone || ""}
                onChange={(e) => setSelectedZone(e.target.value || null)}
                variant="filled"
                borderRadius="md"
                bg={cardBgColor}
                _hover={{ bg: "gray.200" }}
                _focus={{ boxShadow: "outline" }}
              >
                {Object.keys(groupedSlots[selectedDate] || {}).map(
                  (zoneName) => (
                    <option key={zoneName} value={zoneName}>
                      Zone {zoneName} (
                      {groupedSlots[selectedDate][zoneName].length})
                    </option>
                  )
                )}
              </Select>
            </Flex>

            {selectedDate && groupedSlots[selectedDate] && (
              <Box key={selectedDate} mb={8}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h2" size="xl" mb={4}>
                    {moment(selectedDate).format("MMMM D, YYYY")}
                  </Heading>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text pr={5} fontWeight="bold">
                      Total Zones:{" "}
                      {Object.keys(groupedSlots[selectedDate]).length}
                    </Text>
                    <Text fontWeight="bold">
                      Total Stalls:{" "}
                      {Object.values(groupedSlots[selectedDate]).reduce(
                        (total, slots) => total + slots.length,
                        0
                      )}
                    </Text>
                  </Flex>
                </Flex>

                {Object.entries(groupedSlots[selectedDate])
                  .filter(([zoneName]) =>
                    selectedZone ? zoneName === selectedZone : true
                  )
                  .map(([zoneName, slots]) => (
                    <Card
                      key={zoneName}
                      bg="white"
                      shadow="md"
                      mb={8}
                      borderRadius="2xl"
                      overflow="hidden"
                      borderWidth="1px"
                      borderColor="gray.100"
                    >
                      {/* Zone Header with Gradient */}
                      <Box
                        bgGradient="linear(to-r, blue.400, blue.600)"
                        color="white"
                        py={6}
                        px={8}
                      >
                        <Stack
                          direction={["column", "row"]}
                          justify="space-between"
                          align="center"
                          spacing={6}
                        >
                          {/* Left side - Zone Info */}
                          <HStack spacing={4}>
                            <Box bg="whiteAlpha.200" p={3} borderRadius="lg">
                              <Icon as={FaMapMarkerAlt} boxSize={6} />
                            </Box>
                            <VStack align="start" spacing={1}>
                              <Text fontSize="sm" opacity={0.9}>
                                Market Zone
                              </Text>
                              <Heading size="lg">Zone {zoneName}</Heading>
                            </VStack>
                          </HStack>

                          {/* Right side - Stats Cards */}
                          <Wrap spacing={4} justify={["center", "flex-end"]}>
                            <WrapItem>
                              <Box
                                bg="whiteAlpha.200"
                                backdropFilter="blur(10px)"
                                borderRadius="xl"
                                px={6}
                                py={3}
                                textAlign="center"
                              >
                                <Text fontSize="2xl" fontWeight="bold">
                                  {
                                    slots.filter(
                                      (slot) => slot.status === "available"
                                    ).length
                                  }
                                </Text>
                                <Text fontSize="sm" opacity={0.9}>
                                  Available
                                </Text>
                              </Box>
                            </WrapItem>
                            <WrapItem>
                              <Box
                                bg="whiteAlpha.200"
                                backdropFilter="blur(10px)"
                                borderRadius="xl"
                                px={6}
                                py={3}
                                textAlign="center"
                              >
                                <Text fontSize="2xl" fontWeight="bold">
                                  {
                                    slots.filter(
                                      (slot) => slot.status === "booked"
                                    ).length
                                  }
                                </Text>
                                <Text fontSize="sm" opacity={0.9}>
                                  Booked
                                </Text>
                              </Box>
                            </WrapItem>
                            <WrapItem>
                              <Box
                                bg="whiteAlpha.200"
                                backdropFilter="blur(10px)"
                                borderRadius="xl"
                                px={6}
                                py={3}
                                textAlign="center"
                              >
                                <Text fontSize="2xl" fontWeight="bold">
                                  {slots.length}
                                </Text>
                                <Text fontSize="sm" opacity={0.9}>
                                  Total
                                </Text>
                              </Box>
                            </WrapItem>
                          </Wrap>
                        </Stack>
                      </Box>

                      {/* Slots Grid */}
                      <SimpleGrid columns={[1, 2, 3, 4]} gap={6} p={6}>
                        {slots.map((slot, index) => (
                          <Box
                            key={index}
                            bg="white"
                            borderRadius="xl"
                            overflow="hidden"
                            transition="all 0.2s"
                            position="relative"
                            borderWidth="1px"
                            borderColor="gray.100"
                            _hover={{
                              transform: "translateY(-2px)",
                              shadow: "lg",
                              borderColor: "blue.100",
                            }}
                          >
                            {/* Status Indicator */}
                            <Box
                              position="absolute"
                              top={4}
                              right={4}
                              bg={
                                slot.status === "available"
                                  ? "green.400"
                                  : "red.400"
                              }
                              w={2}
                              h={2}
                              borderRadius="full"
                            />

                            <VStack align="stretch" h="100%">
                              {/* Slot Header */}
                              <Box p={4} bg="gray.50">
                                <HStack justify="space-between" align="center">
                                  <VStack align="start" spacing={1}>
                                    <Text
                                      fontSize="lg"
                                      fontWeight="bold"
                                      bgGradient="linear(to-r, blue.500, blue.600)"
                                      bgClip="text"
                                    >
                                      {slot.name}
                                    </Text>
                                    <Badge
                                      colorScheme={
                                        slot.status === "available"
                                          ? "green"
                                          : "red"
                                      }
                                      variant="subtle"
                                      borderRadius="full"
                                      px={3}
                                      py={1}
                                      textTransform="capitalize"
                                      fontSize="xs"
                                    >
                                      {slot.status}
                                    </Badge>
                                  </VStack>
                                  <Box
                                    p={3}
                                    borderRadius="lg"
                                    bg={
                                      slot.status === "available"
                                        ? "green.50"
                                        : "red.50"
                                    }
                                  >
                                    <Icon
                                      as={
                                        slot.status === "available"
                                          ? FaUnlock
                                          : FaLock
                                      }
                                      color={
                                        slot.status === "available"
                                          ? "green.500"
                                          : "red.500"
                                      }
                                      boxSize={4}
                                    />
                                  </Box>
                                </HStack>
                              </Box>

                              {/* Slot Details */}
                              <VStack p={4} spacing={3} flex={1}>
                                <HStack w="full" justify="space-between">
                                  <HStack spacing={3}>
                                    <Icon as={FaRuler} color="gray.400" />
                                    <Text fontSize="sm" color="gray.600">
                                      Dimensions
                                    </Text>
                                  </HStack>
                                  <Text fontSize="sm" fontWeight="medium">
                                    {slot.width}m × {slot.height}m
                                  </Text>
                                </HStack>

                                <HStack w="full" justify="space-between">
                                  <HStack spacing={3}>
                                    <Icon as={FaTag} color="gray.400" />
                                    <Text fontSize="sm" color="gray.600">
                                      Category
                                    </Text>
                                  </HStack>
                                  <Text fontSize="sm" fontWeight="medium">
                                    {slot.category}
                                  </Text>
                                </HStack>

                                <HStack w="full" justify="space-between">
                                  <HStack spacing={3}>
                                    <Icon as={FaDollarSign} color="gray.400" />
                                    <Text fontSize="sm" color="gray.600">
                                      Price
                                    </Text>
                                  </HStack>
                                  <Text
                                    fontSize="sm"
                                    fontWeight="bold"
                                    color="blue.500"
                                  >
                                    ฿{slot.price}
                                  </Text>
                                </HStack>

                                {slot.Booker && (
                                  <HStack w="full" justify="space-between">
                                    <HStack spacing={3}>
                                      <Icon as={FaUser} color="gray.400" />
                                      <Text fontSize="sm" color="gray.600">
                                        Booked By
                                      </Text>
                                    </HStack>
                                    <Text fontSize="sm" fontWeight="medium">
                                      {slot.Booker}
                                    </Text>
                                  </HStack>
                                )}
                              </VStack>
                            </VStack>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Card>
                  ))}
              </Box>
            )}
          </>
        ) : (
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No Stalls Available
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              This market currently has no stalls. Click the "Create Stalls"
              button above to add stalls to this market.
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </Container>
  );
};

export default MarketDetail;
