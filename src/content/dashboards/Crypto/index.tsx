import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import GreenhousesInfo from './GreenhousesInfo';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';

function DashboardCrypto() {
    return (
        <>
            <Helmet>
                <title>Iot Dashboard App</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
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
            </Container>
            <Footer />
        </>
    );
}

export default DashboardCrypto;
