import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import './css/Register.css';
import registerImage from '../assets/register.webp';

const apiUrl = process.env.REACT_APP_AUTH_API_URL;

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [error, setError] = React.useState('');
  const [registerStatus, setRegisterStatus] = React.useState('');
  const [animationClass, setAnimationClass] = React.useState('alert-enter');

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>/\\\-_=+]/.test(password);
    if (password.length < 8 || !hasLetter || !hasNumber || !hasSpecialChar) {
        setPasswordError('Password must be at least 8 characters long, contain a letter, a number, and a special character.');
    } else {
        setPasswordError('');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (passwordError) {
        setPassword('');
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        });

        const result = await response.json();
        if (result.success) {
            setError('');
            setAnimationClass('alert-enter');
            setRegisterStatus(result.email);
            setTimeout(() => {
                setAnimationClass('alert-exit')
                setTimeout(() => {
                    setRegisterStatus('');
                }, 1000);
            }, 4000);
            handleClose();
        } else {
            setError(result.message || 'User registration failed');
            setRegisterStatus('');
            setAnimationClass('alert-enter');
        }
    } catch (error) {
        console.error('Error during API call:', error);
        setError('An unexpected error occurred');
    }
  };

  const handleClose = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPasswordError('');
    setError('');
    setAnimationClass('alert-enter');
    setOpen(false);
  };

  return (
    <React.Fragment>
        <Button onClick={handleClickOpen} style={{ backgroundColor: 'rgb(45 117 220)', color:'white', minWidth: '30%'}}>
            Register
        </Button>
        {
            registerStatus && 
            <Alert severity="success" className={animationClass}>
                <AlertTitle>Success</AlertTitle>
                User registration successful, Email - <b>{registerStatus}</b>
            </Alert>
        }
        <Dialog
            maxWidth="md"
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: onSubmitHandler,
                style: { height: '80vh', borderRadius: '0px 0px 200px 200px' },
            }}
        >
            <div className='register'>
                <div style={{width: '50%', textAlign: 'center'}}>
                    <img src={registerImage} className="register-logo" alt="register" />
                </div>
                <div style={{ width: '50%' }}>
                    <DialogTitle>
                        <h2 style={{ margin: '0px' }}>Sign Up</h2>
                        <div>It's easy peasy and lemon squeezy</div>
                    </DialogTitle>
                    <hr style={{ margin: '0px', padding: '0px 5px' }}/>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                    <CloseIcon />
                        </IconButton>
                    <DialogContent>
                    <DialogContentText style={{ margin: '10px 0px' }}>
                        To log in to the application, please register here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.trim())}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.trim())}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => {
                            const { value } = e.target;
                            setPassword(value);
                            validatePassword(value);
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    </DialogContent>
                    {error && <div style={{ color: 'red', fontSize: '14px', textAlign: 'center', marginBottom: '10px' }}>{error}, Try again.</div>}
                    <DialogActions>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ minwidth: '50%', width: '40%', margin: 'auto', marginBottom: '20px', color:'white', backgroundColor: '#5CDB95', borderRadius:'5em' , padding:'1.5% 5%' }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </DialogActions>
                </div>
            </div>
        </Dialog>
    </React.Fragment>
  );
}