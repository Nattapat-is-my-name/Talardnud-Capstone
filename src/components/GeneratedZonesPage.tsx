import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
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
import { useMarket } from "../contexts/MarketProvider";
import { Zone, Stall } from "../types";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import useZoneManagement from "../hook/useZoneManagement";
import useStallManagement from "../hook/useStallManagement";
import useFilteredZones from "../hook/useFilteredZones";

const LazyZoneCard = lazy(() => import("../components/ZoneCard"));
const LazyEditStallModal = lazy(() => import("../components/EditStallModal"));

const ITEMS_PER_PAGE = 10;

const GeneratedZonesPage: React.FC = () => {
  const { zones } = useMarket();
  const toast = useToast();
  const [dateRange, setDateRange] = useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }>({ startDate: null, endDate: null });
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(null);
  const [expandedDates, setExpandedDates] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const { handleDeleteZone } = useZoneManagement();
  const {
    handleEditStall,
    handleSaveStall,
    handleDeleteStall,
    handleAddStall,
  } = useStallManagement();
  const filteredZones = useFilteredZones(zones, dateRange);

  const groupedZones = useMemo(() => {
    const groups: { [key: string]: Zone[] } = {};
    filteredZones.forEach((zone) => {
      const dateKey = moment(zone.date).format("YYYY-MM-DD");
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(zone);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredZones]);

  const paginatedGroupedZones = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return groupedZones.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [groupedZones, currentPage]);

  const handleOpenEditModal = useCallback((zoneId: number, stall: Stall) => {
    setSelectedZoneId(zoneId);
    setSelectedStall(stall);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setSelectedZoneId(null);
    setSelectedStall(null);
  }, []);

  const toggleDateExpand = useCallback((dateKey: string) => {
    setExpandedDates((prev) => ({ ...prev, [dateKey]: !prev[dateKey] }));
  }, []);

  if (groupedZones.length === 0) {
    return (
      <Box minH="calc(100vh - 60px)" bg="gray.100" p={8}>
        <Alert status="info">
          <AlertIcon />
          No zones have been generated yet. Please go to the Configure Layout
          page to generate zones.
        </Alert>
      </Box>
    );
  }

  return (
    <Box minH="calc(100vh - 60px)" bg="gray.100" p={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Generated Zones
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
        {paginatedGroupedZones.map(([dateKey, zonesForDate]) => (
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
                {zonesForDate.map((zone: Zone) => (
                  <Suspense
                    key={zone.id}
                    fallback={
                      <Center bg="white" h="200px" rounded="md" shadow="md">
                        <Spinner size="xl" />
                      </Center>
                    }
                  >
                    <LazyZoneCard
                      zone={zone}
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
          isOpen={!!selectedStall && !!selectedZoneId}
          onClose={handleCloseEditModal}
          stall={selectedStall}
          zoneId={selectedZoneId}
          onSave={handleSaveStall}
          onDelete={handleDeleteStall}
        />
      </Suspense>
    </Box>
  );
};

export default React.memo(GeneratedZonesPage);
