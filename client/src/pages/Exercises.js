import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";

import SearchIcon from '@mui/icons-material/Search';

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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

  const [modalOpen, setModalOpen] = useState(false);
  const [capturedExercise, setCapturedExercise] = useState(null);

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

  const handleExerciseClick = (exercise) => {
    console.log('Clicked exercise:', exercise);
    setModalOpen(true);
    setCapturedExercise(exercise); 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCapturedExercise(null);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search
      </Typography>
      <Box>
<SearchIcon fontSize="large" style={{color:"red"}}/>
</Box>
      <Typography variant="h6" component="h1" gutterBottom>
        This page is dedicated to API calls that render exercises based on specific muscles that one wishes to target (forearm, chest, calves, etc.)
      </Typography>

      {!dataLoaded && (
  <div style={{ marginTop: '20px', marginBottom: '20px' }}>
  <TextField
    variant="outlined"
    label="Target Muscle"
    value={exerciseInput}
    onChange={(event) => setExerciseInput(event.target.value)}
    style={{ marginTop: '20px', marginBottom: '20px' }}
  />
  <Button
    variant="contained"
    onClick={handleAddExercise}
    style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px', backgroundColor:"#9c27b0", color: 'white' }}
  >
    Search
  </Button>

</div>


      )}
      {submitted && exercises.length === 0 ? (
        <Typography> No exercises to Display </Typography>
      ) : (
        submitted && (
          <>
            <Box >
              <Paper style={{ borderRadius: '10px', padding: '10px' }}>
              <Typography variant="h5" style={{ color: '#000000', marginBottom: 2 }}>
                Showing results for:
              </Typography>
              {exercises.length > 0 && (
                <Typography variant="h5" style={{fontWeight: 'bold', color: '#055B5C', margin: 15, textDecoration:'red underline overline', textTransform: 'uppercase'}}>
             {exercises[0].muscle.charAt(0).toUpperCase() + exercises[0].muscle.slice(1)}
              </Typography>
              )}
              </Paper>

              {exercises.map((exercise, index) => (
                <Box key={index} sx={{ marginTop: 12 }}>
                  <Paper>
                    <Typography variant="h6">{exercise.name}</Typography>
            <Button onClick={() => handleExerciseClick(exercise)} style={{ backgroundColor: '#9c27b0', color:'white', marginTop: "2%", marginBottom: '2%'}}>See More</Button>
                  
                  </Paper>
                </Box>
              ))}
            </Box>
            {dataLoaded && (
              <>
<div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, marginRight:'7%' }}>
  <Button
    className={classes.submitButton}
    variant="contained"
    color="primary"
    onClick={handleNewSearch}
  >
    New Search
  </Button>
</div>
              </>
            )}
          </>
        )
      )}
            <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle >Exercise Details</DialogTitle>
        <DialogContent>
          {capturedExercise && (
            <>
            <DirectionsRunIcon/>
            <SportsGymnasticsIcon/>
            <FitnessCenterIcon/>
            <Typography variant="body1" style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>Target Muscle:</span> {capturedExercise.muscle.charAt(0).toUpperCase() + capturedExercise.muscle.slice(1)}
  </Typography>
  <Typography variant="body1" style={{ marginBottom: '8px', }}>
    <span style={{ fontWeight: 'bold' }}>Instructions:</span> {capturedExercise.instructions.charAt(0).toUpperCase() + capturedExercise.instructions.slice(1)}
  </Typography>
  <Typography variant="body1" style={{ marginBottom: '8px' }}>
  <span style={{ fontWeight: 'bold' }}>Type:</span> {capturedExercise.type.charAt(0).toUpperCase() + capturedExercise.type.slice(1)}
  </Typography>
  <Typography variant="body1" style={{ marginBottom: '8px' }}>
  <span style={{ fontWeight: 'bold' }}>Difficulty:</span> {capturedExercise.difficulty.charAt(0).toUpperCase() + capturedExercise.difficulty.slice(1)}
  </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Exercise;
