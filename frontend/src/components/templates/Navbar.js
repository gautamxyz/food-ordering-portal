import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Wallet from "../common/wallet";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  let a = localStorage.getItem('loggedin');
  const [money, setMoney] = useState(0);
  const newUser = {
    email: localStorage.getItem('email')
  }
  useEffect((event) => {
    if (localStorage.getItem('usertype') === 'customer') {

      const newUser = {
        email: localStorage.getItem('email')
      }
      axios
        .post('http://localhost:4000/user/wallet', newUser)
        .then((res) => {
          console.log(res.data)
          setMoney(res.data.wallet)

        })
        .catch(err => {
          console.log(err)
          alert("Error")
        })

    }
  }, []);
  if (a !== '1')
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Canteen Portal
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/users")}>
              Users
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              My Profile
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  else {
    let type = localStorage.getItem('usertype')
    if (type === 'customer') {
      return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Customer Home
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
           
            <Button color="inherit" onClick={() => navigate("/buyerorder")}>
              View Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/Dashboard")}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => navigate("/wallet")}>
              Wallet Rs.{money}
            </Button>
            <Button color="inherit" onClick={() => navigate("/logout")}>
              Logout
            </Button>
            <Button color="inherit" onClick={() => navigate("/user/profile")}>
              My Profile
            </Button>
          </Toolbar>
        </AppBar>
      </Box>);
    }
    else {
      return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Vendor Home
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/stats")}>
              Statistics
            </Button>
            <Button color="inherit" onClick={() => navigate("/vendororder")}>
              View Orders
            </Button>
            <Button color="inherit" onClick={() => navigate("/display_items")}>
              View Items
            </Button>
            <Button color="inherit" onClick={() => navigate("/create")}>
              Add Items
            </Button>
            <Button color="inherit" onClick={() => navigate("/logout")}>
              Logout
            </Button>
            <Button color="inherit" onClick={() => navigate("/vendor/profile")}>
              My Profile
            </Button>
          </Toolbar>
        </AppBar>
      </Box>);
    }

  }
};

export default Navbar;
