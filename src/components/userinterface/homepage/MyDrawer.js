import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { postData,getData,serverURL } from '../../../services/FetchNodeAdminServices';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
export default function MyDrawer(props) {
    const [category,setCategory]=useState([])
       useEffect(function(){
        fetchAllCategory()
    },[])
    const fetchAllCategory=async()=>{
        var result=await postData('userinterface/user_display_all_category',{status:'limit'})
        setCategory(result.data)
    }
   const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>props.setOpen(false)}>
      <List>
        {category.map((item, index) => (
          <ListItem key={item.categoryid} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <img src={`${serverURL}/images/${item.categoryicon}`} style={{width:40,height:40}} />
              </ListItemIcon>
              <ListItemText primary={item.categoryname} />
            </ListItemButton>
          </ListItem>
           ))}
          <ListItem  disablePadding>
          <ListItemButton>
            <ListItemIcon>
            <img src={`${serverURL}/images/boxes.png`} style={{width:40,height:40}} />
            </ListItemIcon>
            <ListItemText primary="All categories" />
          </ListItemButton>
        </ListItem>
       
      </List>
      <Divider />
      <List>
        
          <ListItem >
            <ListItemButton>
              <ListItemIcon>
              <img src={'/check-out.png'} style={{width:40,height:40}} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

      </List>
    </Box>
  );

  return (
    <div>
      
      <Drawer open={props.open} onClose={()=>props.setOpen(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
