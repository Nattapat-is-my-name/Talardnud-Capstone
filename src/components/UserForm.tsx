import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Text,
  Alert,
  AlertIcon,
  useToast,
  Heading,
  Divider,
  Flex,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { Zone, Stall } from "../types";
import { createNewStall, generateZonesFromInput } from "../utils";
import { useMarket } from "../contexts/MarketProvider";
import { SlotsApi, Configuration, DtosLayoutRequest } from "../api";
import { useAuth } from "../contexts/AuthContext";

const STALL_TYPES = ["Food", "Merchandise", "Service"];

interface UserFormProps {
  marketId: string;
}

const UserForm: React.FC<UserFormProps> = ({ marketId }) => {
  const navigate = useNavigate();
  const { zones, setZones } = useMarket();
  const { token } = useAuth();
  const toast = useToast();

  const [formState, setFormState] = useState({
    zoneInput: "",
    stallsPerZone: 10,
    config: createNewStall(""),
    error: "",
    selectedDates: [] as DateObject[],
  });

  useEffect(() => {
    console.log("UserForm component mounted");
    return () => {
      console.log("UserForm component will unmount");
    };
  }, []);

  const handleInputChange = useCallback((field: string, value: any) => {
    console.log(`Updating ${field} with value:`, value);
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleConfigChange = useCallback((field: keyof Stall, value: any) => {
    console.log(`Updating config.${field} with value:`, value);
    setFormState((prev) => ({
      ...prev,
      config: { ...prev.config, [field]: value },
    }));
  }, []);

  const handleDateChange = useCallback((dates: DateObject | DateObject[]) => {
    console.log("Selected dates:", dates);
    setFormState((prev) => ({
      ...prev,
      selectedDates: Array.isArray(dates) ? dates : [dates],
    }));
  }, []);

  const handleGenerateZones = useCallback(() => {
    console.log("Generating zones");
    const { zoneInput, config, selectedDates, stallsPerZone } = formState;

    if (selectedDates.length === 0) {
      console.log("Error: No dates selected");
      setFormState((prev) => ({
        ...prev,
        error: "Please select at least one date.",
      }));
      return;
    }

    let updatedZones = [...zones];

    selectedDates.forEach((dateObj) => {
      const date = new Date(
        dateObj.year,
        dateObj.month.number - 1,
        dateObj.day
      );
      console.log("Generating zones for date:", date.toISOString());
      const generatedZones = generateZonesFromInput(
        zoneInput,
        { ...config, numberOfStalls: stallsPerZone },
        updatedZones,
        date,
        date
      );
      updatedZones = generatedZones;
    });

    console.log("Updated zones:", updatedZones);
    setZones(updatedZones);

    if (updatedZones.length === zones.length) {
      console.log("No new zones generated");
      setFormState((prev) => ({
        ...prev,
        error:
          "No new zones were generated. All specified zones already exist for the selected dates.",
      }));
    } else {
      setFormState((prev) => ({ ...prev, error: "" }));

      const newZonesCount = updatedZones.length - zones.length;
      const updatedZonesCount =
        zones.length - (updatedZones.length - newZonesCount);

      console.log(
        `${newZonesCount} new zones added, ${updatedZonesCount} zones updated`
      );
      toast({
        title: "Zones generated/updated",
        description: `${newZonesCount} new zone(s) added and ${updatedZonesCount} existing zone(s) updated for the selected dates.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [formState, zones, setZones, toast]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      console.log("Form submission started");
      console.log("Selected dates:", formState.selectedDates);
      console.log("Current zones:", zones);

      if (zones.length === 0) {
        console.log("Error: No zones generated");
        setFormState((prev) => ({
          ...prev,
          error: "Please generate zones before submitting.",
        }));
        return;
      }

      if (!marketId) {
        console.log("Error: No market ID provided");
        setFormState((prev) => ({
          ...prev,
          error: "Market ID is missing. Please select a market first.",
        }));
        return;
      }

      if (!token) {
        console.log("Error: No authentication token");
        setFormState((prev) => ({
          ...prev,
          error: "You are not authenticated. Please log in and try again.",
        }));
        return;
      }

      console.log(
        zones.map((zone) => ({
          zone: zone.zone,
          date: new Date(zone.date).toISOString(),
          stalls: zone.stalls.map((stall) => ({
            name: stall.name,
            width: stall.width,
            height: stall.height,
            stallType: stall.stallType,
            price: stall.pricePerStall,
          })),
        }))
      );

      const layout = zones.map((zone) => ({
        zone: zone.zone,
        date: new Date(zone.date).toISOString(),
        stalls: zone.stalls.map((stall) => ({
          name: stall.name,
          width: stall.width,
          height: stall.height,
          stallType: stall.stallType,
          price: stall.pricePerStall,
        })),
      }));

      const formattedLayout: DtosLayoutRequest = { layout };

      console.log("Form submitted with the following layout:");
      console.log(JSON.stringify(formattedLayout, null, 2));

      try {
        const config = new Configuration({
          basePath: process.env.REACT_APP_API_BASE_URL,
          accessToken: token,
        });

        const slotsApi = new SlotsApi(config);

        console.log("Submitting layout to API", marketId);

        const response = await slotsApi.slotsMarketIdCreatePost(
          marketId,
          formattedLayout
        );

        console.log("API response:", response.data);

        toast({
          title: "Layout submitted successfully",
          description: "The market layout has been created or updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate("/generated-zones");
      } catch (error) {
        console.error("Error submitting layout:", error);
        toast({
          title: "Error submitting layout",
          description:
            "An error occurred while submitting the layout. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [zones, navigate, formState, toast, marketId, token]
  );
  const renderDatePicker = useCallback(
    () => (
      <FormControl isRequired>
        <FormLabel fontWeight="medium">Select Dates</FormLabel>
        <DatePicker
          value={formState.selectedDates}
          onChange={handleDateChange}
          multiple
          format="MMMM D, YYYY"
          render={<Input readOnly placeholder="Click to select dates" />}
        />
        {formState.selectedDates.length > 0 && (
          <Text fontSize="sm" mt={2}>
            Selected dates:{" "}
            {formState.selectedDates
              .sort((a, b) => a.toDate().getTime() - b.toDate().getTime())
              .map((date) => date.format("MMM D, YYYY"))
              .join(", ")}
          </Text>
        )}
      </FormControl>
    ),
    [formState.selectedDates, handleDateChange]
  );

  const renderNumberInput = useCallback(
    (field: keyof Stall | "stallsPerZone", label: string, min: number = 0) => (
      <FormControl isRequired>
        <FormLabel fontWeight="medium">{label}</FormLabel>
        <NumberInput
          min={min}
          value={
            field === "stallsPerZone"
              ? formState[field]
              : formState.config[field]
          }
          onChange={(valueString) => {
            const value = parseInt(valueString);
            field === "stallsPerZone"
              ? handleInputChange(field, value)
              : handleConfigChange(field, value);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    ),
    [formState, handleInputChange, handleConfigChange]
  );

  const bgColor = useColorModeValue("white", "gray.800");

  console.log("Rendering UserForm component");

  return (
    <Box bg={bgColor} p={8} rounded="xl" maxWidth="600px" margin="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Heading as="h3" size="lg" fontWeight="semibold" mb={2}>
            Market Configuration
          </Heading>

          {renderDatePicker()}

          <FormControl isRequired>
            <FormLabel fontWeight="medium">
              Zone Input (e.g., A, B, C or A-D)
            </FormLabel>
            <Tooltip label="Enter single letters or a range (e.g., A-D)">
              <Input
                placeholder="A or A-D"
                value={formState.zoneInput}
                onChange={(e) => handleInputChange("zoneInput", e.target.value)}
              />
            </Tooltip>
          </FormControl>

          {formState.error && (
            <Alert status="error" rounded="md">
              <AlertIcon />
              {formState.error}
            </Alert>
          )}

          {renderNumberInput("stallsPerZone", "Stalls per Zone", 1)}

          <Divider my={4} />

          <Heading as="h4" size="md" fontWeight="semibold" mb={2}>
            Stall Configuration
          </Heading>
          <Text fontSize="sm" color="gray.500" mb={4}>
            This configuration applies to all zones
          </Text>

          <Flex direction={{ base: "column", md: "row" }} gap={6}>
            {renderNumberInput("width", "Width (m)", 1)}
            {renderNumberInput("height", "Height (m)", 1)}
          </Flex>

          <FormControl isRequired>
            <FormLabel fontWeight="medium">Stall Type</FormLabel>
            <Select
              placeholder="Select stall type"
              value={formState.config.stallType}
              onChange={(e) => handleConfigChange("stallType", e.target.value)}
            >
              {STALL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>

          {renderNumberInput("pricePerStall", "Price Per Stall (THB)")}

          <Flex direction={{ base: "column", sm: "row" }} gap={4} mt={6}>
            <Button
              onClick={handleGenerateZones}
              colorScheme="blue"
              size="lg"
              flex={1}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              Preview Zones
            </Button>
            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              flex={1}
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              Submit Configuration
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
