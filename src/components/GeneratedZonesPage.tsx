import {
  AddIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
  Spinner,
  Stack,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import moment from "moment";
import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaPlus,
  FaSearch
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Configuration,
  DtosLayoutRequest,
  EntitiesSlot,
  MarketApi,
  SlotsApi,
} from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Slot } from "../types";

const LazyZoneCard = lazy(() => import("../components/ZoneCard"));
const LazyEditStallModal = lazy(() => import("../components/EditStallModal"));

const ITEMS_PER_PAGE = 10;

// Helper function to convert EntitiesSlot to Slot
const convertToSlot = (entitySlot: EntitiesSlot): Slot => ({
  id: entitySlot.id || "",
  market_id: entitySlot.market_id || "",
  name: entitySlot.name || "",
  zone: entitySlot.zone || "",
  width: entitySlot.width || 0,
  height: entitySlot.height || 0,
  price: entitySlot.price || 0,
  status: entitySlot.status || "",
  category: entitySlot.category || "",
  date: entitySlot.date || "",
  created_at: entitySlot.created_at || "",
  updated_at: entitySlot.updated_at || "",
});

// Helper function to check if a date is current or future
const isCurrentOrFutureDate = (date: string): boolean => {
  const today = moment().startOf("day");
  return moment(date).isSameOrAfter(today);
};

const GeneratedZonesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [marketName, setMarketName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNoStalls, setHasNoStalls] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const toast = useToast();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [expandedDates, setExpandedDates] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const handleGoBack = () => {
    navigate(-1);
  };

  type SortField = "name" | "zone" | "price" | "status" | "category";
  type SortOrder = "asc" | "desc";

  interface SortConfig {
    field: SortField;
    order: SortOrder;
  }

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "name",
    order: "asc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const sortSlots = (slots: Slot[], config: SortConfig) => {
    return [...slots].sort((a, b) => {
      if (config.field === "price") {
        const numA = parseFloat(a[config.field].toString());
        const numB = parseFloat(b[config.field].toString());
        return config.order === "asc" ? numA - numB : numB - numA;
      }

      const valueA = a[config.field]?.toString().toLowerCase() ?? "";
      const valueB = b[config.field]?.toString().toLowerCase() ?? "";

      if (config.order === "asc") {
        return valueA.localeCompare(valueB);
      }
      return valueB.localeCompare(valueA);
    });
  };

  const refetchMarketDetails = useCallback(async () => {
    if (!token || !location.state?.marketId) {
      console.error("Missing token or marketId:", {
        token: !!token,
        marketId: location.state?.marketId,
      });
      setHasNoStalls(true);
      setIsLoading(false);
      return;
    }

    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const slotapi = new SlotsApi(config);
      const market = new MarketApi(config);

      const [slotresponse, marketresponse] = await Promise.all([
        slotapi.slotsProviderGetIdGet(location.state.marketId),
        market.marketsGetIdGet(location.state.marketId),
      ]);

      if (slotresponse.data && Array.isArray(slotresponse.data)) {
        const convertedSlots = slotresponse.data
          .map(convertToSlot)
          .filter((slot) => isCurrentOrFutureDate(slot.date)); // Filter out past dates
        setSlots(convertedSlots);
        setHasNoStalls(convertedSlots.length === 0);

        // Set the default selected date to the current date if available, otherwise the earliest future date
        if (convertedSlots.length > 0) {
          const today = moment().format("YYYY-MM-DD");
          const availableDates = Array.from(
            new Set(
              convertedSlots.map((slot) =>
                moment(slot.date).format("YYYY-MM-DD")
              )
            )
          ).sort();

          const defaultDate = availableDates.includes(today)
            ? today
            : availableDates[0];

          setSelectedDate(defaultDate);
        }
      } else {
        setHasNoStalls(true);
      }

      const marketData =
        Array.isArray((marketresponse.data as any)?.data) &&
        (marketresponse.data as any).data.length > 0
          ? (marketresponse.data as any).data[0]
          : null;

      if (marketData) {
        setMarketName(marketData.name || "Unknown Market");
      }
    } catch (err) {
      console.error("Error fetching stall details:", err);
      setHasNoStalls(true);
    } finally {
      setIsLoading(false);
    }
  }, [token, location.state]);

  // Get unique dates from slots (already filtered for current/future dates)
  const availableDates = Array.from(
    new Set(slots.map((slot) => moment(slot.date).format("YYYY-MM-DD")))
  ).sort();

  // Filter slots by the selected date
  const filteredSlots = slots.filter((slot: Slot) =>
    selectedDate
      ? moment(slot.date).format("YYYY-MM-DD") === selectedDate
      : true
  );

  useEffect(() => {
    refetchMarketDetails();
  }, [refetchMarketDetails]);

  const groupSlotsByZone = useCallback((slots: Slot[]) => {
    const groups: { [key: string]: Slot[] } = {};
    slots.forEach((slot: Slot) => {
      if (!groups[slot.zone]) groups[slot.zone] = [];
      groups[slot.zone].push(slot);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const groupedSlots = useCallback(() => {
    const groups: { [key: string]: Slot[] } = {};
    filteredSlots.forEach((slot: Slot) => {
      const dateKey = moment(slot.date).format("YYYY-MM-DD");
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(slot);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredSlots]);

  const paginatedGroupedSlots = useCallback(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return groupedSlots().slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [groupedSlots, currentPage]);

  const handleOpenEditModal = useCallback((zoneId: string, slot: Slot) => {
    setSelectedZoneId(zoneId);
    setSelectedSlot(slot);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setSelectedZoneId(null);
    setSelectedSlot(null);
  }, []);

  const toggleDateExpand = useCallback((dateKey: string) => {
    setExpandedDates((prev) => ({ ...prev, [dateKey]: !prev[dateKey] }));
  }, []);

  const handleSaveStall = useCallback(
    async (zoneId: string, updatedSlot: Slot) => {
      console.log(`Saving stall in zone ${zoneId}:`, updatedSlot);
      toast({
        title: "Stall Saved",
        description: `Stall ${updatedSlot.name} has been updated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await refetchMarketDetails();
    },
    [toast, refetchMarketDetails]
  );

  const handleDeleteStall = useCallback(
    async (slotId: string) => {
      if (!token) {
        console.error("Missing token");
        toast({
          title: "Error",
          description: "Authentication information is missing.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      try {
        const config = new Configuration({
          basePath: process.env.REACT_APP_API_BASE_URL,
          accessToken: token,
        });
        const slotsApi = new SlotsApi(config);

        const response = await slotsApi.slotsDeleteIdDelete(slotId);
        console.log("Deleted stall:", response.data);

        toast({
          title: "Stall deleted",
          description: "The stall has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        await refetchMarketDetails();
      } catch (error) {
        console.error("Error deleting stall:", error);
        toast({
          title: "Error",
          description: "Failed to delete the stall. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [toast, refetchMarketDetails, token]
  );

  const handleDeleteZone = useCallback(
    async (zoneId: string, date: string) => {
      if (!token || !location.state?.marketId) {
        console.error("Missing token or marketId");
        toast({
          title: "Error",
          description: "Authentication information or market ID is missing.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const formattedDate = moment(date).format("YYYY-MM-DD");

      try {
        const config = new Configuration({
          basePath: process.env.REACT_APP_API_BASE_URL,
          accessToken: token,
        });
        const slotsApi = new SlotsApi(config);

        const response = await slotsApi.slotsDeleteIdZoneZoneIDDateDateDelete(
          location.state.marketId,
          zoneId,
          formattedDate
        );

        console.log("Deleted zone:", response.data);

        toast({
          title: "Zone deleted",
          description: `All stalls in zone ${zoneId} for ${date} have been successfully deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        await refetchMarketDetails();
      } catch (error) {
        console.error("Error deleting zone:", error);
        toast({
          title: "Error",
          description: `Failed to delete zone ${zoneId}. Please try again.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [toast, refetchMarketDetails, token, location.state]
  );
  const TableView: React.FC<{
    slots: Slot[];
    onEditStall: (zoneId: string, slot: Slot) => void;
    sortConfig: SortConfig;
    onSort: (field: SortField) => void;
  }> = ({ slots, onEditStall, sortConfig, onSort }) => {
    const getSortIcon = (field: SortField) => {
      if (sortConfig.field !== field) return null;
      return sortConfig.order === "asc" ? "↑" : "↓";
    };

    const renderSortableHeader = (field: SortField, label: string) => (
      <Th
        cursor="pointer"
        onClick={() => onSort(field)}
        _hover={{ color: "blue.500" }}
      >
        <HStack spacing={1}>
          <Text>{label}</Text>
          <Text fontSize="xs" color="blue.500">
            {getSortIcon(field)}
          </Text>
        </HStack>
      </Th>
    );

    const sortedSlots = sortSlots(slots, sortConfig);

    return (
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              {renderSortableHeader("name", "Stall Name")}
              {renderSortableHeader("zone", "Zone")}
              <Th>Size (m²)</Th>
              {renderSortableHeader("price", "Price")}
              {renderSortableHeader("category", "Category")}
              {renderSortableHeader("status", "Status")}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedSlots.map((slot) => (
              <Tr key={slot.id}>
                <Td fontWeight="medium">{slot.name}</Td>
                <Td>{slot.zone}</Td>
                <Td>{`${slot.width} × ${slot.height}`}</Td>
                <Td>฿{slot.price}</Td>
                <Td>
                  <Badge colorScheme="purple" variant="subtle">
                    {slot.category}
                  </Badge>
                </Td>
                <Td>
                  <Badge
                    colorScheme={slot.status === "available" ? "green" : "red"}
                    variant="subtle"
                  >
                    {slot.status === "booked" ? "book" : slot.status}
                  </Badge>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="Edit stall"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => onEditStall(slot.zone, slot)}
                    />
                    <IconButton
                      aria-label="Delete stall"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      isDisabled={slot.status === "booked"}
                      onClick={() => handleDeleteStall(slot.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  const handleAddStall = useCallback(
    async (newStall: Partial<Slot>) => {
      if (!token || !location.state?.marketId) {
        console.error("Missing token or marketId");
        toast({
          title: "Error",
          description: "Authentication information or market ID is missing.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      try {
        const config = new Configuration({
          basePath: process.env.REACT_APP_API_BASE_URL,
          accessToken: token,
        });
        const slotsApi = new SlotsApi(config);

        const layout = [
          {
            zone: newStall.zone || "",
            date: new Date(newStall.date || new Date()).toISOString(),
            stalls: [
              {
                name: newStall.name || "",
                width: newStall.width || 0,
                height: newStall.height || 0,
                stallType: newStall.category || "",
                price: newStall.price || 0,
              },
            ],
          },
        ];

        const layoutRequest: DtosLayoutRequest = { layout };

        console.log(
          "Sending layout request:",
          JSON.stringify(layoutRequest, null, 2)
        );

        const response = await slotsApi.slotsMarketIdCreatePost(
          location.state.marketId,
          layoutRequest
        );

        console.log("Added new stall:", response.data);

        toast({
          title: "Stall Added",
          description: `Stall ${newStall.name} has been added to zone ${newStall.zone}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        await refetchMarketDetails();
      } catch (error) {
        console.error("Error adding stall:", error);
        toast({
          title: "Error",
          description: "Failed to add the stall. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [toast, refetchMarketDetails, token, location.state]
  );

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="8xl" py={8}>
        <Stack spacing={8}>
          {/* Header Section */}
          <Box mb={6}>
            <HStack justify="space-between" align="center" spacing={4} py={2}>
              <Button
                leftIcon={<Icon as={FaArrowLeft} />}
                variant="ghost"
                size="lg"
                fontSize="md"
                onClick={() => navigate(`/market/${location.state?.marketId}`)}
                _hover={{
                  transform: "translateX(-4px)",
                  transition: "all 0.2s",
                }}
              >
                Back to Market
              </Button>

              <Flex direction="column" align="center">
                <Heading
                  as="h1"
                  size="xl"
                  bgGradient="linear(to-r, blue.500, blue.600)"
                  bgClip="text"
                  fontWeight="extrabold"
                  textAlign="center"
                  letterSpacing="tight"
                  pb={1}
                >
                  {marketName}
                </Heading>
                <Text color="gray.500" fontSize="sm" fontWeight="medium">
                  {selectedDate
                    ? moment(selectedDate).format("MMMM D, YYYY")
                    : "LOADING..."}
                </Text>
              </Flex>

              <HStack spacing={3}>
                <Button
                  leftIcon={<Icon as={FaPlus} />}
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  onClick={() =>
                    navigate("/configure", {
                      state: { marketId: location.state?.marketId },
                    })
                  }
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "lg",
                  }}
                  transition="all 0.2s"
                >
                  Create Zone
                </Button>
              </HStack>
            </HStack>
          </Box>

          {isLoading ? (
            <Flex justify="center" align="center" minH="50vh">
              <Spinner size="xl" color="blue.500" thickness="4px" />
            </Flex>
          ) : hasNoStalls ? (
            <Card>
              <CardBody>
                <Alert
                  status="info"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  p={8}
                  bg="transparent"
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="xl">
                    No Stalls Available
                  </AlertTitle>
                  <AlertDescription maxW="sm" mb={4}>
                    No stalls are currently available. Click below to create new
                    stalls.
                  </AlertDescription>
                  <Button
                    colorScheme="blue"
                    size="lg"
                    leftIcon={<AddIcon />}
                    onClick={() =>
                      navigate("/configure", {
                        state: { marketId: location.state?.marketId },
                      })
                    }
                  >
                    Create Stalls
                  </Button>
                </Alert>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <HStack justify="space-between">
                    <Select
                      placeholder="Select date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      maxW="300px"
                      size="lg"
                      icon={<CalendarIcon />}
                    >
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {moment(date).format("MMMM D, YYYY")}
                          {moment(date).isSame(moment(), "day")
                            ? " (Today)"
                            : ""}
                        </option>
                      ))}
                    </Select>
                    <HStack>
                      <Text color="gray.600">
                        Total Zones:{" "}
                        {Object.keys(groupSlotsByZone(filteredSlots)).length}
                      </Text>
                      <Text color="gray.600">
                        Total Stalls: {filteredSlots.length}
                      </Text>
                    </HStack>
                  </HStack>

                  <Tabs variant="enclosed" colorScheme="blue">
                    <TabList>
                      <Tab>Grid View</Tab>
                      <Tab>List View</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel px={0}>
                        {isLoading ? (
                          <Flex justify="center" p={8}>
                            <Spinner
                              size="xl"
                              color="blue.500"
                              thickness="4px"
                            />
                          </Flex>
                        ) : (
                          <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3 }}
                            spacing={6}
                          >
                            {groupSlotsByZone(filteredSlots).map(
                              ([zone, slots]) => (
                                <Suspense
                                  key={zone}
                                  fallback={
                                    <Card height="200px">
                                      <CardBody>
                                        <Flex
                                          justify="center"
                                          align="center"
                                          h="full"
                                        >
                                          <Spinner />
                                        </Flex>
                                      </CardBody>
                                    </Card>
                                  }
                                >
                                  <LazyZoneCard
                                    zone={zone}
                                    slots={slots}
                                    onEditStall={handleOpenEditModal}
                                    onAddStall={handleAddStall}
                                    onDeleteZone={handleDeleteZone}
                                    date={selectedDate}
                                  />
                                </Suspense>
                              )
                            )}
                          </SimpleGrid>
                        )}
                      </TabPanel>

                      <TabPanel px={0}>
                        <Card>
                          <CardBody>
                            <VStack spacing={4} align="stretch">
                              {isLoading ? (
                                <Flex justify="center" p={8}>
                                  <Spinner
                                    size="xl"
                                    color="blue.500"
                                    thickness="4px"
                                  />
                                </Flex>
                              ) : (
                                <>
                                  <HStack justify="space-between">
                                    <InputGroup maxW="300px">
                                      <InputLeftElement pointerEvents="none">
                                        <Icon as={FaSearch} color="gray.400" />
                                      </InputLeftElement>
                                      <Input
                                        placeholder="Search stalls..."
                                        variant="filled"
                                        value={searchTerm}
                                        onChange={(e) =>
                                          setSearchTerm(e.target.value)
                                        }
                                      />
                                    </InputGroup>
                                    <Menu>
                                      <MenuButton
                                        as={Button}
                                        rightIcon={<ChevronDownIcon />}
                                        variant="outline"
                                      >
                                        Sort By: {sortConfig.field}
                                      </MenuButton>
                                      <MenuList>
                                        <MenuItem
                                          onClick={() =>
                                            setSortConfig({
                                              field: "name",
                                              order: sortConfig.order,
                                            })
                                          }
                                          icon={
                                            sortConfig.field === "name" ? (
                                              <Icon
                                                as={
                                                  sortConfig.order === "asc"
                                                    ? ChevronUpIcon
                                                    : ChevronDownIcon
                                                }
                                              />
                                            ) : undefined
                                          }
                                        >
                                          Name
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() =>
                                            setSortConfig({
                                              field: "zone",
                                              order: sortConfig.order,
                                            })
                                          }
                                          icon={
                                            sortConfig.field === "zone" ? (
                                              <Icon
                                                as={
                                                  sortConfig.order === "asc"
                                                    ? ChevronUpIcon
                                                    : ChevronDownIcon
                                                }
                                              />
                                            ) : undefined
                                          }
                                        >
                                          Zone
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() =>
                                            setSortConfig({
                                              field: "price",
                                              order: sortConfig.order,
                                            })
                                          }
                                          icon={
                                            sortConfig.field === "price" ? (
                                              <Icon
                                                as={
                                                  sortConfig.order === "asc"
                                                    ? ChevronUpIcon
                                                    : ChevronDownIcon
                                                }
                                              />
                                            ) : undefined
                                          }
                                        >
                                          Price
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() =>
                                            setSortConfig({
                                              field: "status",
                                              order: sortConfig.order,
                                            })
                                          }
                                          icon={
                                            sortConfig.field === "status" ? (
                                              <Icon
                                                as={
                                                  sortConfig.order === "asc"
                                                    ? ChevronUpIcon
                                                    : ChevronDownIcon
                                                }
                                              />
                                            ) : undefined
                                          }
                                        >
                                          Status
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem
                                          onClick={() =>
                                            setSortConfig((prev) => ({
                                              ...prev,
                                              order:
                                                prev.order === "asc"
                                                  ? "desc"
                                                  : "asc",
                                            }))
                                          }
                                          icon={
                                            <Icon
                                              as={
                                                sortConfig.order === "asc"
                                                  ? ChevronUpIcon
                                                  : ChevronDownIcon
                                              }
                                            />
                                          }
                                        >
                                          Toggle Order
                                        </MenuItem>
                                      </MenuList>
                                    </Menu>
                                  </HStack>

                                  <TableView
                                    slots={filteredSlots}
                                    onEditStall={handleOpenEditModal}
                                    sortConfig={sortConfig}
                                    onSort={(field) => {
                                      setSortConfig((prev) => ({
                                        field,
                                        order:
                                          prev.field === field
                                            ? prev.order === "asc"
                                              ? "desc"
                                              : "asc"
                                            : "asc",
                                      }));
                                    }}
                                  />

                                  {filteredSlots.length === 0 ? (
                                    <Alert status="info" variant="subtle">
                                      <AlertIcon />
                                      No stalls found for the selected date.
                                    </Alert>
                                  ) : (
                                    <HStack justify="space-between" pt={4}>
                                      <Text color="gray.600">
                                        Showing {filteredSlots.length} stalls
                                      </Text>
                                    </HStack>
                                  )}
                                </>
                              )}
                            </VStack>
                          </CardBody>
                        </Card>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </VStack>
              </CardBody>
            </Card>
          )}

          <Suspense fallback={null}>
            <LazyEditStallModal
              isOpen={!!selectedSlot && !!selectedZoneId}
              onClose={handleCloseEditModal}
              slot={selectedSlot}
              zoneId={selectedZoneId}
              onSave={handleSaveStall}
              onDelete={handleDeleteStall}
              refetchMarketDetails={refetchMarketDetails}
            />
          </Suspense>
        </Stack>
      </Container>
    </Box>
  );
};

export default React.memo(GeneratedZonesPage);
