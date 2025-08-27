import * as React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import { useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlusMinusButton from '../homepage/PlusMinusButton';
import { useSelector ,useDispatch} from 'react-redux';

export default function ProductDetailsCategory({productData,refresh,setRefresh}) {
  var cartData=useSelector((state)=>state?.cart)
  var dispatch=useDispatch()
  var keys=Object.keys(cartData)
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  var scrollRef = useRef()
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 5 : 2,
    slidesToScroll: 1,
    arrows: false
  }
  const handleChangeQty=(value,item)=>{
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
  const showImages = () => {    
    return productData.map((item) => {
      var op = parseInt(((item.price - item.offerprice) / item.price) * 100)
      return (<div>
          <div style={{padding:10,alignItems:'center',display:'flex',flexDirection:'column', alignSelf: 'center',marginLeft:20, width:200,border:"1px solid #e0e0e0",cursor: 'pointer',borderRadius: 10}}>
            <div >
              <img src={`${serverURL}/images/${item.picture}`} style={{ width: 150,marginTop:20 }}
              />
               </div>

            <div style={{ width:"100%",display: 'flex' ,flexDirection:'column',justifyContent:'flex-start',marginLeft:5}}>
              <div>
                <img src={`${serverURL}/images/smart.jpg`} style={{width:90}}/>
              </div>
             
              <div style={{
                   
                   fontWeight: 600,
                   fontSize: 14,
                   letterSpacing: -0.07,
                   lineHeight: 1.4285714286,
                    width:'75%', 
                    overflow: "hidden",
                    textOverflow: 'ellipsis',
                    display:"-webkit-box",
                    webkitLineClamp: "2",
                    webkitBoxOrient: "vertical",
                    marginLeft:5,
                    color:'grey'
                    }}>        
               {item.productdetailname}
                </div>
               

             
                {item.productdetailname.length<=24?<div style={{ lineHeight: 1.2456
              }}>&nbsp;</div> : <></>}
              

              <div style={{
                     fontWeight: 600,
                     fontSize: 14,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                     marginLeft:5,
                      color:'grey'
                     }}>
          
                      {item.weight} {item.weighttype}
                     </div>
                     
              
                     {item.offerprice>0 ? <div style={{marginTop:5,display:'flex',flexDirection:'row',alignContent:'center'}}>
                     <div style={{display:'flex',
                     fontWeight: 700,
                     fontSize: 16,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                     marginLeft:5
                     }}>
                     <span>&#8377;</span> {item.offerprice} 
                     </div>
                     <div style={{
                     fontWeight: 500,
                     fontSize: 14,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                     color:'grey'
                     }}>
          
          <div style={{display:'flex',alignItems:'center',fontSize: 12, marginLeft:5}}><s><span>&#8377;{item.price}</span></s><span style={{margin:5,width:55,display:'flex',justifyContent:'center',alignItems:'center',borderRadius:2,background:'#e5f7ee',color:'#03753c'}}>{op}% OFF</span></div>
                     </div>
                     </div>:<div>
                     <div style={{
                      marginTop:4,
                     fontWeight: 600,
                     fontSize: 16,
                     letterSpacing: -0.07,
                     lineHeight: 1.4285714286,
                 
                     }}>
          
                     <span>&#8377;</span> {item.price}
                     </div>
                     <div style={{ lineHeight:1.6285714286,}}>&nbsp;</div>
                     </div>
                     }
                     <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:10}}>
              <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?cartData[item.productdetailid]?.qty:0} onChange={(value)=>handleChangeQty(value,item)}/>
            </div>
                     </div>
            </div>
            <div>
            

            
          </div>
       </div>
      );
    });
  };
  return (<div style={{display:'flex',flexWrap:'wrap'}}>
    {showImages()}
  </div>)

}
