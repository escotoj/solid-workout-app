import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";



import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles((theme) => ({
  hero: {
    // backgroundImage: 'url("")',
    // backgroundSize: 'cover',
    textAlign: "center",
    padding: theme.spacing(1),
  },
  content: {
    textAlign: "center",
    padding: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.hero}>
        <Container>
          <Grid justifyContent="center">
            <Grid item xs={12} md={8}>
              <Typography
variant="h4" gutterBottom sx={{ mt: 1, textAlign: "center" }}
              >
                Welcome to
              </Typography>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontStyle: "italic",
                  color: "#00000",
                }}
              >
                Solid Workout
              </Typography>
              <FavoriteIcon fontSize="large" style={{color:"red"}}/>
              <Typography variant="h6" color="secondary" paragraph>
                Your go-to platform for achieving your fitness and health gains.
              </Typography>
              <Button
                component={RouterLink}
                to="/gains"
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container className={classes.content} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom style={{ marginBottom:'5%'}}>
          Our Features
        </Typography>
        <Typography variant="body1" align="center" paragraph style={{ marginBottom:'5%'}}>
          Explore the features that will help you on your fitness journey.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Exercise Search
              </Typography>
              <Typography variant="body2" color="text.secondary">
This feature allows you create a search for exercises based on target muscles. 
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to="./Exercises" size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Log Your Gains
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Feature that allows you to keep track of your workout history. 
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to="./Gains" size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
