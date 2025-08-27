import { Paper } from "@mui/material";
import  { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef } from "react";
import PlusMinusButton from "../homepage/PlusMinusButton";
import { postData } from "../../../services/FetchNodeAdminServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";


import PlusMinusCart from "../productdetailspage/PlusMinusCart";

export default function ProductImageComponent({refresh,setRefresh,product,setProduct})
{
  
  var scrollRef = useRef();
  var dispatch=useDispatch();
  const navigate=useNavigate();
  
  var cartData=useSelector((state)=>state?.cart)
  var keys=Object.keys(cartData)

  const [overState,setOverState]=useState(['#e0e0e0'])
  
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
  
  var scrollRef=useRef()
    

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        arrows:false
      };

      const [productImages,setProductImages]=useState([])
      const [selectedImage,setSelectedImage]=useState(product.picture)
      const fetchAllImages=async()=>{
      var response=await postData('userinterface/user_display_product_picture',{productdetailid:product?.productdetailid})
      setProductImages(response?.data[0]?.filenames?.split(","))
      
      }
          useEffect(()=>{
            setSelectedImage(product.picture)
            fetchAllImages()
            
          },[product]) 
      const handleImage=(item)=>{
        setSelectedImage(item)
      } 

      const showImages=()=>{
        return productImages.map((item,i)=>{

          return(<div>
            <img onClick={()=>handleImage(item)} src={`${serverURL}/images/${item}`} style={{width:90,borderRadius:16, margin:2,border:`1px solid ${overState}`}} />
          </div>)

        })
        
      }

      const handleNext=()=>{
        scrollRef.current.slickNext();

      }

       const handlePrev=()=>{
        scrollRef.current.slickPrev();
      }


    return(<div style={{marginLeft:20,width:'100%',height:'100%',display:'flex'}}>
    
    <div style={{width:'20%'}}>

      <div onClick={handleNext} onMouseOver={()=>setOverState('#0c5273')} onMouseLeave={()=>setOverState('#e0e0e0')} style={{cursor:'pointer',width:80,height:30,borderRadius:40,color: '#0c5273',border:`1px solid ${overState}`,display:'flex',alignItems:'center',justifyContent:'center',margin:10}}>
      <KeyboardArrowUpIcon/>
      </div>
      

       <Slider ref={scrollRef}  {...settings}>
        
        {showImages()}
       </Slider>


       <div onMouseOver={()=>setOverState('#0c5273')} onMouseLeave={()=>setOverState('#e0e0e0')} onClick={handlePrev} style={{cursor:'pointer',width:80,height:30,borderRadius:40,color: '#0c5273',border:`1px solid ${overState}` ,display:'flex',alignItems:'center',justifyContent:'center',margin:10}}>
      <KeyboardArrowDownIcon/>
      </div>


    </div>


    <div style={{width:'80%',marginTop:30}}>

      <Paper elevation={5} style={{width:'85%',height:480,alignSelf:'center',borderRadius:20,alignItems:'center',justifyContent:'center'}}>
       <img src={`${serverURL}/images/${selectedImage}`} style={{width:'96%',height:'94%',margin:10}} />
       <div style={{display:'flex',justifyContent:"center",marginTop:15}}>
        <PlusMinusButton qty={keys.includes(product?.productdetailid+"")?cartData[product.productdetailid]?.qty:0}  onChange={(value)=>handleChange(value,product)}/>
      </div>
      </Paper>

      

    </div>


    
    </div>)
}