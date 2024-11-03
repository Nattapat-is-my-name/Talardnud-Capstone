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
  Container,
  Text,
  Link,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

const Register = () => {
  const [provider, setProvider] = useState<DtosMarketProviderRequest>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const api = new AuthApi();

  // Color mode values to match navbar
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const gradientText = "linear(to-r, blue.500, blue.600)";

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
        title: "Registration successful!",
        description:
          "Your market provider account has been created. Please sign in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error creating provider:", error);
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
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
                Create Account
              </Heading>
              <Text color="gray.600" textAlign="center">
                Register as a Market Provider
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={5}>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiUser color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="username"
                      value={provider.username}
                      onChange={handleInputChange}
                      placeholder="Choose a username"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiMail color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="email"
                      type="email"
                      value={provider.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <FiPhone color="gray.400" />
                    </InputLeftElement>
                    <Input
                      name="phone"
                      value={provider.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
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
                      value={provider.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
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
                  loadingText="Creating account..."
                  w="full"
                >
                  Create Account
                </Button>
              </VStack>
            </form>

            <Text textAlign="center" pt={4}>
              Already have an account?{" "}
              <Link
                as={RouterLink}
                to="/login"
                color="blue.500"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Sign in here
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
