import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { MarketProvider } from "./contexts/MarketProvider";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ConfigurePage from "./components/ConfigurePage";
import GeneratedZonesPage from "./components/GeneratedZonesPage";
import Register from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import "./App.css";
import MarketPage from "./components/MarketPage";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <MarketProvider>
          <Router>
            <Box minH="100vh">
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/configure" element={<ConfigurePage />} />
                  <Route
                    path="/generated-zones"
                    element={<GeneratedZonesPage />}
                  />
                  <Route path="/market" element={<MarketPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>
          </Router>
        </MarketProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
