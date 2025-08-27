import { useState } from "react"

export default function PlusMinus()
{
    const [overState,setOverState]=useState('#b5b5b5')
    const [value,setValue]=useState(0);


    const handlePlus=()=>{
        var v=value;
        v++;
        setValue(v);

    }

    const handleMinus=()=>{
        var v=value;
        v--;
        setValue(v);

        
    }


    return(<div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',marginRight:50}}>

      {value==0?<div onClick={handlePlus} onMouseOver={()=>setOverState('#0c5273')} onMouseLeave={()=>setOverState('#b5b5b5')} style={{cursor:'pointer',marginTop:8,width:'90%',height:45,borderRadius:25,border:`1px solid ${overState}`,color:'#fff',background:'#0078ad',display:'flex',alignItems:'center',justifyContent:'center',marginRight:50}}>
        Add to Cart
    </div>: <div style={{width:165,height:35,borderRadius:17.5,marginTop:8,color:'#0c5273',display:'flex',alignItems:'center',justifyContent:'space-between'}}>

        <div onClick={handleMinus} style={{cursor:'pointer',width:35,height:35,borderRadius:17.5,border:`1px solid ${overState}`,color:'#0c5273',display:'flex',alignItems:'center',justifyContent:'center'}}>-</div>
        <div>{value}</div>
        <div onClick={handlePlus} style={{cursor:'pointer',width:35,height:35,borderRadius:17.5,border:`1px solid ${overState}`,color:'#0c5273',display:'flex',alignItems:'center',justifyContent:'center'}}>+</div>

    </div>}

    </div>)
}