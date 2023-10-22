import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {linearProgressClasses} from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    margin: 2,
    width: 250,
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: '#1C1D22',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 2,
        backgroundColor: '#1DB954',
    },
}));


const AudioPlayer = ({ audioUrl }) => {
    const [audio] = useState(new Audio(audioUrl));
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => { // should change this to use events
        audio.isPlaying = false;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.pause();
            audio.currentTime = 0;
        };
    }, [audio]);

    const progress = (currentTime / duration) * 100 || 0;

    return (
        <div style={{display: 'flex', marginLeft: '50px', marginRight: '30px' }}>
            <IconButton onClick={togglePlay}
                        style={{
                            borderRadius: '6px',
                            border: '1px solid #FCFCFC',
                            color: 'white',
                            backgroundColor: '#1C1D22',
                            marginRight: '10px',
                            transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#1DB954';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'white';
                        }}>
                {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
            </IconButton>
            <div style={{ display: 'flex', alignItems: 'center'}}>
            <div style={{ backgroundColor: '#1C1D22', borderRadius: '4px', border: '2px solid #FCFCFC', height: '20px', flex: 1 }}>
                <BorderLinearProgress variant="determinate" value={progress} />
            </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
