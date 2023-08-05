import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box,
  Typography
} from "@material-ui/core";

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
      <Typography variant="h4" component="h1">
        Log Your Gains
      </Typography>

      <WorkoutForm/>

      <Typography variant="h6" component="h1">
        Page set up for users to log their workouts by adding data like Workout name, type, muscle and duration, and description/comments.


      </Typography>

   
      </Box>
  );
};

export default Log;