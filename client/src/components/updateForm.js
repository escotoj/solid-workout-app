import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_WORKOUT } from './../utils/mutations';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
// }));



const UpdateWorkoutForm = ({ workoutId, currentDetails, currentTitle, handleNavigateToMyCard, open, handleClose }) => {
  const [newDetails, setNewDetails] = useState(currentDetails);
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [updateWorkout, { loading: updating, error: updateError }] = useMutation(UPDATE_WORKOUT);



  // const classes = useStyles();
  const handleSaveUpdate = async () => {
    try {
      await updateWorkout({ 
        variables: { 
          workoutId: workoutId, 
          title: newTitle,
          details: newDetails,
        } 
      });
      console.log("Workout updated successfully");
      window.location.reload(true)
    } catch (error) {
      console.error("Error updating Workout", error);
    }
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Workout</DialogTitle>
        <DialogContent >
          <form>
            <TextField
              label="Title"
              type="text"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: '8px' }}
            />
            <TextField
              label="Details"
              type="text"
              id="details"
              value={newDetails}
              onChange={(e) => setNewDetails(e.target.value)}
              sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: '8px' }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveUpdate} variant="contained" color="success">
            Save Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateWorkoutForm;
