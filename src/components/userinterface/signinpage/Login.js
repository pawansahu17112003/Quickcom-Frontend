import Paper from '@mui/material/Paper';
import logo from '../../../assets/logo.png'
import { TextField,Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { generatePath, useNavigate } from 'react-router-dom';
import { postData } from '../../../services/FetchNodeAdminServices';






export default function Login()
{
    const[phonenumber,setPhoneNumber]=useState('')
    var navigate=useNavigate()
    const fetchSmsApi=async(genOtp)=>
    {
   var response=await postData('smsapi/sendotp',{otp:generatePath,mobileno:phonenumber})
    }

    const handleNextPage=()=>{
    const genOtp=parseInt(Math.random()*89999)+10000
    alert(genOtp)
    fetchSmsApi(genOtp)
        navigate("/otp",{state:{phonenumber,genOtp}})
    }
    return(
    <div>
         <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Paper elevation={4} style={{width:380,height:'auto',padding:10,marginTop:55,borderRadius:20,display:'flex',flexDirection:'column'}}>
        <div style={{padding:15}}>
            <div>
            <ClearIcon style={{width:20,height:20}}/>  
            </div>

           <div style={{display:'flex',position:'relative'}}>
            <div style={{marginTop:20,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:950,fontSize:25,letterSpacing:-0.72,lineHeight: 1}}>
                Sign in
            </div>
            <div>
            <img src={logo} style={{position:'absolute',zIndex:1,width:'18%',marginLeft:'55%',marginTop:'5%'}}/>
            </div>
            </div>
             <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:'1rem',letterSpacing:-0.72,lineHeight: 1.25,marginTop:10,color:'#535c68'}}>
                Verify Your Mobile Number to <br></br>  access your Quickcomm Account
             </div> 
             <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:'5%' }}>
             <div style={{marginBottom:5}}>+91-</div>
             <TextField onChange={(e)=>setPhoneNumber(e.target.value) }  label="Mobile Number" fullWidth variant="standard" />
             </Box> 
            <Button fullWidth style={{border:'1px solid #ddd',borderRadius:25, width:'100%',height:50,marginTop:'35%',color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:0.07,lineHeight: 1.4285714286}} onClick={handleNextPage}>Continue</Button>
            <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:11,letterSpacing:0.5,lineHeight: 1.10,marginTop:20,marginLeft:2,color:'#535c68',marginBottom:'25%'}}>
               By Continuing, you agree to our terms and conditions of use,Privacy Policy and Retail Account Privacy Policy
            </div>
        </div>
        </Paper>
         </div>
    </div>
    )
}

