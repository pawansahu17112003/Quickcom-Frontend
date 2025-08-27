import { serverURL } from "../../../services/FetchNodeAdminServices"
import CartButton from "./CartButton";
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import PlusMinusButton from "../homepage/PlusMinusButton"
export default function MyCart({refresh,setRefresh})
{ const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    var dispatch=useDispatch()
    var cartData=useSelector((state)=>state.cart)
    var user=useSelector((state)=>state.user)
    var userData=Object.values(user)
    var data =Object.values(cartData)   
    var keys =Object.keys(cartData) 
    var totalamount=data.reduce((f,s)=>{
     var ap=0
      if(s.offerprice>0)
     {
      ap=s.offerprice*s.qty
     }
     else
     {
      ap=s.price*s.qty
     }
     return f+ap
    },0)
    const showAddress=()=>{
    
       return(<div style={{fontFamily:'JioType, helvetica, arial, sans-serif',marginTop:25,marginLeft:100,border:'0.5px solid #e2e2e2',borderRadius:20,padding:20,width:'30%'}}>
       
    <div style={{fontSize:18,fontWeight:'bold',marginBottom:4}}>Delivery Address</div>
            <div style={{fontSize:16,fontWeight:500,marginBottom:2}}>{userData[0].firstname} {userData[0].lastname}</div> 
             <div>{userData[0]?.address}</div> 
            <div> {userData[0]?.building},{userData[0]?.towerno},{userData[0]?.floorno}    
              </div>
             <div>{userData[0]?.houseno}</div>
            <div>{userData[0].state},{ userData[0].city},{userData[0].pincode} </div>   

      </div>)
      
    }
    const handleChange=(value,item)=>{
      if(value==0)
      {
        dispatch({type:"DELETE_CART",payload:[item.productdetailid]})  
      }
      else
      {
      item['qty']=value
      dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})
      }
       setRefresh(!refresh)
     }
        
      const CartDetails=()=>{
        return data.map((item,index)=>{
            var op=(item.price-item.offerprice)*item.qty
         return(
        <div >
            

        <div style={{display:'flex',alignItems:'center'}}>
            <div style={{marginLeft:matches?40:20,width:matches?'45%':'52%'}}>
                <img src={`${serverURL}/images/${item.picture}`} style={{width:matches?'25%':'60%',cursor:'pointer'}}/>
            </div>

           <div style={{display:'flex',flexDirection:'column',marginTop:'3%',marginLeft:matches?-200:-30}}>
                <div style={{cursor:'pointer',color:'rgba(0, 0, 0, .65)',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:528,fontSize:'.875rem',letterSpacing:-.07,lineHeight:1.4285714286}}>{item.productdetailname}</div>
                {item.offerprice>0?<>
                <div style={{display:'flex',alignItems:'center',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:16,letterSpacing:-0.08,lineHeight: 1.5,color:'#141414',marginTop:2}}>
                       &#8377;{item.offerprice*item.qty}&nbsp;<div style={{color:'#b5b5b5',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:14,letterSpacing:-0.07,lineHeight: 1.4285714286}}><s>&#8377;{item.price*item.qty}</s></div>
                </div>
                <div>
                <div style={{width:90,display:'flex',alignItems:'center',borderRadius:2,background:'#e5f7ee',color:'#03753c',fontSize:12,fontWeight:750,marginLeft:1,marginTop:4}}>You Save &#8377;{op} </div>
                </div></>:<>
                <div style={{display:'flex',alignItems:'center',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:16,letterSpacing:-0.08,lineHeight: 1.5,color:'#141414',marginTop:2}}>
                       &#8377;{item.price*item.qty}
                </div>
              
                </>}
                <div style={{display:'flex',alignItems:'center'}}>
                <div style={{color:'#b5b5b5',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:4}} >
                 Sold by:
                </div>
                <div style={{color:'#141414',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:4,marginLeft:2}}>
                Reliance Retail
                </div>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                <div style={{color:'#b5b5b5',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:3}}>
                Size:
                </div>
                <div style={{color:'#141414',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:12,letterSpacing:-0.07,lineHeight: 1.4285714286,marginTop:4,marginLeft:2}}>
                {item.weight} {item.weighttype}    
                </div>
                </div>
            <div style={{marginLeft:matches?400:10,marginBottom:15}}>
            <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?item?.qty:0} onChange={(value)=>handleChange(value,item)}/>
            </div>
          </div>
    
            
        </div>
        {index < data.length - 1 && (
            <Divider variant="middle" style={{width:'95%'}}/>
          )}
        </div>
        
             
         )
        })
       }

    return(
        <div>
      
        {userData?.length>0?<div>{showAddress()}</div>:<div></div>}
        <div>
         <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:24,letterSpacing:-0.72,lineHeight: 1,marginTop:25,marginLeft:100}}>
            My Cart
         </div>
         <div style={{border:'0.5px solid #e2e2e2',borderRadius:20,marginLeft:'10%',marginTop:25,width:'80%'}}>
         <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:'1rem',letterSpacing:-0.72,lineHeight: 1.25,marginLeft:30,marginTop:25,marginBottom:20}}>Scheduled Delivery Basket</div>
         <div style={{marginRight:'5%',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:900,fontSize:'1rem',letterSpacing:-0.08,lineHeight: 1.25,color:'#141414',marginTop:-40,marginLeft:matches?'90%':'80%'}}> &#8377;{totalamount}</div>  
           {CartDetails()}
        </div>
        </div>
             
            
          
        
           
        </div>
    )
}