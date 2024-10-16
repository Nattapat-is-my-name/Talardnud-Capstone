import React from "react";
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Container,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";
import UserForm from "./UserForm";
import { useMarket } from "../contexts/MarketProvider";
import { useLocation } from "react-router-dom";

const ConfigurePage: React.FC = () => {
  const location = useLocation();
  const marketId = location.state?.marketId;
  const { selectedImage, setSelectedImage, zones } = useMarket();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box minH="100vh" bg={bgColor} py={8} px={4}>
      <Container maxW="1800px">
        <VStack spacing={12}>
          <Heading as="h1" size="2xl" textAlign="center">
            Market Layout Configuration
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
            gap={8}
            w="full"
          >
            <GridItem>
              <Box
                bg={cardBgColor}
                p={6}
                rounded="xl"
                shadow="lg"
                height="100%"
                minH={{ base: "auto", lg: "800px" }}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <ImageUpload
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />
              </Box>
            </GridItem>
            <GridItem>
              <Box
                bg={cardBgColor}
                p={6}
                rounded="xl"
                shadow="lg"
                height="100%"
                minH={{ base: "auto", lg: "800px" }}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <UserForm marketId={marketId} />
              </Box>
            </GridItem>
          </Grid>

          {zones.length > 0 && (
            <Box
              w="full"
              bg={cardBgColor}
              p={8}
              rounded="xl"
              shadow="md"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <Heading as="h3" size="lg" mb={6} fontWeight="semibold">
                Generated Zones
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                {zones.map((zone) => (
                  <GridItem key={zone.id}>
                    <Box
                      borderWidth="1px"
                      p={6}
                      borderRadius="lg"
                      borderColor={borderColor}
                    >
                      <Heading as="h4" size="md" mb={3} fontWeight="semibold">
                        Zone {zone.zone}
                      </Heading>
                      <Text fontSize="sm" mb={2}>
                        <Text as="span" fontWeight="medium">
                          Date:
                        </Text>{" "}
                        {zone.date.toDateString()}
                      </Text>
                      <Text fontSize="sm" mb={2}>
                        <Text as="span" fontWeight="medium">
                          Number of Stalls:
                        </Text>{" "}
                        {zone.stalls.length}
                      </Text>
                      <Text fontSize="sm">
                        <Text as="span" fontWeight="medium">
                          Stall Names:
                        </Text>{" "}
                        {zone.stalls.map((s) => s.name).join(", ")}
                      </Text>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default ConfigurePage;
