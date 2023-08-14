import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

import { ADD_WORKOUT } from '../utils/mutations';

import Auth from '../utils/auth';

const WorkoutForm = ({ workoutId }) => {

  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutText, setWorkoutText] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const [noteText, setNoteText] = useState('');



  const [characterCount, setCharacterCount] = useState(0);


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
        }
      });

      setWorkoutTitle('');
      setWorkoutText('');
      setNoteText('');
      setExpirationDate('');
      console.log(data)
      alert('Workout Added');
            navigate('/history');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'workoutText' && value.length <= 280) {
      setWorkoutText(value);
      setCharacterCount(value.length);
      console.log(event);
    } else if (name === 'workoutTitle') {
      setWorkoutTitle(value);
    } else if (name === 'expirationDate') {
      setExpirationDate(value);
    } else if (name === 'noteText') {
      setNoteText(value);
    } 
  };

  const formattedDate = (date) => {
    const formatted = new Date(date);
    const mm = String(formatted.getMonth() + 1).padStart(2, "0"); 
    const dd = String(formatted.getDate()).padStart(2, "0");
    const yy = String(formatted.getFullYear()).slice(-2);

    return `${mm}/${dd}/${yy}`;
  };
  
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: '3rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.grey[50]
            : t.palette.grey[900]
        }}
      >
        <Grid container justifyContent="center"> 
          <Grid item xs={12}> 
            <Typography
              variant="h4"
              sx={{
                fontSize: "2rem",
           
                marginTop: "1vh",
                textAlign: "center",
                textShadow: "2px 2px 2px #a7a59e",
              }}
            >
             
            </Typography>
          </Grid>
          {Auth.loggedIn() && (
            <>
              <Grid item xs={12} lg={9}> 
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

    <div>
      <TextField
        type="date"
        name="expirationDate"
        value={expirationDate}
        className="form-input w-100"
        onChange={handleChange}
      />
      {expirationDate && (
        <p>Formatted Date: {formattedDate(expirationDate)}</p>
      )}
    </div>

              </Grid>

              <Grid item xs={12} sm={6} md={8}> 
              <p
                  className={`m-0 ${
                    characterCount === 280 || error ? 'text-danger' : ''
                  }`}
                >
                  Character Count: {characterCount}/280
                  {error && <span className="ml-2">{error.message}</span>}
                </p>
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
                    // style={{ marginTop: '1rem' }}
                    // onClick={handleFormSubmit}
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