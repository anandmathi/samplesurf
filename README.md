# SampleSurf

## Project Description
SampleSurf is an open-source utility that empowers music enthusiasts to explore their favorite songs. It utilizes the Spotify Web API and web-scraping software to help producers discover new songs to incorporate into their own music.

[Video Demo]()

## Local Setup
The following should be done in the project root directory unless otherwise specified.
1. Run `npm install` to install all relevant dependencies.
2. Run `netlify dev` to start the Netlify serverless functions.
   - These functions will be accessible at http://localhost:8888/.netlify/functions/spotify and http://localhost:8888/.netlify/functions/whosampled by default.
3. Create a '.env' file with the following body, not including brackets:
    - TOKEN_GEN_URL = [URL running the spotify function]
    - SCRAPER_URL = [URL running the web-scraper function]
    - SPOTIFY_CLIENT_ID = [client ID for your Spotify API app]
    - SPOTIFY_CLIENT_TOKEN = [client token for your Spotify API app]
4. Run `npm start` to start up the front-end service. The project will be live at http://localhost:3000 by default.

## Acknowledgements
- [Spotify Web API Wrapper](https://github.com/JMPerez/spotify-web-api-js) by JMPerez
- [Spotify Web API Token Generator](https://github.com/JMPerez/spotify-web-api-token) by JMPerez