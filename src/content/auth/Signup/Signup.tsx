import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                {/* Columna de la Imagen */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            src="https://images.pexels.com/photos/2560899/pexels-photo-2560899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Signup"
                            style={{ width: '100%', height: '100vh', objectFit: 'cover', objectPosition: 'center' }}
                        />
                    </Box>
                </Grid>

                {/* Columna de los Campos del Formulario */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            margin="normal"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            margin="normal"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '16px' }}>
                            Sign Up
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default SignupForm;
