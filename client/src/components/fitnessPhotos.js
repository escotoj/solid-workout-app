import React, { useState, useEffect } from "react";
import { Card, CardMedia, Grid, CircularProgress } from "@material-ui/core";

const UnsplashFitnessGallery = () => {
  const [photoData, setPhotoData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchFitnessPhoto = async () => {
    const accessKey = process.env.REACT_APP_UNSPLASH_KEY;

    try {
      const response = await fetch(
        "https://api.unsplash.com/search/photos/?query=workout",
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );
      const responseData = await response.json();
      if (responseData.results && responseData.results.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * responseData.results.length
        );
        console.log(responseData.results);
        setPhotoData(responseData.results[randomIndex]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFitnessPhoto();
  }, []);

  return (
    <Grid container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid xs={12} sm={6} md={12}>
          <Card>
            <CardMedia
              component="img"
              alt={photoData.alt_description}
              height="600"
              image={photoData.urls.regular}
              sx={{
                borderRadius: "0 1rem 1rem 0",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                minWidth: "100vh",
                boxShadow: " 3px 3px 3px #7b8782",
              }}
            />
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default UnsplashFitnessGallery;
