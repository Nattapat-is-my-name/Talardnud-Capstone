// components/Navbar.tsx
import React from "react";
import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex alignItems="center">
        <Link
          as={RouterLink}
          to="/"
          color="white"
          fontWeight="bold"
          fontSize="xl"
        >
          Market Layout App
        </Link>
        <Spacer />
        <Link as={RouterLink} to="/" color="white" mr={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/market" color="white" mr={4}>
          Market
        </Link>
        <Link as={RouterLink} to="/generated-zones" color="white" mr={4}>
          Generated Zones
        </Link>
        <Link as={RouterLink} to="/login" color="white" mr={4}>
          Login
        </Link>
        <Link as={RouterLink} to="/register" color="white" mr={4}>
          Register
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
