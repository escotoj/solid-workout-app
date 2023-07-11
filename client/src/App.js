import React, { useState } from "react";
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
import Header from "./components/Header";

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

const App = () => {
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
    <div className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Solid Workout App
      </Typography>
      <Header />

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          variant="outlined"
          label="Log Workout"
          value={inputValue}
          onChange={handleInputChange}
        />

        <Button
          className={classes.submitButton}
          variant="contained"
          color="success"
          type="submit"
          sx={{ backgroundColor: "black" }}
        >
          Log
        </Button>
      </form>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Cardio"
          />
          <FormControlLabel control={<Checkbox />} label="Weights" />
          <FormControlLabel control={<Checkbox />} label="Stretching" />
        </FormGroup>
      </Box>
      {submittedValue && (
        <Paper className={classes.submittedValue}>
          <Typography variant="h6" component="h2" gutterBottom>
            Workout:
          </Typography>
          <Typography variant="body1">{submittedValue}</Typography>
        </Paper>
      )}
    </div>
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
