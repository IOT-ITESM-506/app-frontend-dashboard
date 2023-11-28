import { useContext, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import GreenhousesInfo from './GreenhousesInfo';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import NotFoundPage from 'src/content/notFound/NotFoundPage';

import { AuthContext } from 'src/contexts/AuthContext';

function DashboardHome() {
    const { greenhouses, getGreenhouses, user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            getGreenhouses(user.id)
                .then((result) => {
                    
                });
        }
    }, [user]);


    return (
        <>
            <Helmet>
                <title>Iot Dashboard App</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            {greenhouses.length <= 0 && <NotFoundPage />}
            {greenhouses.length > 0 &&
                <Container maxWidth="lg">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={4}
                    >
                        <Grid item xs={12}>
                            <GreenhousesInfo />
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <Wallets />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <AccountSecurity />
                        </Grid>
                    </Grid>
                </Container>}
            <Footer />
        </>
    );
}

export default DashboardHome;
