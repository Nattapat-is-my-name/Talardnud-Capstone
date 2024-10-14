import React, { useState } from "react";
import { AuthApi } from "../api";
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
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const api = new AuthApi();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.authProviderLoginPost({
        username: credentials.usernameOrEmail,
        password: credentials.password,
      });
      console.log("Login response:", response.data);

      if (response.data.access_token && response.data.provider_id) {
        login(response.data.access_token, response.data.provider_id);
        toast({
          title: "Login successful.",
          description: "You have been logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/configure");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to log in. Please check your credentials.",
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
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="usernameOrEmail">Username or Email</FormLabel>
            <Input
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={credentials.usernameOrEmail}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Logging in"
            width="full"
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default LoginPage;
