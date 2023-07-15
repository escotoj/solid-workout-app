import React, { useState, useEffect } from "react";
import { Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutInput, setWorkoutInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (submitted) {
      console.log("inside useEffect");
      fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${workoutInput}`, {
        headers: {
          "X-Api-Key": "aNt6yjMoFkLXGlw/1IEuiw==mJbbhiQt0Znr1ixr"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setWorkouts(data);
          console.log("DATA", data);
          setDataLoaded(true);
        });
    }
  }, [submitted, workoutInput]);

  console.log("I am rendering");

  const handleAddWorkout = () => {
    if (workoutInput.trim() !== "") {
      setWorkouts([]);
      setSubmitted(false); // Reset the submitted state to falsea
      setWorkoutInput(workoutInput);
      setSubmitted(true); // Set the submitted state to true after setting the workoutInput
      setDataLoaded(false);
    }
  };

  const handleNewSearch = () => {
    setWorkoutInput("");
    setSubmitted(false);
    setDataLoaded(false);
  };


  return (
    <div className="todoCon">
      <Typography variant="h4" component="h1" gutterBottom>
        Search
      </Typography>
      <Typography variant="h6" component="h1" gutterBottom>
        This page is dedicated to API calls that render workouts based in specific muscles that one wishes to target (forearm, chest, calves, ect. )
      </Typography>
      {!dataLoaded && ( // Only render input and button when data is not loaded
        <>
          <input
            type="text"
            onChange={(event) => setWorkoutInput(event.target.value)}
            value={workoutInput}
            placeholder="Enter A Workout"
          />
          <button className="btn" onClick={handleAddWorkout}>
            Add Workout
          </button>
        </>
      )}
      {submitted && workouts.length === 0 ? (
        <p>No Workouts to Display</p>
      ) : (
        submitted && (
          <>
            <ul>
              {workouts.map((workout, index) => (
                <li key={index}>
                  <p>{workout.name}</p>
                  <p>{workout.muscle}</p>
                </li>
              ))}
            </ul>
            {dataLoaded && ( // Only render message when data is loaded
              <>
              <button className="btn" onClick={handleNewSearch}>
                New Search
              </button>
            </>
          )}
        </>
      )
      )}
    </div>
  );
};

export default Workout;





// fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${workoutInput}`, {
//   headers: {
//     "X-Api-Key": "aNt6yjMoFkLXGlw/1IEuiw==mJbbhiQt0Znr1ixr" 