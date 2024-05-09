import React from "react";
import styles from "./results.module.css";

const Results = ({ songs, addToPlaylist }) => {

    return (
        <div className={styles.results}>
            <h2 className={styles.resultsTitle}>Results</h2>
            <ul className={styles.list}>
                {songs.map((song) => (
                    <li className={styles.entry} key={song.id}>
                        <div>
                            <span className={styles.title}>{song.name} </span><em>by </em><span className={styles.artist}>{song.artists.map((artist) => artist.name).join(', ')}</span>
                        </div>
                        <div className={styles.addpreviewDiv}>
                            <div>
                                {song.preview_url ? (
                                    <audio controls className={styles.audioPreview} type="audio/mpeg">
                                        <source src={song.preview_url} type="audio/mpeg" />
                                    </audio>
                                ) : (
                                    <p>No preview available</p>
                                )}
                            </div>
                            <div className={styles.addToPlayListIconDiv} title='Add to Playlist'>
                                <svg
                                    className={styles.icon}
                                    onClick={() => addToPlaylist(song)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512">
                                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                </svg>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { Results };;


