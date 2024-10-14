import React, { useState } from "react";
import { DtosMarketProviderRequest, AuthApi } from "../api";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [provider, setProvider] = useState<DtosMarketProviderRequest>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const api = new AuthApi();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProvider((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.authProviderRegisterPost(provider);
      console.log("Created Provider:", response.data);
      toast({
        title: "Provider created.",
        description: "We've created your provider account. Please log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error creating provider:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to create provider.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxWidth="md"
      margin="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
    >
      <Heading as="h2" size="xl" mb={6}>
        Register Market Provider
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              name="username"
              value={provider.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={provider.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={provider.password}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              id="phone"
              name="phone"
              value={provider.phone}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Creating"
            width="full"
          >
            Create Provider
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
