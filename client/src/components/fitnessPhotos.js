import React, { useState, useEffect } from 'react';
import { Card, CardMedia, Grid, CircularProgress } from '@material-ui/core';

const UnsplashFitnessGallery = () => {
  const [photoData, setPhotoData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchFitnessPhoto = async () => {
    const accessKey = 'MFB_RbfwYEadNMPMuZ_GRQX2tahRV4zvNeSem_JbA3s';
    try {
      const response = await fetch('https://api.unsplash.com/search/photos/?query=workout', {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
      const responseData = await response.json();
      if (responseData.results && responseData.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * responseData.results.length);
        console.log(responseData.results)
        setPhotoData(responseData.results[randomIndex]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFitnessPhoto();
  }, []);

  return (
    <Grid container justifyContent="center">
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt={photoData.alt_description}
              height="140"
              image={photoData.urls.regular}
            />
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default UnsplashFitnessGallery;
