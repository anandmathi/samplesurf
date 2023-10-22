import React, { useState, useEffect, useMemo } from 'react';
import {Card, CardContent, CircularProgress, Grid, Typography} from "@material-ui/core";

import "./App.css";

import SpotifyWebApi from "./data/spotify-web-api"
import Search from "./components/Search";

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import TracksList from "./components/TracksList";
// import Footer from "./components/Footer";

const theme = createTheme({
    palette: {
        primary: { main: "#1DB954", contrastText: "#fff" },
        secondary: { main: "#03a9f4", contrastText: "#fff" }
    },
    typography: {
        fontFamily: 'Montserrat',
    },
});

export default function App() {
    const spotify = useMemo(() => new SpotifyWebApi(), []);
    const [apiResponseStatus, setApiResponseStatus] = useState(null);
    const [found, setFound] = useState([]);
    const [similar, setSimilar] = useState([]);


    let foundSamples = [];
    let similarTracks = [];

    const [data, setData] = useState([]);
    const [layout, setLayout] = useState(true);

    const handleKeyPress = async (event) => {
        if(event.key === "Enter"){
            const data = await spotify.searchTracks(event.target.value, {});
            setLayout(true);
            setData(data);
        }
    }

    useEffect(() => {
        const makeApiRequest = () => {
            if (apiResponseStatus === 200) return;
            spotify.getToken((error, response) => {
                if (!error) {
                    spotify.setAccessToken(response.token);
                    console.log('success');
                    // console.log(response.token);
                    setApiResponseStatus(200);
                } else {
                    console.log(error);
                }
            });
        };

        const interval = setInterval(() => {
            if (apiResponseStatus !== 200) {
                makeApiRequest();
            }
        }, 500);

        const refresh = setInterval(() => {
            setApiResponseStatus(null);
            makeApiRequest();
        }, 3600000);

        return () => {
            clearInterval(interval);
            clearInterval(refresh);
        };
    }, [apiResponseStatus, spotify]);

    return (
        <ThemeProvider theme={theme}>
      <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
      >
          {apiResponseStatus !== 200 ? (
                  <div style={{
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}>
                      <CircularProgress/>
                      <br/>
                      <Typography style={{
                          textAlign: 'center',
                          justifyContent: 'center'
                      }}>
                          <strong>Connecting to service...</strong><br/>
                          This may take a few seconds.
                      </Typography>
                  </div>
              ) :
              <Grid item>
                  <Card variant="outlined"
                        style={
                            {backgroundColor: "#1C1D22", borderColor: "#FCFCFC", color: "#FCFCFC", margin: "50px"}
                        }>
                      <br/>
                      <CardContent>
                          <Search handleKeyPress={handleKeyPress}/>
                          <br/>
                          <br/>
                          <TracksList data={data} layout={layout} setLayout={setLayout} spotify={spotify} found={found} setFound={setFound} similar={similar} setSimilar={setSimilar}/>
                          {/*<SamplesList data={data}/>*/}
                      </CardContent>
                  </Card>
              {/*<Search/>*/}
              </Grid>
          }
      </Grid>
            {/*<Footer/>*/}
            </ThemeProvider>
  );
}

