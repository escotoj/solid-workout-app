import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Workouts from "./pages/Workouts";
import Log from "./pages/Log";



function App() {

  return (
    <Box>
      <Router>
            <Header/>
      <Routes>
          {/* <Route path="/" exact component={HomePage} /> */}
          <Route path="/workouts" element={<Workouts />} />          
          <Route path="/log" element={<Log />} />
          {/* Add more routes for other pages */}
        </Routes>
    </ Router>
    </Box>
  );
};


export default App;

// API for musclce

// const [workout, setWorkout] = useState([]);
// const [todoInput, setTodoInput] = useState("");

// useEffect(() => {
//   console.log("inside useEffect");
//   fetch("https://api.api-ninjas.com/v1/exercises?muscle=")
//     .then((res) => res.json())
//     .then((data) => {
//       setWorkout(data.workout);
//     });
// }, []);

// console.log("I am rendering");

// const handleAddTodo = () => {
//   if (todoInput.trim() !== "") {
//     setWorkout([...workout, todoInput]);
//     setTodoInput("");
//   }
// };
// var muscle = 'biceps'
// $.ajax({
//     method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
//     headers: { 'X-Api-Key': 'YOUR_API_KEY'},
//     contentType: 'application/json',
//     success: function(result) {
//         console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// });
