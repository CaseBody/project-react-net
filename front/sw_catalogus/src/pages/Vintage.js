import { Box, Button, Rating } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";


const Vintage = () => {
  const [series, setSeries] = useState([]);

    useEffect(()=>{
      fetch('https://localhost:7192/api/Item')
        .then(response => response.json())
        .then(response => {
            response = response.filter(item => { return item.categorie == 'Vintage' });
            const order = response.sort((a, b) => a.uitgaveJaar - b.uitgaveJaar);
            setSeries(order);
        })
    }, []);


  return (
    <div className="App">
      <Header/>

      <Box sx={{ backgroundColor: "background.paper", width: '100%', minHeight:  'calc(100vh - 64px)' }}>
        {series && <ItemLijst items={series}/>}
      </Box>
    </div>
  );

}

export default Vintage;
