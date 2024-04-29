import * as React from 'react';
import Button from '@mui/material/Button';
import './css/Application.css';
import logo from '../assets/app.png'

export default function Application(props) {
    const handleLogOut = () => {
        localStorage.clear();
        props.setIsLoggedIn(false);
    };

    return (
        <div>
            <div className='app'>
                <img id="" src={logo} style={{width: '-webkit-fill-available'}} alt="" />
            </div>
            <div style={{textAlign: 'right'}}>
            <Button variant="outlined" onClick={handleLogOut} style={{ backgroundColor: 'rgb(236 28 28)', color:'white', maxWidth: '35%', fontWeight: '800', textAlign: 'end'}}>
                Log Out
            </Button>
            </div>
            <div className='app-body'>
                <h2>Welcome to the application</h2>
            </div>
            
        </div>
    )
}