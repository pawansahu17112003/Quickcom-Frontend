import * as React from 'react';
import { useState,useEffect } from 'react';
import { serverURL, getData, postData  } from "../../../services/FetchNodeAdminServices";
import { Divider } from '@mui/material';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreateIcon from '@mui/icons-material/Create';
import Rating from '@mui/material/Rating';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";


export default function ProductDescription({product,setProduct}) {
            
       const [overState,setOverState]=useState('#0c5273')
       const [productList,setProductList]=useState([])
       const [productDetailId,setProductDetailId]=useState(product.productdetailid)
       const [color,setColor]=useState('#000')

const fetchAllProductsById=async()=>{
var response=await postData('userinterface/user_display_product_details_by_id',{productid:product?.productid})
setProductList(response.data)

}
    useEffect(()=>{
      fetchAllProductsById()
    },[]) 


  const showDetail = () => {

    var op = parseInt(((product.price - product.offerprice) / product.price) * 100)

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignSelf: 'flex-start', marginTop: 15, fontWeight: 700, fontSize: 16, letterSpacing: -0.08, lineHeight: 1.5, color: '#0c5273' }}>
          {product.productname}
        </div>

        <div style={{
          marginTop: 15,
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: -0.09,
          lineHeight: 1.333333,
          width: '75%',
          overflow: "hidden",
          textOverflow: 'ellipsis',
          display: "-webkit-box",
          webkitLineClamp: "2",
          webkitBoxOrient: "vertical",
        }}>

          <span> {product.productdetailname} </span>
          <span>{product.weight} {product.weighttype}</span>
        </div>
        {/*item.productdetailname.length<=24?<div style={{ lineHeight: 1.2456,}}>&nbsp;</div>:<></>*/}

        <div style={{
          display: 'flex',
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: -0.09,
          lineHeight: 1.333333,
          width: 20,
          height: 20,
          color: '#0c5273',
          overflowClipMargin: 'content-box',
        }}>
          <Rating name="read-only" value={4} readOnly />
          <span style={{ marginLeft: 330, display: 'flex' }}>
            <span ><FavoriteBorderIcon/> </span>
            <span style={{ marginLeft: 10, marginTop: 2 }}><ShareIcon /> </span>
          </span>
        </div>

        {product.offerprice > 0 ? <div style={{ marginTop: 7, display: 'flex', flexDirection: 'column' }}>

          <div style={{
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: -0.72,
            lineHeight: 1,
          }}>

            <span style={{ display: 'flex', alignItems: 'center' }}>&#8377; {product.offerprice}<span style={{ marginLeft: 15, width: 'auto', fontSize: 16, fontWeight: 700, letterSpacing: -0.08, lineHeight: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2, background: '#e5f7ee', color: '#03753c', padding: 2 }}>{op}% Off</span></span>
          </div>

          <div style={{
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: -0.08,
            lineHeight: 1.5,
            color: 'grey'
          }}>

            <div style={{ display: 'flex', alignItems: 'center' }}><span>M.R.P: &nbsp;</span><s><span>&#8377;{product.price}</span></s> <span>&nbsp;&nbsp;(Incl. of all taxes)</span></div>
          </div>

        </div> : <div>
          <div  style={{
            marginTop: 7,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: -0.72,
            lineHeight: 1,

          }}>

<span style={{color:'gray',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,}}>M.R.P: &nbsp;</span>
  <span  style={{
            marginTop: 7,
            fontWeight: 900,
            fontSize: 24,
            letterSpacing: -0.72,
            lineHeight: 1,

          }}>&#8377; {product.price}</span><span style={{color:'gray',fontWeight: 500,fontSize: 16,letterSpacing: -0.08,lineHeight: 1.5,}}>&nbsp;&nbsp;(Incl. of all taxes)</span>
          </div>
          <div style={{ lineHeight: 1.6285714286, }}>&nbsp;</div>
        </div>
        }

      </div>
    )
  }
 const handleSelectedProduct=(item)=>{
setProductDetailId(item.productdetailid)
setProduct(item)
 }
 

const packSize = (index) => {
  return productList.map((item)=>{
 
    var op = parseInt(((item.price - item.offerprice) / item.price) * 100)

    return (
      <div onClick={()=>handleSelectedProduct(item)} style={{ display: 'flex', flexDirection: 'column' }}>
       

        <div style={{ marginTop: 15, width: '100%', height: 50, borderRadius: 20, border:item.productdetailid==productDetailId?`2px solid #4cd137`:`1px solid #000`, padding: 6, display: 'flex', alignItems: 'center', }}>
          <span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 10, borderWidth: '.275em', width: 16, height: 16, borderRadius: '50%', border: '1px solid #0078ad', backgroundColor: '#0078ad' }}>

              <div style={{marginLeft:0.5, borderWidth: '.275em', width: 8, height: 8, borderRadius: '50%', border: '1px solid #0078ad', backgroundColor: '#fff' }}></div>
            </div>
          </span>
          <span style={{ marginLeft: 10, width: '12%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <img src={`${serverURL}/images/${item.picture}`} style={{ width: '60%', borderRadius: 20, border: '0px solid #e0e0e0', padding: 6, }} />
          </span>

          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontStyle: 'calibari', fontSize: 18, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414' }}>
            Pack of 1 &nbsp;&nbsp;&nbsp;&nbsp;{item.weight} {item.weighttype}
          </span>

          <span style={{ marginLeft: 150, display: 'flex', alignItems: 'center', fontWeight: 700, fontStyle: 'calibari', fontSize: 18, letterSpacing: -0.08, lineHeight: 1.5, color: '#141414' }}>

            {item.offerprice > 0 ? <div style={{ marginTop: 7, display: 'flex', flexDirection: 'column', }}>

              <div>

                <span style={{ display: 'flex', alignItems: 'center' }}>&#8377; {item.offerprice}<span style={{ marginLeft: 8, width: 'auto', fontSize: 14, fontWeight: 700, letterSpacing: -0.08, lineHeight: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 2, background: '#e5f7ee', color: '#03753c', padding: 2 }}>{op}% Off</span></span>
              </div>

              <div style={{
                fontWeight: 200, fontStyle: 'calibari', fontSize: 13, fontWeight: 500, letterSpacing: -0.08, lineHeight: 1.5,
                color: 'grey',
                alignSelf: 'flex-end'
              }}>

                <div style={{ display: 'flex', alignItems: 'center' }}><s><span>&#8377;{item.price}</span></s></div>
              </div>

            </div> : <div>
              <div style={{
                marginTop: 7,
                marginLeft: 40
              }}>

<span style={{fontSize:15}}>M.R.P: &nbsp;</span><span>&#8377;</span> {item.price}
              </div>

            </div>
            }
          </span>


        </div>

      </div>
  )})
  }



const offers = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignSelf: 'flex-start', marginTop: 15, fontWeight: 900, fontStyle: 'calibari', fontSize: 24, letterSpacing: -0.72, lineHeight: 1, color: '#141414' }}>
          Offers (16)
        </div>
          <div>
            <span style={{display: 'flex',marginTop:8}}>
              <span><AccountBalanceIcon/></span>
               <span style={{display: 'flex',flexDirection:'column'}}>
              <span style={{  fontWeight: 700, fontStyle: 'calibari', fontSize: 14,  letterSpacing: -0.07, lineHeight: 1.4,}}>BANK OFFERS</span>
            <span style={{  width:500,fontWeight: 500, fontStyle: 'calibari', fontSize: 12,  overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap',letterSpacing: -0.08, lineHeight: 1.5,color:'rgba(0, 0, 0, .65)'}}>
                 5 accelerated reward points by SBI cards (1.25%), 10 accelerated reward points by SBI cards (2.50%)- - Valid On NON EMI
            </span>
                <span style={{  width:500,fontWeight: 700, fontStyle: 'calibari', fontSize: 14,letterSpacing: -0.08, lineHeight: 1.5,color:'#b5b5b5'}}> 16 Offer/s Available </span>
            </span>
            </span>
          </div>
         <div onMouseLeave={()=>setOverState('#0c5273')} onMouseOver={()=>setOverState('#1f3d4c')} style={{cursor:'pointer',marginTop:8,width: '60%', borderRadius: 20, border: '1px solid #e0e0e0', padding: 10, marginLeft: 10, width: '12%', display: 'flex', alignItems: 'center', justifyContent: 'center',fontWeight:700}}>
               View All
          </div>

      </div>
    )

  }


  const deliver = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignSelf: 'flex-start', marginTop: 15, fontWeight: 900, fontStyle: 'calibari', fontSize: 24, letterSpacing: -0.72, lineHeight: 1, color: '#141414' }}>
         Deliver to
        </div>
      <div style={{display:'flex',marginTop:20}}>
          <span style={{
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: -0.09,
          lineHeight: 1.333333,
          color: '#141414',
         
        }}>321001</span>
        <span style={{
          marginLeft:10,
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: -0.08,
            lineHeight: 1.5,
            color: 'grey'
          }}>Bharatpur</span>
          <span style={{marginLeft:350}}><CreateIcon style={{width:50,height:20,color:'#1f3d4c'}}/></span>
        </div>

        <div style={{display:'flex',marginTop:20}}>
          <span style={{
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: -0.09,
          lineHeight: 1.333333,
          color: '#25ab21',
         
        }}>In Stock</span>
        <span style={{
          marginLeft:10,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: -0.08,
            lineHeight: 1.5,
            color: '#141414'
          }}>Delivery by tomorrow</span>
        </div>

      </div>
    )

  }


const soldby = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ alignSelf: 'flex-start', marginTop: 15, fontWeight: 900, fontStyle: 'calibari', fontSize: 24, letterSpacing: -0.72, lineHeight: 1, color: '#141414' }}>
         Sold by
        </div>
      <div style={{display:'flex',marginTop:20}}>
          <span style={{
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: -0.09,
          lineHeight: 1.333333,
          color: '#0c5273',
         
        }}>Quickcomm Company</span>
        <span style={{
          marginLeft:10,
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: -0.08,
            lineHeight: 1.5,
            color: 'grey'
          }}><img src="/smartbazaar.png" style={{width:100,height:30}}/></span>
         
        </div>

      </div>
    )

  }



const description = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        { parse(product.productdetaildescription)}
      </div>
    )

  }



  const link = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{display:'flex',marginTop:20,alignItems:'center'}}>
        <span style={{borderRadius:'55%',width:4,height:5,backgroundColor: 'rgba(0, 0, 0, .65)',border:'1px rgba(0, 0, 0, .65)'}}></span>
        <span style={{
          marginLeft:10,
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: -0.08,
            lineHeight: 1.5,
            color: '#141414'
          }}>TArticle ID: 490005134 
         </span> 
         <span style={{
          marginLeft:10,
          }}><img src="/copyicon.png" style={{width:20,height:20, marginTop:6}}/></span>
        </div>

      </div>
    )

  }




  return (<div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ marginBottom: 8, marginLeft: 35, }}>
      {showDetail()}
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 10 }}>
      <Divider />
    </div>
    <div style={{ alignSelf: 'flex-start', marginTop: 15,marginLeft:35, fontWeight: 900, fontStyle: 'calibari', fontSize: 24, letterSpacing: -0.72, lineHeight: 1, color: '#141414' }}>
          Packsize
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 8 }}>
      {packSize()}
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 10 }}>
      <Divider />
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 8 }}>
      {offers()}
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 10 }}>
      <Divider />
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 8 }}>
      {deliver()}
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 10 }}>
      <Divider />
    </div>
    <div style={{ marginBottom: 1, marginLeft: 35, width: 550, marginTop: 1 }}>
      {soldby()}
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 10 }}>
      <Divider />
    </div>
     
     
    <div style={{ marginBottom: 1, marginLeft: 35, width: 550, marginTop: 1 }}>
      {description()}
    </div>
    <div style={{ marginBottom: 8, marginLeft: 35, width: 550, marginTop: 10 }}>
      <Divider />
    </div>
    
   
    <div style={{ marginBottom: 1, marginLeft: 35, width: 550, marginTop: 1 }}>
      {link()}
    </div>   
    
  </div>)
}