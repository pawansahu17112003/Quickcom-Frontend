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
  import { userStyle } from '../brand/BrandCss'
  import {
    postData,
    currentDate,
    getData,
  } from "../../../services/FetchNodeAdminServices";
  import { Form } from "react-router-dom";
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  export default function (props) {
    var navigate=useNavigate()
    var classes = userStyle();
    const [categoryId, setCategoryId] = useState("");
    const [subcategoryId, setSubCategoryId] = useState("");
  
    const [brandName, setBrandName] = useState("");
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [brandIcon, setBrandIcon] = useState({ bytes: "", fileName: cart });
    const [errorMessages, setErrorMessages] = useState({});
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
      if (brandName.length == 0) {
        handleErrorMessages("brandName", "Pls input Brandname");
        err = true;
      }
      if (brandIcon.bytes.length == 0) {
        handleErrorMessages("brandIcon", "Pls upload Brandicon");
        err = true;
      }
      return err;
    };
  
    function handleImage(e) {
      handleErrorMessages("brandIcon", null);
      setBrandIcon({
        bytes: e.target.files[0],
        fileName: URL.createObjectURL(e.target.files[0]),
      });
    }
    const resetValue = () => {
      setCategoryId("");
      setSubCategoryId("");
      setBrandName("");
      setBrandIcon({ bytes: "", fileName: cart });
    };
    const handleSubmit = async () => {
      var err = validateData();
      if (err == false) {
        setLoadingStatus(true);
        var formData = new FormData(); //jb image bhjna ho tabki iska use krege otherwise use nhi krege.//
        formData.append("categoryid", categoryId);
        formData.append("subcategoryid", subcategoryId);
        formData.append("brandname", brandName);
        formData.append("brandicon", brandIcon.bytes);
        formData.append("created_at", currentDate());
        formData.append("updated_at", currentDate());
        formData.append("user_admin", "Farzi");
  
        var result = await postData("brand/brand_submit", formData);
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
                <div className={classes.headingStyle}>Brand Register</div>
                <div  style={{marginLeft:'auto'}}  >
           <img src='/display.png'  style={{ width:30,height:30}} onClick={()=>navigate('/dashboard/displayallbrand')}/>
           </div>
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
  