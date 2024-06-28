import { AccordionDetails, AccordionSummary, Button } from "@mui/material"
import Accordion from "@mui/material/Accordion"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { useState, useEffect } from "react";
import { servercalls } from "../apicalls/apicalls";

interface Dummy {
    drink_date_created: string,
    drink_id: string,
    drink_ingredients: string,
    drink_instructions: string,
    drink_name: string,
    drink_price: string,
    drink_qty: number
}

type DummyArray = Dummy[]

const newDummy: DummyArray = 
[
    {
        drink_date_created: 'Loading data.',
        drink_id: 'Loading data.',
        drink_ingredients: 'Loading data.',
        drink_instructions: 'Loading data.',
        drink_name: 'Loading data.',
        drink_price: 'Loading data.',
        drink_qty: 0 
    }
]

function DrinkAccord({addD}: any) {
    const [infoState, setInfo] = useState(newDummy)

    const buttonstyles = {
       
        "backgroundColor": "black",
        "color": "antiquewhite",
        "borderRadius": "25px",
        "height": "60px",
        "fontFamily": 'Constantia Regular',
        
    }
    
    const loaddrinks = async () => 
        {
            let thedrinks: DummyArray = await servercalls.getDrinks()
            setInfo(thedrinks)
        }

    useEffect(()=>{loaddrinks()}, [])
        
        return (
            <div id='listcontain'>
                {infoState.map((drink, index) => (
                    <div key={index}>
                        <Accordion >
                            <AccordionSummary expandIcon={<ArrowDownwardIcon/>} aria-controls="panel1-content" className='accordion'>
                                <p id='drinkinfo'>
                                    <p>{drink.drink_name}</p>
                                    <p>&nbsp;|&nbsp;</p>
                                    <p>Qty: {drink.drink_qty}</p>
                                    <p>&nbsp;|&nbsp;</p>
                                    <p style={{"color": "green"}}>${drink.drink_price}</p>
                                </p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p>Ingredients: {drink.drink_ingredients}</p>
                                <p>Instructions: {drink.drink_instructions}</p>
                            </AccordionDetails>
                        </Accordion>
                        <Button variant="contained" style={buttonstyles} id='addButton' onClick={()=>addD({"drink_id": drink.drink_id, "drink_name":drink.drink_name, "drink_qty": "1", "drink_price": drink.drink_price})}>Add Above Drink to Menu</Button>
                    </div>
                ))}
            </div>
          )


}

export default DrinkAccord