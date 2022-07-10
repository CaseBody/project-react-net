import { Button, Rating } from "@mui/material";
import { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { Header } from "../components/Header"
import { ItemLijst } from "../components/ItemLijst";


const Films = () => {
  const [films, setFilms] = useState([
    {
        id: 1,
        titel: 'The Empire Strikes Back',
        image: '/images/background/esb.png'
    },
    {
        id: 2,
        titel: 'Return of the Jedi',
        image: '/images/background/rotj.png'
    },
    {
        id: 3,
        titel: 'A New Hope',
        image: '/images/background/anh.png'
    }
    ]);


  return (
    <div className="App">
      <Header/>

      <ItemLijst items={films}/>
    </div>
  );

}

export default Films;
