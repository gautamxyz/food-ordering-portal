import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/login";
import Create from "./components/common/create"
import Dashboard from "./components/common/Dashboard";
//import Home from "./components/common/Home";
import Logout from "./components/common/logout";
import Wallet from "./components/common/wallet";
import Items from "./components/common/display_items"
import VendorOrder from "./components/common/vendororder";
import BuyerOrder from "./components/common/buyerorder"
import Stats from "./components/common/stats";
let a = localStorage.getItem('loggedin');
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  console.log(a);
  if (a !== '1') {
    console.log(a);
    return (


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route path="users" element={<UsersList />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>

    );

  }

  else {
    let type = localStorage.getItem('usertype')
    if (type === 'vendor') {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route path= "stats" element={<Stats />} />
            <Route path= "vendororder" element={<VendorOrder />} />
            <Route path= "display_items" element={<Items />} />
              <Route path="create" element={<Create />} />
              <Route path="logout" element={<Logout />} />
              <Route path="/vendor/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }
    else {
      console.log("bye!")
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route path= "buyerorder" element={<BuyerOrder />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>

        /*(<BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        
      </Routes>
          
        </BrowserRouter>*/
      );
    }
  }
}

export default App;
//export default App;

