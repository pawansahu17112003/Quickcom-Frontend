import { makeStyles } from "@mui/styles"
var userStyle=makeStyles({
    root:{width:'100%',
          height:'100%',
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
          
    },
    box:{
        width:500,
        height:'auto',
        padding:10,
        margin:10,
        background:"#f7f1e3",
        borderRadius:5


    },
    headingStyle:{
        fontSize:24,
        marginLeft:10
    },
    imageStyle:{width:70,
        height:70
    },
    mainHeadingstyle:{
        display:'flex',
        alignItems:'center',
        padding:5
    },
    center:{display:'flex',
        alignItems:'center',
        justifyContent:'center'
        },
     errorMessageStyle:
      {color: '#d32f2f',"fontFamily":"\"Roboto\", \"Helvetica\", \"Arial\", sans-serif","fontWeight":"400","fontSize":"0.75rem","lineHeight":"1.66","letterSpacing":"0.03333em","textAlign":"left","marginTop":"3px","marginRight":"14px","marginBottom":"0","marginLeft":"14px"},


      displayBox:{
        width:800,
        height:'auto',
        padding:10,
        margin:10,
        background:"#f7f1e3",
        borderRadius:5


    },
    
})
export {userStyle}