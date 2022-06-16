import { Button, Rating } from "@mui/material";
import { useState } from 'react';


function App() {
  const [name, setName] = useState("Test Naam");

  const btnClicked = (e) => {
    setName(e);
  }

  return (
    <div className="App">
      
      <Button variant="contained" onClick={() => { btnClicked("Nieuwe Naam") }}>{name}</Button>
      <Rating name="simple-controlled" value={1 + 1}/>
    </div>
  );

}

export default App;
