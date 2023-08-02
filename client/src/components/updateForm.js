import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_WORKOUT } from './../utils/mutations';

const UpdateWorkoutForm = ({ workoutId, currentDetails, currentTitle, handleNavigateToMyCard }) => {
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
      console.log("Card updated successfully");
      // handleNavigateToMyCard(); // Call the handleNavigateToMyCard function to navigate to "MyCard" route
      // window.location.href = '/my-cards';
      window.location.reload(true)
    } catch (error) {
      console.error("Error updating card", error);
    }
  };

  return (
    <div>
      <h2>Edit Workout</h2>
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
      <button onClick={handleSaveUpdate}>Save Update</button>
    </div>
  );
};

export default UpdateWorkoutForm;
