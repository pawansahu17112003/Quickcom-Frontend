import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Divider,Button,Grid, ListItem} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Height } from '@mui/icons-material';
import { Paper } from '@mui/material';
import {  serverURL } from '../../../services/FetchNodeAdminServices'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Category from '../category/Category';
import DisplayAllCategory from '../category/DisplayAllCategory';
import SubCategory from '../subcategory/SubCategory';
import DisplayAllSubCategory from '../subcategory/DisplayAllSubCategory';
import Brand from '../brand/Brand';
import DisplayAllBrand from '../brand/DisplayAllBrand';
import Product from '../product/Product'
import DisplayAllProduct from '../product/DisplayAllProduct'
import ProductDetail from '../productdetail/ProductDetail';
import DisplayAllProductDetail from '../productdetail/DispalyAllProductDetail';
import ProductPictures from '../productpictures/ProductPictures';
import MainBanner from '../mainbanner/MainBanner';
import Adoffer from '../adoffer/Adoffer';
import BankOffer from '../bankoffer/BankOffer' 
import { Route,Routes ,useNavigate} from 'react-router-dom';

export default function DashBoard() {
 var navigate=useNavigate()
    return(
 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuickComm
          </Typography>
          <Button color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
      <div>
        <Grid container>
          <Grid xs={2}>
            <Paper elevation={3} style={{flexDirection:"column",display:'flex',alignItems:"center",width:"100%",height:"100%",margin:10}}>
             <div>
              <img src={`${serverURL}/images/5.jpg`}  style={{width:100,height:100,borderRadius:50,marginTop:10}}/>
             </div>
             <div style={{fontSize:12,fontWeight:"bold",letterSpacing:1}}>
              Harry Singh
             </div>
             <div style={{fontSize:10,fontWeight:"bold",color:'grey'}}>
             HarrySingh@gmail.com
             </div>
             <Divider style={{width:'90%',marginTop:10}}/>
             <div>
             <List>
              <ListItem >
                <ListItemButton>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/dashboard.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                      Dashboard
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
              <ListItem style={{marginTop:-25}}>
                <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/category.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                     Category
                    </div>
                  </div>
                </ListItemButton>
              </ListItem> 
              <ListItem style={{marginTop:-25}}>
                <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/subcategory.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                     Subcategory
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
               <ListItem style={{marginTop:-25}}>
                <ListItemButton onClick={()=>navigate('/dashboard/displayallbrand')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/brand-image.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                     Brands
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
               <ListItem style={{marginTop:-25}}>
                <ListItemButton  onClick={()=>navigate('/dashboard/displayallproduct')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/product-catalog.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                      Products 
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
               <ListItem style={{marginTop:-25}}>
                <ListItemButton  onClick={()=>navigate('/dashboard/displayallproductdetail')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/products.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                     Product Details
                    </div>
                  </div>
                </ListItemButton>
              </ListItem> 
              <ListItem style={{marginTop:-25}}>
                <ListItemButton  onClick={()=>navigate('/dashboard/productpictures')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/product-image (1).png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                      Product Image
                    </div>
                  </div>
                </ListItemButton>
              </ListItem> 
              <ListItem style={{marginTop:-25}}>
                <ListItemButton  onClick={()=>navigate('/dashboard/mainbanner')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/ribbon-folds.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                     Banners
                    </div>
                  </div>
                </ListItemButton>
              </ListItem  >
               <ListItem style={{marginTop:-25}}>
                <ListItemButton onClick={()=>navigate('/dashboard/adoffer')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/adimages.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                      Products Ad
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
               <ListItem style={{marginTop:-25}}>
                <ListItemButton onClick={()=>navigate('/dashboard/bankoffer')}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/bank-account.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                      Bank Offers
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
               <ListItem style={{marginTop:-25}}>
                <ListItemButton>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src='/check-out.png' style={{width:30,height:30}}/>
                    <div style={{fontWeight:600,marginLeft:15}}>
                     Logout
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
             
            </List>
            </div> 
            </Paper>

          </Grid>
         <Grid  xs={10}>
         <Routes>
                           <Route element={<Category/>} path="/category"></Route>
                         <Route element={<DisplayAllCategory/>} path="/displayallcategory"></Route>
                         <Route element={<SubCategory/>} path="/subcategory"></Route>
                         <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory"></Route>
                           <Route element={<Brand/>} path="/brand"></Route>
                           <Route element={<DisplayAllBrand/>} path="/displayallbrand"></Route>
                           <Route element={<Product/>} path="/product"></Route>
                           <Route element={<DisplayAllProduct/>} path="/displayallproduct"></Route>
                           <Route element={<ProductDetail/>} path="/productdetail"></Route>
                           <Route element={<DisplayAllProductDetail/>} path="/displayallproductdetail"></Route>
                           <Route element={<ProductPictures/>} path="/productpictures"></Route>
                           <Route element={<MainBanner/>} path="/mainbanner"></Route>
                           <Route element={<Adoffer/>} path="/adoffer"></Route>
                           <Route element={<BankOffer/>} path="/bankoffer"></Route>
            </Routes>
        </Grid>
        </Grid>
      </div>
    </Box>
  


  )
}
