import { useState, useEffect } from "react";
import axios from "axios";
import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
//import {CheckBox,Collapse} from "antd"
//import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
//import Dropdown from '@mui/multiselect-dropdown'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const Dashboard = (props) => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [sortRate, setSortRate] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [count, setCount] = useState(0);
  const [s, setVar] = useState("")
  const [global, setGlobal] = useState([])
  const [globalprice, setGlobalPrice] = useState([])
  const [open, setOpen] = React.useState(false);
  const [addprice, setAddPrice] = useState(0);
  const [itemid, setItemId] = useState("")
  const [bill, setBill] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  const [indices, setIndices] = useState([])
  const [output_array, setoutput_array] = useState([])
  const [checked, setChecked] = React.useState([true, true]);
  const [allshops, setAllshops] = useState([])
  const [selectedEmployees, setSelectedEmployees] = useState([])
  const [alltags, setAlltags] = useState([])
  const [isveg, setIsVeg] = useState("Veg");
  const [isnonveg, setIsNonVeg] = useState("Non-Veg")
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  let badi_array = []
  //const global=[]
  //const globalprice=[]
  //var indices=[]
  //var global=[]
  //var globalprice=[]
  const [personName, setPersonName] = React.useState([]);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleChange = (event) => {
    console.log(allshops)
    console.log(personName)
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const dukan = () => {
    var arr = new Set();
    for (let i = 0; i < users.length; i++) {
      var x = users[i].shop_name
      arr.add(x);
    }
    var buf = []
    const myIterator = arr.values();
    for (const entry of myIterator) {
      buf.push(entry)
    }

    setAllshops(buf);
    //setPersonName(buf)
  }
  const onChangeCount = (event) => {
    let x = event.target.value
    if (x >= 0) {
      //var fif=count+x;
      setCount(x);
    }
    else {
      alert("Quantity can't be negative")
    }
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const onChangeVar = (event) => {
    //if (localStorage.getItem('edit') === '1')
    setVar(event.target.value);
  };
  const onAdd = (event) => {
    let faltu_array = []
    faltu_array = event.target.value.split(",")
    //if (localStorage.getItem('edit') === '1')
    if (event.target.checked) {
      console.log(faltu_array[0])
      console.log(faltu_array[1])
      let amt = Number(faltu_array[1]) + addprice;
      setAddPrice(Number(amt));
      badi_array = output_array
      badi_array.push({ item: faltu_array[0], price: faltu_array[1] })
      setoutput_array(badi_array)
    }
    else {
      badi_array = output_array
      let index, i;

      for (i = 0; i < badi_array.length; i++) {
        if (badi_array[i].item === faltu_array[0]) {
          index = i;
          break;
        }
      }
      //console.log(badi_array.indexOf({item:faltu_array[0],price:faltu_array[1]}))
      badi_array.splice(index, 1);
      setoutput_array(badi_array)
      let amt = addprice - faltu_array[1];
      if (amt < 0)
        amt = 0;
      setAddPrice(Number(amt));
    }
    console.log(badi_array)
    // setVar(event.target.value);
  };
  //const [items, setItems] = useState([]);

  //     set search query to empty string
  const [q, setQ] = useState("");
  //     set search parameters
  //     we only what to search countries by capital and name
  //     this list can be longer if you want
  //     you can search countries even by their population
  // just add it to this array
  const [searchParam] = useState(["name"]);
  const onVeg = (event) => {
    if (event.target.checked) {

    }
  }
  const handleClickOpen = (event) => {
    // setItemPrice(event.target.value.price);
    // setItemName(event.target.value.name);
    // setItemVegNonveg(event.target.value.veg_nonveg);
    // //setItemTag(event.target.value.tag.join(','));
    //console.log(event.target.value);
    setOpen(true);
    const id = event.target.value
    //console.log()
    const newUser = {
      id: id,
      email: localStorage.getItem('email')
    };
    axios
      .post('http://localhost:4000/vendor/finditem', newUser)
      .then((res) => {
        console.log(res.data)

        console.log("yo!")
        console.log(newUser)
        setItemId(res.data._id)
        //setOpen(false);
        //setItemName(res.data.name);
        /* setItemPrice(res.data.price);
         setItemName(res.data.name);
         setItemVegNonveg(res.data.veg_nonveg);
         setItemTag(res.data.tag)*/
        //const buf = [{ item: String, price: Number }];
        var arr = [];
        var arr2 = [];
        var arr3 = [];
        var bigarr = res.data.add_on;
        console.log(bigarr)
        for (let x = 0; x < res.data.add_on.length; x++) {
          arr.push(bigarr[x].item)
          arr2.push(bigarr[x])
          //global.push(bigarr[x].item)
          // globalprice.push(bigarr[x].price);
          arr.push(bigarr[x].price)
          arr3.push(bigarr[x].price)

        }
        console.log(arr2)

        setGlobal(arr2);
        setGlobalPrice(arr3);
        //setVar(arr.join(','));
        //console.log(global[0]);
        //buf.shift();
        // setVar(res.data.add_on)
        //setItemTag(res.data.tag);
        //setVar(res.data);
        //alert("Item edited successfully!")
        //window.location.reload()

      })
      .catch(err => {
        console.log(err)
        alert("Error")
      })
    // post request event.target.value, email
    // item details
    // set details


  };
  const handleClose = () => {
    setOpen(false);
    setAddPrice(0);
    setItemId("")
    setCount(0);
    setGlobal([])
    setBill(0)
    setAddPrice(0)
    setIndices([])
    setGlobalPrice([])
    setoutput_array([])
    /*setItemName("");
    setItemPrice("");
    setItemVegNonveg("");
    setItemTag("");
    setVar("");*/
  };
  const onSubmit = (event) => {
    event.preventDefault();
    var buf = [{ item: String, price: Number }];
    const id = event.target.value
    var name, vendor, price;
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === id) {
        name = users[i].name
        vendor = users[i].shop_name
        price = Number(users[i].price)
        break;
      }
    }
    console.log(name)
    console.log(count);

    var bil = price + addprice;
    console.log(bil)
    setBill(bil);
    console.log(bill)
    // const bill=price
    // for (let x = 0; x < indices.length; x ++) {
    //   var b = global[x];
    //   var c = Number(globalprice[x]);
    //   buf.push({ item: b, price: c });
    //   bil+=c;
    // }

    //setBill(bil)
    console.log(buf);
    console.log(addprice)
    buf.shift();
   

    const dat = new Date().toLocaleString()
    const dat2 = dat.split(', ')
    const newUser = {
      name: name,
      //bil: Number(bil * count),
      price: Number((addprice + price) * count),
      email: localStorage.getItem('email'),
      shop_name: vendor,
      quantity: count,
      add_on: output_array,
      placed_time: dat2[0] + ", " + dat2[1]
    };
    console.log(newUser)
    axios
      .post('http://localhost:4000/user/placeorder', newUser)
      .then((res) => {
        console.log(res.data)
        if (res.data.status === "success") {
          console.log("yo!")
          console.log(newUser)
          //console.log(res.data.food)
          setOpen(false);
          //setItemName("");
          //setItemPrice(0);
          handleClose()

          alert("Order placed successfully!")
          //window.location.reload()
        }
        else {
          alert("Some error occured")
        }
      })
      .catch(err => {
        console.log(err)
        alert("Error")
      })
    // }

    //    }
    /*event.preventDefault();
    var match;
    match = s.split(',');
    
    buf.shift();
    */
  }
  const sortPrice = () => {
    let usersTemp = users;
    const flag = sortName;
    usersTemp.sort((a, b) => {
      if (a.price != undefined && b.price != undefined) {
        return (1 - flag * 2) * (new Number(a.price) - new Number(b.price));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortName(!sortName);
  };
  const onMin = (event) => {
    //console.log(event.target.value);
    setMin(event.target.value)

  };
  const onMax = (event) => {
    //console.log(event.target.value);
    setMax(event.target.value)

  };
  const sortRating = () => {
    let usersTemp = users;
    const flag = sortRate;
    usersTemp.sort((a, b) => {
      if (a.rating != undefined && b.rating != undefined) {
        return (1 - flag * 2) * (new Number(a.rating) - new Number(b.rating));
      } else {
        return 1;
      }
    });
    setUsers(usersTemp);
    setSortRate(!sortRate);
  };

  const customFunction = (event) => {
    //console.log(event.target.value);
    setSearchText(event.target.value);
    console.log(searchText.length)
    if (searchText.length !== 0) {
      setFiltered(users.filter(country => {
        return country.name.toLowerCase().includes(searchText.toLowerCase())
      }))
    }
    else {
      setFiltered(users)
    }

  };
  function search(users) {
    return users.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }
  const isopen = (shop) => {
    const dat = new Date().toLocaleString()
    const dat2 = dat.split(', ')
    var v;
    for (let i = 0; i < vendors.length; i++) {
      if (vendors[i].shop_name === shop) {
        const ot = vendors[i].opening_time + ":00"
        const ct = vendors[i].closing_time + ":00"
        // console.log(ct)
        if (ct >= ot) {
          if (dat2[1] >= ot && dat2[1] <= ct) {

            v = true;
          }
          else {
            v = false
          }
        }
        else {
          if (dat2[1] >= ot || dat2[1] <= ct) {
            v = true
          }
          else {
            v = false
          }
        }
        return v
      }
    }
    //console.log(dat2[1])


  }
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/foods")
      .then((response) => {
        setUsers(response.data.foods);
        setSortedUsers(response.data.foods);
        setVendors(response.data.sellers)
        setSearchText("");
        dukan();

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);
  useEffect(() => {
    dukan()

  }, []);
  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
    //setChecked([event.target.checked, checked[0]]);
    //setChecked([checked[0], event.target.checked]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
    //setChecked([event.target.checked, checked[1]]);
  };
  const isshop=(shop)=>{
    var x=false;
    for(let i=0;i<personName.length;i++)
    {
      if(personName[i]===shop)
      {
        x=true
        break
      }
    }
    return x;
  }
  const checkitem = (v) => {
    if (v === "Veg") {
      if (checked[0])
        return true
      else {
        return false
      }
    }
    if (v === "Non-Veg") {
      if (checked[1])
        return true
      else {
        return false
      }
    }
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Veg"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Non-Veg"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">

            <TextField
              //autoComplete
              id="standard-basic"
              label="Search"
              input={searchText}
              fullWidth={true}
              //defaultValue=""
              onChange={(e) => setQ(e.target.value)}
              //onChange={customFunction}
              InputProps={{
                endAdornment: (

                  <InputAdornment>

                    <IconButton>
                      <SearchIcon />

                    </IconButton>
                  </InputAdornment>
                ),
              }}


            />

          </List>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Search by price range
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="min"
                    input={min}
                    fullWidth={true}
                    onChange={onMin}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="max"
                    input={max}
                    fullWidth={true}
                    onChange={onMax}
                  />
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
            <br></br>
            <ListItem >
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Shop Name</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  //{console.log(allshops)}
                  {allshops.map((user) => (
                    <MenuItem
                      key={user}
                      value={user}
                    //style={getStyles(name, personName, theme)}
                    >
                      {console.log(user)}
                      {user}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <br></br>
            <ListItem>
              <div>
                <FormControlLabel
                  label="All"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1]}
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handleChange1}
                    />
                  }
                />
                {children}
              </div>
            </ListItem>

          </List>
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>

                  <TableCell>Name</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>
                    {" "}
                    <Button onClick={sortPrice}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Price
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Button onClick={sortRating}>
                      {sortRate ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Rating
                  </TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Add-Ons</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {search(users).map((item, ind) => (
                  isopen(item.shop_name) && item.price >= min && item.price <= max && checkitem(item.veg_nonveg)   ?
                    (<TableRow key={ind} >



                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.shop_name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>{item.veg_nonveg}</TableCell>
                      <TableCell>{item.tag.join(',')}</TableCell>

                      <TableCell>{item.add_on.map((it, i) => (
                        <tr align='center'>
                          <td align='center'>{i + 1}:</td>
                          <td align='center'>{it.item}</td>
                          <td align='center'>Rs.{it.price}</td>

                        </tr>
                      ))}</TableCell>
                      <TableCell>


                        <div><Button variant="contained" value={item._id} disabled={!isopen(item.shop_name)} onClick={handleClickOpen}>
                          Order
                        </Button></div>
                      </TableCell>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Order</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Enter Quantity and Add-Ons
                          </DialogContentText>

                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Quantity"
                            //type="email"
                            value={count}
                            onChange={onChangeCount}

                            fullWidth
                            variant="standard"
                          />
                          <div>
                            Add-Ons<br></br>
                            {global.map((it, i) => (
                              <tr align='center'>
                                <Checkbox value={[it.item, it.price]} onChange={onAdd} />

                                <td align='center'>{it.item}</td>
                                <td align='center'>Rs.{it.price}</td>

                              </tr>
                            ))}

                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button value={itemid} onClick={onSubmit}>Order</Button>
                        </DialogActions>
                      </Dialog>

                    </TableRow>)
                    :
                    null
                ))}
                {search(users).map((item, ind) => (
                  !isopen(item.shop_name) && item.price >= min && item.price <= max && checkitem(item.veg_nonveg) ?
                    (<TableRow key={ind} >



                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.shop_name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>{item.veg_nonveg}</TableCell>
                      <TableCell>{item.tag.join(',')}</TableCell>

                      <TableCell>{item.add_on.map((it, i) => (
                        <tr align='center'>
                          <td align='center'>{i + 1}:</td>
                          <td align='center'>{it.item}</td>
                          <td align='center'>Rs.{it.price}</td>

                        </tr>
                      ))}</TableCell>
                      <TableCell>


                        <div><Button variant="contained" value={item._id} disabled={!isopen(item.shop_name)} onClick={handleClickOpen}>
                          Order
                        </Button></div>
                      </TableCell>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Order</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Enter Quantity and Add-Ons
                          </DialogContentText>

                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Quantity"
                            //type="email"
                            value={count}
                            onChange={onChangeCount}

                            fullWidth
                            variant="standard"
                          />
                          <div>
                            Add-Ons<br></br>
                            {global.map((it, i) => (
                              <tr align='center'>
                                <Checkbox value={[it.item, it.price]} onChange={onAdd} />

                                <td align='center'>{it.item}</td>
                                <td align='center'>Rs.{it.price}</td>

                              </tr>
                            ))}

                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button value={itemid} onClick={onSubmit}>Order</Button>
                        </DialogActions>
                      </Dialog>

                    </TableRow>)
                    :
                    null
                ))}



              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
