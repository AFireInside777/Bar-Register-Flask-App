import {useState, useEffect} from 'react'
import { servercalls } from '../apicalls/apicalls'

export const summonDrinks = () => {
    let [thedrinks, setTheDrinks] = useState<[]>([])

    const hello = async () => {
        setTheDrinks(await servercalls.getDrinks())
    }
    
    useEffect(() =>  {
        hello()
    }, []);
    
    return { thedrinks, getTheDrinks:hello }
}
