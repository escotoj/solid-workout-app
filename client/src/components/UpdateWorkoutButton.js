// import React, { useState } from "react";
// import UpdateWorkoutForm from "../components/updateForm";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";

// const UpdateWorkoutButton = ({ workoutId, newDetails, newTitle }) => {
//   const [showUpdateForm, setShowUpdateForm] = useState(false);

//   const navigate = useNavigate();

//   // const handleClick = () => {
//   //   setShowUpdateForm(true);
//   // };

//   const handleNavigateToMyCard = () => {
//     navigate("/gains");
//   };

//   const handleOpenForm = () => {
//     setShowUpdateForm(true);
//   };

//   if (showUpdateForm) {
//     return (
//       <div>
//         <UpdateWorkoutForm
//           workoutId={workoutId}
//           newTitle={newTitle}
//           currentTitle={newTitle}
//           newDetails={newDetails}
//           currentDetails={newDetails}
//           handleNavigateToMyCard={handleNavigateToMyCard}
//           handleOpen={() => setShowUpdateForm(true)}
//         />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Button onClick={handleOpenForm} variant="contained" color="success">
//         Update
//       </Button>
//     </div>
//   );
// };

// export default UpdateWorkoutButton;


import React, { useState } from 'react';
import UpdateWorkoutForm from '../components/updateForm';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const UpdateWorkoutButton = ({ workoutId, newDetails, newTitle }) => {
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const handleNavigateToMyCard = () => {
    navigate('/gains');
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <UpdateWorkoutForm
          workoutId={workoutId}
          newTitle={newTitle}
          currentTitle={newTitle}
          newDetails={newDetails}
          currentDetails={newDetails}
          handleNavigateToMyCard={handleNavigateToMyCard}
          open={showForm}
          handleClose={handleCloseForm}
        />
      ) : (
        <Button onClick={handleOpenForm} variant="contained" color="success">
          Edit Workout
        </Button>
      )}
    </div>
  );
};

export default UpdateWorkoutButton;
