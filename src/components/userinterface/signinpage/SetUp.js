import Paper from '@mui/material/Paper';
import {Button, RadioGroup } from '@mui/material';
import { useState } from 'react';
import React from 'react'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../services/FetchNodeAdminServices';


export default function SetUp(){
    const location=useLocation()
    const[mobileno,setMobileno]=useState(location?.state?.mobileno)
    const[firstName,setFirstName]=useState('')
    const[lastName,setLastName]=useState('')
    const[gender,setGender]=useState('')
    const[emailAddress,setEmailAddress]=useState('')
    const[dob,setDob]=useState('')
    const [snackBar,setSnackBar]=useState({open:false,message:''})
    var navigate=useNavigate()
 const dispatch=useDispatch()
 const handleSubmit=async()=>{
   var body={mobileno,firstname:firstName,lastname:lastName,emailaddress:emailAddress,gender,dob}
   var response=await postData('userinterface/submit_user_data',body)
   if(response.status)
   { body['userid']=response.userid
       dispatch({type:"ADD_USER",payload:[response?.userid,body]})
       setSnackBar({message:response.message,open:true})
       navigate('/cartdisplaypage')
   }
   else
   {
      setSnackBar({message:response.message,open:true})

   }
 }
 const handleClose=()=>{
   setSnackBar({message:'' ,open:false})
 }


    return(
    <div>
      <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Paper elevation={4} style={{width:380,height:600,padding:10,borderRadius:20,display:'flex',flexDirection:'column',margin:'1%'}}>
        <div style={{padding:15}}>
            

            <div style={{marginTop:20,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:950,fontSize:25,letterSpacing:-0.72,lineHeight: 1}}>
               Setup Your Account
            </div>
            
            
             <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:'1rem',letterSpacing:0.2,lineHeight: 1.25,marginTop:10,color:'#535c68'}}>
                Seemless Onboarding,quick checkouts,and faster deliveries across Jiomart,Ajio and other Reliance Retail Platforms.
             </div> 
             <div>
             <TextField onChange={(e)=>setFirstName(e.target.value)} label="First Name*" variant="standard" fullWidth />
             </div>
             <div style={{marginTop:'5%'}}>
             <TextField onChange={(e)=>setLastName(e.target.value)}  label="Last Name*" variant="standard" fullWidth />
             </div>
             <div style={{marginTop:20,fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:800,fontSize:16,letterSpacing:0.25,lineHeight: 1}}>
                Gender
             </div>
             <div style={{display:'flex'}}>
            
             <FormControlLabel onChange={(e)=>setGender(e.target.value)} value="Female" control={<Radio />} label="Female"  />
             <FormControlLabel  onChange={(e)=>setGender(e.target.value)} value="Male"  control={<Radio />} label="Male" />
             <FormControlLabel  onChange={(e)=>setGender(e.target.value)} value="Other"  control={<Radio />} label="Other" />
            
             </div>
             <div style={{marginTop:'2%'}}>
             <TextField  onChange={(e)=>setEmailAddress(e.target.value)} label="E-Mail ID" variant="standard" fullWidth />
             </div>
             <div style={{marginTop:'3%'}}>
             <TextField  onChange={(e)=>setDob(e.target.value)} label="Date Of Birth" variant="standard" fullWidth />
             </div>
            <Button onClick={handleSubmit} fullWidth style={{border:'1px solid #ddd',borderRadius:25, width:'100%',height:50,marginTop:'10%',color:'#fff',background:'#0078ad',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:700,fontSize:14,letterSpacing:0.07,lineHeight: 1.4285714286}}>Submit</Button>
            <div style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:11,letterSpacing:0.5,lineHeight: 1.10,marginTop:20,marginLeft:2,color:'#535c68',marginBottom:'5%'}}>
               By Continuing, you agree to our terms and conditions of use,Privacy Policy and Retail Account Privacy Policy
            </div>
        </div>
        </Paper>
         </div>
         <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right'  }}
        open={snackBar.open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={snackBar.message}
      />

   
    </div>
    )
}