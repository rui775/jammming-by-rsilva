import React, { useRef, useState } from 'react';
import { SearchBar, Results, Playlist } from './components/index.js';
import { Callback } from './api/index.js';
// import 'react-spotify-auth/dist/index.css';
import styles from './App.module.css';

/**
 * The main App component that manages the state and functionality of the application.
 * It includes features for searching songs, creating and managing playlists, and displaying user's playlists.
 */
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [playList, setPlayList] = useState([]);
  const [playListName, setPlayListName] = useState("");
  const inputRef = useRef(null);

  const handleLoginStatusChange = (status) => {
    setIsLoggedIn(status); // Update the isLoggedIn state with the value passed from the Callback component
    const userId = localStorage.getItem('userId'); // Update the isUserDataLoaded state with the value passed from the Callback component
    setIsUserDataLoaded(!!userId); // Update the isUserDataLoaded state with the value passed from the Callback component
  };

  // Fetch songs when the search term is updated
  const fetchSongs = async () => {
    try {
      if (searchTerm.trim() !== '') {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        setSongs(data.tracks.items);
        console.log(songs)
      } else {
        setSongs([]);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }

  };

  // Handle input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSongs();
    setSearchTerm('');
  };

  // Add a song to the playlist
  const addToPlaylist = (song) => {
    setPlayList((prev) => {
      if (prev.includes(song)) {
        return prev;
      } else {
        return [...prev, song];
      }
    });
  };

  // Remove a song from the playlist
  const removeFromPlaylist = (song) => {
    setPlayList((prev) => {
      return prev.filter((item) => item.id !== song.id);
    });
  };

  // Handle playlist name change
  const handlePlaylistName = (e) => {
    if (e.target.value.length > 0) {
      setPlayListName(e.target.value);
    }
  };

  // Create a new playlist to user's spotify account
  const createPlaylist = async () => {
    setLoading(true);
    try {
      // Create a new playlist
      const userId = localStorage.getItem('userId');
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playListName,
          description: 'New playlist created from the app',
          public: false,
        }),
      });

      const createPlaylistData = await createPlaylistResponse.json();
      if (createPlaylistData.id) {
        const playlistId = createPlaylistData.id;

        // Add tracks to the new playlist
        const trackUris = playList.map(track => track.uri);
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uris: trackUris }),
        });

        if (addTracksResponse.ok) {
          alert(`Playlist "${playListName}" created and added successfully to your Spotify!`);
          // Reset the playList and playListName state
          setPlayList([]);
          setPlayListName('');
        } else {
          console.error('Failed to add tracks to the playlist');
        }
      } else {
        console.error('Failed to create playlist:', createPlaylistData);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
    setLoading(false);
  };

  // Handle playlist submit
  const handlePlaylistSubmit = async (e) => {
    e.preventDefault();
    if (playListName === "") {
      return;
    } else {
      await createPlaylist();
    }
    inputRef.current.value = "";
    // console.log(playList);
  };

  return (
    <>
      <div>
        <Callback onLoginStatusChange={handleLoginStatusChange} />
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
        />
      </div>
      <div className={styles.container}>
        <Results
          songs={songs}
          addToPlaylist={addToPlaylist}
        />
        <Playlist
          playList={playList}
          addToPlaylist={addToPlaylist}
          removeFromPlaylist={removeFromPlaylist}
          handlePlaylistName={handlePlaylistName}
          handlePlaylistSubmit={handlePlaylistSubmit}
          inputRef={inputRef}
        />
      </div>
    </>
  );
}

export default App;
