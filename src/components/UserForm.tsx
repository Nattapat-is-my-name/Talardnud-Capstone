import React, { useState, useCallback } from "react";
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
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Zone, Stall } from "../types";
import { createNewStall, generateZonesFromInput } from "../utils";
import { useMarket } from "../contexts/MarketProvider";

const STALL_TYPES = ["Food", "Merchandise", "Service"];

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { zones, setZones } = useMarket();
  const toast = useToast();

  const [formState, setFormState] = useState({
    zoneInput: "",
    stallsPerZone: 10,
    config: createNewStall(""),
    error: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleInputChange = useCallback((field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]:
        field === "startDate" || field === "endDate"
          ? value || new Date()
          : value,
    }));
  }, []);

  const handleConfigChange = useCallback((field: keyof Stall, value: any) => {
    setFormState((prev) => ({
      ...prev,
      config: { ...prev.config, [field]: value },
    }));
  }, []);

  const handleGenerateZones = useCallback(() => {
    const { zoneInput, config, startDate, endDate, stallsPerZone } = formState;

    // Ensure endDate is not before startDate
    const adjustedEndDate = new Date(endDate);
    adjustedEndDate.setHours(23, 59, 59, 999);

    const updatedZones = generateZonesFromInput(
      zoneInput,
      { ...config, numberOfStalls: stallsPerZone },
      zones,
      new Date(startDate),
      adjustedEndDate
    );

    setZones(updatedZones);

    if (updatedZones.length === zones.length) {
      setFormState((prev) => ({
        ...prev,
        error:
          "No new zones were generated. All specified zones already exist for the selected date range.",
      }));
    } else {
      setFormState((prev) => ({ ...prev, error: "" }));

      const newZonesCount = updatedZones.length - zones.length;
      const updatedZonesCount =
        zones.length - (updatedZones.length - newZonesCount);

      toast({
        title: "Zones generated/updated",
        description: `${newZonesCount} new zone(s) added and ${updatedZonesCount} existing zone(s) updated for the selected date range.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [formState, zones, setZones, toast]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (zones.length === 0) {
        setFormState((prev) => ({
          ...prev,
          error: "Please generate zones before submitting.",
        }));
        return;
      }
      navigate("/generated-zones");
    },
    [zones, navigate]
  );
  const renderDatePicker = useCallback(
    (field: "startDate" | "endDate", label: string) => (
      <FormControl isRequired>
        <FormLabel fontWeight="medium">{label}</FormLabel>
        <DatePicker
          selected={formState[field]}
          onChange={(date: Date | null) =>
            handleInputChange(field, date || new Date())
          }
          dateFormat="MMMM d, yyyy"
          customInput={<Input />}
        />
      </FormControl>
    ),
    [formState, handleInputChange]
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
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box bg={bgColor} p={8} rounded="xl">
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Heading as="h3" size="lg" fontWeight="semibold" mb={2}>
            Market Configuration
          </Heading>

          <Flex direction={{ base: "column", md: "row" }} gap={6}>
            {renderDatePicker("startDate", "Start Date")}
            {renderDatePicker("endDate", "End Date")}
          </Flex>

          <FormControl isRequired>
            <FormLabel fontWeight="medium">
              Zone Input (e.g., A, B, C or A-D)
            </FormLabel>
            <Input
              placeholder="A or A-D"
              value={formState.zoneInput}
              onChange={(e) => handleInputChange("zoneInput", e.target.value)}
            />
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
              Generate Zones
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
