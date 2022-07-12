import { Button, Rating } from "@mui/material";
import { Component, useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";


const Films = () => {
  const [films, setFilms] = useState([]);

    useEffect(()=>{
      fetch('https://localhost:7192/api/Item')
        .then(response => response.json())
        .then(response => {
            response = response.filter(item => { return item.categorie == 'Films' });
            const order = response.sort((a, b) => a.uitgaveJaar - b.uitgaveJaar);
            setFilms(order);
        })
    }, []);

  return (
    <div className="App">
      <Header/>

      <ItemLijst items={films}/>
    </div>
  );

}

export default Films;
