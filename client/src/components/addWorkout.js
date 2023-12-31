import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Button, Alert } from "@mui/material";

import { ADD_WORKOUT } from "../utils/mutations";

import Auth from "../utils/auth";

const WorkoutForm = ({ workoutId }) => {
  const [workoutAdded, setWorkoutAdded] = useState(false);

  const [workoutTitle, setWorkoutTitle] = useState("");
  const [workoutText, setWorkoutText] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const [noteText, setNoteText] = useState("");
  const [displayedDate, setDisplayedDate] = useState("");

  const [createWorkout, { error }] = useMutation(ADD_WORKOUT);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createWorkout({
        variables: {
          details: workoutText,
          title: workoutTitle,
          date: expirationDate,
          notes: noteText,
          workoutAuthor: Auth.getProfile().data.username,
        },
      });

      setWorkoutTitle("");
      setWorkoutText("");
      setNoteText("");
      setExpirationDate("");
      console.log(data);
      setWorkoutAdded(true);
      setDisplayedDate("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "workoutText" && value.length <= 280) {
      setWorkoutText(value);
      console.log(event);
    } else if (name === "workoutTitle") {
      setWorkoutTitle(value);
    } else if (name === "expirationDate") {
      const currentDate = new Date();
      const options = { timeZone: "America/Los_Angeles" }; 
      const formattedDate = currentDate.toLocaleString("en-US", options);
      setDisplayedDate(value);
      setExpirationDate(formattedDate);
    } else if (name === "noteText") {
      setNoteText(value);
    }
  };


  // const formattedDate = (date) => {
  //   const formatted = new Date(date);
  //   const mm = String(formatted.getMonth() + 1).padStart(2, "0");
  //   const dd = String(formatted.getDate() + 1).padStart(2, "0");
  //   const yy = String(formatted.getFullYear()).slice(-2);

  //   return `${mm}/${dd}/${yy}`;
  // };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: "1rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          border: "5px double #6EC6CA",
          display: "flex",
          justifyContent: "center",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
        }}
      >
        <Grid container justifyContent="center" margin="15px">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "2rem",

                marginTop: "1vh",
                textAlign: "center",
                textShadow: "2px 2px 2px #a7a59e",
              }}
            ></Typography>
          </Grid>
          {Auth.loggedIn() && (
            <>
              <Grid item xs={12} lg={9}>
                {workoutAdded && (
                  <Alert
                    severity="success"
                    sx={{
                      mx: 2,
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Great Workout
                    <br />
                    <Link to="/history" style={{ textDecoration: "none" }}>
                      View Here
                    </Link>
                  </Alert>
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="workoutTitle"
                  label="Workout Title"
                  placeholder="Workout Title"
                  value={workoutTitle}
                  variant="outlined"
                  size="large"
                  onChange={handleChange}
                  name="workoutTitle"
                />

                <TextField
                  margin="normal"
                  fullWidth
                  id="workoutText"
                  placeholder="Add your workout..."
                  label="Workout Details"
                  value={workoutText}
                  onChange={handleChange}
                  name="workoutText"
                  multiline
                  rows={6}
                  variant="outlined"
                ></TextField>

                <TextField
                  margin="normal"
                  fullWidth
                  id="noteText"
                  placeholder="Add Notes..."
                  label="Additional Notes"
                  value={noteText}
                  onChange={handleChange}
                  name="noteText"
                  multiline
                  rows={4}
                  variant="outlined"
                />

                <div marginTop={"10px"}>
                  <TextField
                    type="date"
                    name="expirationDate"
                    value={expirationDate}
                    className="form-input w-100"
                    onChange={handleChange}
                    style={{ marginTop: "10px" }}
                  />
                      {displayedDate && (
        <Typography style={{marginTop:"25px", color:'purple'}}>Selected Date: <br></br>  
          {displayedDate}</Typography>
    )}
                  {/* {expirationDate && (
        <p>Formatted Date: {formattedDate(expirationDate)}</p>
      )} */}
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={8}>
                <Link onClick={handleFormSubmit}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{
                      mt: 3,
                      mb: 2,
                      alignSelf: "center",
                      width: "24vh",
                    }}
                  >
                    Add Workout
                  </Button>
                </Link>

                <form
                  className="flex-row justify-center justify-space-between-md align-center"
                  onClick={handleFormSubmit}
                ></form>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default WorkoutForm;
