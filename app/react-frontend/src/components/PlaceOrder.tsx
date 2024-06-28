
import { Box, Button } from '@mui/material'
import AddNewOrderButton from '../microComponents/AddNewOrderButton'
import NewOrderInfo from '../microComponents/NewOrderInfo'
import { useState, useEffect } from 'react'
import CompleteOrder from '../microComponents/CompleteOrder'
import PaymentInfo from '../microComponents/PaymentInfo'

function PlaceOrder({orderF, startO, funcs, dc}: any) {

    let items = [orderF, dc]
    const[orderInfostate, setState] = useState(<AddNewOrderButton switchbut={switchtoInfo} start={startO}/>)
    const[payState, setPayState] = useState(<CompleteOrder orderD={items} cancelOrd={cancelOrder} switchtoP={switchtoPay}/>)

    function switchtoInfo()
    {
      setState(<NewOrderInfo newOrderStuff={orderF}/>)
    }
    
    const StatusCheck = () =>
    {
      if (orderF.order_status == 'edit')
      {
        return <NewOrderInfo newOrderStuff={orderF}/>;
      }
      return orderInfostate
    } 

    function cancelOrder() 
    {
      funcs.clrO()
      setState(<AddNewOrderButton switchbut={switchtoInfo} start={startO}/>)
    }

    function cancelPay()
    {
      funcs.stC()
      setPayState(<CompleteOrder orderD={items} cancelOrd={cancelOrder} switchtoP={switchtoPay}/>)
    }

    const cancelfuncs = 
    {
      "canO": cancelOrder,
      "canP": cancelPay
    }

    function switchtoPay() 
    {
      setPayState(<PaymentInfo cancelP={cancelfuncs} FModal={funcs.FinalModal}/>)
    }

    useEffect(()=>
    {
      if(payState.type.name == 'Qa') //When uploaded to Netlify, this should be "Qa", instead of "CompleteOrder"
      {

        setPayState(<CompleteOrder orderD={items} cancelOrd={cancelOrder} switchtoP={switchtoPay}/>)
      }
    },[orderF])
    
  return (
    <Box component="div" id='placeOrder'>
        <Box component='div' id='infoButton'>
          <StatusCheck/>
        </Box>
        <Box component='div' id='drinklist'>
          {orderF.order_drinks.map((drink:any, index: any) => (
            <Box component='div' id='listitems' key={index}>
                <p className='listitem' id='drinkname'>{drink.drink_name.substring(0,6)}</p> 
                <p className='listitem'>&nbsp;|&nbsp;</p>
                <p className='listitem'>${drink.drink_price}.00</p>
                <p className='listitem'>&nbsp;|&nbsp;</p>
                <Button variant='outlined' className='qtybuttons' onClick={()=>{funcs.subq(drink.drink_qty, index)}}>-</Button>
                <p className='listitem'>&nbsp;&nbsp;</p>
                <p className='listitem' id='drinkQty'>Qty: {drink.drink_qty}</p>
                <p className='listitem'>&nbsp;&nbsp;</p>
                <Button variant='outlined' className='qtybuttons' onClick={()=>{funcs.addq(drink.drink_qty, index)}}>+</Button>
                <Button variant='text' onClick={()=>funcs.deld(index, drink.drink_name)}>Delete</Button>
            </Box>
          ))}
        </Box>
        <Box component='div' id='completeOrder'>
          {payState}
        </Box>
    </Box>
  )
}

export default PlaceOrder