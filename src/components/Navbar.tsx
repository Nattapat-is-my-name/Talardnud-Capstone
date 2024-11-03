import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Container,
  HStack,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  FiHome,
  FiShoppingBag,
  FiLogOut,
  FiUser,
  FiBook,
} from "react-icons/fi";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const activeLinkColor = useColorModeValue("blue.500", "blue.300");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({
    to,
    children,
    icon,
  }: {
    to: string;
    children: React.ReactNode;
    icon: React.ElementType;
  }) => {
    const isActive = isActiveLink(to);

    return (
      <Link
        as={RouterLink}
        to={to}
        px={4}
        py={2}
        rounded="md"
        display="flex"
        alignItems="center"
        color={isActive ? activeLinkColor : "inherit"}
        fontWeight={isActive ? "semibold" : "medium"}
        _hover={{
          textDecoration: "none",
          bg: hoverBg,
        }}
        transition="all 0.2s"
      >
        <Icon as={icon} mr={2} />
        <Text>{children}</Text>
      </Link>
    );
  };

  return (
    <Box
      bg={bgColor}
      px={4}
      position="sticky"
      top={0}
      zIndex={10}
      borderBottom="1px"
      borderColor={borderColor}
      shadow="sm"
    >
      <Container maxW="8xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Link
              as={RouterLink}
              to="/"
              fontSize="xl"
              fontWeight="bold"
              _hover={{ textDecoration: "none" }}
            >
              <Text
                bgGradient="linear(to-r, blue.500, blue.600)"
                bgClip="text"
                fontWeight="extrabold"
              >
                TLN Admin Portal
              </Text>
            </Link>
          </Flex>

          {isAuthenticated ? (
            <HStack spacing={4}>
              <NavLink to="/" icon={FiHome}>
                Home
              </NavLink>
              <NavLink to="/market" icon={FiShoppingBag}>
                Market
              </NavLink>
              <NavLink to="/booking" icon={FiShoppingBag}>
                Booking
              </NavLink>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                  ml={4}
                >
                  <HStack>
                    <ChevronDownIcon />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/login"
                variant="ghost"
                colorScheme="blue"
                leftIcon={<FiUser />}
              >
                Login
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                colorScheme="blue"
                leftIcon={<ExternalLinkIcon />}
              >
                Register
              </Button>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
