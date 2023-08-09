import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hero: {
    // backgroundImage: 'url("/path/to/your/background-image.jpg")',
    // backgroundSize: 'cover',
    textAlign: "center",
    padding: theme.spacing(1),
  },
  content: {
    textAlign: 'center',
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
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold', 
          color: '#00000', 
        }}
      >
        Welcome to
      </Typography>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontStyle: 'italic', // Apply italic font style
          color: '#00000', // Change the text color
        }}
      >
      Solid Workout
      </Typography>
              <Typography variant="h6" color="textSecondary" paragraph>
                Your go-to platform for achieving your fitness and health gains.
              </Typography>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container className={classes.content} maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Our Features
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Explore the features that will help you on your fitness journey.
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Exercise Search
        </Typography>
        <Typography variant="body1" align="center" paragraph>
        Log Your Gains
        </Typography>
      </Container>
    </div>
  );
};

export default LandingPage;
