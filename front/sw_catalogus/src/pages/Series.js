import { Button, Rating } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";


const Series = () => {
  const [series, setSeries] = useState([]);

    useEffect(()=>{
      fetch('https://localhost:7192/api/Item')
        .then(response => response.json())
        .then(response => {
            response = response.filter(item => { return item.categorie == 'Series' });
            const order = response.sort((a, b) => a.uitgaveJaar - b.uitgaveJaar);
            setSeries(order);
        })
    }, []);


  return (
    <div className="App">
      <Header/>

      <ItemLijst items={series}/>
    </div>
  );

}

export default Series;
