import { Box , Modal, Button} from '@mui/material'
import PlaceOrder from '../components/PlaceOrder'
import DrinkMenu from '../components/DrinkMenu'
import { useEffect, useState } from 'react'
import { servercalls } from '../apicalls/apicalls'
import DeleteModal from '../microComponents/DeleteModal'
import Orders from './Orders'


type drinkFormStruct = 
{
  'order_id': string, 
  'drink_id': string, 
  'drink_qty': string, 
  'drink_name': string, 
  'drink_price': string
}

type drinkFormArray = drinkFormStruct[]

type orderFormStruct = {
  "order_id" : string,
  "order_date": string,
  "order_drinks": drinkFormArray,
  "order_total": string,
  "order_payinfo": string,
  "order_payexp": string,
  "order_status": string
}

interface tempPay {
  "creditc" : string,
  "expdate": string,
  "functoclose": any
}

let finalpay: tempPay = {
  'creditc': '',
  'expdate': '',
  'functoclose': ''
}

let drinkarray: drinkFormArray = []

let orderForm: orderFormStruct = {
  "order_id" : "",
  "order_date": "",
  "order_drinks": drinkarray,
  "order_total": "0",
  "order_payinfo": "",
  "order_payexp": "",
  "order_status": "send"
}

let drinkcount = {
  "dc" : 0
}

function Dashboard(props: any) {

  const ModalMess1 = 
  <div>
    <p id='modalText'>The drink you've chosen to add is already in the current Order. Please adjust the quantities in the Order menu by clicking either the + or - buttons.</p>
    <Button variant='contained' onClick={()=>handleClose()}>Alright then</Button>
  </div>
    

  const ModalMess2 = 
  <div>
    <p id='modalText' style={{"marginBottom": "15px", "marginTop": "30px"}}>Please click the "Add New Order" button on the left order menu to begin the drink adding process for your order.</p>
    <Button variant='contained' onClick={()=>handleClose()}>Alright then</Button>
  </div>

  const ModalMess3 = () =>
  {
    return(
      <div>  
        <p id='modalText' style={{"marginBottom": "15px", "marginTop": "30px"}}>This order is ready to be submitted?</p>
        <Button variant='contained' onClick={()=>submitOrder()} style={{"marginBottom": "10px"}}>Yes, submit please.</Button>
        <Button variant='contained' onClick={()=>handleClose()}>No, not yet.</Button>
      </div>
  )}

  const OptionBox = (func: any) =>
  {
    return(
      <div style={{"width":"72%", "height": "30px", "border":"2px brown solid", "borderRadius": "25px", "marginLeft": "auto", "marginRight": "auto", "display":"flex","justifyContent":"center"}}>
        <p style={{"marginTop":"1px"}} onClick={()=>func.func(true)}>Options Menu</p>
      </div>
    )
  }

  const ModalMess5 = (message: string) =>
  {
    return(
      <div>  
        <p id='modalText' style={{"marginBottom": "15px", "marginTop": "30px"}}>{message}</p>
        <Button variant='contained' onClick={()=>handleClose()}>Okay, sorry. Sheesh....</Button>
      </div>
  )}

  const [orderState, setOrderState] = useState(orderForm)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  function handleClose() {setOpen(false)}
  const [modalState, setModalMess] = useState(ModalMess1)

  async function startOrder()
  {
    let OrdCountDate = await servercalls.getCountDate()
    orderForm.order_id = OrdCountDate.OrderNum.toString()
    orderForm.order_date = OrdCountDate.OrderDate
    setTotalCount()
    setOrderState({...orderForm})
  }

  const finalizeModal = (ccdata:string, expdata: string, cp: ()=>void) =>
  {  
    finalpay.creditc = ccdata
    finalpay.expdate = expdata,
    finalpay.functoclose = cp
    setModalMess(ModalMess3())
    handleOpen()
  }

  const submitOrder = async () =>
  {
    handleClose()
    orderForm.order_payinfo = finalpay.creditc
    orderForm.order_payexp = finalpay.expdate
    let response: any = await servercalls.decider(orderForm)
    cancelO()
    finalpay.functoclose.canO()
    finalpay.functoclose.canP()

    let ModalMess4 = (respond: string) =>
    {
      return(
        <div>        
          <p id='modalText' style={{"marginBottom": "15px", "marginTop": "30px"}}>{respond}</p>
          <Button variant='contained' onClick={()=>{handleClose(); window.location.reload()}}>Thank you for confirming.</Button>
        </div>
    )}

    setModalMess(ModalMess4(response))
    handleOpen()
  }


  function getEditOrder (editOrder: any)
  {
    if (orderForm.order_id != "")
    {
      let newmessage: string = "Please cancel or finalize the current Order before editing a previous order."
      setModalMess(ModalMess5(newmessage))
      handleOpen()
      return null
    }
    orderForm.order_id = editOrder.order_id
    orderForm.order_date = editOrder.order_date
    orderForm.order_drinks = editOrder.order_drinks
    orderForm.order_total = editOrder.order_total
    orderForm.order_payinfo = editOrder.order_payinfo
    orderForm.order_payexp = editOrder.order_payexp
    orderForm.order_status = "edit"
    
    setTotalCount()
    setOrderState({...orderForm})
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  
  function cancelO()
  {
    drinkarray = []

    orderForm.order_id = ""
    orderForm.order_date = ""
    orderForm.order_drinks = drinkarray
    orderForm.order_total = ""
    orderForm.order_payinfo = ""
    orderForm.order_payexp = ""
    orderForm.order_status = "send"
    
    setTotalCount()
    setOrderState({...orderForm})
  }

  function addDrink (drink: drinkFormStruct)
  {
    if (orderState.order_id == "" && orderState.order_date == '')
    {
      setModalMess(ModalMess2)
      handleOpen()
      return null
    }

    if (orderForm.order_drinks.length > 0)
    {
      for (let i in orderForm.order_drinks)
      {
          if (orderForm.order_drinks[i].drink_name == drink.drink_name)
          {
            setModalMess(ModalMess1)
            handleOpen()
            return null
          }
      }
    }
    drink.order_id = orderForm.order_id
    orderForm.order_drinks.push(drink)
    setTotalCount()
    setOrderState({...orderForm})
  }

  function delforModal(index: number, drinkname: string)
  { 
    let newDelObjs = 
    {
      "Name": drinkname,
      "Index": index
    }
    setModalMess(<DeleteModal delD={deleteDrink} hanC = {handleClose} nDO = {newDelObjs}/>)
    handleOpen()
  }

  function deleteDrink(index: number)
  {
    handleClose()
    orderForm.order_drinks.splice(index,1)
    setTotalCount()
  }

  function addQty (num: any, index: number){  
    num = parseInt(num)
    num = num + 1
    if (orderForm.order_drinks.length > 0)
    {
      orderForm.order_drinks[index].drink_qty = num.toString()
    }
    setTotalCount()
    
  }

  function subQty (num: any, index: number){
    num = parseInt(num)
    num = num - 1
    if (orderForm.order_drinks.length > 0)
    {
      orderForm.order_drinks[index].drink_qty = num.toString()
    }
    setTotalCount()
  }

  let funcObj = {
    "addq" : addQty,
    'subq': subQty,
    'deld': delforModal,
    'clrO': cancelO,
    'stC': setTotalCount,
    'FinalModal': finalizeModal,
  }

  function setTotalCount()
  {
    let price: number = 0
    drinkcount.dc = 0
    for (let i in orderForm.order_drinks)
    {
        drinkcount.dc += Number(orderForm.order_drinks[i].drink_qty)
        price += Number(orderForm.order_drinks[i].drink_price) * Number(orderForm.order_drinks[i].drink_qty)
    }
    orderForm.order_total = price.toString()
    setOrderState({...orderForm})
  }

  async function deleteOrder(decider: number, ordernum: string)
  {
    let ModalMess6 = (ordernum: string) =>
      {
        return(
          <div>        
            <p id='modalText' style={{"marginBottom": "15px", "marginTop": "30px"}}>Are you sure you want to delete Order# {ordernum}?</p>
            <Button variant='contained' onClick={()=>{deleteOrder(1, ordernum)}} style={{"marginBottom": "10px"}}>Yes, away with it.</Button>
            <Button variant='contained' onClick={()=>{handleClose()}}>DO NOT TOUCH</Button>
          </div>
      )}

      let ModalMess7 = (mess: string) =>
        {
          return(
            <div>        
              <p id='modalText' style={{"marginBottom": "15px", "marginTop": "30px"}}>{mess}</p>
              <Button variant='contained' onClick={()=>{handleClose()}}>Thank you very much.</Button>
            </div>
        )}



      if(decider == 0)
      {
        setModalMess(ModalMess6(ordernum))
        handleOpen()
      } 
      else if(decider == 1)
      {
        let response = await servercalls.deleteOrder(ordernum)
        setModalMess(ModalMess7(response))
        handleOpen()
      }
  }

  useEffect(()=>{setOrderState({...orderForm})}, 
  [orderForm])


  return (
    <>
      <OptionBox func={props.toggleD}/>
      <Box component='div' id="dashboarddiv">
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box component='div' id="alreadyModal">
            {modalState}
          </Box>
        </Modal>
        <PlaceOrder orderF={orderState} startO={startOrder} funcs={funcObj} dc={drinkcount}/>
        <DrinkMenu addD={addDrink}/>
      </Box>
      <hr style={{"width":"73%", "backgroundColor":"black"}}/>
      <Orders GetEdit={getEditOrder} deleteOrder={deleteOrder}/>
    </>
  )
}

export default Dashboard