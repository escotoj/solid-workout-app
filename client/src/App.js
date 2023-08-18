import React from "react";
import { Box, Typography, Container } from "@material-ui/core";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Exercises from "./pages/Exercises";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import History from "./pages/History";
import Gains from "./pages/Gains";

import LandingPage from "./components/LandingPage.js";

function App() {
  const CodeDisplay = () => {
    return (
      <div>
        <LandingPage />
      </div>
    );
  };

  return (
    <Box sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Router>
        <Header />
        <Container maxWidth="sm" sx={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<CodeDisplay />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/gains" element={<Gains />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Container>
      </Router>
    </Box>
  );
}

export default App;
