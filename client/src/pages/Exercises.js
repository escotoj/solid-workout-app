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

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseInput, setExerciseInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (submitted) {
      console.log("inside useEffect");
      fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${exerciseInput}`, {
        headers: {
          "X-Api-Key": "aNt6yjMoFkLXGlw/1IEuiw==mJbbhiQt0Znr1ixr"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setExercises(data);
          console.log("DATA", data);
          setDataLoaded(true);
        });
    }
  }, [submitted, exerciseInput]);

  console.log("I am rendering");

  const handleAddExercise = () => {
    if (exerciseInput.trim() !== "") {
      setExercises([]);
      setSubmitted(false); // Reset the submitted state to falsea
      setExerciseInput(exerciseInput);
      setSubmitted(true); // Set the submitted state to true after setting the exerciseInput
      setDataLoaded(false);
    }
  };

  const handleNewSearch = () => {
    setExerciseInput("");
    setSubmitted(false);
    setDataLoaded(false);
  };


  return (
    <div className="todoCon">
      <Typography variant="h4" component="h1" gutterBottom>
        Search
      </Typography>
      <Typography variant="h6" component="h1" gutterBottom>
        This page is dedicated to API calls that render exercises based in specific muscles that one wishes to target (forearm, chest, calves, ect. )
      </Typography>
      {!dataLoaded && ( // Only render input and button when data is not loaded
        <>
          <input
            type="text"
            onChange={(event) => setExerciseInput(event.target.value)}
            value={exerciseInput}
            placeholder="Enter a muscle to exercise"
          />
          <button className="btn" onClick={handleAddExercise}>
            Add exercise
          </button>
        </>
      )}
      {submitted && exercises.length === 0 ? (
        <p>No exercises to Display</p>
      ) : (
        submitted && (
          <>
            <ul>
              {exercises.map((exercise, index) => (
                <li key={index}>
                  <p>{exercise.name}</p>
                  <p>{exercise.muscle}</p>
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

export default Exercise;





// fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${exerciseInput}`, {
//   headers: {
//     "X-Api-Key": "aNt6yjMoFkLXGlw/1IEuiw==mJbbhiQt0Znr1ixr" 