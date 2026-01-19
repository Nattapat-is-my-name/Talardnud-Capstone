import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Icon,
  Spinner,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  Configuration,
  DtosMarketEditRequest,
  MarketApi
} from "../api";
import { useAuth } from "../contexts/AuthContext";
import ImageUpload from "./ImageUpload";
import MarketProfileForm from "./MarketProfileForm";

const EditMarketPage: React.FC = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { token } = useAuth();
  const [marketDetails, setMarketDetails] =
    useState<DtosMarketEditRequest | null>(null);
  const [marketImage, setMarketImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const fetchMarketDetails = useCallback(async () => {
    if (!marketId || !token) return;

    setIsLoading(true);
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
        setMarketImage(market.image);
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
    } finally {
      setIsLoading(false);
    }
  }, [marketId, token, toast]);

  useEffect(() => {
    fetchMarketDetails();
  }, [fetchMarketDetails]);

  const handleMarketUpdate = async (updatedMarket: DtosMarketEditRequest) => {
    if (!marketId || !token) return;

    try {
      const config = new Configuration({
        basePath: process.env.REACT_APP_API_BASE_URL,
        accessToken: token,
      });
      const marketApi = new MarketApi(config);

      const updateData: DtosMarketEditRequest = {
        ...updatedMarket,
        image: marketImage,
      };

      console.log("update", updateData);

      const response = await marketApi.marketsEditIdPatch(marketId, updateData);
      console.log("Market update response:", response.data);

      toast({
        title: "Success",
        description: "Market profile updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/market/${marketId}/edit`);
    } catch (error) {
      console.error("Error updating market profile:", error);
      toast({
        title: "Error",
        description: "Failed to update market profile",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleImageUpdate = useCallback(
    (value: React.SetStateAction<string | undefined>) => {
      setMarketImage(value);
    },
    []
  );

  if (isLoading) {
    return (
      <Box minH="100vh" bg={bgColor}>
        <Center minH="100vh">
          <VStack spacing={4}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color={"blue"}
              size="xl"
            />
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={12} px={6}>
      <Container maxW="1600px">
        <Button
          leftIcon={<Icon as={FaArrowLeft} />}
          variant="ghost"
          _hover={{
            transform: "translateX(-4px)",
            transition: "all 0.2s",
          }}
          onClick={() => navigate(`/market/${marketId}`)}
        >
          Back
        </Button>
        <VStack spacing={16}>
          <Heading as="h1" size="2xl" textAlign="center">
            Edit Market Profile
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={12}
            w="full"
          >
            <GridItem>
              <Box
                bg={cardBgColor}
                p={10}
                rounded="xl"
                shadow="xl"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Heading as="h2" size="xl" mb={8}>
                  Market Details
                </Heading>
                {marketDetails && (
                  <MarketProfileForm
                    marketDetails={marketDetails}
                    onSubmit={handleMarketUpdate}
                  />
                )}
              </Box>
            </GridItem>
            <GridItem>
              <Box
                bg={cardBgColor}
                p={10}
                rounded="xl"
                shadow="xl"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Heading as="h2" size="xl" mb={8}>
                  Market Image
                </Heading>
                <ImageUpload
                  selectedImage={marketImage}
                  setSelectedImage={handleImageUpdate}
                />
              </Box>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default EditMarketPage;
