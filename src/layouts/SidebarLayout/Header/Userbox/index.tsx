import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavLink } from 'react-router-dom';

import { Avatar, Box, Button, Divider, Hidden, lighten, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import AddIcon from '@mui/icons-material/Add';

import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';

import { AuthContext } from 'src/contexts/AuthContext';
import AddGreenhouseModal from 'src/layouts/SidebarLayout/Header/AddGreenhouseModal/AddGreenhouseModal';

const UserBoxButton = styled(Button)(
    ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
    ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
    ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
    ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
    const ref = useRef<any>(null);
    const authContext = useContext(AuthContext);
    const user = {
        name: authContext.user?.first_name,
        avatar: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/dl4yhkpeuwqwfmbqsfwc',
        jobtitle: 'Project Manager'
    };

    const [isOpen, setOpen] = useState<boolean>(false);
    const handleOpen = (): void => setOpen(true);
    const handleClose = (): void => setOpen(false);

    const [openRegisterGreenhouse, setOpenRegisterGreenhouse] = useState<boolean>(false);
    const handleOpenRegisterGreenhouse = (): void => setOpenRegisterGreenhouse(true);
    const handleCloseRegisterGreenhouse = (): void => setOpenRegisterGreenhouse(false);


    return (
        <>
            <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
                <Avatar variant="rounded" alt={user.name} src={user.avatar} />
                <Hidden mdDown>
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user.jobtitle}
                        </UserBoxDescription>
                    </UserBoxText>
                </Hidden>
                <Hidden smDown>
                    <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
                </Hidden>
            </UserBoxButton>
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
                <MenuUserBox sx={{ minWidth: 210 }} display="flex">
                    <Avatar variant="rounded" alt={user.name} src={user.avatar} />
                    <UserBoxText>
                        <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
                        <UserBoxDescription variant="body2">
                            {user.jobtitle}
                        </UserBoxDescription>
                    </UserBoxText>
                </MenuUserBox>
                <Divider sx={{ mb: 0 }} />
                <List sx={{ p: 1 }} component="nav">
                    <ListItem button to="/management/profile/details" component={NavLink}>
                        <AccountBoxTwoToneIcon fontSize="small" />
                        <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem button to="/dashboards/messenger" component={NavLink}>
                        <InboxTwoToneIcon fontSize="small" />
                        <ListItemText primary="Messenger" />
                    </ListItem>
                    <ListItem
                        button
                        to="/management/profile/settings"
                        component={NavLink}
                    >
                        <AccountTreeTwoToneIcon fontSize="small" />
                        <ListItemText primary="Account Settings" />
                    </ListItem>
                    <Button
                        color="primary"
                        fullWidth
                        onClick={handleOpenRegisterGreenhouse}
                    >
                        <AddIcon fontSize="small" />
                        <ListItemText primary="Register greenhouse" />
                    </Button>
                    <AddGreenhouseModal
                        open={openRegisterGreenhouse}
                        handleClose={handleCloseRegisterGreenhouse}
                    />
                </List>
                <Divider />
                <Box sx={{ m: 1 }} onClick={() => authContext.onLogout()}>
                    <Button color="primary" fullWidth>
                        <LockOpenTwoToneIcon sx={{ mr: 1 }} />
                        Sign out
                    </Button>
                </Box>
            </Popover>
        </>
    );
}

export default HeaderUserbox;
