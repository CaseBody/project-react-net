import { Button, Rating, Box, Paper, Typography } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";


const Item = () => {

  return (
    <div className="App">
        <Header/>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: "background.paper", width: '100%', height:  'calc(100vh - 64px)' }}>
            <Paper elevation={3} sx={{ display: 'flex', width: '40%', height: '50%', overflow: 'hidden', minWidth: '700px', minHeight: '400px' }}>
                <div style={{ width: '45%', height: '100%' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='/images/background/esb.png'/>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '55%', height: '100%' }}>
                    <div style={{ width: '100%', margin: '15px', display: 'flex',  flexDirection: 'column' }}>
                        <Typography variant="h4">The Empire Strikes Back</Typography>
                        <Typography variant="subtitle1">Jaar van uitkomst: 1980</Typography>
                    </div>

                    <Button sx={{ margin: '15px', width: '60%' }} variant="outlined">Toevoegen aan mijn lijst</Button>
                </div>
            </Paper>
        </Box>
    </div>
  );

}

export default Item;
