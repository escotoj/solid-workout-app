import React from "react";
import { Box, Typography
} from "@material-ui/core";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Exercises from "./pages/Exercises";
import Log from "./pages/Log";



function App() {
  const CodeDisplay = () => {
    return (
<div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
  <Typography >
    This is where you come after you had yourself a solid workout.
  </Typography>
</div>
    );
  };

  return (
    <Box>
      <Router>
            <Header/>
      <Routes>

      <Route path="/" element={<CodeDisplay />} />

          <Route path="/exercises" element={<Exercises />} />          
          <Route path="/log" element={<Log />} />

        </Routes>
    </ Router>
    </Box>
  );
};


export default App;
