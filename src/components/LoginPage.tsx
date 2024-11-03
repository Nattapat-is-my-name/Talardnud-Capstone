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
  Container,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FiMail, FiLock } from "react-icons/fi";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const api = new AuthApi();

  // Color mode values to match navbar
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const gradientText = "linear(to-r, blue.500, blue.600)";

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

      if (response.data.access_token && response.data.provider_id) {
        login(response.data.access_token, response.data.provider_id);
        toast({
          title: "Welcome back!",
          description: "Successfully logged into TLN Admin Portal",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/market");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container maxW="lg" py={{ base: 12, md: 24 }}>
        <Box
          bg={bgColor}
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          boxShadow="xl"
        >
          <VStack spacing={8} align="stretch">
            <VStack spacing={3}>
              <Heading
                as="h1"
                bgGradient={gradientText}
                bgClip="text"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="extrabold"
                textAlign="center"
              >
                Welcome Back
              </Heading>
              <Text color="gray.600" textAlign="center">
                Sign in to access TLN Admin Portal
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Username or Email</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiMail color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="usernameOrEmail"
                      value={credentials.usernameOrEmail}
                      onChange={handleInputChange}
                      placeholder="Enter your username or email"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiLock color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  w="full"
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Text textAlign="center" pt={4}>
              Don't have an account?{" "}
              <Link
                as={RouterLink}
                to="/register"
                color="blue.500"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Register here
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
