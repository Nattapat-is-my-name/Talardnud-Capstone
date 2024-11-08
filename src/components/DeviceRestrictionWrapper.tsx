import React, { useState, useEffect, ReactNode } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

interface DeviceRestrictionWrapperProps {
  children: ReactNode;
}

const DeviceRestrictionWrapper: React.FC<DeviceRestrictionWrapperProps> = ({
  children,
}) => {
  const [isAllowedDevice, setIsAllowedDevice] = useState(true);

  // Color mode values to match login page
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const gradientText = "linear(to-r, red.500, red.600)";

  useEffect(() => {
    const checkDeviceWidth = () => {
      setIsAllowedDevice(window.innerWidth >= 768);
    };

    checkDeviceWidth();
    window.addEventListener("resize", checkDeviceWidth);
    return () => window.removeEventListener("resize", checkDeviceWidth);
  }, []);

  if (!isAllowedDevice) {
    return (
      <Flex
        minH="100vh"
        bg="gray.50"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="lg" py={8}>
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
                  Device Not Supported
                </Heading>
                <Text
                  color="gray.600"
                  textAlign="center"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  This application is optimized for tablets and desktop devices
                  only. Please access it from a device with a larger screen.
                </Text>
                <Text color="gray.500" fontSize="sm" textAlign="center">
                  Minimum supported width: 768px
                </Text>
              </VStack>
            </VStack>
          </Box>
        </Container>
      </Flex>
    );
  }

  return <>{children}</>;
};

export default DeviceRestrictionWrapper;
