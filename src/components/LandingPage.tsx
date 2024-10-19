// components/LandingPage.tsx
import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <Box
      minH="calc(100vh - 60px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size="2xl">
          Welcome to TLN Admin Portal
        </Heading>
        <Text fontSize="xl">
          Design and manage your market layout with ease. Configure zones,
          organize stalls, and visualize your market setup.
        </Text>
        <Button as={RouterLink} to="/market" colorScheme="blue" size="lg">
          Go to your Market
        </Button>
      </VStack>
    </Box>
  );
};

export default LandingPage;
