import { Box, Grid, Paper } from '@mui/material'
import { Router, Route, browserHistory, IndexRoute } from 'react-router-dom';
import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

export const ItemLijst = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return(
        <Box sx={{ backgroundColor: "background.paper", width: '100%', minHeight:  'calc(100vh - 64px)' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap',width: '100%' }}>
            { props.items.map( (item) => (<Paper onClick={() => { navigate('/item?id=' + item.id); }} key={item.id} sx={{ marginLeft: "25px", marginTop: "25px", height: '200px', width: '150px', backgroundImage: `url(${item.afbeelding})`, backgroundSize: 'cover', '&:hover': { cursor: "pointer", }}}></Paper>) )}
            </Box>
        </Box>
    )
}