import { Box, Grid, Paper } from '@mui/material'
import React from 'react'

export const ItemLijst = (props) => {
    return(
        <Box sx={{ backgroundColor: "background.paper", width: '100%', minHeight:  'calc(100vh - 64px)' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap',width: '100%' }}>
            { props.items.map( (item) => (<Paper key={item.id} sx={{ marginLeft: "25px", marginTop: "25px", height: '200px', width: '150px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', '&:hover': { cursor: "pointer", }}}></Paper>) )}
            </Box>
        </Box>
    )
}