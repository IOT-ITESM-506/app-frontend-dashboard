import {
    Button,
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Avatar,
    alpha,
    Tooltip,
    CardActionArea,
    styled
} from '@mui/material';
import { useContext } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { AuthContext } from 'src/contexts/AuthContext';
import { IGreenhouse } from 'src/types/Greenhouse';
import { useState } from 'react';

import AddGreenhouseModal from 'src/layouts/SidebarLayout/Header/AddGreenhouseModal/AddGreenhouseModal';


const AvatarWrapper = styled(Avatar)(
    ({ theme }) => `
    margin: ${theme.spacing(2, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${theme.palette.mode === 'dark'
            ? theme.colors.alpha.trueWhite[30]
            : alpha(theme.colors.alpha.black[100], 0.07)
        };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);

const AvatarAddWrapper = styled(Avatar)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
    ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

function Wallets() {
    const { greenhouses, user } = useContext(AuthContext);

    // Estado para controlar la visibilidad del modal
    const [isAddGreenhouseModalOpen, setAddGreenhouseModalOpen] = useState(false);

    // Función para abrir el modal
    const handleOpenAddGreenhouseModal = () => {
        setAddGreenhouseModalOpen(true);
    };
 
    // Función para cerrar el modal
    const handleCloseAddGreenhouseModal = () => {
        setAddGreenhouseModalOpen(false);
    };

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pb: 3
                }}
            >
                <Typography variant="h3">Greenhouses Status</Typography>
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                    onClick={handleOpenAddGreenhouseModal}
                >
                    Add new greenhouse
                </Button>
            </Box>
            <Grid container spacing={3}>
                {greenhouses.map((greenhouse: IGreenhouse) => {
                    return (
                        <Grid key={greenhouse.name} xs={12} sm={6} md={3} item>
                            <Card
                                sx={{
                                    px: 1
                                }}
                            >
                                <CardContent>
                                    <AvatarWrapper>
                                        <img
                                            alt="BTC"
                                            src={greenhouse.logo}
                                        />
                                    </AvatarWrapper>
                                    <Typography variant="h5" noWrap>
                                        {greenhouse.name}
                                    </Typography>
                                    <Typography variant="subtitle1" noWrap>
                                        {user?.first_name} {user?.last_name}
                                    </Typography>
                                    <Box
                                        sx={{
                                            pt: 3
                                        }}
                                    >
                                        <Typography variant="h3" gutterBottom noWrap>
                                            $3,586.22
                                        </Typography>
                                        <Typography variant="subtitle2" noWrap>
                                            {greenhouse.size} sqm
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
                <Grid xs={12} sm={6} md={3} item>
                    <Tooltip arrow title="Click to add a new greenhouse.">
                        <CardAddAction onClick={handleOpenAddGreenhouseModal}>
                            <CardActionArea
                                sx={{
                                    px: 1
                                }}
                            >
                                <CardContent>
                                    <AvatarAddWrapper>
                                        <AddTwoToneIcon fontSize="large" />
                                    </AvatarAddWrapper>
                                </CardContent>
                            </CardActionArea>
                        </CardAddAction>
                    </Tooltip>
                </Grid>
            </Grid>

            <AddGreenhouseModal 
                open={isAddGreenhouseModalOpen}
                handleClose={handleCloseAddGreenhouseModal}
            />
        </>
    );
}

export default Wallets;
