import { Divider,Grid } from "@mui/material";
import Footter from "../homepage/Footter";
import Header from "../homepage/Header";
import ProductsScroll from "../homepage/ProductsScroll";
import ProductDescription from "./ProductDescription";
import ProductImageComponent from "./ProductImageComponent";
import { useRef, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
export default function ProductDetailsPage()
{
   
    var location=useLocation()
    console.log("nnnn",location)
    var p=location?.state?.product


    const [product,setProduct]=useState(p)
    const [refresh,setRefresh]=useState(true)



    var scrollRef=useRef()
    const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
   
    return(<div>
        <div>
            <Header/>
        </div>

<Grid container spacing={2} >

        <Grid item xs={6}>
            <ProductImageComponent  refresh={refresh} setRefresh={setRefresh} product={product} setProduct={setProduct}/>
            </Grid>

            <Grid item xs={6}>
            <ProductDescription product={product} setProduct={setProduct}/>
            </Grid>
        </Grid>

 <Divider/>

 <div>
    <Footter/>
 </div>
 
 

        
    </div>)
}