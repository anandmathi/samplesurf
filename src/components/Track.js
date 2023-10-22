import React from "react";
import AudioPlayer from "./AudioPlayer";

import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from "@material-ui/core";
import {styled} from "@mui/material/styles";


const CoverArt = styled(Avatar)({
    border: '2px solid #FCFCFC',
    transition: 'opacity 0.2s, transform 0.1s',
    opacity: '1',
    '&:hover': {
        opacity: '0.8',
        cursor: 'pointer',
        boxShadow: '3px 3px 3px black'
    },
    '&:active': {
        transform: 'translateY(2px)',
    },
});

export default function Track({ id, album, name, artists, preview_url, external_urls }) {
    const trunc = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    // const handleCoverArtClick = () => {
    //     // Call the callback function to change the layout in the parent component
    //     console.log(name);
    //     console.log(genUrl(name, artists[0].name))
    //     // onCoverArtClick();
    // };

    return (
        <List>
            <ListItem>
                <ListItemAvatar style={{ margin: '30px' }}>
                    <a href={external_urls.spotify} target="_blank" rel="noreferrer">
                        <CoverArt
                            variant="rounded"
                            src={album.images[1].url}
                            sx={{
                                width: '150px',
                                height: '150px',
                            }}
                        />
                        </a>
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component="span" style={{ fontWeight: 'bolder', fontSize: '20px' }}>
                                {trunc(name, 25)}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography component="span" style={{ color: 'white' }}>
                                {trunc(artists[0].name, 30)}
                            </Typography>
                        </React.Fragment>
                    }
                />
                {preview_url != null ? <AudioPlayer audioUrl={preview_url}/> : <Typography style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '50px', marginRight: '30px' }}>PREVIEW UNAVAILABLE</Typography>}
            </ListItem>
        </List>
    );
}

export function SimilarTrack({ id, album, name, artists, preview_url, external_urls }) {
    const trunc = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <List style={{backgroundColor: '#22242f' }}>
            <ListItem>
                <ListItemAvatar style={{ marginLeft: '55px', marginRight: '55px', marginTop: '20px', marginBottom: '20px' }}>
                    <a href={external_urls.spotify} target="_blank" rel="noreferrer">
                        <CoverArt
                            variant="rounded"
                            src={album.images[1].url}
                            sx={{
                                width: '100px',
                                height: '100px',
                            }}
                        />
                    </a>
                </ListItemAvatar>

                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography component="span" style={{ fontWeight: 'bolder', fontSize: '1rem' }}>
                                {trunc(name, 25)}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Typography component="span" style={{ color: 'white', fontSize: '0.9rem' }}>
                                {trunc(artists[0].name, 30)}
                            </Typography>
                        </React.Fragment>
                    }
                />
                {preview_url != null ? <AudioPlayer audioUrl={preview_url} /> : <Typography style={{ fontWeight: 'bold', fontSize: '1rem', marginLeft: '50px', marginRight: '30px' }}>PREVIEW UNAVAILABLE</Typography>}
            </ListItem>
        </List>
    );
}