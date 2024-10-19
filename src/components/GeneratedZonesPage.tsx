import React, { useState, useCallback, useEffect, lazy, Suspense } from "react";
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  useToast,
  VStack,
  Button,
  Spinner,
  Flex,
  Grid,
  Center,
  Select,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import moment from "moment";
import {
  MarketApi,
  Configuration,
  SlotsApi,
  EntitiesSlot,
  DtosLayoutRequest,
} from "../api";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
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

  const refetchMarketDetails = useCallback(async () => {
    if (!token || !location.state?.marketId) {
      console.error("Missing token or marketId:", {
        token: !!token,
        marketId: location.state?.marketId,
      });
      setHasNoStalls(true);
      setIsLoading(false); // Ensure loading is stopped even if marketId or token is missing
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

      console.log("Market response:", marketresponse.data); // Log market response
      console.log("Slot response:", slotresponse.data); // Log slot response

      if (slotresponse.data && Array.isArray(slotresponse.data)) {
        const convertedSlots = slotresponse.data.map(convertToSlot);
        setSlots(convertedSlots);
        setHasNoStalls(convertedSlots.length === 0);
      } else {
        setHasNoStalls(true);
      }

      if (marketresponse.data && marketresponse.data.data) {
        const marketNames = marketresponse.data.data.map(
          (market) => market.name
        );
        setMarketName(marketNames[0] || "Unknown Market");
      }
    } catch (err) {
      console.error("Error fetching slot details:", err);
      setHasNoStalls(true); // Set hasNoStalls to true instead of setting an error
    } finally {
      setIsLoading(false); // Stop the loading spinner in all cases
    }
  }, [token, location.state]);

  // Get the current date
  const currentDate = moment().startOf("day");

  // Extract all unique dates from the slots, but only include current and future dates
  const allDates = Array.from(
    new Set(
      slots
        .map((slot) => moment(slot.date).format("YYYY-MM-DD"))
        .filter((date) => moment(date).isSameOrAfter(currentDate))
    )
  );

  // Filter slots by the selected date
  const filteredSlots = slots.filter((slot: Slot) =>
    selectedDate
      ? moment(slot.date).format("YYYY-MM-DD") === selectedDate
      : true
  );

  useEffect(() => {
    console.log("Fetching market details...");
    refetchMarketDetails();
  }, [refetchMarketDetails]);

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
      // Implement stall saving logic here
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

      console.log(`Deleting stall ${slotId}`);
      try {
        const config = new Configuration({
          basePath: process.env.REACT_APP_API_BASE_URL,
          accessToken: token,
        });
        const slotsApi = new SlotsApi(config);

        const response = await slotsApi.slotsDeleteIdDelete(slotId);
        console.log("Deleted slot:", response.data);

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

        console.log(zoneId, formattedDate, location.state.marketId);

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

  const groupSlotsByZone = useCallback((slots: Slot[]) => {
    const groups: { [key: string]: Slot[] } = {};
    slots.forEach((slot: Slot) => {
      if (!groups[slot.zone]) groups[slot.zone] = [];
      groups[slot.zone].push(slot);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, []);

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

        // Create the layout in the specified format
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

  return (
    <Box minH="calc(100vh - 60px)" p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          size="lg"
          fontSize="xl"
        >
          Back
        </Button>
        <Heading as="h1" size="xl" textAlign="center">
          List Slots for {marketName}
        </Heading>
        <Box width={100} />
      </Flex>

      {isLoading ? (
        <Center minH="calc(100vh - 200px)">
          <Spinner size="xl" />
        </Center>
      ) : hasNoStalls ? (
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
            button below to add stalls to this market.
          </AlertDescription>
          <Button
            mt={4}
            colorScheme="blue"
            onClick={() =>
              navigate("/configure", {
                state: { marketId: location.state?.marketId },
              })
            }
          >
            Create Stalls
          </Button>
        </Alert>
      ) : (
        <>
          <Select
            placeholder="Select date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            variant="filled"
            bg="white"
            mb={4}
          >
            {allDates.map((date) => (
              <option key={date} value={date}>
                {moment(date).format("MMMM D, YYYY")}
              </option>
            ))}
          </Select>

          <VStack spacing={8} mt={8}>
            {paginatedGroupedSlots().map(([dateKey, slotsForDate]) => (
              <Box key={dateKey} w="100%">
                <Flex
                  justify="space-between"
                  align="center"
                  onClick={() => toggleDateExpand(dateKey)}
                  cursor="pointer"
                  p={4}
                  rounded="md"
                  mb={4}
                  bg="gray.100"
                >
                  <Heading as="h2" size="lg">
                    {moment(dateKey).format("MMMM D, YYYY")}
                  </Heading>
                  {expandedDates[dateKey] ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </Flex>
                {expandedDates[dateKey] && (
                  <Grid
                    templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                    gap={6}
                  >
                    {groupSlotsByZone(slotsForDate).map(([zone, slots]) => (
                      <Suspense
                        key={zone}
                        fallback={
                          <Center bg="white" h="200px" rounded="md" shadow="md">
                            <Spinner size="xl" />
                          </Center>
                        }
                      >
                        <LazyZoneCard
                          zone={zone}
                          slots={slots}
                          onEditStall={handleOpenEditModal}
                          onAddStall={handleAddStall}
                          onDeleteZone={handleDeleteZone}
                          date={dateKey}
                        />
                      </Suspense>
                    ))}
                  </Grid>
                )}
              </Box>
            ))}
          </VStack>

          <Suspense fallback={<Spinner />}>
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
        </>
      )}
    </Box>
  );
};

export default React.memo(GeneratedZonesPage);
