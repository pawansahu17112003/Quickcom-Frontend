import Header from "../homepage/Header";
import Footter from "../homepage/Footter"
import MyCart from "./MyCart";
import PaymentDetails from "./PaymentDetails";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
export default function CartDisplay()
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [refresh,setRefresh]=useState(true)

    
return(<div>
    
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <Header/>
        </Grid>
        <Grid item xs={matches?8:12} style={{marginLeft:matches?-30:-1,width:matches?'74%':'100%'}} >
            <MyCart refresh={refresh} setRefresh={setRefresh}/>
        </Grid>
        <Grid item xs={matches?4:12} style={{marginTop:5,marginLeft:matches?-50:60,width:matches?'31%':'90%'}} >
            <PaymentDetails refresh={refresh} setRefresh={setRefresh}/>
        </Grid>
        {matches && (
        <>
        <Grid item xs={12} style={{marginLeft:100,width:'90%',marginTop:40}}>
            <Footter/>
        </Grid>
        </>
)}
    </Grid>
    
    </div>
)
}