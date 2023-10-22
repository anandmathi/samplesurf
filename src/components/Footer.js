import React from 'react';
import { Typography, Paper, Container, Box } from '@mui/material';

const Footer = () => {
    return (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '20px', backgroundColor: '#22242f' }}>
            <Container maxWidth="lg">
                <Box textAlign="center">
                    <Typography color="white">
                        t
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
};

export default Footer;