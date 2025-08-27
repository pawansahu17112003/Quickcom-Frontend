import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import {
  getData,
  serverURL,
  createDate,
} from "../../../services/FetchNodeAdminServices";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { usersStyle } from "./ProductDetailCss";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
  IconButton,
  Grid,
  TextField,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";
import SaveIcon from "@mui/icons-material/Save";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import {
  postData,
  currentDate,
} from "../../../services/FetchNodeAdminServices";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProductDetail() {
  var navigate=useNavigate()
  const classes = usersStyle();
  const [productDetailList, setProducDetailtList] = useState([]);
  const [open, setOpen] = useState(false);

  /************Product Actions******** */
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productId, setProductId] = useState("");
  const [productDetailId, setProductDetailId] = useState("");
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
  const [hideUploadButton, setHideUploadButton] = useState(false);
  const [oldImage, setOldImage] = useState("");
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

  const showSaveCancelButt = () => {
    return (
      <div>
        <Button onClick={handleEditPicture}>Save</Button>
        <Button onClick={handleCancelPicture}>Cancel</Button>
      </div>
    );
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

    return err;
  };

  function handleImage(e) {
    handleErrorMessages("picture", null);
    setPicture({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setHideUploadButton(true);
  }

  const ProductDetailForm = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingstyle}>
            <img src={logo} className={classes.imageStyle} />
            <div className={classes.headingStyle}>Product Register</div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>Category </InputLabel>
            <Select
              value={categoryId}
              error={errorMessages?.categoryId}
              onFocus={() => handleErrorMessages("categoryId", null)}
              label="Category "
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
            <InputLabel>Subcategory </InputLabel>
            <Select
              value={subcategoryId}
              error={errorMessages?.subcategoryId}
              onFocus={() => handleErrorMessages("subcategoryId", null)}
              label="Subcategory "
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
            <InputLabel>Brand </InputLabel>
            <Select
              value={brandId}
              error={errorMessages?.brandId}
              onFocus={() => handleErrorMessages("brandId", null)}
              label="Brand "
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
            <InputLabel>Product </InputLabel>
            <Select
              value={productId}
              error={errorMessages?.productId}
              onFocus={() => handleErrorMessages("productId", null)}
              label="Product "
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
              <MenuItem value="kg">Kilogram</MenuItem>
              <MenuItem value="gm">gram</MenuItem>
              <MenuItem value="ml">mililiter</MenuItem>
              <MenuItem value="l">liter</MenuItem>
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
              label="Weight Type"
              onChange={(e) => setPackagingType(e.target.value)}
            >
              <MenuItem value="Plastic">Plastic</MenuItem>
              <MenuItem value="Glass">Glass</MenuItem>
              <MenuItem value="Paper">Paper</MenuItem>
              <MenuItem value="Metal">Metal</MenuItem>
              <MenuItem value="Plasticbag">Plastic Bag</MenuItem>
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
            label="No Of Qty"
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
              <MenuItem value="Holi Sale">HoliSale</MenuItem>
              <MenuItem value="Diwali Sale">DiwaliSale</MenuItem>
              <MenuItem value="Dashera Sale">DasheraSale</MenuItem>
              <MenuItem value="NewYear Sale">NewYearSale</MenuItem>
              <MenuItem value="Navratri Sale">NavratriSale</MenuItem>
              <MenuItem value="Rakshabandhan Sale">RakshabandhanSale</MenuItem>
            </Select>
            <FormHelperText>
              <div className={classes.errorMessagestyle}>
                {errorMessages?.offerType}
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
       
        <Grid item xs={12}>
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
            {hideUploadButton ? (
              <div>{showSaveCancelButt()}</div>
            ) : (
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
            )}
            <div className={classes.errorMessagestyle}>
              {errorMessages?.picture != null ? errorMessages?.picture : <></>}
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={picture.fileName} variant="rounded"></Avatar>
        </Grid>
      </Grid>
    );
  };

  /***************** */

  const fetchAllProdcutDetail = async () => {
    var result = await getData("productdetail/display_all_productdetail");
    if (result.status) {
      setProducDetailtList(result.data);
    } else {
      alert(result.message);
    }
  };
  useEffect(function () {
    fetchAllProdcutDetail();
  }, []);

  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid);
    fetchAllSubCategory(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid);
    fetchAllBrand(rowData.subcategoryid)
    setBrandId(rowData.brandid);
    fetchAllProduct(rowData.brandid);
    setProductId(rowData.productid);
    setProductDetailId(rowData.productdetailid);
    setProductDetailName(rowData.productdetailname);
    setWeight(rowData.weight);
    setWeightType(rowData.weighttype);
    setPackagingType(rowData.packagingtype);
    setNoofQty(rowData.noofqty);
    setStock(rowData.stock);
    setPrice(rowData.price);
    setOfferPrice(rowData.offerprice);
    setOfferType(rowData.offertype);
    setProductStatus(rowData.productstatus);
    setProductDetailDescription(rowData.productdetaildescription);
    setPicture({
      bytes: "",
      fileName: `${serverURL}/images/${rowData.picture}`,
    });
    setOldImage(`${serverURL}/images/${rowData.picture}`);
    setOpen(true);
  };

  const handleEditData = async () => {
    var err = validateData();
    if (err == false) {
      setLoadingStatus(true);
      var body = {
        categoryid: categoryId,
        subcategoryid: subcategoryId,
        brandid: brandId,
        productid: productId,
        productdetailname: productDetailName,
        weight: weight,
        weighttype: weightType,
        packagingtype: packagingType,
        noofqty: noofqty,
        stock:stock,
        price:price,
        offerprice: offerPrice,
        offertype: offerType,
        productstatus:productStatus,
        productdetaildescription:productDetailDescription,
        created_at: currentDate(),
        user_admin :"Farzi",
        productdetailid: productDetailId,
      };

      var result = await postData("productdetail/edit_productdetail_data", body);
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
    }
    fetchAllProdcutDetail();
  };

  const handleEditPicture = async () => {
    setLoadingStatus(true);
    var formData = new FormData(); //jb image bhjna ho tabki iska use krege otherwise use nhi krege.//
    formData.append("picture", picture.bytes);
    formData.append("updated_at", currentDate());
    formData.append("user_admin", "Farzi");
    formData.append("productdetailid", productDetailId);

    var result = await postData("productdetail/edit_productdetail_picture", formData);
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
    setHideUploadButton(false);

    fetchAllProdcutDetail();
  };

  const productDetailDelete = async () => {
    setLoadingStatus(true);
    var body = { productdetailid: productDetailId };

    var result = await postData("productdetail/delete_productdetail", body);
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
    setHideUploadButton(false);

    fetchAllProdcutDetail();
  };

  const handleDeleteProductDetail = async () => {
    Swal.fire({
      title: "Do you want to delete the Product Details?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        productDetailDelete();
      } else if (result.isDenied) {
        Swal.fire("Product not delete", "", "info");
      }
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleCancelPicture = () => {
    setPicture({ bytes: "", fileName: oldImage });
    setHideUploadButton(false);
  };

  const productDetailDialog = () => {
    return (
      <div>
        <Dialog open={open} maxWidth="md">
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>{ProductDetailForm()}</DialogContent>
          <DialogActions>
            <LoadingButton
              loading={loadingStatus}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleEditData}
            >
              Edit
            </LoadingButton>
            <Button onClick={handleDeleteProductDetail} variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  /*************Table_displaycategory*********** */
  function productDetailTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="ProductDetail List"
            columns={[
              { title: "Id", field: "productdetailid" },
              { title: "Id's",
                render: (rowData) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{rowData.categoryname}/{rowData.subcategoryname}</div>
                    <div>{rowData.brandname}/{rowData.productname}</div>
                  </div>
                ),
              },
              { title: "Product Name", field: "productdetailname" },
              { title: "About",
                render: (rowData) => (
                  <div style={{ display: "flex", flexDirection: "column",fontSize:10 }}>
                    <div>{rowData.weight}{rowData.weighttype}</div>
                    <div>{rowData.packagingtype}[{rowData.noofqty} Qty.]</div>
                    <div>Stock:{rowData.stock}</div>
                    <div><s>{rowData.price}</s>{rowData.offerprice}</div>
                    <div>{rowData.offertype}{rowData.productstatus}</div>
                  </div>
                ),
              },
             
              
              {
                title: "Icon",
                render: (rowData) => (
                  <div>
                    <img
                      src={`${serverURL}/images/${rowData.picture}`}
                      style={{ width: 60, height: 60, borderRadius: 6 }}
                    />
                  </div>
                ),
              },
            ]}
            data={productDetailList}
            options={{
              pageSize: 3,
              pageSizeOptions: [
                3,
                5,
                10,
                { value: productDetailList.length, label: "All" },
              ],
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Product",
                onClick: (event, rowData) => handleOpenDialog(rowData),
              },
              {
                icon: 'add',
              tooltip: ' Add ProductDetail',
              isFreeAction: true,
              onClick: (event) => navigate('/dashboard/productdetail')
              }
            ]}
          />
        </div>
      </div>
    );
  }
  /************************* */

  return (
    <div>
      {productDetailTable()}
      {productDetailDialog()}
    </div>
  );
}
