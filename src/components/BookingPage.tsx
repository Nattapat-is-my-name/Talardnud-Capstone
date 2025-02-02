import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Stack,
  Heading,
  Button,
  Card,
  CardBody,
  Alert,
  AlertIcon,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  Text,
  Icon,
  Select,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  IconButton,
} from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaFilter,
  FaSync,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Configuration, BookingsApi, MarketApi, EntitiesMarket } from "../api";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";

interface BookingResponse {
  data: {
    data: EntitiesBooking[];
    message: string;
    status: string;
  };
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}

interface EntitiesBooking {
  id?: string;
  slot_id?: string;
  slot?: any;
  vendor_id?: string;
  market_id?: string;
  vendor?: {
    id?: string;
    username?: string;
    email?: string;
    image?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
    bookings?: any;
  };
  booking_date?: string;
  status?: string;
  method?: string;
  price?: number;
  payment?: any;
  created_at?: string;
  updated_at?: string;
  expires_at?: string;
}

interface BookingStats {
  total: number;
  completed: number;
  cancelled: number;
  pending: number;
  refund: number;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, providerId } = useAuth();
  const [markets, setMarkets] = useState<EntitiesMarket[]>([]);
  const [selectedMarketId, setSelectedMarketId] = useState<string>("");
  const [bookings, setBookings] = useState<EntitiesBooking[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMarkets, setIsLoadingMarkets] = useState(true);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdated, setLastUpdated] = useState<string>(
    moment().format("MMM D, YYYY HH:mm")
  );

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headerGradient = useColorModeValue(
    "linear(to-r, blue.400, blue.600)",
    "linear(to-r, blue.200, blue.400)"
  );
  const textColor = useColorModeValue("gray.700", "white");
  const statBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  // Keep the existing helper functions and hooks
  const formatSlotInfo = useCallback((slotId: string | undefined) => {
    if (!slotId) return { zone: "N/A", slot: "N/A" };
    const parts = slotId.split("-");
    if (parts.length >= 7) {
      return {
        zone: `Zone ${parts[5]}`,
        slot: `Slot ${parts[6]}-${parts[7]}`,
      };
    }
    return { zone: "Unknown", slot: slotId };
  }, []);

  // Keep existing fetch functions
  const fetchMarkets = useCallback(async () => {
    if (!token || !providerId) {
      setIsLoadingMarkets(false);
      return;
    }
    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const marketApi = new MarketApi(config);
      const response = await marketApi.marketsProviderGetIdGet(providerId);

      if (response.data?.data && Array.isArray(response.data.data)) {
        setMarkets(response.data.data);
        if (response.data.data.length > 0 && response.data.data[0].id) {
          setSelectedMarketId(response.data.data[0].id);
        }
      } else {
        setMarkets([]);
      }
    } catch (err) {
      console.error("Error fetching markets:", err);
    } finally {
      setIsLoadingMarkets(false);
    }
  }, [token, providerId]);

  const fetchBookings = useCallback(async () => {
    if (!selectedMarketId || !token) {
      setBookings([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const bookingsApi = new BookingsApi(config);

      const response = (await bookingsApi.bookingsMarketIdGet(
        selectedMarketId
      )) as unknown as BookingResponse;

      if (response.status === 200 && Array.isArray(response.data.data)) {
        setBookings(response.data.data);

        // Update the timestamp when new data is received
        setLastUpdated(moment().format("MMM D, YYYY HH:mm"));
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMarketId, token]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  useEffect(() => {
    if (selectedMarketId) fetchBookings();
  }, [fetchBookings, selectedMarketId]);

  const getBookingStats = useCallback((): BookingStats => {
    if (!bookings)
      return {
        total: 0,
        completed: 0,
        cancelled: 0,
        pending: 0,
        refund: 0,
      };

    return bookings.reduce(
      (acc: BookingStats, booking) => {
        acc.total++;
        if (booking.status === "completed") acc.completed++;
        else if (booking.status === "cancelled") acc.cancelled++;
        else if (booking.status === "refund") acc.refund++;
        else acc.pending++;
        return acc;
      },
      { total: 0, completed: 0, cancelled: 0, pending: 0, refund: 0 }
    );
  }, [bookings]);

  const sortBookings = useCallback(
    (key: keyof EntitiesBooking) => {
      if (!bookings) return;

      const sortedBookings = [...bookings].sort((a, b) => {
        let valueA = a[key];
        let valueB = b[key];

        if (key === "booking_date" || key === "created_at") {
          valueA = moment(valueA as string).valueOf();
          valueB = moment(valueB as string).valueOf();
        }

        if (sortOrder === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });

      setBookings(sortedBookings);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setSortKey(key);
    },
    [bookings, sortOrder]
  );

  const filteredBookings = bookings?.filter((booking) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.vendor?.username?.toLowerCase().includes(searchLower) ||
      booking.id?.toLowerCase().includes(searchLower) ||
      booking.status?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusTextColor = (type: string): string => {
    switch (type) {
      case "completed":
        return "green.600";
      case "cancelled":
        return "red.600";
      case "pending":
        return "yellow.600";
      case "refund":
        return "orange.600";
      default:
        return "blue.600";
    }
  };

  const getStatusColor = (status: string | undefined): string => {
    switch (status) {
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      case "refund":
        return "orange";
      default:
        return "yellow";
    }
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="8xl" py={8}>
        <Stack spacing={6}>
          {/* Header Section */}
          <HStack justify="space-between" align="center" mb={2}>
            <Button
              leftIcon={<Icon as={FaArrowLeft} />}
              variant="ghost"
              size="lg"
              onClick={() => navigate("/markets")}
              _hover={{ transform: "translateX(-4px)", transition: "all 0.2s" }}
            >
              Back to Markets
            </Button>
            <Heading
              size="lg"
              bgGradient={headerGradient}
              bgClip="text"
              fontWeight="extrabold"
            >
              Market Bookings
            </Heading>
          </HStack>

          {/* Market Selection Card */}
          <Card
            bg={cardBgColor}
            borderColor={borderColor}
            borderWidth="1px"
            shadow="sm"
          >
            <CardBody>
              <FormControl>
                <FormLabel fontWeight="medium">Select Market</FormLabel>
                {isLoadingMarkets ? (
                  <Spinner size="sm" color="blue.500" />
                ) : (
                  <Select
                    value={selectedMarketId}
                    onChange={(e) => setSelectedMarketId(e.target.value)}
                    placeholder="Choose a market"
                    size="lg"
                  >
                    {markets.map((market) => (
                      <option key={market.id} value={market.id || ""}>
                        {market.name}
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
            </CardBody>
          </Card>

          {selectedMarketId && (
            <Card
              bg={cardBgColor}
              borderColor={borderColor}
              borderWidth="1px"
              shadow="sm"
            >
              <CardBody>
                <Stack spacing={6}>
                  {/* Replace the existing Stats Section with this */}
                  {bookings && (
                    <Box>
                      <HStack
                        spacing={4}
                        bg="white"
                        p={2}
                        borderRadius="lg"
                        shadow="sm"
                        justifyContent={"end"}
                      >
                        <HStack>
                          <IconButton
                            aria-label="Refresh data"
                            icon={<Icon as={FaSync} />}
                            size="sm"
                            variant="ghost"
                            onClick={() => fetchBookings()}
                            isLoading={isLoading}
                            _hover={{
                              bg: "gray.50",
                              transform: "rotate(180deg)",
                              transition: "all 0.3s ease",
                            }}
                            borderRadius="full"
                          />

                          <Text>
                            Last updated:{" "}
                            <Text as="span" color="gray.700">
                              {moment(lastUpdated).format("MMM D, YYYY HH:mm")}
                            </Text>
                          </Text>
                        </HStack>
                      </HStack>
                      <SimpleGrid
                        columns={{ base: 2, md: 5 }}
                        spacing={4}
                        mb={6}
                      >
                        {Object.entries(getBookingStats()).map(
                          ([key, value]) => (
                            <Card
                              key={key}
                              bg={cardBgColor}
                              boxShadow="sm"
                              borderWidth="1px"
                              borderColor={borderColor}
                              borderRadius="lg"
                              transition="all 0.2s"
                              _hover={{
                                boxShadow: "md",
                                transform: "translateY(-2px)",
                              }}
                            >
                              <CardBody p={4}>
                                <Stat textAlign="center">
                                  <StatLabel
                                    fontSize="sm"
                                    color={
                                      key !== "total"
                                        ? getStatusTextColor(key)
                                        : "gray.500"
                                    }
                                    fontWeight="medium"
                                    textTransform="capitalize"
                                    mb={2}
                                  >
                                    {key}
                                  </StatLabel>
                                  <StatNumber
                                    fontSize={{ base: "2xl", md: "3xl" }}
                                    fontWeight="bold"
                                    color={textColor}
                                    my={2}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    {value}
                                  </StatNumber>
                                  {key !== "total" && value > 0 && (
                                    <StatHelpText
                                      fontSize="xs"
                                      color={getStatusTextColor(key)}
                                      display="inline-flex"
                                      alignItems="center"
                                      justifyContent="center"
                                      gap={1}
                                      margin={0}
                                      opacity={0.8}
                                    >
                                      {(
                                        (value / getBookingStats().total) *
                                        100
                                      ).toFixed(1)}
                                      %
                                    </StatHelpText>
                                  )}
                                  {value === 0 && (
                                    <StatHelpText
                                      fontSize="xs"
                                      color="gray.400"
                                      margin={0}
                                    >
                                      No data
                                    </StatHelpText>
                                  )}
                                </Stat>
                              </CardBody>
                            </Card>
                          )
                        )}
                      </SimpleGrid>
                    </Box>
                  )}

                  {/* Search and Filters */}
                  <HStack justify="space-between">
                    <InputGroup maxW="300px">
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaSearch} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                    <Menu>
                      <MenuButton as={Button} leftIcon={<Icon as={FaFilter} />}>
                        Filter
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          onClick={() =>
                            sortBookings(
                              "booking_date" as keyof EntitiesBooking
                            )
                          }
                        >
                          By Date
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            sortBookings("status" as keyof EntitiesBooking)
                          }
                        >
                          By Status
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => setSearchTerm("")}>
                          Clear Filters
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>

                  {/* Bookings Table */}
                  {isLoading ? (
                    <Flex justify="center" align="center" minH="200px">
                      <Spinner size="xl" color="blue.500" thickness="4px" />
                    </Flex>
                  ) : filteredBookings && filteredBookings.length > 0 ? (
                    <Box overflowX="auto">
                      <Table variant="simple" colorScheme="gray">
                        <Thead>
                          <Tr>
                            <Th
                              onClick={() =>
                                sortBookings(
                                  "booking_date" as keyof EntitiesBooking
                                )
                              }
                              cursor="pointer"
                            >
                              <HStack spacing={1}>
                                <Text>Booking Date</Text>
                                {sortKey === "booking_date" && (
                                  <Icon
                                    as={
                                      sortOrder === "asc"
                                        ? FaSortUp
                                        : FaSortDown
                                    }
                                  />
                                )}
                              </HStack>
                            </Th>
                            <Th
                              onClick={() =>
                                sortBookings(
                                  "vendor_id" as keyof EntitiesBooking
                                )
                              }
                              cursor="pointer"
                            >
                              Vendor
                            </Th>
                            <Th
                              onClick={() =>
                                sortBookings("status" as keyof EntitiesBooking)
                              }
                              cursor="pointer"
                            >
                              Status
                            </Th>
                            <Th>Zone - Slot</Th>
                            <Th>Booking ID</Th>
                            <Th
                              onClick={() =>
                                sortBookings(
                                  "created_at" as keyof EntitiesBooking
                                )
                              }
                              cursor="pointer"
                            >
                              Created At
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {filteredBookings.map((booking) => {
                            const { zone, slot } = formatSlotInfo(
                              booking.slot_id
                            );
                            return (
                              <Tr key={booking.id} _hover={{ bg: hoverBg }}>
                                <Td>
                                  {moment(booking.booking_date).format(
                                    "MMM D, YYYY"
                                  )}
                                </Td>
                                <Td>{booking.vendor?.username || "N/A"}</Td>
                                <Td>
                                  <Badge
                                    colorScheme={getStatusColor(booking.status)}
                                    px={2}
                                    py={1}
                                    borderRadius="full"
                                    variant="subtle"
                                  >
                                    {booking.status || "Unknown"}
                                  </Badge>
                                </Td>
                                <Td>
                                  {zone !== "N/A"
                                    ? `${zone} - ${slot}`
                                    : "Not Found"}
                                </Td>
                                <Td>
                                  <Text as="span" fontFamily="mono">
                                    {booking.id}
                                  </Text>
                                </Td>
                                <Td>
                                  {booking.created_at
                                    ? `${new Date(
                                        booking.created_at
                                      ).toLocaleString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })} ${booking.created_at
                                        .split("T")[1]
                                        .substring(0, 5)}`
                                    : "N/A"}
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>

                      <Text mt={4} color="gray.500" fontSize="sm">
                        Showing {filteredBookings.length} of {bookings?.length}{" "}
                        bookings
                      </Text>
                    </Box>
                  ) : (
                    <Alert status="info" variant="subtle">
                      <AlertIcon />
                      No bookings found
                    </Alert>
                  )}
                </Stack>
              </CardBody>
            </Card>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default BookingPage;
