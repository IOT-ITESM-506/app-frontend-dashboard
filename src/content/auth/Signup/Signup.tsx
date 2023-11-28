import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContext';

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const authContext = useContext(AuthContext);

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });

  interface FormErrors {
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    confirmPassword?: string;
  }

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberSession, setRememberSession] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: FormErrors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.first_name.trim()) {
      errors.first_name = 'First Name is required';
    }
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last Name is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setSuccessMessage('Registration successful!');
      try {
        const response: any = await authContext.registerUser(formData);

        if (response.ok) {
          const login_response = await authContext.onLogin(
            formData.email,
            formData.password
          );
          console.log(login_response);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setFormErrors({
      ...formErrors,
      confirmPassword: '',
    });
  };



    return (
        <form onSubmit={handleSubmit}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            src="https://images.pexels.com/photos/2560899/pexels-photo-2560899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Signup"
                            style={{ width: '100%', height: '100vh', objectFit: 'cover', objectPosition: 'center' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto', textAlign: 'center' }}>
                        <h1 style={{ marginBottom: '16px', fontSize: '22px' }}>Signup</h1>
                        
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />
                        <TextField
                            label="First Name"
                            variant="outlined"
                            margin="normal"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            error={!!formErrors.first_name}
                            helperText={formErrors.first_name}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            margin="normal"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            error={!!formErrors.last_name}
                            helperText={formErrors.last_name}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                        />

                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={!!formErrors.confirmPassword}
                            helperText={formErrors.confirmPassword}
                        />

                        {successMessage && <Alert severity="success">{successMessage}</Alert>}
                        <FormControlLabel
                            control={<Checkbox checked={rememberSession} onChange={() => setRememberSession(!rememberSession)} />}
                            label="Remember Session"
                        />
                        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '16px' }}>
                            Sign Up
                        </Button>

                        <div style={{ marginTop: '16px'}}>
                            <p>¿Do you have an account?</p>
                            <RouterLink to='/auth/signin'>Sign in here</RouterLink>
                        </div>

                        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-around' }}>
                            <div>
                                <p style={{ margin: '10px 0' }}>Or sign up with</p>
                                <div style={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
                                    <IconButton>
                                        <GoogleIcon />
                                    </IconButton>
                                    <IconButton>
                                        <FacebookIcon />
                                    </IconButton>
                                    <IconButton>
                                        <TwitterIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default SignupForm;