import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Footer from 'src/components/Footer';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ICard {
    title: string
    description: string
    image: string
    url: string
}

const cards: ICard[] = [
    {
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        url: 'https://www.google.com'
    },
    {
        title: 'Lizard',
        description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        image: 'https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        url: 'https://www.google.com'
    }
]

function Cards() {
    return (
        <>
            <Helmet>
                <title>Cards - Components</title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle
                    heading="Greenhouse News"
                    subHeading="Latest news from our blog"
                />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="News" />
                            <Divider />
                            <CardContent>
                                {cards.map((card: ICard, index: number) => {
                                    return(
                                        <CardBody
                                            key={index}
                                            title={card.title}
                                            description={card.description}
                                            image={card.image}
                                            url={card.url}
                                        />
                                    )
                                })}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

const CardBody: React.FC <ICard> = (props) => {
    const { title, description, image, url } = props;

    return (
        <Card sx={{ maxWidth: '50%' }} style={{marginBottom: 15}}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default Cards;