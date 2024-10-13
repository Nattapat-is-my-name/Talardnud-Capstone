import React from "react";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Stall } from "../types";

interface StallProps {
  stall: Stall;
  stallTypes: string[];
  onStallChange: (
    field: keyof Stall,
    value: string | number | string[]
  ) => void;
}

export const StallComponent: React.FC<StallProps> = ({
  stall,
  stallTypes,
  onStallChange,
}) => {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Number of Stalls</FormLabel>
        <NumberInput
          min={1}
          value={stall.numberOfStalls}
          onChange={(valueString) =>
            onStallChange("numberOfStalls", parseInt(valueString))
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Width (m)</FormLabel>
        <NumberInput
          min={1}
          value={stall.width}
          onChange={(valueString) =>
            onStallChange("width", parseInt(valueString))
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Height (m)</FormLabel>
        <NumberInput
          min={1}
          value={stall.height}
          onChange={(valueString) =>
            onStallChange("height", parseInt(valueString))
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Stall Type</FormLabel>
        <Select
          placeholder="Select stall type"
          value={stall.stallType}
          onChange={(e) => onStallChange("stallType", e.target.value)}
        >
          {stallTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Price Per Stall (in THB)</FormLabel>
        <NumberInput
          min={0}
          value={stall.pricePerStall}
          onChange={(valueString) =>
            onStallChange("pricePerStall", parseInt(valueString))
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </VStack>
  );
};
