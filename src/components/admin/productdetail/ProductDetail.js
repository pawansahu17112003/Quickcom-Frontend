import {
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";

import { usersStyle } from "./ProductDetailCss";
import {
  postData,
  currentDate,
  getData,
} from "../../../services/FetchNodeAdminServices";
import { Form } from "react-router-dom";
import { useEffect } from "react";
export default function ProductDetail(props) {
  var navigate=useNavigate()
  var classes = usersStyle();
  const [value, setValue] = useState('');

  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productId, setProductId] = useState("");

  const [productDetailName, setProductDetailName] = useState("");
  const [weight, setWeight] = useState("");
  const [weightType, setWeightType] = useState("");
  const [packagingType, setPackagingType] = useState("");
  const [noofqty, setNoofQty] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [offerType, setOfferType] = useState("");
  const [productStatus, setProductStatus] = useState("");

  const [productDetailDescription, setProductDetailDescription] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [picture, setPicture] = useState({
    bytes: "",
    fileName: cart,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [productList, setProductList] = useState([]);

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
    if (productDetailName.length == 0) {
      handleErrorMessages("productDetailName", "Pls input product Detail Name");
      err = true;
    }
    if (weight.length == 0) {
      handleErrorMessages("weight", "Pls input weight");
      err = true;
    }
    if (weightType.length == 0) {
      handleErrorMessages("weightType", "Pls input  weight Type");
      err = true;
    }
    if (packagingType.length == 0) {
      handleErrorMessages("packagingType", "Pls input Packaging Type");
      err = true;
    }
    if (noofqty.length == 0) {
      handleErrorMessages("noofqty", "Pls input no of qty");
      err = true;
    }
    if (stock.length == 0) {
      handleErrorMessages("stock", "Pls input stock ");
      err = true;
    }
    if (price.length == 0) {
      handleErrorMessages("price", "Pls input price");
      err = true;
    }
    if (offerPrice.length == 0) {
      handleErrorMessages("offerPrice", "Pls input offerprice");
      err = true;
    }
    if (offerType.length == 0) {
      handleErrorMessages("offerType", "Pls input offertype");
      err = true;
    }
    if (productStatus.length == 0) {
      handleErrorMessages("productStatus", "Pls input product Status");
      err = true;
    }

    if (productDetailDescription.length == 0) {
      handleErrorMessages(
        "productDetailDescription",
        "Pls input Product Detail Description"
      );
      err = true;
    }
    if (picture.bytes.length == 0) {
      handleErrorMessages("picture", "Pls upload Picture");
      err = true;
    }
    return err;
  };

  function handleImage(e) {
    handleErrorMessages("picture", null);
    setPicture({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
  }
  const resetValue = () => {
    setCategoryId("");
    setSubCategoryId("");
    setBrandId("");
    setProductId("");
    setProductDetailName("");
    setWeight("");
    setWeightType("");
    setPackagingType("");
    setNoofQty("");
    setStock("");
    setPrice("");
    setOfferPrice("");
    setOfferType("");
    setProductStatus("");
    setProductDetailDescription("");
    setPicture({ bytes: "", fileName: cart });
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
      formData.append("productdetailname", productDetailName);
      formData.append("weight", weight);
      formData.append("weighttype", weightType);
      formData.append("packagingtype", packagingType);
      formData.append("noofqty", noofqty);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("offerprice", offerPrice);
      formData.append("offertype", offerType);
      formData.append("productstatus", productStatus);
      formData.append("productdetaildescription", productDetailDescription);
      formData.append("picture", picture.bytes);
      formData.append("created_at", currentDate());
      formData.append("updated_at", currentDate());
      formData.append("user_admin", "Farzi");

      var result = await postData(
        "productdetail/productdetail_submit",
        formData
      );
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
      resetValue();
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
              <div className={classes.headingStyle}>Product Register</div>
              <div  style={{marginLeft:'auto'}}  >
           <img src='/display.png'  style={{ width:30,height:30}} onClick={()=>navigate('/dashboard/displayallproductdetail')}/>
           </div>
            </div>
          </Grid>
          <Grid item xs={3}>
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
              <InputLabel>SubCategory</InputLabel>
              <Select
                value={subcategoryId}
                error={errorMessages?.subcategoryId}
                onFocus={() => handleErrorMessages("subcategoryId", null)}
                label="SubCategory"
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
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                value={brandId}
                error={errorMessages?.brandId}
                onFocus={() => handleErrorMessages("brandId", null)}
                label="Brand"
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
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={productId}
                error={errorMessages?.productId}
                onFocus={() => handleErrorMessages("productId", null)}
                label="Product"
                onChange={(e) => setProductId(e.target.value)}
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
          <Grid item xs={8}>
            <TextField
              onFocus={() => handleErrorMessages("productDetailName", null)}
              error={errorMessages?.productDetailName}
              helperText={errorMessages?.productDetailName}
              onChange={(e) => setProductDetailName(e.target.value)}
              label="Product Detail Name"
              value={productDetailName}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Product Status</InputLabel>
              <Select
                value={productStatus}
                error={errorMessages?.productStatus}
                onFocus={() => handleErrorMessages("productStatus", null)}
                label="Product Status"
                onChange={(e) => setProductStatus(e.target.value)}
              >
                <MenuItem value="Trending">Trending</MenuItem>
                <MenuItem value="Popular">Popular</MenuItem>
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.productStatus}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              onFocus={() => handleErrorMessages("weight", null)}
              error={errorMessages?.weight}
              helperText={errorMessages?.weight}
              onChange={(e) => setWeight(e.target.value)}
              label="Weight"
              value={weight}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Weight Type</InputLabel>
              <Select
                value={weightType}
                error={errorMessages?.weightType}
                onFocus={() => handleErrorMessages("weightType", null)}
                label="Weight Type"
                onChange={(e) => setWeightType(e.target.value)}
              >
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="gm">gm</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="l">li</MenuItem>
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.weightType}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Packaging Type</InputLabel>
              <Select
                value={packagingType}
                error={errorMessages?.packagingType}
                onFocus={() => handleErrorMessages("packagingType", null)}
                label="Packaging Type"
                onChange={(e) => setPackagingType(e.target.value)}
              >
                <MenuItem value="plastic">Plastic</MenuItem>
                <MenuItem value="glass">Glass</MenuItem>
                <MenuItem value="paper">Paper</MenuItem>
                <MenuItem value="metal">Metal</MenuItem>
                <MenuItem value="plasticbag">Plastic Bag</MenuItem>
                <MenuItem value="Polyethylene">Polyethylene</MenuItem>
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.packagingType}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              onFocus={() => handleErrorMessages("noofqty", null)}
              error={errorMessages?.noofqty}
              helperText={errorMessages?.noofqty}
              onChange={(e) => setNoofQty(e.target.value)}
              label="No of Qty"
              value={noofqty}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              onFocus={() => handleErrorMessages("stock", null)}
              error={errorMessages?.stock}
              helperText={errorMessages?.stock}
              onChange={(e) => setStock(e.target.value)}
              label="Stock"
              value={stock}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              onFocus={() => handleErrorMessages("price", null)}
              error={errorMessages?.price}
              helperText={errorMessages?.price}
              onChange={(e) => setPrice(e.target.value)}
              label="Price"
              value={price}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              onFocus={() => handleErrorMessages("offerprice", null)}
              error={errorMessages?.offerPrice}
              helperText={errorMessages?.offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              label="Offer Price"
              value={offerPrice}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Offer Type</InputLabel>
              <Select
                value={offerType}
                error={errorMessages?.offerType}
                onFocus={() => handleErrorMessages("offerType", null)}
                label="Offer Type"
                onChange={(e) => setOfferType(e.target.value)}
              >
                <MenuItem value="Holi Sale">Holi Sale</MenuItem>
                <MenuItem value="Diwali Sale">Diwali Sale</MenuItem>
                <MenuItem value="Dashera Sale">Dashera Sale</MenuItem>
                <MenuItem value="NewYear Sale">NewYear Sale</MenuItem>
                <MenuItem value="Navratri Sale">Navratri Sale</MenuItem>
                <MenuItem value="Rakshabandhan Sale">Rakshabandhan Sale</MenuItem>
              </Select>
              <FormHelperText>
                <div className={classes.errorMessagestyle}>
                  {errorMessages?.offerType}
                </div>
              </FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
           {/*<TextField
              onFocus={() =>
                handleErrorMessages("productDetailDescription", null)
              }
              error={errorMessages?.productDetailDescription}
              helperText={errorMessages?.productDetailDescription}
              onChange={(e) => setProductDetailDescription(e.target.value)}
              label="Product Detail Description"
              value={productDetailDescription}
              fullWidth
            />*/}
             <ReactQuill
               placeholder="Product Description"
               modules={{
                 toolbar: {
                   container: [
                     [{ header: "1" }, { header: "2" }, { font: [] }],
                     [{ size: [] }],
                     ["bold", "italic", "underline", "strike", "blockquote"],
                     [
                       { list: "ordered" },
                       { list: "bullet" },
                       { indent: "-1" },
                       { indent: "+1" },
                     ],
                     ["link", "image", "video"],
                     ["code-block"],
                     ["clean"],
                   ],
                 },
                 clipboard: {
                   matchVisual: false,
                 },
               }}
               formats={[
                 "header",
                 "font",
                 "size",
                 "bold",
                 "italic",
                 "underline",
                 "strike",
                 "blockquote",
                 "list",
                 "bullet",
                 "indent",
                 "link",
                 "image",
                 "video",
                 "code-block",
               ]}
             
             theme="snow" value={productDetailDescription} onChange={setProductDetailDescription} />
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
                {errorMessages?.picture != null ? (
                  errorMessages?.picture
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Avatar src={picture.fileName} variant="rounded"></Avatar>
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
