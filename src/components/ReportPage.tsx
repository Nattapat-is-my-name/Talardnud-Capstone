import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Heading,
  SimpleGrid,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Stack,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import {
  Configuration,
  DashboardApi,
  EntitiesMarketDashboardStats,
} from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaArrowLeft } from "react-icons/fa";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#a4de6c",
  "#d0ed57",
];

interface ChartDataPoint {
  date: string;
  bookings: number;
  revenue: number;
  occupancy: number;
}

interface ApiResponse {
  data: {
    stats: EntitiesMarketDashboardStats[];
    status: string;
  };
}

const useDashboardData = (marketId: string | undefined) => {
  const { token, isAuthenticated } = useAuth();
  const [data, setData] = useState<EntitiesMarketDashboardStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!marketId) {
        setError("Market information is missing.");
        setIsLoading(false);
        return;
      }

      if (!isAuthenticated || !token || !marketId) {
        setError("Authentication or market information is missing.");
        setIsLoading(false);
        return;
      }

      try {
        const config = new Configuration({
          basePath: process.env.REACT_APP_API_BASE_URL,
          accessToken: token,
        });
        const dashboardApi = new DashboardApi(config);
        const response = await dashboardApi.dashboardWeeklyIdGet(marketId);

        // Cast response to our ApiResponse type
        const apiResponse = response.data as ApiResponse;
        console.log("Dashboard data:", apiResponse);

        if (apiResponse?.data?.stats && apiResponse.data.stats.length > 0) {
          setData(apiResponse.data.stats);
        } else {
          console.log("Response structure:", {
            hasData: !!apiResponse,
            hasDataNested: !!(apiResponse && apiResponse.data),
            hasStats: !!(
              apiResponse &&
              apiResponse.data &&
              apiResponse.data.stats
            ),
            statsLength: apiResponse?.data?.stats?.length,
          });
          setError("No dashboard data found.");
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to fetch dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [marketId, token, isAuthenticated]);

  return { data, isLoading, error };
};

interface StatCardProps {
  label: string;
  value: number | string;
  subtext?: string;
  growth?: number;
  isCurrency?: boolean;
}
const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  growth,
  isCurrency,
}) => {
  return (
    <Card
      bg={useColorModeValue("white", "gray.700")}
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      shadow={"sm"}
      borderRadius="xl"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
    >
      <CardBody>
        <Stat>
          <StatLabel fontSize="sm" color="gray.500">
            {label}
          </StatLabel>
          <Flex align="baseline" gap={2}>
            <StatNumber fontSize="3xl" fontWeight="bold">
              {isCurrency ? "₿" : ""}
              {value}
            </StatNumber>
            {growth !== undefined && (
              <StatHelpText
                fontSize="sm"
                color={growth >= 0 ? "green.500" : "red.500"}
                mb={0}
              >
                <StatArrow type={growth >= 0 ? "increase" : "decrease"} />
                {Math.abs(growth)}%
              </StatHelpText>
            )}
          </Flex>
          {subtext && (
            <Text fontSize="sm" color="gray.500">
              {subtext}
            </Text>
          )}
        </Stat>
      </CardBody>
    </Card>
  );
};

const ChartCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      shadow="sm"
      borderRadius="xl"
    >
      <CardBody>
        <Heading size="md" mb={6}>
          {title}
        </Heading>
        {children}
      </CardBody>
    </Card>
  );
};

const ReportPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const marketId = location.state?.marketId;

  const { data, isLoading, error } = useDashboardData(marketId);

  // Calculate total bookings by summing all bookings
  const totalBookings = data.reduce(
    (acc, stat) => acc + (stat.total_bookings ?? 0),
    0
  );
  const totalRevenue = data.reduce(
    (acc, stat) => acc + (stat.total_revenue ?? 0),
    0
  );

  // Calculate total confirmed and cancelled bookings
  const totalConfirmedBookings = data.reduce(
    (acc, stat) => acc + (stat.total_confirm_bookings ?? 0),
    0
  );
  const totalCancelledBookings = data.reduce(
    (acc, stat) => acc + (stat.total_cancel_bookings ?? 0),
    0
  );

  // Calculate average occupancy by summing all occupancy rates and dividing by the number of stats
  const totalOccupancy = data.reduce(
    (acc, stat) => acc + (stat.occupancy_rate ?? 0),
    0
  );
  const averageOccupancy =
    data.length > 0 ? (totalOccupancy / data.length).toFixed(2) : 0;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" color="blue.500" thickness="6px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (data.length === 0) {
    return (
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle mr={2}>No Data Available</AlertTitle>
        <AlertDescription>
          No dashboard data is currently available.
        </AlertDescription>
      </Alert>
    );
  }

  const currentStats = data[0];
  const stats = {
    totalBookings: {
      value: totalBookings,
      growth: currentStats.booking_growth ?? 0,
    },
    revenue: {
      value: currentStats.total_revenue ?? 0,
      growth: currentStats.revenue_growth ?? 0,
    },
    occupancy: {
      value: averageOccupancy,
    },
    popularZone: {
      name: currentStats.top_zone ?? "N/A",
      occupancy: currentStats.top_zone_occupancy ?? 0,
    },
    bookingStatus: {
      pending: currentStats.total_pending_bookings ?? 0,
      confirmed: currentStats.total_confirm_bookings ?? 0,
      cancelled: currentStats.total_cancel_bookings ?? 0,
    },
  };

  // Prepare data for charts
  const chartData: ChartDataPoint[] = data.map((stat) => ({
    date: stat.date?.split("T")[0] ?? "",
    bookings: stat.total_bookings ?? 0,
    revenue: stat.total_revenue ?? 0,
    occupancy: stat.occupancy_rate ?? 0,
  }));

  const bookingStatusData = [
    {
      name: "Pending",
      value: stats.bookingStatus.pending,
    },
    {
      name: "Confirmed",
      value: stats.bookingStatus.confirmed,
    },
    {
      name: "Cancelled",
      value: stats.bookingStatus.cancelled,
    },
  ];

  return (
    <Container maxW="7xl" p={10}>
      <Button
        leftIcon={<Icon as={FaArrowLeft} />}
        variant="ghost"
        _hover={{
          transform: "translateX(-4px)",
          transition: "all 0.2s",
        }}
        onClick={() => navigate(`/market/${marketId}`)}
      >
        Back to Market
      </Button>
      <Flex justify="center" align="center" mb={8}>
        <Heading>Market Insights Dashboard</Heading>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={6}>
        <StatCard
          label="Total Bookings"
          value={totalBookings.toLocaleString()}
          subtext="This Week"
          growth={stats.totalBookings.growth}
        />
        <StatCard
          label="Total Revenue"
          value={totalRevenue.toLocaleString()}
          subtext="This Week"
          growth={stats.revenue.growth}
          isCurrency
        />
        <StatCard
          label="Average Occupancy"
          value={`${averageOccupancy}%`}
          subtext="All Zones"
        />
        <StatCard
          label="Most Popular Zone"
          value={stats.popularZone.name}
          subtext={`${stats.popularZone.occupancy}% Occupancy`}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
        <ChartCard title="Booking Trends">
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#718096" }}
                  tickLine={{ stroke: "#718096" }}
                />
                <YAxis
                  tick={{ fill: "#718096" }}
                  tickLine={{ stroke: "#718096" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke={COLORS[0]}
                  strokeWidth={2}
                  dot={{ fill: COLORS[0] }}
                  name="Total Bookings"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>

        <ChartCard title="Revenue Trend">
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#718096" }}
                  tickLine={{ stroke: "#718096" }}
                />
                <YAxis
                  tick={{ fill: "#718096" }}
                  tickLine={{ stroke: "#718096" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="revenue"
                  fill={COLORS[0]}
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <ChartCard title="Booking Status Distribution">
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>

        <SimpleGrid columns={1} spacing={4}>
          <Card
            bg={"white"}
            borderWidth="1px"
            borderColor={"gray.200"}
            shadow={"sm"}
            borderRadius="xl"
          >
            <CardBody>
              <Stat>
                <StatLabel color="gray.500">Total Confirmed Bookings</StatLabel>
                <StatNumber fontSize="2xl">{totalConfirmedBookings}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
          <Card
            bg={"white"}
            borderWidth="1px"
            borderColor={"gray.200"}
            shadow={"sm"}
            borderRadius="xl"
          >
            <CardBody>
              <Stat>
                <StatLabel color="gray.500">Total Cancelled Bookings</StatLabel>
                <StatNumber fontSize="2xl">{totalCancelledBookings}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
};

export default ReportPage;
