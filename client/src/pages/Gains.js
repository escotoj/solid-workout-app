import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WorkoutForm from "../components/addWorkout";


const Log = () => {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Box style={{ textAlign: "center", padding: "24px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Log Your Gains
      </Typography>
      <FitnessCenterIcon fontSize="large" style={{ color: "red" }} />
      <Box style={{ marginTop: "20px" }}>
        <Typography variant="h6" component="h1">
          Log and document all your hard work.
        </Typography>
      </Box>

      <WorkoutForm />
    </Box>
  );
};

export default Log;
