import { Box } from "@mui/material"
import { useEffect, useState } from "react"

function NewOrderInfo({newOrderStuff}: any) {

    const[idanddate, setiddate] = useState(newOrderStuff)

    const pstyles = {
        "backgroundColor" : "antiquewhite",
        "color": "black",
        "width": "75%",
        "marginLeft": "auto",
        "marginRight": "auto",
        "borderRadius": "25px"
    }

    useEffect(()=>{setiddate(newOrderStuff)}, [newOrderStuff])

  return (
    <>
        <Box component="div" className='newOrderdiv' id='orderNum'>
            <p style={pstyles}>Order# {idanddate.order_id}</p>
        </Box>
        <Box component="div" className='newOrderdiv' id='orderDate'>
            <p style={pstyles}>{idanddate.order_date}</p>
        </Box>
    </>
  )
}

export default NewOrderInfo