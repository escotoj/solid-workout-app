import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, QUERY_SINGLE_WORKOUT } from "../utils/queries";
import { REMOVE_WORKOUT } from "../utils/mutations";
import { Typography, Paper, Box, TextField, Button, workout } from "@mui/material";

// import UpdateWorkoutButton from "../components/UpdateWorkoutButton";
// import RemoveWorkoutButton from "../components/RemoveWorkoutButton";

// import UpdateWorkoutForm from "../components/updateWorkout";

const MyWorkout = () => {
  const [singleWorkout, setSingleWorkout] = useState(null);

//   const [workoutToUpdate, setWorkoutToUpdate] = useState(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const { loading, error, data } = useQuery(GET_ME);
  const [userWorkouts, setUserWorkouts] = useState([]);

//   const [removeWorkout] = useMutation(REMOVE_WORKOUT, {
//     refetchQueries: [{ query: GET_ME }],
//   });

  useEffect(() => {
    console.log("Data from GET_ME:", data);
    if (data?.me.workouts) {
      setUserWorkouts(data.me.workouts);
    }
  }, [data]);

  const {
    loading: singleWorkoutLoading,
    error: singleWorkoutError,
    data: singleWorkoutData,
  } = useQuery(QUERY_SINGLE_WORKOUT, {
    variables: { workoutId: selectedWorkoutId },
    skip: !selectedWorkoutId,
  });

  useEffect(() => {
    if (singleWorkoutData && singleWorkoutData.singleWorkout) {
      setSingleWorkout(singleWorkoutData.singleWorkout);
    }
  }, [singleWorkoutData]);

  console.log(singleWorkoutData);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

//   const handleRemoveWorkout = async (workoutId) => {
//     console.log(`Attempting to remove workout with ID: ${workoutId}`);
//     const { data } = await removeWorkout({ variables: { workoutId: workoutId } });

//     console.log(`Mutation response data: `, data);

//     if (data?.removeWorkout) {
//       console.log(`Received updated user from server: `, data.removeWorkout);
//       setUserWorkouts(data.removeWorkout.workouts);
//       window.alert('Successful Delete')
//       window.location.reload();
//       console.log(`Updated userWorkouts state: `, data.removeWorkout.workouts);
//     } else {
//       console.log(`No updated user received from server.`);
//     }
//   };

  return (
    <Box sx={{   display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: 6}}>
      <Typography variant="h4" gutterBottom sx={{mt: 10, textAlign: "center", }} >My workouts</Typography>
    <Paper
      sx={{width: '60%', margin: 'auto'
      }}
    >
      <div className="my-workout-container">
        <div className="user-workouts">
          <h2 className="section-title">workouts</h2>
          {userWorkouts.length === 0 ? (
            <p className="empty-message">No workouts found for this user.</p>
          ) : (
            <ul className="workout-list">
              {userWorkouts.map((workout) => (
                <Paper>
                  <li key={workout._id} className="workout-item">
                    <span>{workout.title}</span>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => setSelectedWorkoutId(workout._id)}
                    >
                      View Details
                    </Button>
                    {/* <UpdateWorkoutButton
                      workoutId={workout._id}
                      newDetails={workout.details}
                      newTitle={workout.title}
                      newDate={workout.date}
                      newPicture={workout.picture}
                      setWorkoutToUpdate={setWorkoutToUpdate}
                    />
                    <RemoveWorkoutButton
                      workoutId={workout._id}
                      onRemove={handleRemoveWorkout}
                    /> */}
                  </li>
                </Paper>
              ))}
            </ul>
          )}
        </div>
        <div className="single-workout">
          <h2 className="section-title">Selected workout Details</h2>
          {singleWorkoutLoading
            ? "Loading..."
            : singleWorkoutError
            ? `Error! ${singleWorkoutError.message}`
            : singleWorkout && (
                <workout sx={{ minWidth: 275, border: '10px double #c2dcf7', 
                backgroundColor: '#fbe8d6'}}>
                  <div className="single-workout-details">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Title
        </Typography>
                    <h2>{singleWorkout.title}</h2>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Details
        </Typography>
                    <p>{singleWorkout.details}</p>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Author:
        </Typography>
                    <p>{singleWorkout.workoutAuthor}</p>
                    <Box sx={{ mt: 8, textAlign: "end", paddingRight: "20%" }}>
                      
                    </Box>
                  </div>
                </workout>
              )}
        </div>
{/* 
        {workoutToUpdate && (
          <UpdateWorkoutForm
            workoutId={workoutToUpdate.workoutId}
            currentDetails={workoutToUpdate.currentDetails}
            currentTitle={workoutToUpdate.currentTitle}
            currentDate={workoutToUpdate.currentDate}
            currentPicture={workoutToUpdate.currentPicture}
            setWorkoutToUpdate={setWorkoutToUpdate}
          />
        )} */}
      </div>
    </Paper>
    </Box>
  );
};

export default MyWorkout;