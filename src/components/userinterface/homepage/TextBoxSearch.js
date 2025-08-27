import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';

export default function TextBoxSearch({width="40%"})
{
    return(<div style={{ display:'flex',alignItems:'center',width:width,height:50,background:'#0c5273',borderRadius:25}}>
                  <SearchIcon color="inherit" style={{ fontSize:30, paddingLeft:10}} />
                  <input type="text" style={{width:'70%',height:26,border:0,borderWidth:'0',outline:0,background:'transparent',color:'#fff',fontSize:16}} placeholder='Search Here...' />                
                                     
                  <ListIcon color="inherit" style={{ padding:15,fontSize:33,marginLeft:'auto'}}/>
                 
            </div>)
}