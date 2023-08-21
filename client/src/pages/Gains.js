import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WorkoutForm from "../components/addWorkout";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  input: {
    marginRight: theme.spacing(2),
  },
  submitButton: {
    marginLeft: theme.spacing(2),
  },
  submittedValue: {
    marginTop: theme.spacing(2),
  },
}));

const Log = () => {
  const classes = useStyles();
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
    <Box className={classes.root}>
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
