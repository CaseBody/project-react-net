import { Button, Rating, Box, Paper, Typography } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";
import { useSearchParams } from "react-router-dom";


const Item = () => {
    const [item, setItem] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        fetch('https://localhost:7192/api/Item/id?id=' + searchParams.get('id'))
          .then(response => response.json())
          .then(response => {
              setItem(response);
              console.log(response);
          })
    }, []);

  return (
    <div className="App">
        <Header/>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: "background.paper", width: '100%', height:  'calc(100vh - 64px)' }}>
            <Paper elevation={3} sx={{ display: 'flex', width: '40%', height: '50%', overflow: 'hidden', minWidth: '700px', minHeight: '400px' }}>
                <div style={{ width: '45%', height: '100%' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={item.afbeelding}/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '55%', height: '100%' }}>
                    <div style={{ width: '100%', margin: '15px', display: 'flex',  flexDirection: 'column' }}>
                        <Typography variant="h4">{item.titel}</Typography>
                        <Typography variant="subtitle1">Première in: {item.uitgaveJaar}</Typography>
                    </div>

                    <Button sx={{ margin: '15px', width: '60%' }} variant="outlined">Toevoegen aan mijn lijst</Button>
                </div>
            </Paper>
        </Box>
    </div>
  );

}

export default Item;
