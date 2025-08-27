import Header from "../homepage/Header"
import { useState,useEffect } from "react";
import Footter from "../homepage/Footter"
import ShowCategory from "./ShowCategory"
import { useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { getData } from "../../../services/FetchNodeAdminServices";
import ProductDetailsCategory from "./ProductDetailsCategory"
export default function PageCategoryDisplay() {
  
  const [category,setCategory]=useState([])
  const [refresh,setRefresh]=useState(false)
  var location=useLocation()
   console.log("xxxxx",location)
   var productData=location?.state?.productData 


  const fetchAllCategory=async()=>{
    var result=await getData('userinterface/user_display_all_subcategory')
    setCategory(result.data)
}
useEffect(()=>{
    fetchAllCategory()

},[])
  var scrollRef=useRef()
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <div>
        <Header />
      </div>
      <div>
        <div style={{ display: 'flex', marginTop: "4.5%", marginLeft: "3.5%" }}>
          <ShowCategory data={category} />
          <div style={{display:'flex',marginTop:50}}>
        <ProductDetailsCategory refresh={refresh} setRefresh={setRefresh} productData={productData} />
        </div>
        </div>
      </div>

     {matches?<div style={{ width: '100%', alignSelf: 'center', justifyContent: "space-between", marginTop: 100, MarginLeft: 15 }}>
        <Footter />
      </div>:<></>}


    </div>
  )
}
