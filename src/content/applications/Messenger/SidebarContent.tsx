import { useState, ChangeEvent, useContext } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    TextField,
    IconButton,
    InputAdornment,
    Avatar,
    List,
    Divider,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    lighten,
    styled
} from '@mui/material';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Label from 'src/components/Label';
import { AuthContext } from 'src/contexts/AuthContext';
import { AppContext } from 'src/contexts/AppContext';

import { USER_PROFILE_PICTURE } from 'src/utils/utils';
import { IGreenhouse } from 'src/types/Greenhouse';

const RootWrapper = styled(Box)(
    ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
    ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
    ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

function SidebarContent() {
    const { user, greenhouses } = useContext(AuthContext);
    const { selectedGreenhouse, onChangeSelectedGreenhouse } = useContext(AppContext);

    const user_data = {
        name: user?.first_name,
        avatar: USER_PROFILE_PICTURE,
        jobtitle: 'Software Developer'
    };

    const [state, setState] = useState({
        invisible: true
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    };

    const [currentTab, setCurrentTab] = useState<string>('all');

    const tabs = [
        { value: 'all', label: 'All' },
        { value: 'unread', label: 'Unread' },
    ];

    const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
        setCurrentTab(value);
    };

    return (
        <RootWrapper>
            <Box display="flex" alignItems="flex-start">
                <Avatar alt={user_data.name} src={user_data.avatar} />
                <Box
                    sx={{
                        ml: 1.5,
                        flex: 1
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h5" noWrap>
                                {user_data.name}
                            </Typography>
                            <Typography variant="subtitle1" noWrap>
                                {user_data.jobtitle}
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{
                                p: 1
                            }}
                            size="small"
                            color="primary"
                        >
                            <SettingsTwoToneIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <TextField
                sx={{
                    mt: 2,
                    mb: 1
                }}
                size="small"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchTwoToneIcon />
                        </InputAdornment>
                    )
                }}
                placeholder="Search..."
            />

            <Typography
                sx={{
                    mb: 1,
                    mt: 2
                }}
                variant="h3"
            >
                Alerts
            </Typography>

            <TabsContainerWrapper>
                <Tabs
                    onChange={handleTabsChange}
                    value={currentTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                >
                    {tabs.map((tab) => (
                        <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                </Tabs>
            </TabsContainerWrapper>

            <Box mt={2}>
                {currentTab === 'all' && (
                    <List disablePadding component="div">
                        {greenhouses.map((greenhouse: IGreenhouse) => {
                            return (
                                <ListItemWrapper selected key={greenhouse.name} onClick={() => onChangeSelectedGreenhouse(greenhouse)}>
                                    <ListItemAvatar>
                                        <Avatar src={greenhouse.logo} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            mr: 1
                                        }}
                                        primaryTypographyProps={{
                                            color: 'textPrimary',
                                            variant: 'h5',
                                            noWrap: true
                                        }}
                                        secondaryTypographyProps={{
                                            color: 'textSecondary',
                                            noWrap: true
                                        }}
                                        primary={greenhouse.name}
                                        secondary={greenhouse.description}
                                    />
                                </ListItemWrapper>
                            )
                        })}
                    </List>
                )}
                {currentTab === 'unread' && (
                    <List disablePadding component="div">
                        <ListItemWrapper>
                            <ListItemAvatar>
                                <Avatar src={USER_PROFILE_PICTURE} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    mr: 1
                                }}
                                primaryTypographyProps={{
                                    color: 'textPrimary',
                                    variant: 'h5',
                                    noWrap: true
                                }}
                                secondaryTypographyProps={{
                                    color: 'textSecondary',
                                    noWrap: true
                                }}
                                primary="Zain Baptista"
                                secondary="Hey there, how are you today? Is it ok if I call you?"
                            />
                            <Label color="primary">
                                <b>2</b>
                            </Label>
                        </ListItemWrapper>
                        <ListItemWrapper>
                            <ListItemAvatar>
                                <Avatar src={USER_PROFILE_PICTURE} />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    mr: 1
                                }}
                                primaryTypographyProps={{
                                    color: 'textPrimary',
                                    variant: 'h5',
                                    noWrap: true
                                }}
                                secondaryTypographyProps={{
                                    color: 'textSecondary',
                                    noWrap: true
                                }}
                                primary="Adison Press"
                                secondary="I recently did some buying on Amazon and now I'm stuck"
                            />
                            <Label color="primary">
                                <b>8</b>
                            </Label>
                        </ListItemWrapper>
                    </List>
                )}
            </Box>
        </RootWrapper>
    );
}

export default SidebarContent;
