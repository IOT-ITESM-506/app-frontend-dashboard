import React from 'react';
import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';

function HeaderButtons() {
    const handleGreenhouseSelection = (greenhouse: any) => {
        // Handle the selected greenhouse in your application
        console.log('Selected Greenhouse:', greenhouse);
    };

    return (
        <Box sx={{ mr: 1 }}>
            {/* Pass the handleGreenhouseSelection function as setSelectedGreenhouse prop */}
            <HeaderSearch setSelectedGreenhouse={handleGreenhouseSelection} />
            <Box sx={{ mx: 0.5 }} component="span">
                <HeaderNotifications />
            </Box>
        </Box>
    );
}

export default HeaderButtons;
