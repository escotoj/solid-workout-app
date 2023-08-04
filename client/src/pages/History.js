import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, QUERY_SINGLE_WORKOUT } from "../utils/queries";
import { REMOVE_WORKOUT } from "../utils/mutations";
import { Typography, Paper, Box, Button, Card } from "@mui/material";

import UpdateWorkoutButton from "../components/UpdateWorkoutButton";
import RemoveWorkoutButton from "../components/RemoveWorkoutBtn";

import UpdateWorkoutForm from "../components/updateForm";

const MyWorkout = () => {
  const [singleWorkout, setSingleWorkout] = useState(null);

  const [workoutToUpdate, setWorkoutToUpdate] = useState(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const { loading, error, data } = useQuery(GET_ME);
  const [userWorkouts, setUserWorkouts] = useState([]);

  const [removeWorkout] = useMutation(REMOVE_WORKOUT, {
    refetchQueries: [{ query: GET_ME }],
  });

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

  const handleRemoveWorkout = async (workoutId) => {
    console.log(`Attempting to remove workout with ID: ${workoutId}`);
    const { data } = await removeWorkout({
      variables: { workoutId: workoutId },
    });

    console.log(`Mutation response data: `, data);

    if (data?.removeWorkout) {
      console.log(`Received updated user from server: `, data.removeWorkout);
      setUserWorkouts(data.removeWorkout.workouts);
      window.alert("Successful Delete");
      window.location.reload();
      console.log(`Updated userWorkouts state: `, data.removeWorkout.workouts);
    } else {
      console.log(`No updated user received from server.`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mt: 1, textAlign: "center" }}>
        Past Gains
      </Typography>
      <Paper sx={{ width: "100%", margin: "20px", padding: 1 }}>
        <div>
          <div>
            <Typography
              component="h1"
              sx={{
                fontWeight: "400",
                fontSize: "1.5rem",
                fontFamily: "Calibri, Roboto, Helvetica, Arial",
              }}
            >
              Workouts
            </Typography>
            {userWorkouts.length === 0 ? (
              <p className="empty-message">No workouts found for this user.</p>
            ) : (
              <ul>
                {userWorkouts.map((workout) => (
                  <Paper
                    key={workout._id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                      padding: "10px", // Add some padding for better spacing
                      flexDirection: "column", // Stack the items vertically in mobile view
                      "@media (min-width: 375px)": {
                        flexDirection: "row", // Switch back to row layout on larger screens (portrait mode)
                      },
                    }}
                  >
                    <Box style={{ display: "block" }}>
                      <Typography>{workout.title}</Typography>
                      <Typography>{workout.title}</Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
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
                  </Paper>
                ))}
              </ul>
            )}
          </div>
          <div className="single-workout">
            <Typography
              component="h1"
              sx={{
                fontWeight: "400",
                fontSize: "1.5rem",
                fontFamily: "Calibri, Roboto, Helvetica, Arial",
                marginTop: "4vh",
                marginBottom: "1vh",
              }}
            >
              Selected Workout
            </Typography>
            {singleWorkoutLoading
              ? "Loading..."
              : singleWorkoutError
              ? `Error! ${singleWorkoutError.message}`
              : singleWorkout && (
                  <Card
                  sx={{
                    maxWidth: "500px",
                    border: "10px double #c2dcf7",
                    backgroundColor: "#fbe8d6",
                    padding: "5%",
                    margin: "0 auto", 
                    "@media (max-width: 390px)": {
                      padding: "3%", 
                    },
                  }}
                  >
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
                      <Box
                        sx={{ mt: 8, textAlign: "end", paddingRight: "20%" }}
                      ></Box>

                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <UpdateWorkoutButton
                          workoutId={singleWorkout._id}
                          newDetails={singleWorkout.details}
                          newTitle={singleWorkout.title}
                          newDate={singleWorkout.date}
                          newPicture={singleWorkout.picture}
                          setWorkoutToUpdate={setWorkoutToUpdate}
                        />
                      </Box>
                      <Box
                      sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                      >
                        <RemoveWorkoutButton
                          workoutId={singleWorkout._id}
                          onRemove={handleRemoveWorkout}
                        />
                      </Box>
                    </div>
                  </Card>
                )}
          </div>

          {workoutToUpdate && (
            <UpdateWorkoutForm
              workoutId={workoutToUpdate.workoutId}
              currentDetails={workoutToUpdate.currentDetails}
              currentTitle={workoutToUpdate.currentTitle}
              currentDate={workoutToUpdate.currentDate}
              currentPicture={workoutToUpdate.currentPicture}
              setWorkoutToUpdate={setWorkoutToUpdate}
            />
          )}
        </div>
      </Paper>
    </Box>
  );
};

export default MyWorkout;