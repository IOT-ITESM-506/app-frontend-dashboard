import { useContext } from 'react';
import { Typography, Avatar, Grid, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AuthContext } from 'src/contexts/AuthContext';
import AddGreenhouseModal from 'src/layouts/SidebarLayout/Header/AddGreenhouseModal/AddGreenhouseModal';

function PageHeader() {
    const authContext = useContext(AuthContext);

    const user = {
        name: authContext.user?.first_name + ' ' + authContext.user?.last_name,
        avatar: '/static/images/avatars/avatar.png'
    };
    const theme = useTheme();

    return (
        <Grid container alignItems="center">
            <Grid item>
                <Avatar
                    sx={{
                        mr: 2,
                        width: theme.spacing(8),
                        height: theme.spacing(8)
                    }}
                    variant="rounded"
                    alt={user.name}
                    src={user.avatar}
                />
            </Grid>
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Welcome, {user.name}!
                </Typography>
                <Typography variant="subtitle2">
                    Today is a great day to begin managing your assets in the digital greenhouse.
                </Typography>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
