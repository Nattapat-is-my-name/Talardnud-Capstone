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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import { MarketApi, Configuration, SlotsApi } from "../api";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const LazyZoneCard = lazy(() => import("../components/ZoneCard"));
const LazyEditStallModal = lazy(() => import("../components/EditStallModal"));

const ITEMS_PER_PAGE = 10;

// Types based on the API response
interface Slot {
  id: string;
  market_id: string;
  name: string;
  zone: string;
  width: number;
  height: number;
  price: number;
  status: string;
  category: string;
  date: string;
  created_at: string;
  updated_at: string;
}

interface Market {
  id: string;
  name: string;
  description: string;
  address: string;
  open_time: string;
  close_time: string;
  image: string;
  layout_image: string;
  slots: Slot[];
}

interface ApiResponse {
  data: Market[];
  message: string;
  status: string;
}

const GeneratedZonesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [market, setMarket] = useState<Market | null>(null);
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

  useEffect(() => {
    const fetchMarketData = async () => {
      console.log("Location state:", location.state);
      const marketId = location.state?.marketId;
      console.log("Market ID from state:", marketId);

      if (!token || !marketId) {
        console.error("Missing token or marketId:", {
          token: !!token,
          marketId,
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
        const api = new MarketApi(config);
        const slotapi = new SlotsApi(config);
        console.log("Fetching market data for ID:", marketId);
        const response = await api.marketsGetIdGet(marketId);
        const slotresponse = await slotapi.slotsProviderGetIdGet(marketId);
        console.log("slotresponse :", slotresponse.data);

        const apiResponse = response.data as ApiResponse;
        if (apiResponse.status === "success" && apiResponse.data.length > 0) {
          setMarket(apiResponse.data[0]);
        } else {
          setError("No market data found in the response.");
        }
      } catch (err) {
        console.error("Error fetching market details:", err);
        setError("Failed to fetch market details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, [location.state, token]);

  const filteredSlots = useCallback(() => {
    if (!market) return [];
    return market.slots.filter((slot: Slot) => {
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
  }, [market, dateRange]);

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

  const handleDeleteZone = useCallback(
    (zoneId: string) => {
      console.log(`Deleting zone: ${zoneId}`);
      // Implement zone deletion logic here
      toast({
        title: "Zone Deleted",
        description: `Zone ${zoneId} has been deleted.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  const handleSaveStall = useCallback(
    (zoneId: string, updatedSlot: Slot) => {
      console.log(`Saving stall in zone ${zoneId}:`, updatedSlot);
      // Implement stall saving logic here
      toast({
        title: "Stall Saved",
        description: `Stall ${updatedSlot.name} has been updated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  const handleDeleteStall = useCallback(
    (zoneId: string, slotId: string) => {
      console.log(`Deleting stall ${slotId} in zone ${zoneId}`);
      // Implement stall deletion logic here
      toast({
        title: "Stall Deleted",
        description: `Stall ${slotId} has been deleted from zone ${zoneId}.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
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
        <Button mt={4} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  if (!market || market.slots.length === 0) {
    return (
      <Box minH="calc(100vh - 60px)" bg="gray.100" p={8}>
        <Alert status="info">
          <AlertIcon />
          No slots have been generated yet. Please go to the Configure Layout
          page to generate slots.
        </Alert>
        <Button mt={4} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box minH="calc(100vh - 60px)" bg="gray.100" p={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Generated Slots for {market.name}
      </Heading>

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
                      onDeleteZone={handleDeleteZone}
                      onEditStall={handleOpenEditModal}
                      onAddStall={handleAddStall}
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
        />
      </Suspense>
    </Box>
  );
};

export default React.memo(GeneratedZonesPage);
