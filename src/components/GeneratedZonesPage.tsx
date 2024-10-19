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
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import { MarketApi, Configuration, SlotsApi, EntitiesSlot } from "../api";
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

  const toast = useToast();
  const [dateRange, setDateRange] = useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }>({ startDate: null, endDate: null });
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);
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
      setError("Authentication information or market ID is missing.");
      setIsLoading(false);
      return;
    }

    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const slotapi = new SlotsApi(config);
      console.log(
        "Fetching slot data for market ID:",
        location.state?.marketId
      );
      const slotresponse = await slotapi.slotsProviderGetIdGet(
        location.state?.marketId
      );
      const market = new MarketApi(config);
      const marketresponse = await market.marketsGetIdGet(
        location.state?.marketId
      );

      console.log("Market response:", marketresponse.data);
      console.log("Slot response:", slotresponse.data);

      if (
        (slotresponse.data && Array.isArray(slotresponse.data)) ||
        marketresponse.data
      ) {
        const convertedSlots = slotresponse.data.map(convertToSlot);

        const marketNames = marketresponse.data.data?.map(
          (market) => market.name
        );

        setSlots(convertedSlots);
        setMarketName(marketNames?.[0] || "Unknown Market");
      } else {
        setError("No slot data found in the response.");
      }
    } catch (err) {
      console.error("Error fetching slot details:", err);
      setError("Failed to fetch slot details. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [token, location.state]);

  useEffect(() => {
    refetchMarketDetails();
  }, [refetchMarketDetails]);

  const filteredSlots = useCallback(() => {
    return slots.filter((slot: Slot) => {
      if (dateRange.startDate && dateRange.endDate) {
        const slotDate = moment(slot.date).startOf("day");
        const startDate = dateRange.startDate.startOf("day");
        const endDate = dateRange.endDate.startOf("day");
        return (
          slotDate.isSameOrAfter(startDate) && slotDate.isSameOrBefore(endDate)
        );
      }
      return true;
    });
  }, [slots, dateRange]);

  const groupedSlots = useCallback(() => {
    const groups: { [key: string]: Slot[] } = {};
    filteredSlots().forEach((slot: Slot) => {
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
      console.log(`Deleting stall ${slots}`);
      try {
        const config = new Configuration({
          basePath: process.env.REACT_APP_API_BASE_URL,
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
    [toast, refetchMarketDetails]
  );

  const handleAddStall = useCallback(
    (slot: Slot, stallName: string) => {
      console.log(`Adding stall ${stallName} to zone ${slot.zone}`);
      // Implement stall addition logic here
      toast({
        title: "Stall Added",
        description: `Stall ${stallName} has been added to zone ${slot.zone}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  if (isLoading) {
    return (
      <Center minH="calc(100vh - 60px)" bg="gray.100">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Box minH="calc(100vh - 60px)" bg="gray.100" p={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
        <Button mt={4} leftIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (slots.length === 0) {
    return (
      <Box minH="calc(100vh - 60px)" bg="gray.100" p={8}>
        <Alert status="info">
          <AlertIcon />
          No slots have been created yet. Please go to the Configure Layout page
          to create slots.
        </Alert>
        <Button mt={4} leftIcon={<ArrowBackIcon />} onClick={handleGoBack}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box minH="calc(100vh - 60px)" bg="gray.100" p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          size="lg"
          px={6}
          py={3}
          fontSize="xl"
        >
          Back
        </Button>
        <Heading as="h1" size="xl" textAlign="center">
          List Slots for {marketName}
        </Heading>
        <Box width={100} /> {/* This empty Box helps center the heading */}
      </Flex>

      <DateRangePicker
        startDate={dateRange.startDate}
        startDateId="start-date"
        endDate={dateRange.endDate}
        endDateId="end-date"
        onDatesChange={({ startDate, endDate }) =>
          setDateRange({ startDate, endDate })
        }
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={() => false}
        minimumNights={0}
        displayFormat="MMM D, YYYY"
        startDatePlaceholderText="Start Date"
        endDatePlaceholderText="End Date"
        showClearDates={true}
        reopenPickerOnClearDates
      />

      <VStack spacing={8} mt={8}>
        {paginatedGroupedSlots().map(([dateKey, slotsForDate]) => (
          <Box key={dateKey} w="100%">
            <Flex
              justify="space-between"
              align="center"
              onClick={() => toggleDateExpand(dateKey)}
              cursor="pointer"
              bg="gray.200"
              p={4}
              rounded="md"
              mb={4}
            >
              <Heading as="h2" size="lg">
                {moment(dateKey).format("MMMM D, YYYY")}
              </Heading>
              {expandedDates[dateKey] ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
            {expandedDates[dateKey] && (
              <Grid
                templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
                gap={6}
              >
                {slotsForDate.map((slot: Slot) => (
                  <Suspense
                    key={slot.id}
                    fallback={
                      <Center bg="white" h="200px" rounded="md" shadow="md">
                        <Spinner size="xl" />
                      </Center>
                    }
                  >
                    <LazyZoneCard
                      slot={slot}
                      onEditStall={handleOpenEditModal}
                      onAddStall={handleAddStall}
                      onDeleteZone={handleDeleteStall}
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
    </Box>
  );
};

export default React.memo(GeneratedZonesPage);
