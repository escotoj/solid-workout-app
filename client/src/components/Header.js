import { Grid, Typography } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
import { Link } from 'react-router-dom'

const Header = () => {
  return (
 
    <Grid bgcolor="lavenderblush" spacing={1} textAlign="center" container={true} >
      <Grid item xs={12}>
      <Typography variant="h2" component={Link} to="/" style={{ fontWeight: '400', textDecoration: 'none', color: 'inherit' }}>
          Solid Workout
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
    </Grid>
  );
};

export default Header;