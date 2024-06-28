import { Box, Typography } from "@mui/material"

import DrinkAccord from "../microComponents/DrinkAccord"

function DrinkMenu({addD}: any) {

    const pstyles = {
        "backgroundColor" : "antiquewhite",
        "color": "black",
        "width": "95%",
        "marginLeft": "auto",
        "marginRight": "auto",
        "borderRadius": "25px",
    }

  return (
    <Box component='div' id='drinkMenuBox'>
        <Box component='div' id='dmtitle'>
            <Typography variant="h5" id='titletext'>
                <p style={pstyles}>Drink Menu</p>
            </Typography>
        </Box>
        <Box component='main' id='drinksList'>
            <DrinkAccord addD={addD}/>
        </Box>
    </Box>
  )
}

export default DrinkMenu