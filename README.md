# Jammming

This application was made as part of the full stack engineer course at [codecademy](https://www.codecademy.com/).

This is a second version where I implemented a Spotify web API.

Its purpose is to search for songs and add them to a playlist which can then be saved in your playlist account (you should have a registered Spotify account, free or paid).

Enjoy!

[Play with it!](https://jammming-by-rsilva.vercel.app/)  For this to work send me your name and e-mail (Spotify web API requirements). My email: rsilva6420.dev@gamil.com.

#### OR

- Clone this repository;
- Create a Spotify account (if you don't have one) and create a web spotify API [here](https://developer.spotify.com/);
  - In website field, add "http://localhost:3000" and in Redirect URIs field add "http://localhost:3000/callback";
- In your cloned project add an .env file in the root of the project;
  - Fill in with the following variables:<br>
      REACT_APP_SPOTIFY_CLIENT_ID='Replace with Your Client ID without quotes'<br>
      REACT_APP_SPOTIFY_CLIENT_SECRET='Replace with Your Client secret without quotes'<br>
      REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
- Run the following commands:
  ```bash
  $ npm install
  $ npm start

### Technologies: 
HTML, CSS, JavaScript and React. 

Here's a sample:


https://github.com/rui775/jammming-spotify-by-rsilva/assets/64076622/2f544f07-2f01-4646-991a-0b061dafac2d

