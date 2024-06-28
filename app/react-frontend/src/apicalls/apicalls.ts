export let servercalls = {
    decider: async(drinkpackage: any)=>
    {
        if (drinkpackage.order_status == 'edit'){
            
            delete drinkpackage.order_status
            servercalls.sendEditOrder(drinkpackage)
        }else{
            delete drinkpackage.order_status
            servercalls.sendOrder(drinkpackage)
        }
        
    },

    getCountDate: async () =>
        {
            let response = await fetch ('/dateordernum',
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
                
            })
            return await response.json()
        },

    getDrinks: async()=>
        {
            let response = await fetch ('/senddrinks',
            {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
                
            })
            let result = await response.json()
            return result
        },

    sendOrder: async(drinkpackage: object)=>
        {
            let response = await fetch ('/receiveorder',
                {
                    method: "POST",
                    body: JSON.stringify(drinkpackage),
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                    
                })
            let result = await response.json()
            return result
        },

    getOrders: async()=>
        {
            let response = await fetch ('/sendallorders',
                {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                    
                })
            let result = await response.json()
            return result
        },

    sendEditOrder: async(drinkpackage: any)=>
        {
            let response = await fetch(`/receiveedit/${drinkpackage.order_id}`,
            {
                method: "PUT",
                body: JSON.stringify(drinkpackage),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }    
            })
            let result = await response.json()
            
            return result
        },

    login: async(password: string, username: string)=>
        {
            let response = await fetch(`/login`,
                {
                    method: "POST",
                    body: JSON.stringify({"username": username, "password": password}),
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            return await response.json()
        },
    
    signup: async(password: string, username: string)=>
        {
            let response = await fetch(`/signup`,
                {
                    method: "POST",
                    body: JSON.stringify({"username": username, "password": password}),
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            return await response.json()
        },
    
    logout: async(username: string)=>
        {
            let response = await fetch(`/logout`,
                {
                    method: "POST",
                    body: JSON.stringify({"username": username}),
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            return await response.json()
        },
    
    deleteOrder: async(ordernum: string)=>
        {
            let response = await fetch(`/deleteorder/${ordernum}`,
                {
                    method: 'DELETE',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                }
            )
            return await response.json()
        }

}

