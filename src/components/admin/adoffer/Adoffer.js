import { userStyle } from "./AdofferCss";
import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Button, Grid, TextField, Avatar } from "@mui/material"
import logo from "../../../assets/logo.png"
import cart from "../../../assets/cart.png"
import { useState, useEffect } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import { postData, currentDate, getData, createDate } from "../../../services/FetchNodeAdminServices";


export default function Adoffer(props) {
            var classes = userStyle()

            const [categoryId, setCategoryId] = useState('')
            const [subcategoryId, setSubcategoryId] = useState('')
            const [brandId, setBrandId] = useState('')
            const [productId, setProductId] = useState('')
            const [productdetailId, setProductdetailId] = useState('')

            //const [adofferId,setAdofferId]=useState('')
            const [filenames, setFilenames] = useState({ bytes: [], fileName: cart })

            const [errorMessages, setErrorMessages] = useState({})
            const [loadingStatus, setLoadingStatus] = useState(false)

            const [categoryList, setCategoryList] = useState([])
            const [subcategoryList, setSubcategoryList] = useState([])
            const [brandList, setBrandList] = useState([])
            const [productList, setProductList] = useState([])
            const [productdetailList, setProductdetailList] = useState([])

/******************************Category************************************/

const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category')
    setCategoryList(result.data)
}

useEffect(function () {
    fetchAllCategory()
}, [])

const fillCategory = () => {
    return categoryList.map((item) => {
        return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
    })
}

 /********************************Subcategory**************************************/


 const fetchAllSubcategory = async (cid) => {
    var body = { categoryid: cid }
    var result = await postData('subcategory/get_all_subcategory_by_categoryid', body)
    setSubcategoryList(result.data)
}


const handleSubcategory = (cid) => {
    setCategoryId(cid)
    fetchAllSubcategory(cid)
}

const fillSubcategory = () => {
    return subcategoryList.map((item) => {
        return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)
    })
}

 /********************************Brand***********************************/

 const fetchAllBrand = async (scid) => {
    var body = { subcategoryid: scid }
    var result = await postData('brand/get_all_brand_by_subcategoryid', body)
    setBrandList(result.data)
}


const handleBrand = (scid) => {
    setSubcategoryId(scid)
    fetchAllBrand(scid)
}

const fillBrand = () => {
    return brandList.map((item) => {
        return (<MenuItem value={item.brandid}>{item.brandname}</MenuItem>)
    })
}

/*********************************Product*******************************************/
const fetchAllProduct = async (brid) => {
    var body = { brandid: brid }
    var result = await postData('product/get_all_product_by_brandid', body)
    setProductList(result.data)
}


const handleProduct = (brid) => {
    setBrandId(brid)
    fetchAllProduct(brid)
}

const fillProduct = () => {
    return productList.map((item) => {
        return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
    })
}

/****************************************Productdetail**********************************************/
const fetchAllProductdetail = async (pid) => {
    var body = { productid: pid }
    var result = await postData('productdetail/get_all_productdetail_by_productid', body)
    setProductdetailList(result.data)
}


const handleProductdetail = (pid) => {
    setProductId(pid)
    fetchAllProductdetail(pid)
}

const fillProductdetail = () => {
    return productdetailList.map((item) => {
        return (<MenuItem value={item.productdetailid}>{item.productdetailname}</MenuItem>)
    })
}


/*********************************************************************************************/

const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
}

const showThumbnails = () => {
    return filenames?.bytes?.map((item) => {
        return (<div style={{ margin: 2, width: 30, height: 30, borderRadius: 5 }}><img src={URL.createObjectURL(item)} style={{ width: 30, height: 30 }} /></div>)
    })
}

const handleImage = (e) => {
     console.log("xxxxxxxxxxxxxxxx", e.target.files)
    handleErrorMessages('filenames', null)
    setFilenames({ bytes: Object.values(e.target.files), /*fileName: URL.createObjectURL(e.target.files[0]) THIS fileName not use in working*/ })
}

const validateData = () => {
        var err = false
    if (filenames.bytes.length === 0) {
        handleErrorMessages('filenames', "Pls input filenames..")
        err = true
    }

    if (categoryId.length === 0) {
        handleErrorMessages('categoryId', "Pls input categoryId..")
        err = true
    }

    if (subcategoryId.length === 0) {
        handleErrorMessages('subcategoryId', "Pls input subcategoryId..")
        err = true
    }

    if (brandId.length === 0) {
        handleErrorMessages('brandId', "Pls input brandId..")
        err = true
    }

    if (productId.length === 0) {
        handleErrorMessages('productId', "Pls input productId..")
        err = true
    }

    if (productdetailId.length === 0) {
        handleErrorMessages('productdetailId', "Pls input productdetailId..")
        err = true
    }

    return err
}


const resetValue = () => {
    setCategoryId('')
    setSubcategoryId('')
    setBrandId('')
    setProductId('')
    setProductdetailId('')

    setFilenames({ bytes: [], fileName: cart })

}



const handleSubmit = async () => {

    var err = validateData()

    if (err === false) {
        setLoadingStatus(true)
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryid', subcategoryId)
        formData.append('brandid', brandId)
        formData.append('productid', productId)
        formData.append('productdetailid', productdetailId)

        //formData.append('filenames',filenames.bytes)

        filenames?.bytes?.map((item, i) => {
            formData.append('picture' + i, item)
        })

        formData.append('created_at', currentDate())
        formData.append('updated_at', currentDate())
        formData.append('user_admin', 'Frazi')

        var result = await postData('adoffers/adoffers_submit', formData)
        if (result.status) {
            Swal.fire({
                //  position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: false
            });
        }
        else {
            Swal.fire({
                // position: "top-end",
                icon: "Error",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }

        setLoadingStatus(false)
        resetValue()
    }
}


const handleReset = () => {
    resetValue()
}



return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className={classes.mainHeadingstyle}>
                        <img src={logo} className={classes.imageStyle} />

                        <div className={classes.headingStyle}>
                            Adoffers Register
                        </div>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    {/* <TextField  onFocus={()=>handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onChange={(e)=>setCategoryId(e.target.value)} label="Category Id" value={categoryId} fullWidth /> */}

                    <FormControl fullWidth>
                        {errorMessages?.categoryId ? <InputLabel><div className={classes.errorMessageStyle}>Category</div></InputLabel> : <InputLabel>Category</InputLabel>}
                        <Select value={categoryId}
                            onFocus={() => handleErrorMessages('categoryId', null)}
                            error={errorMessages?.categoryId}
                            label="Category"
                            onChange={(e) => handleSubcategory(e.target.value)}>

                            {fillCategory()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                    </FormControl>

                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        {errorMessages?.subcategoryId ? <InputLabel><div className={classes.errorMessageStyle}>Subcategory</div></InputLabel> : <InputLabel>Subcategory</InputLabel>}
                        <Select value={subcategoryId}
                            onFocus={() => handleErrorMessages('subcategoryId', null)}
                            error={errorMessages?.subcategoryId}
                            label="Subcategory"
                            onChange={(e) => handleBrand(e.target.value)}>

                            {fillSubcategory()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.subcategoryId}</div></FormHelperText>
                    </FormControl>

                </Grid>

                <Grid item xs={2}>
                    <FormControl fullWidth>
                        {errorMessages?.brandId ? <InputLabel><div className={classes.errorMessageStyle}>Brand</div></InputLabel> : <InputLabel>Brand</InputLabel>}
                        <Select value={brandId}
                            onFocus={() => handleErrorMessages('brandId', null)}
                            error={errorMessages?.brandId}
                            label="Brand"
                            onChange={(e) => handleProduct(e.target.value)}>

                            {fillBrand()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.brandId}</div></FormHelperText>
                    </FormControl>

                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        {errorMessages?.productId ? <InputLabel><div className={classes.errorMessageStyle}>Product</div></InputLabel> : <InputLabel>Product</InputLabel>}
                        <Select value={productId}
                            onFocus={() => handleErrorMessages('productId', null)}
                            error={errorMessages?.productId}
                            label="Product"
                            onChange={(e) => handleProductdetail(e.target.value)}>

                            {fillProduct()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.productId}</div></FormHelperText>
                    </FormControl>

                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        {errorMessages?.productdetailId ? <InputLabel><div className={classes.errorMessageStyle}>Product Detail</div></InputLabel> : <InputLabel>Product Detail</InputLabel>}
                        <Select value={productdetailId}
                            onFocus={() => handleErrorMessages('productdetailId', null)}
                            error={errorMessages?.productdetailId}
                            label="Product Detail"
                            onChange={(e) => setProductdetailId(e.target.value)}>

                            {fillProductdetail()}

                        </Select>
                        <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.productdetailId}</div></FormHelperText>
                    </FormControl>

                </Grid>


                <Grid item xs={6} className={classes.center}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" component="label" style={{ width: '100px' }}>Upload
                            <input onChange={handleImage} hidden style={{ width: '100px' }} type="file" accept="image/*" multiple />
                        </Button>
                        <div className={classes.errorMessageStyle}>{errorMessages?.filenames != null ? errorMessages?.filenames : <></>}</div>

                    </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <div style={{ display: 'flex' }}>
                        {showThumbnails()}
                    </div>

                </Grid>

                <Grid item xs={6} className={classes.center}>
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
                <Grid item xs={6} className={classes.center}>
                    <Button onClick={handleReset} variant="contained" style={{ width: '100px' }}>Reset
                    </Button>
                </Grid>

                
            </Grid>
        </div>
    </div>)

}
