import { Button, Paper, Rating, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header";
import Logo from "../images/logo.png";
import jwt from 'jwt-decode'
import jwtDecode from "jwt-decode";


const Login = () => {
    let [username, setUsername] = useState("")
    let [usernameError, setUsernameError] = useState(false)
    let [usernameHelper, setUsernameHelper] = useState("")

    let [password, setPassword] = useState("")
    let [passwordError, setPasswordError] = useState(false)
    let [passwordHelper, setPasswordHelper] = useState("")

    function onLoginClick() {
        if (username == "")
        {
            setUsernameError(true);
            setUsernameHelper("Please fill in the Username field");
            return;
        }
        else
        {
            setUsernameError(false);
            setUsernameHelper("");
        }

        if (password == "")
        {
            setPasswordError(true);
            setPasswordHelper("Please fill in the Password field");
            return;
        }
        else
        {
            setPasswordError(false);
            setPasswordHelper("");
        }

        let accept = false;

        fetch('https://localhost:7192/api/Auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: username,
                Password: password
            })
        })
        .then(response => {
            if (response.status == 404)
            {
                setUsernameError(true);
                setUsernameHelper("User does not exist");
            }
            else if (response.status == 400)
            {
                setUsernameError(true);
                setUsernameHelper("Incorrect username/password");

                setPasswordError(true);
                setPasswordHelper("Incorrect username/password");
            }
            else if (response.status == 200)
            {
                response = response.json().then(token => {
                    const decoded = jwtDecode(token);

                    sessionStorage.setItem("logged_in", true)
                    sessionStorage.setItem("token", token)
                    sessionStorage.setItem("gebruiker", decoded['gebruiker'])

                    console.log(sessionStorage)
                });
            }
            else{
                setUsernameError(true);
                setUsernameHelper("Error logging in");

                setPasswordError(true);
                setPasswordHelper("Error logging in");
            }

        })
    }

    return (
    <div className="App">
        <Header/>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" , backgroundColor: "background.paper", width: '100%', height:  'calc(100vh - 64px)' }}>
        <Paper sx={{ display: "flex", rowGap: "20px", flexDirection: "column", alignItems: "center", minWidth: "300px", width: "18%" }}>
            <Box
                component="img"
                sx={{
                height: 100,
                }}
                alt="LOGO"
                src={Logo}
            />

            <Typography variant="h4" component="h3">Login</Typography>
            <TextField helperText={usernameHelper} error={usernameError} value={username} onChange={(e) => {setUsername(e.target.value);}} id="outlined-helperText" label="Username" sx = {{marginTop: "20px"}}></TextField>
            <TextField helperText={passwordHelper} error={passwordError} value={password} onChange={(e) => {setPassword(e.target.value)}} id="outlined-password-input" label="Password" type="password" autoComplete="current-password"></TextField>
            <Button onClick={onLoginClick} variant="outlined" size="large" sx = {{marginBottom: "25px"}}>Login</Button>
        </Paper>
        </Box>   
    </div>
    );

}

export default Login;
