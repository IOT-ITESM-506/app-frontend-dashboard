import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface AddGreenhouseModalProps {
    open: boolean;
    handleClose: () => void;
}

const AddGreenhouseModal: React.FC<AddGreenhouseModalProps> = (props) => {
    const { open, handleClose } = props;
    const [greenhouseData, setGreenhouseData] = useState({
        name: '',
        location: '',
        size: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGreenhouseData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', greenhouseData);
        handleClose();
    };

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
                    width: 400,
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
                        label="Location"
                        name="location"
                        value={greenhouseData.location}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Size"
                        name="size"
                        type="number"
                        value={greenhouseData.size}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Greenhouse Description"
                        name="description"
                        multiline
                        rows={4}
                        value={greenhouseData.description}
                        onChange={handleChange}
                    />
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
