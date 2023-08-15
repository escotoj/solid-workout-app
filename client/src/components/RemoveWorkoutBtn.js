import React from 'react';

import { Button } from "@mui/material";

function RemoveWorkoutButton({ workoutId, onRemove }) {
  return (
    <Button variant="outlined" color="error" onClick={() => onRemove(workoutId)}>
      Remove Workout
    </Button >
  );
}

export default RemoveWorkoutButton;