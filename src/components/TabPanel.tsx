import { Box, Typography } from '@mui/material';
import React from 'react';

export const TabPanel: React.FC = ({ children }) =>
    <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
    </Box>