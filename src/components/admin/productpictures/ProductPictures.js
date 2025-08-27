import {
  TextField,
  Avatar,
  Grid,
  FormHelperText,
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import Swal from "sweetalert2";
import { usersStyle } from "./ProductPicturesCss";
import {
  postData,
  getData,
  currentDate,
} from "../../../services/FetchNodeAdminServices";
import { useEffect } from "react";
export default function ProductPictures(props) {
  var classes = usersStyle();

  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productId, setProductId] = useState("");
  const [productdetailId, setProductDetailId] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [filenames, setFilenames] = useState({
    bytes: [],
    fileName: cart,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productdetailList, setProductDetailList] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryList(result.data);
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fillCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fillSubCategory = () => {
    return subcategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  const handleSubcategory = (cid) => {
    setCategoryId(cid);
    fetchAllSubCategory(cid);
  };

  const fetchAllSubCategory = async (cid) => {
    var body = { categoryid: cid };
    var result = await postData(
      "subcategory/get_all_subcategory_by_categoryid",
      body
    );
    setSubCategoryList(result.data);
  };

  const fillBrand = () => {
    return brandList.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };

  const handleBrand = (sid) => {
    setSubCategoryId(sid);
    fetchAllBrand(sid);
  };

  const fetchAllBrand = async (sid) => {
    var body = { subcategoryid: sid };
    var result = await postData("brand/get_all_brand_by_subcategoryid", body);
    setBrandList(result.data);
  };

  const fillProduct = () => {
    return productList.map((item) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };

  const handleProduct = (bid) => {
    setBrandId(bid);
    fetchAllProduct(bid);
  };

  const fetchAllProduct = async (bid) => {
    var body = { brandid: bid };
    var result = await postData("product/get_all_product_by_brandid", body);
    setProductList(result.data);
  };

  const fillProductDetail = () => {
    return productdetailList.map((item) => {
      return (
        <MenuItem value={item.productdetailid}>
          {item.productdetailname}
        </MenuItem>
      );
    });
  };

  const handleProductDetail = (pid) => {
    setProductId(pid);
    fetchAllProductDetail(pid);
  };

  const fetchAllProductDetail = async (pid) => {
    var body = { productid: pid };
    var result = await postData(
      "productdetail/get_all_productdetail_by_productid",
      body
    );
    setProductDetailList(result.data);
  };

  const handleErrorMessages = (label, message) => {
    var msg = errorMessages;
    msg[label] = message;
    setErrorMessages((prev) => ({ ...prev, ...msg }));
  };
  const validateData = () => {
    var err = false;
    if (categoryId.length == 0) {
      handleErrorMessages("categoryId", "Pls input Categoryid");
      err = true;
    }
    if (subcategoryId.length == 0) {
      handleErrorMessages("subcategoryId", "Pls input SubCategoryid");
      err = true;
    }
    if (brandId.length == 0) {
      handleErrorMessages("brandId", "Pls input Brandid");
      err = true;
    }
    if (productId.length == 0) {
      handleErrorMessages("productId", "Pls input Productid");
      err = true;
    }
    if (productdetailId.length == 0) {
      handleErrorMessages("productdetailId", "Pls input product Detail Id");
      err = true;
    }
    if (filenames.bytes.length == 0) {
      handleErrorMessages("filenames", "Pls upload Picture");
      err = true;
    }
    return err;
  };

  const showThumbnails=()=>{
    return filenames?.bytes?.map((item)=>{
     return(<div style={{margin:2,width:30, height:30,borderRadius:5}}><img src={URL.createObjectURL(item)}  style={{width:30,height:30}} /></div>)

    })


  }
  function handleImage(e) {
    
    handleErrorMessages("filenames", null);
    console.log("xxxxxxxxxxxxxxxxxx",e.target.files) 
    setFilenames({
      bytes: Object.values(e.target.files),
      fileName: URL.createObjectURL(e.target.files[0]),
    });
  }

  const resetValue = () => {
    setCategoryId("");
    setSubCategoryId("");
    setBrandId("");
    setProductId("");
    setProductDetailId("");
    setFilenames({ bytes: "", fileName: cart });
  };
  const handleSubmit = async () => {
    var err = validateData();
    if (err == false) {
      setLoadingStatus(true);
      var formData = new FormData(); //jb image bhjna ho tabki iska use krege otherwise use nhi krege.//
      formData.append("categoryid", categoryId);
      formData.append("subcategoryid", subcategoryId);
      formData.append("brandid", brandId);
      formData.append("productid", productId);
      formData.append("productdetailid", productdetailId);
      filenames?.bytes?.map((item,i)=>{
      formData.append('picture'+i,item)
      })
     
      formData.append("created_at", currentDate());
      formData.append("updated_at", currentDate());
      formData.append("user_admin", "Farzi");

      console.log(formData)

      var result = await postData(
        "productpictures/productpicture_submit",formData);
      if (result.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
      setLoadingStatus(false);
      // resetValue();
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
              <img src={logo} className={classes.imageStyle} />
              <div className={classes.headingStyle}>
                Product Picture Register
              </div>
             
            </div>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryId}
                error={errorMessages?.categoryId}
                onFocus={() => handleErrorMessages("categoryId", null)}
                label="Category Id"
                onChange={(e) => handleSubcategory(e.target.value)}
              >
                {fillCategory()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.categoryId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={subcategoryId}
                error={errorMessages?.subcategoryId}
                onFocus={() => handleErrorMessages("subcategoryId", null)}
                label="Subcategory Id"
                onChange={(e) => handleBrand(e.target.value)}
              >
                {fillSubCategory()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.subcategoryId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                value={brandId}
                error={errorMessages?.brandId}
                onFocus={() => handleErrorMessages("brandId", null)}
                label="Brand Id"
                onChange={(e) => handleProduct(e.target.value)}
              >
                {fillBrand()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.brandId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={productId}
                error={errorMessages?.productId}
                onFocus={() => handleErrorMessages("productId", null)}
                label="Product Id"
                onChange={(e) => handleProductDetail(e.target.value)}
              >
                {fillProduct()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.productId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Product Detail</InputLabel>
              <Select
                value={productdetailId}
                error={errorMessages?.productdetailId}
                onFocus={() => handleErrorMessages("productdetailId", null)}
                label="Product Detail Id"
                onChange={(e) => setProductDetailId(e.target.value)}
              >
                {fillProductDetail()}
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.productdetailId}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button variant="contained" component="label">
                Upload
                <input
                  onChange={handleImage}
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                />
              </Button>
              <div className={classes.errorMessagestyle}>
                {errorMessages?.filenames != null ? (
                  errorMessages?.filenames
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <div style={{display:'flex'}}>
            {showThumbnails()}
            </div> 
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
            <Button onClick={handleReset} variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
