import { AppBar, Container, Typography, Toolbar, Box, Button } from '@mui/material'
import React from 'react'
import Logo from "../images/logo.png"
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { Outlet, Link } from "react-router-dom";

export const Header = () => {
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
                <Button size="medium" color="inherit"><Link style={{ color: 'white', textDecoration: 'none' }} to="/">Films</Link></Button>
                <Button size="medium" color="inherit"><Link style={{ color: 'white', textDecoration: 'none' }} to="/series">Series</Link></Button>
                <Button size="medium" color="inherit">Animated Series</Button>
                <Button size="medium" color="inherit">Vintage</Button>
            </Toolbar>

            <Button startIcon={<AccountBoxOutlinedIcon fontSize='large'/>} size="large" color="inherit">Account</Button>
            </Toolbar>
        </Container>
    </AppBar>
  )
}