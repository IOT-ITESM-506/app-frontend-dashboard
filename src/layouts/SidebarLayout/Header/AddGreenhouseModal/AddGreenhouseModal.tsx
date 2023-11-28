import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import { AuthContext } from 'src/contexts/AuthContext';


interface AddGreenhouseModalProps {
    open: boolean;
    handleClose: () => void;
}

const AddGreenhouseModal: React.FC<AddGreenhouseModalProps> = (props) => {
    const { registerGreenhouse, user } = useContext(AuthContext);

    const [error, setError] = useState<string | null>(null);

    const { open, handleClose } = props;
    const [greenhouseData, setGreenhouseData] = useState({
        name: '',
        location: '',
        size: '',
        greenhouse_description: '',
        logo: 'https://previews.123rf.com/images/sejalanart/sejalanart2108/sejalanart210800032/173258299-greenhouse-logo-template-design-nature-property-vector-illustration.jpg?fj=1',
        microcontroller_mac_address: '',
        user_id: user.id,
    });

    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGreenhouseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ...

    // ...

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Expresión regular para validar una dirección MAC
        const macAddressOrUuidRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[14][0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

        if (
            greenhouseData.name &&
            greenhouseData.location &&
            greenhouseData.size &&
            greenhouseData.microcontroller_mac_address &&
            macAddressOrUuidRegex.test(greenhouseData.microcontroller_mac_address)
        ) {
            const response: any = await registerGreenhouse(greenhouseData);

            if (response.status === 201) {
                setIsSuccess(true);
            }
        } else {
            // Muestra un mensaje de error si falta algún campo obligatorio o si la dirección MAC no es válida.
            setError('Please, ensure that the MAC addres is valid.');
        }
    };

// ...


// ...


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'white',
                    borderRadius: '8px',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Greenhouse
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={greenhouseData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Location (City, Country)"
                        name="location"
                        value={greenhouseData.location}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Size (m²)"
                        name="size"
                        type="number"
                        value={greenhouseData.size}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Greenhouse Description (optional)"
                        name="greenhouse_description"
                        multiline
                        rows={4}
                        value={greenhouseData.greenhouse_description}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Microcontroller Mac Address"
                        name="microcontroller_mac_address"
                        value={greenhouseData.microcontroller_mac_address}
                        onChange={handleChange}
                        helperText="You can find this ID on the circuit box containing all sensors."
                        error={!!error}  // Muestra el estilo de error si hay un error.
                    />
                    {isSuccess && (
                        <Alert severity="success" sx={{ mt: 0 }}>
                            Registration completed successfully!
                        </Alert>
                    )}
                    {error && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                            {error}
                        </Alert>
                    )}
                    <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: '#4CAF50', color: 'white' }}>
                        Submit
                    </Button>
                    <Button onClick={handleClose} sx={{ mt: 2, ml: 2, color: '#4CAF50' }}>
                        Close
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddGreenhouseModal;
