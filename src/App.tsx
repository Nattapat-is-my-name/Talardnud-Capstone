import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MarketProvider } from "./contexts/MarketProvider";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import ConfigurePage from "./components/ConfigurePage";
import GeneratedZonesPage from "./components/GeneratedZonesPage";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <MarketProvider>
        <Router>
          <Box minH="100vh">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/configure" element={<ConfigurePage />} />
              <Route path="/generated-zones" element={<GeneratedZonesPage />} />
            </Routes>
          </Box>
        </Router>
      </MarketProvider>
    </ChakraProvider>
  );
}

export default App;
