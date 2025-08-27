import {userStyle} from "./MainBannerCss"
import {FormHelperText,FormControl,InputLabel,Select,MenuItem, Button, Grid, TextField, Avatar} from "@mui/material"
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useState,useEffect } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";  
import { postData, currentDate, getData,createDate} from "../../../services/FetchNodeAdminServices";

export default function MainBanner(props)
{
       var classes=userStyle()
       const [open,setOpen]=useState(false)
      // const [bannerId,setBannerId] = useState("")
       const [status,setStatus] = useState("")
       const [filenames, setFilenames] = useState({ bytes: "", fileName: cart })
       const [errorMessages, setErrorMessages] = useState({})
       const [loadingStatus, setLoadingStatus] = useState(false)


const handleErrorMessages = (label, message) => {
        var msg = errorMessages
        msg[label] = message
        setErrorMessages((prev) => ({ ...prev, ...msg }))
          }


const handleImage=(e)=>{
               handleErrorMessages('filenames',null)
           
               if(status=="hide")
                {
                    setOpen(false)
                }
                else
                {
                    setOpen(true)
                }
              
               setFilenames({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
              }




const validateData=()=>{
                var err=false
  
           if(status.length===0)
                  {
                   handleErrorMessages('status',"Pls input status..")
                   err=true
                  }
  
  
            if(filenames.bytes.length===0)
                  {
                    handleErrorMessages('filenames',"Pls input filnames..")
                    err=true
                     }
             
  
                   return err      
                 }
  
  
  
const resetValue=()=>{
                 setOpen(false)
                 setFilenames({bytes:"",fileName:cart})       
                 setStatus("")
  
                 }


  
  
  const handleSubmit=async()=>{
    if(filenames.bytes.length===0)
        {
          handleErrorMessages('filenames',"Pls input filnames..")
        }
                var err=validateData()
  
                       if(err==false)
                         {
                         setLoadingStatus(true)
                        var formData=new FormData()
                          formData.append('status',status)
                          formData.append('filenames',filenames.bytes)
                          formData.append('created_at',currentDate())
                          formData.append('updated_at',currentDate())
                          formData.append('user_admin','Farzi')
                   
                        var result= await postData('mainbanner/mainbanner_submit',formData)
                          if(result.status)
                          {
                               Swal.fire({
                                     position: "top-end",
                                     icon: "success",
                                     title: result.message,
                                     showConfirmButton: false,
                                     timer: 2000,
                                      toast:false
                                   });
                          }
                          else
                          {
                               Swal.fire({
                                    position: "top-end",
                                     icon: "Error",
                                     title: result.message,
                                     showConfirmButton: false,
                                     timer: 2000,
                                     toast:true
                                   });
                          }
                   
                          setLoadingStatus(false)
                          resetValue()
                         }
                   }
                   
        
const setImages=(state)=>{

    if(state=="show")
        {
             setOpen(true)
        }
     if(state=="hide")
        {
            setOpen(false)
        }
    if(state=="Expire")
        {
            resetValue()
        }
}
 
const handleStatus=(state)=>{

            setStatus(state);
            setImages(state)
            
     }

    
return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className={classes.mainHeadingstyle}>
                        <img src={logo} className={classes.imageStyle} />

                        <div className={classes.headingStyle}>
                            Mainbanner Details
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                        {errorMessages?.status ? <InputLabel><div className={classes.errorMessageStyle}>Status</div></InputLabel> : <InputLabel>Status</InputLabel>}
                        <Select value={status}
                            onFocus={() => handleErrorMessages('status', null)}
                            error={errorMessages?.status}
                            label="Status"
                            onChange={(e) => handleStatus(e.target.value)}>
                    
                            <MenuItem value={"show"}>Show</MenuItem> 
                            <MenuItem value={"hide"}>Hide</MenuItem>
                            <MenuItem  value={"Expire"}>Expire</MenuItem>

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.status}</div></FormHelperText>
                    </FormControl>

                </Grid>

                <Grid item xs={4}>
                </Grid>

           
                <Grid item xs={12} style={{marginTop:-50}} className={classes.center}>
                      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                       <Button variant="contained" component="label" style={{width:'100px'}}>Upload
                              <input onChange={handleImage} hidden style={{width:'100px'}} type="file" accept="image/*" multiple/>
                       </Button>
                       <div className={classes.errorMessageStyle}>{(errorMessages?.filenames!=null)?(errorMessages?.filenames):<></>}</div>

                       </div>
                   </Grid>


                   <Grid item xs={12} style={{marginTop:-20}} className={classes.center}>
                    
                    {open?<div>
                        {filenames.fileName!=cart?<Avatar style={{ width:250,height:150}} src={filenames.fileName} variant="rounded" />:<Avatar style={{width:70,height:60}} src={filenames.fileName} variant="rounded" />}
                        </div>:<div><img src={cart} style={{width:70,height:60}}/></div>}
                   
                    </Grid>




                <Grid item xs={12} className={classes.center}>
                    <LoadingButton
                        loading={loadingStatus}
                        loadingPosition="start"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                    >
                        Save
                    </LoadingButton>
                </Grid>

            </Grid>
        </div>
    </div>
    )

}