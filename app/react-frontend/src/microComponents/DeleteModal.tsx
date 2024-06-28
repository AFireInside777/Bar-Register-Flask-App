import { Button } from "@mui/material"

let buttonstyle = {
    "marginBottom": "10px"
  }

function DeleteModal(props: any) {

  return (
    <div>
        <p id='modalText'>Are you sure you would like to remove {props.nDO.Name} from the Order?</p>
        <Button variant='contained' onClick={()=>props.delD(props.nDO.Index)} style={buttonstyle} size="small">Yeah, delete It</Button>
        <Button variant='contained' onClick={()=>props.hanC()} size="small">Wait I still want it.</Button>
  </div>
  )
}

export default DeleteModal