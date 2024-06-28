import { TextField, Box, Button } from "@mui/material"
import { useState } from "react"

function PaymentInfo({cancelP, FModal}: any) {

    const [ccard, setCcard] = useState("")
    const [expDate, setexpDate] = useState("")

    const pstyles = {
        "backgroundColor" : "antiquewhite",
        "color": "black",
        "width": "75%",
        "marginLeft": "auto",
        "marginRight": "auto",
        "borderRadius": "25px"
      }

  return (
    <div id='paymentBox'>
        <div id="paymentDiv">
            <TextField 
            fullWidth 
            value={ccard} 
            id="outlined-basic" 
            size="small" 
            variant="outlined" 
            color="primary" 
            label="Card or Cash#"
            onChange={(e) =>{setCcard((e.target.value))}}
            />

            <TextField 
            fullWidth 
            value={expDate} 
            id="outlined-basic" 
            size="small" 
            variant="outlined" 
            color="secondary" 
            label="Exp Date"
            onChange={(e) =>{setexpDate((e.target.value))}}
            />

        </div>
        <Box component='div' id='payButtons'>
            <Button className='OrderButtons' onClick={()=>cancelP.canP()}>
                <p style={pstyles}>Edit Order</p>
            </Button>
            <Button className='OrderButtons'>
                <p style={pstyles} onClick={()=>{FModal(ccard, expDate, cancelP);}}>Finalize Order</p>
            </Button>
        </Box>
    </div>
  )
}

export default PaymentInfo