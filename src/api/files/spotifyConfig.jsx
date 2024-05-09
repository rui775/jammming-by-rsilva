const spotifyConfig = {
    CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    CLIENT_SECRET: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
    REDIRECT_URI: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    SPOTIFY_AUTHORIZE_ENDPOINT: 'https://accounts.spotify.com/authorize',
    SPACE_DELIMITER: '%20',
    SCOPES: [
        'user-read-private',
        'user-read-email',
        'user-read-currently-playing',
        'user-read-playback-state',
        'playlist-modify-private',
        'playlist-modify-public'],
    SCOPES_URL_PARAMS: '',
    PLAYLIST_ENDPOINT: 'https://api.spotify.com/v1/playlists',
    CREATE_PLAYLIST_ENDPOINT: 'https://api.spotify.com/v1/users/me/playlists'
};

spotifyConfig.SCOPES_URL_PARAMS = spotifyConfig.SCOPES.join(spotifyConfig.SPACE_DELIMITER);

export default spotifyConfig;
