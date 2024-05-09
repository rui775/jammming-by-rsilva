import React from "react";
import styles from "./playlist.module.css";

const Playlist = ({ inputRef, playList, removeFromPlaylist, handlePlaylistName, handlePlaylistSubmit }) => {

    return (
        <div className={styles.playlist}>
            <ul className={styles.list}>
                {playList.map((song) => (
                    <li className={styles.entry} key={song.id}>
                        <div>
                            <span className={styles.title}>{song.name}</span> <em>by</em> <span className={styles.artist}>{song.artists[0].name}</span>
                        </div>
                        <div title="Remove from playlist">
                            <svg
                                className={styles.icon}
                                onClick={() => removeFromPlaylist(song)}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512">
                                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                            </svg>
                        </div>
                    </li>
                ))}
            </ul>
            <form className={styles.form} onSubmit={handlePlaylistSubmit}>
                <input
                    className={styles.inputSearch}
                    type="text"
                    placeholder="Enter a playlist name"
                    ref={inputRef}
                    onChange={handlePlaylistName}
                />
                <button
                    className={styles.searchButton}
                    type="submit"
                >Save to Spotify</button>
            </form>
        </div>
    );
};

export { Playlist };
