import { Button, Rating, Typography } from "@mui/material";


function App() {

  const btnClicked = (e) => {
    e.value = "test";
  }

  return (
    <div className="App">
      
      <Button variant="contained" onClick={btnClicked}>Test Button</Button>
      <Rating name="simple-controlled" value={1 + 1}/>
    </div>
  );

}

export default App;
