import { Menu, MenuItem, AppBar, Container, Typography, Toolbar, Box, Button } from '@mui/material'
import React from 'react'
import Logo from "../images/logo.png"
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { Outlet, Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [showLogout, setShowLogout] = React.useState(null);

  React.useEffect(()=> { 
      if (sessionStorage.getItem("logged_in") === "true")
      {
        setShowLogout("true")
      }
  }, []);

  return (
    <AppBar position="static">
        <Container maxWidth="x1">
            <Toolbar sx={{ columnGap: 1 }}>
            <Box
                component="img"
                sx={{
                height: 64,
                }}
                alt="LOGO"
                src={Logo}
            />

            <Toolbar sx={{ flexGrow: 1 }}>
                <Button size="medium" color="inherit" onClick={() => { navigate('/'); }}>Films</Button>
                <Button size="medium" color="inherit" onClick={() => { navigate('/series'); }}>Series</Button>
                <Button size="medium" color="inherit">Animated Series</Button>
                <Button size="medium" color="inherit">Vintage</Button>
            </Toolbar>

             <div>
             <Button startIcon={<AccountBoxOutlinedIcon fontSize='large'/>} size="large" color="inherit" onClick={handleClick}>Account</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    >
                    <MenuItem onClick={() => { navigate("/account") }}>Mijn account</MenuItem>
                    { showLogout && <MenuItem onClick={() => { sessionStorage.setItem("logged_in", "false"); window.location.reload(false); }}>Uitloggen</MenuItem>}
                </Menu>
             </div>
            </Toolbar>
        </Container>
    </AppBar>
  )
}