import { Button, Rating, Box, Paper, Typography, CircularProgress } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";
import { useSearchParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Item = () => {
    let [item, setItem] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    let [show, setShow] = useState(false);
    let [showButton, setShowButton] = useState();
    let [hasAdded, setHasAdded] = useState(false);

    const navigate = useNavigate();

    useEffect(()=> { 
        fetch('https://localhost:7192/api/Item/id?id=' + searchParams.get('id'))
        .then(response => {
            if (response.status == 200)
            {
                response = response.json().then(e => {setItem(e);})
            }
            else
            {
                navigate("/")
            }
        }).catch(() => {
            navigate("/")
        })

        if (sessionStorage.getItem("logged_in") === "true")
        {
            setShowButton("true")

            const data = { id: sessionStorage.getItem("gebruiker"), token: sessionStorage.getItem("token")};

            let url = new URL('https://localhost:7192/api/Gebruiker/opgeslagen')
            for (let k in data) { url.searchParams.append(k, data[k]); }
        
            fetch(url)
            .then(response => {
                if (response.status == 200)
                {
                    response = response.json().then((e) => {
                        if (e.some(i => i.id == searchParams.get('id')))
                        {
                            setHasAdded(true);
                        }
                    })
                }
                else
                {
                    sessionStorage.setItem("logged_in", "false")
                    setShowButton("false")
                }
        
            }).catch(() => {
                sessionStorage.setItem("logged_in", "false")
                setShowButton("false")
            })
        }

        setShow(true)
    }, []);

    const AddButton = () => {
        if (!hasAdded)
        {
            return <Button onClick={ButtonClick} sx={{ margin: '15px', width: '60%' }} variant="outlined">Toevoegen aan mijn lijst</Button>
        }
        else
        {
            return <Button onClick={ButtonClick} sx={{ margin: '15px', width: '60%' }} variant="outlined">Verwijderen uit mijn lijst</Button>
        }
    }

    const Content = () => {
        if (show)
        {         
            return <Box sx={{ display: "flex", overflow: 'hidden', width: "100%", height: "100%" }}>
                <div style={{ width: '45%', height: '100%' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={item.afbeelding}/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '55%', height: '100%' }}>
                    <div style={{ width: '100%', margin: '15px', display: 'flex',  flexDirection: 'column' }}>
                        <Typography variant="h4">{item.titel}</Typography>
                        <Typography variant="subtitle1">Première in: {item.uitgaveJaar}</Typography>
                    </div>

                    {showButton && <AddButton />}
                </div>
            </Box>
        }
        else
        {
            return <Box sx = {{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><CircularProgress size={60}></CircularProgress></Box>
        }
    }

    const ButtonClick = () => {
        const data = {
            gebruikerid: sessionStorage.getItem("gebruiker"),
            itemid: searchParams.get('id'),
            token: sessionStorage.getItem("token"),
        };
        let url = new URL('https://localhost:7192/api/Gebruiker/opgeslagen')
        for (let k in data) { url.searchParams.append(k, data[k]); }

        if (hasAdded)
        {
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.status == 200)
                {
                    setHasAdded(!hasAdded)
                }
            })
        }
        else
        {
            fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
                if (response.status == 200)
                {
                    setHasAdded(!hasAdded)
                }
            })
        }
    }

  return (
    <div className="App">
        <Header/>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: "background.paper", width: '100%', height:  'calc(100vh - 64px)' }}>
            <Paper elevation={3} sx={{ display: 'flex', width: '40%', height: '50%', overflow: 'hidden', minWidth: '700px', minHeight: '400px' }}>
                <Content />
            </Paper>
        </Box>
    </div>
  );

}

export default Item;
