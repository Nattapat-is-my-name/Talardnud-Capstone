import React from "react";
import { useForm } from "react-hook-form";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { DtosMarketEditRequest } from "../api";

interface MarketProfileFormProps {
  marketDetails: DtosMarketEditRequest;
  onSubmit: (data: DtosMarketEditRequest) => void;
}

const MarketProfileForm: React.FC<MarketProfileFormProps> = ({
  marketDetails,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DtosMarketEditRequest>({
    defaultValues: marketDetails,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Market Name</FormLabel>
          <Input
            {...register("name", { required: "Market name is required" })}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input
            {...register("address", { required: "Address is required" })}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea {...register("description")} />
        </FormControl>

        <FormControl isInvalid={!!errors.open_time}>
          <FormLabel>Opening Time</FormLabel>
          <Input
            {...register("open_time", { required: "Opening time is required" })}
            type="time"
          />
        </FormControl>

        <FormControl isInvalid={!!errors.close_time}>
          <FormLabel>Closing Time</FormLabel>
          <Input
            {...register("close_time", {
              required: "Closing time is required",
            })}
            type="time"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input {...register("phone")} />
        </FormControl>

        <FormControl>
          <FormLabel>Latitude</FormLabel>
          <Input {...register("latitude")} />
        </FormControl>

        <FormControl>
          <FormLabel>Longitude</FormLabel>
          <Input {...register("longitude")} />
        </FormControl>

        <Button type="submit" colorScheme="blue" size="lg" mt={4}>
          Update Market Profile
        </Button>
      </VStack>
    </form>
  );
};

export default MarketProfileForm;
