
import { Box, ButtonGroup, Card,  CardContent, Button } from '@mui/material'
import { useState, useEffect } from 'react'

function OrdersDisplay({content, GetEdit}: any) {

  const [currentInfo, setInfo] = useState(content)

  const drinkOrders = (drinkorders: any) =>
  {
    return drinkorders.map((drink: any, index: any) =>
      <Card key={index} variant="outlined" sx={{"width": "99%", 
          "height": "20%", 
          "backgroundColor": "antiquewhite", 
          "padding": "0px",
          "display": "flex",
          "fontSize": "18px",
          "flexDirection": "column"}}>
        <CardContent sx={{"height": "40%", "paddingTop": "3px", "display": "flex", "justifyContent": "center"}}>
          <p className='ODN2'>{drink.drink_name.substring(0,6)} - ${drink.drink_price} - Qty: {drink.drink_qty}</p>
        </CardContent>
      </Card>
    )
  }

  const pstyles = 
  {
    "fontSize": "13px"
  }

  const bstyles = 
  {
    "width": "51%"
  }

  useEffect(()=>{setInfo(content)})

  return (
    <div className="ordersCard">
        <Box component='div' id='orderDateNum'>
          <Box component='div' id='date'>
            <p className='ODN'>{currentInfo.order_date}</p>
          </Box>
          <Box component='div' id='ordernum'>
            <p className='ODN'>Order# {currentInfo.order_id}</p>
          </Box>
        </Box>
        <Box component='div' id='ordersList2'>
          {drinkOrders(currentInfo.order_drinks)}
        </Box>
        <Box component='div' id='finalInfoButtons'>
          <Box component='div' id='finalOrder'>
            <p className='ODN3'>Total: ${currentInfo.order_total} - {currentInfo.order_payinfo} - {currentInfo.order_payexp}</p>
          </Box>
          <ButtonGroup size="small" sx={{"height": "50%", "width": "100%", "display": "flex", "justifyContent": "center"}}>
            <Button variant='outlined' style={bstyles} onClick={()=>{GetEdit.GetEdit(currentInfo)}}><p style={pstyles}>Edit Order</p></Button>
            <Button variant='outlined' style={bstyles} onClick={()=>{GetEdit.deleteOrder(0, currentInfo.order_id)}}><p style={pstyles}>Delete Order</p></Button>
          </ButtonGroup>
        </Box>
    </div>
  )
}

export default OrdersDisplay