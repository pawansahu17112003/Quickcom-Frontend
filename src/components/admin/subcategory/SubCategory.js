import {FormHelperText,FormControl,InputLabel,Select,MenuItem, Button, Grid, TextField, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from '../../../assets/logo.png';
import cart from '../../../assets/cart.png';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import Swal from "sweetalert2";
import { userStyle } from "../subcategory/SubCategoryCss";
import { postData, currentDate, getData } from "../../../services/FetchNodeAdminServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SubCategory(props) {
    var navigate=useNavigate()
    var classes = userStyle();
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [subCategoryIcon, setSubCategoryIcon] = useState({ bytes: '', fileName: cart });
    const [errorMessages, setErrorMessages] = useState({});
    const [categoryList,setCategoryList]=useState([])
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
    }
    useEffect(function(){
        fetchAllCategory()
    },[])
   
    const fillCategory=()=>{
        return categoryList.map((item)=>{
       return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

        })
    }


    const handleErrorMessages = (label, message) => {
        setErrorMessages(prev => ({ ...prev, [label]: message }));
    };

    const validateData = () => {
        let err = false;
        if (categoryId.length === 0) {
            handleErrorMessages('categoryId', 'Please input category ID.');
            err = true;
        }
        if (subCategoryName.length === 0) {
            handleErrorMessages('subCategoryName', 'Please input subcategory name.');
            err = true;
        }
        if (subCategoryIcon.bytes.length === 0) {
            handleErrorMessages('subCategoryIcon', 'Please select a subcategory icon.');
            err = true;
        }
        return err;
    };

    function handleImage(e) {
        handleErrorMessages('subCategoryIcon', null);
        setSubCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) });
    }

    const resetValue = () => {
        setCategoryId('');
        setSubCategoryName('');
        setSubCategoryIcon({ bytes: '', fileName: cart });
    };

    const handleSubmit = async () => {
        const err = validateData();
        if (!err) {
            setLoadingStatus(true);
            const formData = new FormData();
            formData.append('categoryid', categoryId);
            formData.append('subcategoryname', subCategoryName);
            formData.append('subcategoryicon', subCategoryIcon.bytes);
            formData.append('created_at', currentDate());
            formData.append('updated_at', currentDate());
            formData.append('user_admin', 'Farzi');

            const result = await postData('subcategory/subcategory_submit', formData);
            setLoadingStatus(false);
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: false
                });
                resetValue();
            } else {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
            }
        }
    };

    const handleReset = () => {
        resetValue();
    };

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.mainHeadingstyle}>
                            <img src={logo} className={classes.imageStyle} alt="Logo" />
                            <div className={classes.headingStyle}>
                                Sub Category Register
                            </div>
                            <div  style={{marginLeft:'auto'}}  >
           <img src='/display.png'  style={{ width:30,height:30}} onClick={()=>navigate('/dashboard/displayallsubcategory')}/>
           </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                       {/* <TextField
                            onFocus={() => handleErrorMessages('categoryId', null)}
                            error={!!errorMessages.categoryId}
                            helperText={errorMessages.categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            label="Category Id"
                            value={categoryId}
                            fullWidth
                        /> */ }
                        <FormControl fullWidth>
                            <InputLabel>Category Id</InputLabel>
                            <Select value={categoryId}
                            error={!!errorMessages.categoryId}
                            onFocus={() => handleErrorMessages('categoryId', null)}
                            label="Category Id"
                            onChange={(e)=>setCategoryId(e.target.value)}>
                                {fillCategory()}

                            </Select>
                            <FormHelperText> <div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onFocus={() => handleErrorMessages('subCategoryName', null)}
                            error={!!errorMessages.subCategoryName}
                            helperText={errorMessages.subCategoryName}
                            onChange={(e) => setSubCategoryName(e.target.value)}
                            label="SubCategory Name"
                            value={subCategoryName}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant="contained" component='label'>Upload
                                <input onChange={handleImage} hidden type="file" accept="image/*" />
                            </Button>
                            <div className={classes.errorMessageStyle}>
                                {errorMessages.subCategoryIcon}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar src={subCategoryIcon.fileName} style={{ width: 70, height: 70 }} variant="rounded" />
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <LoadingButton
                            loading={loadingStatus}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Save
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Button onClick={handleReset} variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
