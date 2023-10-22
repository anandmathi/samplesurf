import React from "react";
import {List} from "@material-ui/core";
import Track, {SimilarTrack} from "./Track";
import {Button, Divider, Typography} from "@material-ui/core";
import {styled} from '@mui/material/styles';

const Select = styled(Button)({
    borderColor: '#FFF',
    transition: 'color 0.2s, border-color 0.2s, transform 0.2s',
    color: '#FFF',
    marginTop: '-25px',
    marginBottom: '25px',
    opacity: '1',
    '&:hover': {
        color: '#1DB954',
        borderColor: '#1DB954'
    },
    '&:active': {
        transform: 'translateY(1px)',
    },
});

export default function TracksList({ data, layout, setLayout, spotify, found, similar, setFound, setSimilar }) {

    // console.log(layout);

    let foundSamples = []; // Initialize foundSamples as an object with a 'tracks' property
    let similarTracks = [];

    const handleClick = async (item) => {

        // console.log(genUrl(item.name, item.artists[0].name));
        let samples;
        // get sample names and artists from serverless function
        const genRes = await spotify.searchGenius(genUrl(item.name, item.artists[0].name), async (error, response) => {
            if (!error) {
                // console.log(response.resultTracks);
                samples = response.resultTracks;
            } else {
                // console.log(error);
                setFound([]);
            }
        });

        if (!samples) {
            setLayout(false);
            return;
        }

        // feed into spotify search
        for (let i = 0; i < samples.length; i++) {
            // console.log("looking for ", samples[i]);
            const sampleData = await spotify.searchTracks(samples[i], { limit: 1 });
            foundSamples.push(sampleData);
            // console.log(sampleData.tracks.items[0].id);
            const similarData = await spotify.searchTracks(samples[i], { seed_tracks: sampleData.tracks.items[0].id });
            // console.log(similarData);
            similarData.tracks.items.shift();
            similarTracks.push(similarData);
        }
        // console.log(foundSamples);
        // console.log(similarTracks);
        // console.log(data);
        // similarTracks.shift();
        setFound(foundSamples);
        setSimilar(similarTracks);

        // update similartracks with top 15 (at max) results for each sample

        setLayout(false);
    }

    const genUrl = (name, artist) => {
        const titleName = name.replace(/[^a-zA-Z0-9&\- ]/g, '').replace(/ /g, ' ');

        const parts = titleName.split(' ');
        const indexFeat = parts.indexOf('feat');
        const indexFt = parts.indexOf('ft');
        if (indexFeat !== -1) {
            parts.splice(indexFeat);
        } else if (indexFt !== -1) {
            parts.splice(indexFt);
        }
        const title = parts.join(' ');
        const formattedString = `${artist} ${title}`.toLowerCase();

        return formattedString;
    }

    return (
        <List>
            <center><strong>NOTE:</strong> Some song previews may be temporarily unavailable due to limitations with the Spotify API.
            </center>
            {layout ? <div>
                    {data.tracks && data.tracks.items.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <Track {...item}/>
                            <center><Select onClick={() => handleClick(item)} variant={'outlined'}>SELECT</Select></center>
                            {index !== data.tracks.items.length - 1 && <Divider style={{ height: '2px' }} component="li" />}
                            {/*{console.log("Track Data:", item)}*/}
                        </React.Fragment>
                    ))}
            </div> :
                <div>
                    {found && found.length > 0 ? (
                        found.map((sample, index) => (
                            sample.tracks && sample.tracks.items.map((item, i) => (
                                <React.Fragment key={item.id}>
                                    <Track {...item} />
                                    {similar[index] &&
                                    similar[index].tracks.items.map((simItem, j) => (
                                        <React.Fragment key={simItem.id}>
                                            <SimilarTrack {...simItem} />
                                            {j !== similar[index].tracks.items.length - 1 && <Divider style={{ height: '1px' }} component="li" />}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            ))
                        ))
                    ) : (
                        <center><h3 style={{marginTop: '40px'}}>No samples found.</h3></center>
                    )}
                </div>}
        </List>
    );
}