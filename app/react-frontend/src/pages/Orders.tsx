import { useEffect } from 'react'
import { Box } from '@mui/material'
import { useState } from 'react'
import { servercalls } from '../apicalls/apicalls'
import OrdersDisplay from '../microComponents/OrdersDisplay'

interface drinkStruct 
{
    "drink_price": string,
    "order_id": string,
    "drink_id": string,
    "drink_qty": string,
    "drink_name": string
}

let exampDrink: drinkStruct = 
{
    "drink_price": "",
    "order_id": "",
    "drink_id": "",
    "drink_qty": "",
    "drink_name": ""
}

type drinkStructArray = drinkStruct []

interface orderStruct 
{
    "order_date": string,
    "order_drinks": drinkStructArray,
    "order_id": string,
    "order_payexp": string,
    "order_payinfo": string,
    "order_total": string
}

type orderStructArray = orderStruct[]

let exampArray: drinkStructArray = [exampDrink]

let exampOrdersList: orderStructArray = 
[
    {"order_date": "",
"order_drinks": exampArray,
"order_id": "",
"order_payexp": "",
"order_payinfo": "",
"order_total": ""}
]

function Orders(props: any) {

    const[ordersList, setOrdersList] = useState(exampOrdersList)

    const mapOrders = (orders: any) =>
    {
        return orders.map((order: any, index: any) =>
            <OrdersDisplay key={index} content ={order} GetEdit={props} />
        )
    }

    const retriveOrds = async () =>
    {
        exampOrdersList = await servercalls.getOrders()
        setOrdersList(exampOrdersList)
    }

    useEffect(()=>{retriveOrds()}, [props])

  return (
    <div id='ordersPage'>
        <Box component='h1' id='ordersTitle'>
            <p style={{"marginTop": "0px"}}>Orders</p>
        </Box>
        
        <Box component='main' id='ordersList'>
            {mapOrders(ordersList)}
        </Box>
    </div>
  )
}

export default Orders