import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Text,
  Container,
  VStack,
  useColorModeValue,
  useToast,
  Button,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";
import UserForm from "./UserForm";
import { useMarket } from "../contexts/MarketProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { MarketApi, Configuration, DtosMarketEditRequest } from "../api";
import { useAuth } from "../contexts/AuthContext";

const ConfigurePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useAuth();
  const marketId = location.state?.marketId;
  const { selectedImage, setSelectedImage, zones } = useMarket();
  const [layoutImage, setLayoutImage] = useState<string | undefined>(undefined);
  const [marketDetails, setMarketDetails] =
    useState<DtosMarketEditRequest | null>(null);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const fetchMarketDetails = useCallback(async () => {
    if (!marketId || !token) return;

    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const marketApi = new MarketApi(config);
      const response = await marketApi.marketsGetIdGet(marketId);
      const marketData =
        Array.isArray((response.data as any)?.data) &&
        (response.data as any).data.length > 0
          ? (response.data as any).data[0]
          : null;
      if (marketData) {
        const market = marketData;
        setMarketDetails({
          name: market.name || "",
          address: market.address || "",
          description: market.description || "",
          open_time: market.open_time || "",
          close_time: market.close_time || "",
          provider_id: market.provider_id || "",
          image: market.image || "",
          layout_image: market.layout_image || "",
          latitude: market.latitude || "",
          longitude: market.longitude || "",
          phone: market.phone || "",
        });
        setLayoutImage(market.layout_image);
      }
    } catch (error) {
      console.error("Error fetching market details:", error);
      toast({
        title: "Error",
        description: "Failed to fetch market details",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [marketId, token, toast]);

  useEffect(() => {
    fetchMarketDetails();
  }, [fetchMarketDetails]);

  const handleLayoutImageUpdate = useCallback(
    (value: React.SetStateAction<string | undefined>) => {
      setLayoutImage(value);
    },
    []
  );

  const handleMarketUpdate = async () => {
    if (!marketId || !token || !marketDetails) return;

    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const marketApi = new MarketApi(config);

      const updateData: DtosMarketEditRequest = {
        ...marketDetails,
        layout_image: layoutImage,
      };

      await marketApi.marketsEditIdPatch(marketId, updateData);

      toast({
        title: "Success",
        description: "Market layout image updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating market layout image:", error);
      toast({
        title: "Error",
        description: "Failed to update market layout image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
                display="flex"
                flexDirection="column"
              >
                <Heading as="h2" size="xl" mb={6}>
                  Layout Image
                </Heading>
                <ImageUpload
                  selectedImage={layoutImage}
                  setSelectedImage={handleLayoutImageUpdate}
                />
                <Button
                  mt="auto"
                  colorScheme="blue"
                  onClick={handleMarketUpdate}
                  isDisabled={!marketDetails}
                  width="100%"
                  p={6}
                >
                  Update Layout Image
                </Button>
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
