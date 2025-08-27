const initialState={
    cart:{},
    user:{}
}

export default function rootReducer(state=initialState,action)
{
    switch(action.type)
    {
        case "ADD_CART":
            
            state.cart[action.payload[0]]=action.payload[1]
           // console.log(state.employee)
            return ({cart:state.cart,user:state.user}) 
        case "DELETE_CART":
            
            delete state.cart[action.payload[0]]
           // console.log(state.employee)
            return ({cart:state.cart,user:state.user})  
            case "ADD_USER":
            
            state.user[action.payload[0]]=action.payload[1]
           // console.log(state.employee)
            return ({cart:state.cart,user:state.user})    
            case "CLEAR_CART":
            
           state.cart={}
           // console.log(state.employee)
            return ({cart:state.cart,user:state.user})  
        default:
            return ({cart:state.cart,user:state.user}) 


    }
}