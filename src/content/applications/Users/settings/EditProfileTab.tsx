import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
    Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';

function EditProfileTab() {
    const { user } = useContext(AuthContext);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <Box
                        p={3}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Personal Details
                            </Typography>
                            <Typography variant="subtitle2">
                                Manage informations related to your personal details
                            </Typography>
                        </Box>
                        <Button variant="text" startIcon={<EditTwoToneIcon />}>
                            Edit
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="subtitle2">
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        Name:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Text color="black">
                                        <b>{user?.first_name} {user?.last_name}</b>
                                    </Text>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        Is Staff:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Text color="black">
                                        <b>{user?.is_staff ? 'Yes': 'No'}</b>
                                    </Text>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        Is Active:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Text color="black">
                                        <b>{user?.is_active ? 'Yes': 'No'}</b>
                                    </Text>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <Box
                        p={3}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Account Settings
                            </Typography>
                            <Typography variant="subtitle2">
                                Manage details related to your account
                            </Typography>
                        </Box>
                        <Button variant="text" startIcon={<EditTwoToneIcon />}>
                            Edit
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="subtitle2">
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        Language:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Text color="black">
                                        <b>English (US)</b>
                                    </Text>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        Timezone:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Text color="black">
                                        <b>GMT +2</b>
                                    </Text>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        Account status:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Label color="success">
                                        <DoneTwoToneIcon fontSize="small" />
                                        <b>Active</b>
                                    </Label>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <Box
                        p={3}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Email Addresses
                            </Typography>
                            <Typography variant="subtitle2">
                                Manage details related to your associated email addresses
                            </Typography>
                        </Box>
                        <Button variant="text" startIcon={<EditTwoToneIcon />}>
                            Edit
                        </Button>
                    </Box>
                    <Divider />
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="subtitle2">
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        Email ID:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <Text color="black">
                                        <b>{user?.email}</b>
                                    </Text>
                                    <Box pl={1} component="span">
                                        <Label color="success">Primary</Label>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default EditProfileTab;
