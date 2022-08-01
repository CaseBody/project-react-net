import { CircularProgress, Button, Link, Paper, Rating, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header";
import Logo from "../images/logo.png";
import jwtDecode from "jwt-decode";
import {useNavigate} from 'react-router-dom';


const Signup = () => {
    let [username, setUsername] = useState("")
    let [usernameError, setUsernameError] = useState(false)
    let [usernameHelper, setUsernameHelper] = useState("")

    let [password, setPassword] = useState("")
    let [passwordError, setPasswordError] = useState(false)
    let [passwordHelper, setPasswordHelper] = useState("")
    let [passwordConfirm, setPasswordConfirm] = useState("")

    let [loading, setLoading] = useState(null)
    let [loginDisabled, setLoginDisabled] = useState(false)

    const navigate = useNavigate();

    function onLoginClick() {
        if (username == "")
        {
            setUsernameError(true);
            setUsernameHelper("Voer het Gebruikersnaam veld in");
            return;
        }
        else
        {
            setUsernameError(false);
            setUsernameHelper("");
        }

        if (password == "" || passwordConfirm == "")
        {
            setPasswordError(true);
            setPasswordHelper("Voer het Wachtwoord veld in");
            return;
        }
        else
        {
            setPasswordError(false);
            setPasswordHelper("");
        }

        if (password != passwordConfirm)
        {
            setPasswordError(true);
            setPasswordHelper("Wachtwoord komt niet overeen");
            return;
        }
        else
        {
            setPasswordError(false);
            setPasswordHelper("");
        }

        let accept = false;

        fetch('https://localhost:7192/api/Auth/register', {
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
            if (response.status == 400)
            {
                setUsernameError(true);
                setUsernameHelper("Gebruikersnaam is in gebruik");
            }
            else if (response.status == 200)
            {
                navigate("/login")
            }
            else{
                setUsernameError(true);
                setUsernameHelper("");

                setPasswordError(true);
                setPasswordHelper("Fout tijdens account creatie");
            }

        })
        .catch(() => {
            setUsernameError(true);
            setUsernameHelper("Fout tijdens account creatie");

            setPasswordError(true);
            setPasswordHelper("Fout tijdens account creatie");
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

            <Typography variant="h4" component="h3">Account Creëren</Typography>
            <TextField helperText={usernameHelper} error={usernameError} value={username} onChange={(e) => {setUsername(e.target.value);}} id="outlined-helperText" label="Gebruikersnaam" sx = {{marginTop: "20px"}}></TextField>
            <TextField helperText={passwordHelper} error={passwordError} value={password} onChange={(e) => {setPassword(e.target.value)}} id="outlined-password-input" label="Wachtwoord" type="password" autoComplete="current-password"></TextField>
            <TextField helperText={passwordHelper} error={passwordError} value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}} id="outlined-password-input" label="Bevestig Wachtwoord" type="password" autoComplete="current-password"></TextField>
            <Box sx = {{display: 'flex'}}>
                <Button sx = {{position: 'relative'}} disabled={loginDisabled} onClick={onLoginClick} variant="outlined" size="large" >Aanmelden</Button>
                {loading && 
            <CircularProgress
            size={24}
            sx={{
               position: 'absolute',
               marginLeft: "30px",
               marginTop: "10px"
            }}/>}
            </Box><Link  sx = {{marginBottom: "20px", cursor: "pointer"}} onClick={() => { navigate('/login'); }}>Login</Link>
        </Paper>
        </Box>   
    </div>
    );

}

export default Signup;
