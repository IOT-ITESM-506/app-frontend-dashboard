import React, { forwardRef, Ref, useState, ReactElement, ChangeEvent, useEffect, useContext } from 'react';
import {
    Avatar,
    Link,
    Box,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    lighten,
    List,
    ListItem,
    ListItemAvatar,
    TextField,
    Theme,
    Tooltip,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Hidden
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { AuthContext } from 'src/contexts/AuthContext';
import GreenhouseBodyModal from 'src/components/Modal/GreenhouseBodyModal';

import greenhousesData from './greenhouse.json';


const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: ReactElement<any, any> },
    ref: Ref<unknown>
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  
  const DialogWrapper = styled(Dialog)(
    () => `
      .MuiDialog-container {
          height: auto;
      }
      
      .MuiDialog-paperScrollPaper {
          max-height: calc(100vh - 64px)
      }
    `
  );
  
  const SearchInputWrapper = styled(TextField)(
    ({ theme }) => `
      background: ${theme.colors.alpha.white[100]};
  
      .MuiInputBase-input {
          font-size: ${theme.typography.pxToRem(17)};
      }
    `
  );
  
  const DialogTitleWrapper = styled(DialogTitle)(
    ({ theme }) => `
      background: ${theme.colors.alpha.black[5]};
      padding: ${theme.spacing(3)}
    `
  );
  
  interface HeaderSearchProps {
    setSelectedGreenhouse: (greenhouse: any) => void;
  }
  
  function HeaderSearch({ setSelectedGreenhouse }: HeaderSearchProps) {
    
    const getGreenhouseByName = (name: string): Promise<any> => {
      return new Promise((resolve, reject) => {
        // Simula la búsqueda por nombre
        const searchResults = greenhousesData.filter((greenhouse) => {
          return greenhouse.name.toLowerCase().includes(name.toLowerCase());
        });
  
        // Simula un retraso en la llamada a la API
        setTimeout(() => {
          resolve(searchResults);
        }, 500);
      });
    };
  
    const [openSearchResults, setOpenSearchResults] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedGreenhouse, setSelectedGreenhouseLocal] = useState(null);
  
    const [open, setOpen] = useState(false);
    const [greenhousesFound, setGreenhousesFound] = useState([]);
  
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setSearchValue(event.target.value);
  
      if (event.target.value) {
        if (!openSearchResults) {
          setOpenSearchResults(true);
        }
      } else {
        setOpenSearchResults(false);
      }
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedGreenhouse(null);
    };
  
    const handleGreenhouseClick = (greenhouse) => {
      setSelectedGreenhouse(greenhouse);
      setSelectedGreenhouseLocal(greenhouse);
    };
  
    const handleViewAllClick = () => {
      setOpen(true);
      // Update the selected greenhouse based on the search results
      if (greenhousesFound.length > 0) {
        setSelectedGreenhouse(greenhousesFound[0]);
      }
    };
  
    useEffect(() => {
      if (searchValue && getGreenhouseByName) {
        getGreenhouseByName(searchValue)
          .then((response: any) => {
            setGreenhousesFound(response);
          })
          .catch((error: any) => {
            console.error('Error fetching greenhouse data:', error);
          });
      }
    }, [searchValue, getGreenhouseByName]);
    
    
    return (
        <>
            <Tooltip arrow title="Search Greenhouses">
                <IconButton color="primary" onClick={handleClickOpen}>
                    <SearchTwoToneIcon />
                </IconButton>
            </Tooltip>

            <DialogWrapper
                open={open}
                TransitionComponent={Transition}
                keepMounted
                maxWidth="md"
                fullWidth
                scroll="paper"
                onClose={handleClose}
            >
                <DialogTitleWrapper>
                    <SearchInputWrapper
                        value={searchValue}
                        autoFocus={true}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchTwoToneIcon />
                                </InputAdornment>
                            )
                        }}
                        placeholder="Search "
                        fullWidth
                        label="Search Greenhouses"
                    />
                </DialogTitleWrapper>
                <Divider />

                {openSearchResults && (
                    <DialogContent>
                        <Box
                            sx={{ pt: 0, pb: 1 }}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Typography variant="body2" component="span">
                                Search results for{' '}
                                <Typography
                                    sx={{ fontWeight: 'bold' }}
                                    variant="body1"
                                    component="span"
                                >
                                    {searchValue}
                                </Typography>
                            </Typography>
                            <Link href="#" variant="body2" underline="hover">
                                Advanced search
                            </Link>

                            <GreenhouseBodyModal />
                        </Box>

                        {/* Mostrar solo el invernadero seleccionado */}
                        {selectedGreenhouse && (
                            <DialogContent>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Selected Greenhouse
                                </Typography>
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {selectedGreenhouse.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {selectedGreenhouse.greenhouse_description}
                                    </Typography>
                                    {/* Puedes mostrar más detalles del invernadero aquí */}
                                </Box>
                            </DialogContent>
                        )}

                        <List disablePadding>
                            {greenhousesFound.slice(0, 5).map((greenhouse: any) => (
                                <React.Fragment key={greenhouse.id}>
                                    <Divider sx={{ my: 1 }} component="li" />
                                    <ListItem button onClick={() => handleGreenhouseClick(greenhouse)}>
                                        <Hidden smDown>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        background: (theme: Theme) =>
                                                            theme.palette.secondary.main
                                                    }}
                                                >
                                                    <FindInPageTwoToneIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                        </Hidden>
                                        <Box flex="1">
                                            <Box display="flex" justifyContent="space-between">
                                                <Link
                                                    href="#"
                                                    underline="hover"
                                                    sx={{ fontWeight: 'bold' }}
                                                    variant="body2"
                                                >
                                                    {greenhouse.name}
                                                </Link>
                                            </Box>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                sx={{
                                                    color: (theme: Theme) =>
                                                        lighten(theme.palette.secondary.main, 0.5)
                                                }}
                                            >
                                                {greenhouse.greenhouse_description}
                                            </Typography>
                                        </Box>
                                        <ChevronRightTwoToneIcon />
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                            
                    


                        <Divider sx={{ mt: 1, mb: 2 }} />
                        <Box sx={{ textAlign: 'center' }}>
                            <Button color="primary" onClick={handleViewAllClick}>
                                    View all search results
                            </Button>
                        </Box>
                    </DialogContent>
                )}
            </DialogWrapper>
        </>
    );
}

export default HeaderSearch;