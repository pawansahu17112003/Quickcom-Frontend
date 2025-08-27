
import AdminLogin from "./components/admin/adminlogin/AdminLogin";
import DashBoard from "./components/admin/adminlogin/DashBoard";
import HomePage from "./components/userinterface/homepage/HomePage";
import PageCategoryDisplay from "./components/userinterface/pagecategorydisplay/PageCategoryDisplay";
import ProductDetailsPage from "./components/userinterface/productdetailspage/ProductDetailsPage";
import Login from "./components/userinterface/signinpage/Login";
import Verification from "./components/userinterface/signinpage/Verification";
import CartDisplayPage from "./components/userinterface/mycart/CartDisplayPage";
import Otp from "./components/userinterface/signinpage/Otp";
import SetUp from "./components/userinterface/signinpage/SetUp";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";

function App() {
  return (
   <div >
    <Router>
     <Routes>
                           <Route element={<AdminLogin/>} path="/adminlogin"></Route>
                           <Route element={<DashBoard/>} path="/dashboard/*"></Route>
                           <Route element={<HomePage/>} path="/homepage"></Route>
                           <Route element={<PageCategoryDisplay/>} path="/pagecategorydisplay"></Route>
                          <Route element={<ProductDetailsPage/>} path="/productdetailspage"></Route>
                          <Route element={<Login/>} path="/login"></Route>
                          <Route element={<Verification/>} path="/verification"></Route>
                          <Route element={<CartDisplayPage/>} path="/cartdisplaypage"></Route>
                          <Route element={<Otp/>} path="/otp"></Route>
                          <Route element={<SetUp/>} path="/setup"></Route>

   
      </Routes>
    </Router>
   
   </div>
  );
}

export default App;
