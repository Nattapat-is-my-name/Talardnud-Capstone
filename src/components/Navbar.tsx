import React from "react";
import { Box, Flex, Link, Spacer, Button } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an AuthContext

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // Get auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Perform logout (clear token, etc.)
    navigate("/login"); // Redirect to login after logout
  };

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

        {/* If not authenticated, show Login and Register */}
        {!isAuthenticated ? (
          <>
            <Link as={RouterLink} to="/login" color="white" mr={4}>
              Login
            </Link>
            <Link as={RouterLink} to="/register" color="white" mr={4}>
              Register
            </Link>
          </>
        ) : (
          // If authenticated, show Profile and Logout
          <>
            <Link as={RouterLink} to="/" color="white" mr={4}>
              Home
            </Link>
            <Link as={RouterLink} to="/market" color="white" mr={4}>
              Market
            </Link>
            <Button color="white" variant="link" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
