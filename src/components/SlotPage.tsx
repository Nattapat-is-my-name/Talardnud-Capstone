import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Configuration, EntitiesSlot, SlotsApi } from "../api";
import { useAuth } from "../contexts/AuthContext";

const SlotPage = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const { isAuthenticated, token } = useAuth();
  const [slots, setSlots] = useState<EntitiesSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (isAuthenticated && token && marketId) {
      fetchSlots();
    } else {
      setError("Please log in to view slots.");
      setIsLoading(false);
    }
  }, [isAuthenticated, token, marketId, currentDate]);

  const fetchSlots = async () => {
    if (!token || !marketId) {
      setError("Authentication information or market ID is missing.");
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
      const api = new SlotsApi(config);
      const response = await api.slotsProviderGetIdGet(marketId);

      console.log("Slots response:", response.data);

      if (response.data) {
        setSlots(response.data);
      } else {
        setError("No slot data found.");
      }
    } catch (err) {
      setError("Failed to fetch slot data. Please try again later.");
      console.error("Error fetching slots:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment);
    setCurrentDate(newDate.toISOString().split("T")[0]);
  };

  const SlotCard = ({ slot }: { slot: EntitiesSlot }) => (
    <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
      <VStack align="stretch" spacing={3}>
        <Heading as="h3" size="md">
          Slot {slot.id}
        </Heading>
        <Text>
          <strong>Date:</strong> {slot.date}
        </Text>
        <Text>
          <strong>Category:</strong> {slot.category}
        </Text>
        <Text>
          <strong>Price:</strong> ${slot.price}
        </Text>
        <Text>
          <strong>Status:</strong> {slot.status}
        </Text>
      </VStack>
    </Box>
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Box maxWidth="1200px" margin="auto" mt={10} p={6}>
      <Heading as="h1" size="xl" mb={6}>
        Slots for Market
      </Heading>
      <Box mb={6}>
        <Button onClick={() => handleDateChange(-1)} mr={2}>
          Previous Day
        </Button>
        <Text display="inline-block" mr={2}>
          {currentDate}
        </Text>
        <Button onClick={() => handleDateChange(1)}>Next Day</Button>
      </Box>
      {slots.length === 0 ? (
        <Text>No slots available for this market on the selected date.</Text>
      ) : (
        <SimpleGrid columns={[1, null, 2, 3]} spacing={6}>
          {slots.map((slot) => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default SlotPage;
