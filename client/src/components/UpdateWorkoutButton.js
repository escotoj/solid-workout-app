import React, { useState } from "react";
import UpdateWorkoutForm from "../components/updateForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const UpdateWorkoutButton = ({ workoutId, newDetails, newTitle }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowUpdateForm(true);
  };

  const handleNavigateToMyCard = () => {
    navigate("/gains");
  };

  if (showUpdateForm) {
    return (
      <div>
        <UpdateWorkoutForm
          workoutId={workoutId}
          newTitle={newTitle}
          currentTitle={newTitle}
          newDetails={newDetails}
          currentDetails={newDetails}
          handleNavigateToMyCard={handleNavigateToMyCard}
        />
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleClick} variant="contained" color="success" >
        Update
      </Button>
    </div>
  );
};

export default UpdateWorkoutButton;
