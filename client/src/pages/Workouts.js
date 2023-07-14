import React, { useState, useEffect } from "react";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutInput, setWorkoutInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
        });
    }
  }, [submitted]);

  console.log("I am rendering");

  const handleAddWorkout = () => {
    if (workoutInput.trim() !== "") {
      setWorkouts([]);
      setWorkoutInput("");
      setSubmitted(true);
    }
  };

  return (
    <div className="todoCon">
      <h1>Search For Workouts</h1>
      <input
        type="text"
        onChange={(event) => setWorkoutInput(event.target.value)}
        value={workoutInput}
        placeholder="Enter A Workout"
      />
      <button className="btn" onClick={handleAddWorkout}>
        Add Workout
      </button>
      {submitted && workouts.length === 0 ? (
        <p>No Workouts to Display</p>
      ) : (
        submitted && (
          <ul>
            {workouts.map((workout, index) => (
              <li key={index}>
                <p>{workout.name}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default Workout;





// fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${workoutInput}`, {
//   headers: {
//     "X-Api-Key": "aNt6yjMoFkLXGlw/1IEuiw==mJbbhiQt0Znr1ixr" 