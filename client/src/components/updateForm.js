import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_WORKOUT } from './../utils/mutations';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UpdateWorkoutForm = ({ workoutId, currentDetails, currentTitle, handleNavigateToMyCard, open, handleClose }) => {
  const [newDetails, setNewDetails] = useState(currentDetails);
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [updateWorkout, { loading: updating, error: updateError }] = useMutation(UPDATE_WORKOUT);

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

    {/* Dialog (Modal) */}
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Workout</DialogTitle>
      <DialogContent>
      <form>
      <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <input
            type="text"
            id="details"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
          />
        </div>
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
