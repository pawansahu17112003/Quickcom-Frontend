import { useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextBoxSearch from './TextBoxSearch';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MyMenuBar from './MyMenuBar';
import MyDrawer from './MyDrawer';
import logo from '../../../assets/logo.png'
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Header()
{ 
var cartData=useSelector(state=>state.cart)
     var user=useSelector(state=>state.user)
   var keys=Object.keys(cartData)
   var userData=Object.values(user)
   console.log('ewgwyfvrdylz',userData)

   var navigate=useNavigate()
  const [open,setOpen]=useState(false)
   const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const handleClick=()=>
    {
      setOpen(true)
    }
    return( <div container>
      <Box sx={{ flexGrow: 1}}>
              <AppBar position="static" style={{background:"#2980b9"}}  >
                <Toolbar>
                 { matches?<div></div>:<IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon  onClick={handleClick}/>
                  </IconButton> }
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                  <Typography  onClick={()=>navigate('/HomePage')} variant="h6" component="div" style={{cursor:'pointer',display:'flex', alignItems:'center' }}>
                    <img src={logo} style={{width:70,height:70}}/>
                    <div style={{fontSize:22,fontWeight:"bold",letterSpacing:-0.5}}>
                  QuickCom
                  </div>
                  </Typography>
                  {matches?<TextBoxSearch/>:<div></div>}
                   <div>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <Badge badgeContent={keys.length} color="secondary">
                    < ShoppingCartIcon onClick={()=>navigate('/cartdisplaypage')} />
                    </Badge> 
                  </IconButton>
                
                  {matches?<IconButton
                    
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                  <div></div> <AccountCircleIcon style={{fontSize:30}} />
                  {userData?.length==0?<div style={{marginLeft:5,fontWeight:'bold',fontSize:16}}>Sign In</div>:<div style={{marginLeft:5,fontWeight:'bold',fontSize:16}}>{userData[0]?.firstname}</div>}
                  </IconButton>:<div></div>}
                  
                  </div>
                  </div>
                </Toolbar>
              </AppBar>
                 
              {matches?<div></div>:
              <AppBar position="static">
        <Toolbar>
        <div style={{width:'100%', display:'flex',marginBottom:5 ,alignItems:"center",justifyContent:'center'}}>
        <TextBoxSearch width="100%" />
        </div>
        </Toolbar>
      </AppBar>
      
            }
            {matches?
            <MyMenuBar />:<div></div>}
            <MyDrawer open={open} setOpen={setOpen} />
            </Box>
            </div> 
          );
        }
       
    