import React from 'react';

import { Button } from "@mui/material";

function RemoveWorkoutButton({ workoutId, onRemove }) {
  return (
    <Button style={{ backgroundColor: 'pink' }} onClick={() => onRemove(workoutId)}>
      Remove Card
    </Button >
  );
}

export default RemoveWorkoutButton;