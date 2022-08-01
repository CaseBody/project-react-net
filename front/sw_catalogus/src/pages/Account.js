import { CircularProgress, Box, Button, Rating, Typography } from "@mui/material";
import { Component, useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";
import {useNavigate} from 'react-router-dom';


const Account = () => {
    const [films, setFilms] = useState(null);
    const [gebruiker, setGebruiker] = useState("213213");
    let [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if (sessionStorage.getItem("logged_in") !== "true")
        {
            navigate("/login")
        }  

        const data = { id: sessionStorage.getItem("gebruiker"), token: sessionStorage.getItem("token")};
        let url = new URL('https://localhost:7192/api/Gebruiker')
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        fetch(url)
        .then(response => {
            if (response.status == 200)
            {
                response = response.json().then((e) => {
                    setGebruiker(e['name'])
                })
            }
            else
            {
                sessionStorage.setItem("logged_in", "false")
                navigate("/login")
            }
    
        })
        .catch((e) => {
            sessionStorage.setItem("logged_in", "false")
            navigate("/login")
        })

        url = new URL('https://localhost:7192/api/Gebruiker/opgeslagen')
        for (let k in data) { url.searchParams.append(k, data[k]); }
    
        fetch(url)
        .then(response => {
            if (response.status == 200)
            {
                response = response.json().then((e) => {
                    setFilms(e);
                    setTimeout(() => {setShow(true)}, 250)
                })
            }
            else
            {
                sessionStorage.setItem("logged_in", "false")
                navigate("/login")
            }
    
        })
        .catch((e) => {
            sessionStorage.setItem("logged_in", "false")
            navigate("/login")
        })
    }, []);

    const Content = () => {
        if (show)
        {
            return <Box sx={{ backgroundColor: "background.paper", width: '100%', minHeight:  'calc(100vh - 64px)' }}>
            <Typography color="textPrimary" variant="h2" sx = {{padding: "10px"}}>{gebruiker}'s Kijk Lijst</Typography>
            {films && <ItemLijst items={films}/>}
          </Box>
        }
        else
        {
            return <Box sx = {{width: "100%", height: "calc(100vh - 64px)", display: "flex", justifyContent: "center", alignItems: "center"}}><CircularProgress size={60}></CircularProgress></Box>
        }
    }

  return (
    <div className="App">
      <Header/>
      <Box sx={{ backgroundColor: "background.paper", width: '100%', minHeight:  'calc(100vh - 64px)' }}>
        <Content />
      </Box>
    </div>
  );

}

export default Account;
