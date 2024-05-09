import React, { useEffect, useState } from 'react';
import spotifyConfig from './spotifyConfig';
import { Login } from './login';

const Callback = ({ onLoginStatusChange }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getReturnedParamsFromSpotify = (hash) => {
        const stringAfterHasch = hash.substring(1);
        const paramsInUrl = stringAfterHasch.split('&').reduce((initial, item) => {
            const [key, value] = item.split('=');
            initial[key] = value;
            return initial;
        }, {});

        return paramsInUrl;
    };

    useEffect(() => {
        if (window.location.hash) {
            const {
                access_token,
                token_type,
                expires_in
            } = getReturnedParamsFromSpotify(window.location.hash);

            localStorage.clear();
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('expiresIn', expires_in);
            localStorage.setItem('tokenType', token_type);

            // Fetch user ID and store it in local storage
            fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('userId', data.id);
                    setIsLoggedIn(true);
                    onLoginStatusChange(true);
                })
                .catch(error => {
                    console.error('Error fetching user ID:', error);
                    setIsLoggedIn(true);
                    onLoginStatusChange(true);
                });
        }
    }, []);


    const handleLogin = () => {
        window.location = `${spotifyConfig.SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${spotifyConfig.CLIENT_ID}&redirect_uri=${spotifyConfig.REDIRECT_URI}&scope=${spotifyConfig.SCOPES_URL_PARAMS}&response_type=token&show_dialog=true`;
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        onLoginStatusChange(false);
    };

    return (
        <div>
            <Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
        </div>
    );
};

export { Callback };
