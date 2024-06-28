import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

function CompleteOrder(drinkc: any) {

    const [currentdrink, settheCurrent] = useState(drinkc)

    const pstyles = {
        "backgroundColor" : "antiquewhite",
        "color": "black",
        "width": "95%",
        "marginLeft": "auto",
        "marginRight": "auto",
        "borderRadius": "25px",
    }


    const buttondiv = {
        "width": "99.9%",
        "height": "53%",
        "display": "flex",
    }

    const buttonstyles = {
        "width": "100%",
        "height": "99.9%"
    }

    useEffect(()=>{settheCurrent(drinkc)},[drinkc])

  return (
    <div className='completeOrd'>
        <div id='completeOrd2'>
            <p className='newPstyles'>Order Item Count: {currentdrink.orderD[1].dc}</p>
            <p className='newPstyles'>Order Total: ${currentdrink.orderD[0].order_total}</p>
        </div>
        <div style={buttondiv}>
            <Button variant='outlined' onClick={()=>currentdrink.cancelOrd()} style={buttonstyles} className="orderButtons">
                <p style={pstyles}>Cancel Order</p>
            </Button>
            <Button variant='outlined' onClick={()=>currentdrink.switchtoP()}style={buttonstyles} className="orderButtons">
                <p style={pstyles}>Complete Order</p>
            </Button>
        </div>
    </div>
  )
}

export default CompleteOrder