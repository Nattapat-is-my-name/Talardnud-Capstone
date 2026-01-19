import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <Box
      minH="calc(100vh - 60px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <VStack spacing={8} textAlign="center" p={5} maxW="container.md">
        <Heading
          as="h1"
          bgGradient="linear(to-r, blue.500, blue.600)"
          bgClip="text"
          size="2xl"
          fontWeight="extrabold"
        >
          Welcome to TLN Admin Portal
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="2xl">
          Design and manage your market layout with ease. Configure zones,
          organize stalls, and visualize your market setup.
        </Text>
        <Button
          as={RouterLink}
          to="/market"
          colorScheme="blue"
          size="lg"
          fontSize="md"
          px={8}
          shadow="md"
          _hover={{
            transform: "translateY(-2px)",
            shadow: "lg",
          }}
          transition="all 0.2s"
        >
          Go to your Market
        </Button>
      </VStack>
    </Box>
  );
};

export default LandingPage;
