import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Register from './Register';
import './css/Login.css';

const apiUrl = process.env.REACT_APP_AUTH_API_URL;
const defaultTheme = createTheme();

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.status !== 201) {
          localStorage.clear();
          setError(result.message || 'Login failed. Please try again.'); // Set a custom error message or use the API's response
        } else {
          setError('');
          console.log('Login successful');
          localStorage.setItem('authToken', result.data?.authToken);
          localStorage.setItem('refreshToken', result.data?.refreshToken);
          console.log(props)
          props.setIsLoggedIn();
          // You might want to redirect the user or perform other actions upon successful login
        }
    } catch (error) {
        localStorage.clear();
        console.error('Error during API call:', error);
        setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <React.Fragment>
        <div className='logo'></div>
        <ThemeProvider theme={defaultTheme}>
            <div style={{ backgroundColor: 'rgb(255 255 255)', margin: 'auto', minWidth: '48%', width: 'fit-content', borderRadius: '40px' }}>
                <Box
                    sx={{
                        padding: '60px 0px',
                        margin: 'auto',
                        my: 21,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        type="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}, Try again.</div>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{color:'white', borderRadius:'4em' , padding:'1.5% 5%', backgroundColor: 'rgb(255 121 36)', fontWeight: '500'}}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <div style={{ borderBottom: '1px solid #dadde1', margin: '20px 0px 30px 0px' }}/>
                    <div style={{ fontSize: '15px', marginBottom: '10px', fontWeight: '500' }}>Don't have an account?</div>
                    <Register/>
                    </Box>
                </Box>
            </div>
        </ThemeProvider>
    </React.Fragment>
  );
}