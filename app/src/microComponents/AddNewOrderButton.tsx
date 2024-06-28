import Button from '@mui/material/Button'


function AddNewOrderButton({switchbut, start}: any) {

  const pstyles = {
    "backgroundColor" : "antiquewhite",
    "color": "black",
    "width": "75%",
    "marginLeft": "auto",
    "marginRight": "auto",
    "borderRadius": "25px"
  }

  return (
    <Button variant='contained' id='addneworder' onClick={ async ()=>{ await start(), switchbut()}}>
        <p style={pstyles}>Add New Order</p>
    </Button>
  )
}

export default AddNewOrderButton