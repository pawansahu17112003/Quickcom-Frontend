import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import {
  getData,
  serverURL,
  createDate,
} from "../../../services/FetchNodeAdminServices";
import { userStyle } from '../brand/BrandCss'
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

export default function DisplayAllBrand() {
  var navigate=useNavigate()
  const classes = userStyle();
  const [brandList, setBrandList] = useState([]);
  const [open, setOpen] = useState(false);

  /************Brand Actions******** */
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandName, setBrandName] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [brandIcon, setBrandIcon] = useState({ bytes: "", fileName: cart });
  const [errorMessages, setErrorMessages] = useState({});
  const [hideUploadButton, setHideUploadButton] = useState(false);
  const [oldImage, setOldImage] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
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

  const handleErrorMessages = (label, message) => {
    var msg = errorMessages;
    msg[label] = message;
    setErrorMessages((prev) => ({ ...prev, ...msg }));
  };

  const showSaveCancelButt = () => {
    return (
      <div>
        <Button onClick={handleEditIcon}>Save</Button>
        <Button onClick={handleCancelIcon}>Cancel</Button>
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
      handleErrorMessages("subcategoryId", "Pls input Categoryid");
      err = true;
    }
    if (brandName.length == 0) {
      handleErrorMessages("brandName", "Pls input Subcategoryname");
      err = true;
    }
    // if (brandIcon.bytes.length == 0) {
    //   handleErrorMessages("brandIcon", "Pls upload Subcategoryicon");
    //   err = true;
    // }
    return err;
  };

  function handleImage(e) {
    handleErrorMessages("brandIcon", null);
    setBrandIcon({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setHideUploadButton(true);
  }

  const BrandForm = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.mainHeadingstyle}>
            <img src={logo} className={classes.imageStyle} />
            <div className={classes.headingStyle}>Brand Register</div>
          </div>
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Subcategory Id</InputLabel>
            <Select
              value={subcategoryId}
              error={errorMessages?.subcategoryId}
              onFocus={() => handleErrorMessages("subcategoryId", null)}
              label="Subcategory Id"
              onChange={(e) => setSubCategoryId(e.target.value)}
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
        <Grid item xs={12}>
          <TextField
            onFocus={() => handleErrorMessages("brandName", null)}
            error={errorMessages?.brandName}
            helperText={errorMessages?.brandName}
            onChange={(e) => setBrandName(e.target.value)}
            label="Brand Name"
            value={brandName}
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
              {errorMessages?.brandIcon != null ? (
                errorMessages?.brandIcon
              ) : (
                <></>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={brandIcon.fileName} variant="rounded"></Avatar>
        </Grid>
      </Grid>
    );
  };
  /***************** */

  const fetchAllBrand = async () => {
    var result = await getData("brand/display_all_brand");
    if (result.status) {
      setBrandList(result.data);
    } else {
      alert(result.message);
    }
  };
  useEffect(function () {
    fetchAllBrand();
  }, []);

  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid);
    fetchAllSubCategory(rowData.categoryid);
    setSubCategoryId(rowData.subcategoryid);
    setBrandId(rowData.brandid);
    setBrandName(rowData.brandname);
    setBrandIcon({
      bytes: "",
      fileName: `${serverURL}/images/${rowData.brandicon}`,
    });
    setOldImage(`${serverURL}/images/${rowData.brandicon}`);
    setOpen(true);
  };

  const handleEditData = async () => {
    var err = validateData();
    if (err == false) {
      setLoadingStatus(true);
      var body = {
        categoryid: categoryId,
        subcategoryid: subcategoryId,
        brandname: brandName,
        created_at: currentDate(),
        user_admin: "Farzi",
        brandid: brandId,
      };

      var result = await postData("brand/edit_brand_data", body);
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
    fetchAllBrand();
  };

  const handleEditIcon = async () => {
    setLoadingStatus(true);
    var formData = new FormData(); //jb image bhjna ho tabki iska use krege otherwise use nhi krege.//
    formData.append("brandicon", brandIcon.bytes);
    formData.append("updated_at", currentDate());
    formData.append("user_admin", "Farzi");
    formData.append("brandid", brandId);

    var result = await postData("brand/edit_brand_icon", formData);
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

    fetchAllBrand();
  };

  const brandDelete = async () => {
    setLoadingStatus(true);
    var body = { brandid: brandId };

    var result = await postData("brand/delete_brand", body);
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

    fetchAllBrand();
  };

  const handleDeletebrand = async () => {
    Swal.fire({
      title: "Do you want to delete the Brand?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        brandDelete();
      } else if (result.isDenied) {
        Swal.fire("Brand not delete", "", "info");
      }
    });
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleCancelIcon = () => {
    setBrandIcon({ bytes: "", fileName: oldImage });
    setHideUploadButton(false);
  };

  const brandDialog = () => {
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
          <DialogContent>{BrandForm()}</DialogContent>
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
            <Button onClick={handleDeletebrand} variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  /*************Table_displaycategory*********** */
  function brandTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="Brand List"
            columns={[
                { title: "CategoryId", field: "categoryname" },
                { title: "SubCategoryId", field: "subcategoryname" },
                { title: "BrandId", field: "brandid" },
             
              { title: "Brand Name", field: "brandname" },
              {
                title: "Created At",
                render: (rowData) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
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
                      src={`${serverURL}/images/${rowData.brandicon}`}
                      style={{ width: 60, height: 60, borderRadius: 6 }}
                    />
                  </div>
                ),
              },
            ]}
            data={brandList}
            options={{
              pageSize: 3,
              pageSizeOptions: [
                3,
                5,
                10,
                { value: brandList.length, label: "All" },
              ],
            }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Brand",
                onClick: (event, rowData) => handleOpenDialog(rowData),
              },
              {
              icon: 'add',
              tooltip: ' Add Brand',  
              isFreeAction: true,
              onClick: (event) => navigate('/dashboard/brand')
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
      {brandTable()}
      {brandDialog()}
    </div>
  );
}
