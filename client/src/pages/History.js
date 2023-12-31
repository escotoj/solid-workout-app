import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, QUERY_SINGLE_WORKOUT } from "../utils/queries";
import { REMOVE_WORKOUT } from "../utils/mutations";
import {
  Typography,
  Paper,
  Box,
  Button,
  Card,
  Alert,
  AlertTitle,
} from "@mui/material";

import UpdateWorkoutButton from "../components/UpdateWorkoutButton";
import RemoveWorkoutButton from "../components/RemoveWorkoutBtn";

import UpdateWorkoutForm from "../components/updateForm";

import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";

const MyWorkout = () => {
  const [singleWorkout, setSingleWorkout] = useState(null);
  const detailsRef = useRef(null);
  const [workoutToUpdate, setWorkoutToUpdate] = useState(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const { loading, error, data } = useQuery(GET_ME);
  const [userWorkouts, setUserWorkouts] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [removeButtonClicked, setRemoveButtonClicked] = useState(false);

  const [removeWorkout] = useMutation(REMOVE_WORKOUT, {
    refetchQueries: [{ query: GET_ME }],
  });

  useEffect(() => {
    console.log("Data from GET_ME:", data);
    if (data?.me.workouts) {
      setUserWorkouts(data.me.workouts);
      // setShowAlert(true);
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
      setShowAlert(true);
      setRemoveButtonClicked(true);

      console.log(`Updated userWorkouts state: `, data.removeWorkout.workouts);
    } else {
      console.log(`No updated user received from server.`);
    }
  };

  const handleViewDetails = (workoutId) => {
    setSelectedWorkoutId(workoutId);
    detailsRef.current.scrollIntoView({ behavior: "smooth" });
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
      <HistoryIcon fontSize="large" style={{ color: "red" }} />
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
                {userWorkouts.map((workout) => {
const formattedDate = workout.date
? new Date(parseInt(workout.date)).toLocaleDateString("en-US", {
    timeZone: "America/los_angeles", // Replace with the appropriate timezone
  })
: "";


                  return (
                    <Paper
                      key={workout._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                        padding: "10px",
                        flexDirection: "column",
                        "@media (min-width: 375px)": {
                          flexDirection: "row",
                        },
                      }}
                    >
                      <Box style={{ display: "block" }}>
                        <Typography>{workout.title}</Typography>
                        <Typography
                          style={{
                            paddingTop: 8,
                            fontStyle: "italic",
                            color: "#055B5C",
                          }}
                        >
                          {formattedDate}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleViewDetails(workout._id)}
                      >
                        View Details
                      </Button>
                    </Paper>
                  );
                })}
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
              ref={detailsRef}
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
                      border: "5px double #6EC6CA",
                      backgroundColor: "#FAF9F6",
                      padding: "5%",
                      margin: "0 auto",
                      "@media (max-width: 390px)": {
                        padding: "3%",
                      },
                    }}
                  >
                    <div className="single-workout-details">
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Title:
                      </Typography>
                      <Typography sx={{ margin: 2 }} gutterBottom>
                        {singleWorkout.title}
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Details:
                      </Typography>
                      <Typography gutterBottom sx={{ margin: 2 }}>
                        {singleWorkout.details}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Notes:
                      </Typography>
                      <Typography sx={{ margin: 2 }}>
                        {singleWorkout.notes}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Date:
                      </Typography>
                      <Typography sx={{ margin: 2 }}>
                        {singleWorkout.date
                          ? new Date(
                              parseInt(singleWorkout.date)
                            ).toLocaleDateString("en-US")
                          : ""}
                      </Typography>

                      <Box
                        sx={{ mt: 8, textAlign: "end", paddingRight: "20%" }}
                      ></Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "25px",
                        }}
                      >
                        {removeButtonClicked && showAlert && (
                          <Alert severity="warning">
                            This Workout is No More —{" "}
                            <strong>
                              <Link
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.reload();
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                Please Refresh Page
                              </Link>
                            </strong>
                          </Alert>
                        )}
                      </Box>

                      <Box
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <UpdateWorkoutButton
                          workoutId={singleWorkout._id}
                          newDetails={singleWorkout.details}
                          newTitle={singleWorkout.title}
                          newDate={singleWorkout.date}
                          newNote={singleWorkout.notes}
                          setWorkoutToUpdate={setWorkoutToUpdate}
                        />
                      </Box>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <RemoveWorkoutButton
                          workoutId={singleWorkout._id}
                          onRemove={() => {
                            handleRemoveWorkout(singleWorkout._id);
                          }}
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
