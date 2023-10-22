import React from "react";
import { styled } from '@mui/material/styles';
import {
    TextField,
} from "@material-ui/core";

const SearchBar = styled(TextField)({
    '& label': {
        color: '#FCFCFC',
    },
    '&:hover label': {
        color: '#A2E2B8',
    },
    '& label.Mui-focused': {
        color: '#1DB954',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#FCFCFC',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#FCFCFC',
        },
        '&:hover fieldset': {
            borderColor: '#A2E2B8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#1DB954',
        },
    },
});

export default function Search({handleKeyPress}) {
    return (
        <SearchBar
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Enter Track Title"
            inputProps={{ style: { color: "white" } }}
            onKeyPress={handleKeyPress}
        />
    );
}
