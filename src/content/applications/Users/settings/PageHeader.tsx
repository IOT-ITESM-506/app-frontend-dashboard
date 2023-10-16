import { Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';

function PageHeader() {
    const authContext = useContext(AuthContext)
    const user = {
        name: authContext.user?.first_name + ' ' + authContext.user?.last_name,
        avatar: '/static/images/avatars/1.jpg'
    };

    return (
        <>
            <Typography variant="h3" component="h3" gutterBottom>
                User Settings
            </Typography>
            <Typography variant="subtitle2">
                {user.name}, these are your settings
            </Typography>
        </>
    );
}

export default PageHeader;
