import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { useContext } from 'react';
import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Feed from './Feed';
import PopularTags from './PopularTags';
import MyCards from './MyCards';
import Addresses from './Addresses';
import { AuthContext } from 'src/contexts/AuthContext';

import { USER_PROFILE_PICTURE } from 'src/utils/utils';


function ManagementUserProfile() {
    const authContext = useContext(AuthContext)
    const user = {
        savedCards: 7,
        name: authContext.user?.first_name + ' ' + authContext.user?.last_name,
        coverImg: 'https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        avatar: USER_PROFILE_PICTURE,
        description: "There are many variations of spassages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
        jobtitle: 'Web Developer',
        location: 'Barcelona, Spain',
        followers: '465'
    };

    return (
        <>
            <Helmet>
                <title>User Details - Management</title>
            </Helmet>
            <Container sx={{ mt: 3 }} maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} md={8}>
                        <ProfileCover user={user} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RecentActivity />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <MyCards />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Addresses />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default ManagementUserProfile;
