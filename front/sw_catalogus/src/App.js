import { Button, Rating } from "@mui/material";
import { useState } from 'react';
import { Header } from "./components/Header"


function App() {
  const [name, setName] = useState("Test Naam");

  const btnClicked = (e) => {
    setName(e);
  }

  return (
    <div className="App">
      <Header />
    </div>
  );

}

export default App;
