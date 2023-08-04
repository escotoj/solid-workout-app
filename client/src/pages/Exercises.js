import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

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

const Exercise = () => {
  const classes = useStyles();
  const [exercises, setExercises] = useState([]);
  const [exerciseInput, setExerciseInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (submitted) {
      fetchExercises();
    }
  }, [submitted, exerciseInput]);

  const fetchExercises = () => {
    fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${exerciseInput}`, {
      headers: {
        "X-Api-Key": "aNt6yjMoFkLXGlw/1IEuiw==mJbbhiQt0Znr1ixr",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExercises(data);
        setDataLoaded(true);
      });
  };

  const handleAddExercise = () => {
    if (exerciseInput.trim() !== "") {
      setExercises([]);
      setSubmitted(false);
      setExerciseInput(exerciseInput);
      setSubmitted(true);
      setDataLoaded(false);
    }
  };

  const handleNewSearch = () => {
    setExerciseInput("");
    setSubmitted(false);
    setDataLoaded(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search
      </Typography>
      <Typography variant="h6" component="h1" gutterBottom>
        This page is dedicated to API calls that render exercises based on specific muscles that one wishes to target (forearm, chest, calves, etc.)
      </Typography>
      {!dataLoaded && (
        <>
          <TextField
            className={classes.input}
            variant="outlined"
            label="Search by Muscle"
            value={exerciseInput}
            onChange={(event) => setExerciseInput(event.target.value)}
          />
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            onClick={handleAddExercise}
          >
            Add exercise
          </Button>
        </>
      )}
      {submitted && exercises.length === 0 ? (
        <Typography> No exercises to Display </Typography>
      ) : (
        submitted && (
          <>
            <Box>
              {exercises.map((exercise, index) => (
                <Box key={index} sx={{ marginTop: 12}}>
                   <Paper>
         <Typography variant="h6">
            {exercise.name}
          </Typography>
         
          <Typography sx={{ display: 'flex', marginLeft: 8}}>Target Muscle: {exercise.muscle}</Typography>
          </Paper>
                </Box>
              ))}
            </Box>
            {dataLoaded && (
              <>
                <Button
                  className={classes.submitButton}
                  variant="contained"
                  color="primary"
                  onClick={handleNewSearch}
                >
                  New Search
                </Button>
              </>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Exercise;
