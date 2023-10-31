import {
    alpha,
    Badge,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    Popover,
    Tooltip,
    Typography
} from '@mui/material';
import React, { useRef, useState, useContext } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { AuthContext } from 'src/contexts/AuthContext';

import { formatDistance, subDays } from 'date-fns';

const NotificationsBadge = styled(Badge)(
    ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

type AlertType = {
    [key: string]: string;
};

const alertTypes: AlertType = {
    'HT': 'High Temperature',
    'LL': 'Low Luminosity',
    'HM': 'High Humidity',
    'LM': 'Low Humidity',
    'HC': 'High CO2 Level',
    'LC': 'Low CO2 Level',
    'SM': 'Soil Moisture',
    'PH': 'pH Level',
    'NL': 'Nutrient Level',
    'OT': 'Other',
    'NA': 'N/A',
    'UN': 'Unknown',
    'ER': 'Error',
};

function HeaderNotifications() {
    const { alerts, greenhouses } = useContext(AuthContext);
    const ref = useRef<any>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    console.log(alerts)

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip arrow title="Notifications">
                <IconButton color="primary" ref={ref} onClick={handleOpen}>
                    <NotificationsBadge
                        badgeContent={alerts.length}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <NotificationsActiveTwoToneIcon />
                    </NotificationsBadge>
                </IconButton>
            </Tooltip>
            <Popover
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Box
                    sx={{ p: 2 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h5">Notifications</Typography>
                </Box>
                {alerts.map((alert: any) => {
                    const date = new Date(alert.timestamp);
                    const options: Intl.DateTimeFormatOptions = {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    };
                    const fomatedDate: string = date.toLocaleString('es-ES', options);

                    return (
                        <React.Fragment key={alert.timestamp}>
                            <Divider />
                            <List sx={{ p: 0 }}>
                                <ListItem
                                    sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}
                                >
                                    <Box flex="1">
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                {alertTypes[alert.alert_type]}📍
                                            </Typography>
                                            <Typography variant="caption" sx={{ textTransform: 'none' }}>
                                                {fomatedDate}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            noWrap
                                            color="text.secondary"
                                        >
                                            {' '}
                                            {alert.description.substring(0, 40)}...
                                        </Typography>
                                    </Box>
                                </ListItem>
                            </List>
                        </React.Fragment>
                    )
                })}
            </Popover>
        </>
    );
}

export default HeaderNotifications;
