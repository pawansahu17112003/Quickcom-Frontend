import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import {
  getData,
  serverURL,
  createDate,
} from "../../../services/FetchNodeAdminServices";
import { usersStyle } from "./ProductCss";
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
import { useNavigate } from "react-router-dom";

import {
  postData,
  currentDate,
} from "../../../services/FetchNodeAdminServices";

export default function DisplayAllProduct() {
  var navigate=useNavigate()
  const classes = usersStyle();
  const [productList, setProductList] = useState([]);
  const [open, setOpen] = useState(false);

  /************Product Actions******** */
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [productpicture, setProductpicture] = useState({
    bytes: "",
    fileName: cart,
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [hideUploadButton, setHideUploadButton] = useState(false);
  const [oldImage, setOldImage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

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
    if (productName.length == 0) {
      handleErrorMessages("productName", "Pls input Productname");
      err = true;
    }
    if (productDescription.length == 0) {
      handleErrorMessages(
        "productDescription",
        "Pls input Product Description"
      );
      err = true;
    }

    return err;
  };

  function handleImage(e) {
    handleErrorMessages("productpicture", null);
    setProductpicture({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setHideUploadButton(true);
  }

  const ProductForm = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingstyle}>
            <img src={logo} className={classes.imageStyle} />
            <div className={classes.headingStyle}>Product Register</div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Category Id</InputLabel>
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
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Subcategory Id</InputLabel>
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
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Brand Id</InputLabel>
            <Select
              value={brandId}
              error={errorMessages?.brandId}
              onFocus={() => handleErrorMessages("brandId", null)}
              label="Brand Id"
              onChange={(e) => setBrandId(e.target.value)}
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

        <Grid item xs={12}>
          <TextField
            onFocus={() => handleErrorMessages("productName", null)}
            error={errorMessages?.productName}
            helperText={errorMessages?.productName}
            onChange={(e) => setProductName(e.target.value)}
            label="Product Name"
            value={productName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onFocus={() => handleErrorMessages("productDescription", null)}
            error={errorMessages?.productDescription}
            helperText={errorMessages?.productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            label="Product Description"
            value={productDescription}
            fullWidth
          />
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
              {errorMessages?.productpicture != null ? (
                errorMessages?.productpicture
              ) : (
                <></>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={productpicture.fileName} variant="rounded"></Avatar>
        </Grid>
      </Grid>
    );
  };

  /***************** */

  const fetchAllProdcut = async () => {
    var result = await getData("product/display_all_product");
    if (result.status) {
      setProductList(result.data);
    } else {
      alert(result.message);
    }
  };
  useEffect(function () {
    fetchAllProdcut();
  }, []);

  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid);
    fetchAllSubCategory(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid);
    fetchAllBrand(rowData.subcategoryid)
    setBrandId(rowData.brandid);
    setProductId(rowData.productid);
    setProductName(rowData.productname);
    setProductDescription(rowData.productdescription);
    setProductpicture({
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
        productname: productName,
        productdescription: productDescription,
        created_at: currentDate(),
        user_admin: "Farzi",
        productid: productId,
      };

      var result = await postData("product/edit_product_data", body);
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
    fetchAllProdcut();
  };

  const handleEditPicture = async () => {
    setLoadingStatus(true);
    var formData = new FormData(); //jb image bhjna ho tabki iska use krege otherwise use nhi krege.//
    formData.append("productpicture", productpicture.bytes);
    formData.append("updated_at", currentDate());
    formData.append("user_admin", "Farzi");
    formData.append("productid", productId);

    var result = await postData("product/edit_product_picture", formData);
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

    fetchAllProdcut();
  };

  const productDelete = async () => {
    setLoadingStatus(true);
    var body = { productid: productId };

    var result = await postData("product/delete_product", body);
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

    fetchAllProdcut();
  };

  const handleDeleteproduct = async () => {
    Swal.fire({
      title: "Do you want to delete the Product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        productDelete();
      } else if (result.isDenied) {
        Swal.fire("Product not delete", "", "info");
      }
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleCancelPicture = () => {
    setProductpicture({ bytes: "", fileName: oldImage });
    setHideUploadButton(false);
  };

  const productDialog = () => {
    return (
      <div>
        <Dialog open={open}>
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
          <DialogContent>{ProductForm()}</DialogContent>
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
            <Button onClick={handleDeleteproduct} variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  /*************Table_displaycategory*********** */
  function productTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="Product List"
            columns={[
               { title: " Id's",
                render: (rowData) => (
                  <div style={{ display: "flex", flexDirection: "column",  fontSize:13}}>
                    <div>{rowData.categoryname}/{rowData.subcategoryname}</div>
                    <div>{rowData.brandname}/{rowData.productname}</div>
                  </div>
                  ) 
               },
              { title: "Product Name", field: "productname" },
              { title: "Product Description", field: "productdescription" },
              {
                title: "Created At",
                render: (rowData) => (
                  <div style={{ display: "flex", flexDirection: "column",fontSize:10 }}>
                    <div>{createDate(rowData.created_at)}</div>
                    <div>{createDate(rowData.updated_at)}</div>
                  </div>
                ),
              },
              { title: "Admin", field: "user_admin" },
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
            data={productList}
            options={{
              pageSize: 3,
              pageSizeOptions: [
                3,
                5,
                10,
                { value: productList.length, label: "All" },
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
              tooltip: ' Add Product',
              isFreeAction: true,
              onClick: (event) => navigate('/dashboard/product')
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
      {productTable()}
      {productDialog()}
    </div>
  );
}
