import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';


export default function CartButton(){
    const [value,setValue]=useState(1)
    const handlePlus=()=>{
      
        var v=value
         v++
         setValue(v)
     }
     const handleMinus=()=>{
         var v=value
         value==1?
         setValue(1):
         v--
         setValue(v)
     }




    return(
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div onClick={handleMinus} style={{ cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:20,letterSpacing:-0.07,lineHeight: 1.4285714286,marginRight:20,borderRadius:17.5,border:`0.7px solid #273c75`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',padding:5}}><RemoveIcon/></div>
                <div>{value}</div>
                <div onClick={handlePlus} style={{ cursor:'pointer',marginTop:8,display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:500,fontSize:20,letterSpacing:-0.07,lineHeight: 1.4285714286,marginLeft:20,borderRadius:17.5,border:`0.7px solid #273c75`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',padding:5}}><AddIcon/></div>
            </div>

        </div>
    )
}