import { Button, Rating } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";


const Series = () => {
  const [series, setSeries] = useState([
    {
        id: 1,
        titel: 'The Empire Strikes Back',
        image: '/images/background/esb.png'
    },
    ]);


  return (
    <div className="App">
      <Header/>

      <ItemLijst items={series}/>
    </div>
  );

}

export default Series;
