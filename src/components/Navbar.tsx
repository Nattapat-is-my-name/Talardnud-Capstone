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
        <Link as={RouterLink} to="/configure" color="white" mr={4}>
          Configure Layout
        </Link>
        <Link as={RouterLink} to="/generated-zones" color="white">
          Generated Zones
        </Link>
      </Flex>
    </Box>
  );
};

export default Navbar;
