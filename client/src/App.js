import React from "react";
import { Box, Typography } from "@material-ui/core";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Exercises from "./pages/Exercises";
import Log from "./pages/Log";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Gains from "./pages/Gains"


function App() {
  const CodeDisplay = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>
          This is where you come after you had yourself a solid workout.
        </Typography>
      </div>
    );
  };

  return (
    <Box>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CodeDisplay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/gains" element={<Gains />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
