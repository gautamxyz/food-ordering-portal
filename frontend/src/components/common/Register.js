import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
/*const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [age, setAge] = useState("");

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      date: Date.now(),
    };

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;*/
import React, { Component } from 'react';
//import axios from 'axios';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      contact_number: '',
      age: '',
      batch: '',
      password: '',
      wallet: '',

      manager_name:'',
      shop_name:'',
      opening_time:'',
      closing_time:'',

      usertype: ''
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsertype = this.onChangeUsertype.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeBatch=this.onChangeBatch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onChangeManagerName = this.onChangeManagerName.bind(this);
    this.onChangeShopName = this.onChangeShopName.bind(this);
    this.onChangeOpeningTime = this.onChangeOpeningTime.bind(this);
    this.onChangeClosingTime = this.onChangeClosingTime.bind(this);
  }
  onChangeManagerName(event) {
    this.setState({ manager_name: event.target.value });
  }
  onChangeShopName(event) {
    this.setState({ shop_name: event.target.value });
  }
  onChangeOpeningTime(event) {
    this.setState({ opening_time: event.target.value });
  }
  onChangeClosingTime(event) {
    this.setState({ closing_time: event.target.value });
  }
  onChangeName(event) {
    this.setState({ name: event.target.value });
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onChangeUsertype(event) {
    console.log(event.target.value)
    this.setState({ usertype: event.target.value });

  }
  onChangeContactNumber(event) {
    this.setState({ contact_number: event.target.value });
  }
  onChangeAge(event) {
    if(Number(event.target.value)>=0)
    this.setState({ age: event.target.value });
    else{
      alert("Age can't be negative")
    }
  }
  onChangeBatch(event) {
    this.setState({ batch: event.target.value });
  }
  onChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.usertype==='customer'){
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      contact_number:this.state.contact_number,
      age:this.state.age,
      batch:this.state.batch,
      password:this.state.password,
      
      //usertype: this.state.usertype
    }
  

    axios.post('http://localhost:4000/user/register', newUser)
      .then(res => {
        console.log(res.data)
        alert("Registered!")
      })
      .catch(err => {
        console.log(err)
        alert("Username not unique or a required field left empty")
      })

    this.setState({
      name: '',
      email: '',
      contact_number:'',
      age:'',
      batch:'',
      password:'',
      usertype: ''
    });
  }
  else{
    const newUser = {
      manager_name: this.state.manager_name,
      email: this.state.email,
      contact_number:this.state.contact_number,
      shop_name:this.state.shop_name,
      opening_time:this.state.opening_time,
      closing_time:this.state.closing_time,
      password:this.state.password,
      
      //usertype: this.state.usertype
    }
  

    axios.post('http://localhost:4000/vendor/register', newUser)
      .then(res => {
        console.log(res.data)
        alert("Registered!")
      })
      .catch(err => {
        console.log(err)
        alert("Username not unique or a required field left empty")
      })

    this.setState({
      manager_name: '',
      email: '',
      contact_number:'',
      shop_name:'',
      opening_time:'',
      closing_time:'',
      password:'',
      usertype: ''
    });
  }
  
  }

  render() {
    return(
    <div>
      <div className="form-group" style={{textAlign:'center'}}>
        <label>Usertype: </label><br></br>
        <label for="customer">
          <input type="radio" id="customer" name="usertype" value="customer" onChange={this.onChangeUsertype} />
          Customer</label><br></br>
        <label for="vendor">
        </label><input type="radio" id="vendor" name="usertype" value="vendor" onChange={this.onChangeUsertype} />
        <label for="vendor">Vendor</label>
      </div>
      <br></br>
      <br></br>      
    
    
    { this.state.usertype === 'customer'?
    <div>
      
       <Grid container align={"center"} spacing={2}>
       <form onSubmit={this.onSubmit}></form>
       <Grid item xs={12}>
           <TextField
               label="Name"
               variant="outlined"
               value={this.state.name}
               onChange={this.onChangeName}
           />
       </Grid>
       <Grid item xs={12}>
           <TextField

               label="Email"
               variant="outlined"
               //input type="password"
               value={this.state.email}

               onChange={this.onChangeEmail}
           />
       </Grid>
       <Grid item xs={12}>
           <TextField

               label="Contact Number"
               variant="outlined"
               //input type="password"
               value={this.state.contact_number}

               onChange={this.onChangeContactNumber}
           />
       </Grid>
       <Grid item xs={12}>
           <TextField

               label="Age"
               variant="outlined"
               //input type="password"
               value={this.state.age}

               onChange={this.onChangeAge}
           />
       </Grid>
       <Grid item xs={12}>
         
       <FormControl sx={{m:1,width:205}}>
        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.batch}
          label="Age"
          onChange={this.onChangeBatch}
        >
          <MenuItem value={"UG1"}>UG1</MenuItem>
          <MenuItem value={"UG2"}>UG2</MenuItem>
          <MenuItem value={"UG3"}>UG3</MenuItem>
          <MenuItem value={"UG4"}>UG4</MenuItem>
          <MenuItem value={"UG5"}>UG5</MenuItem>          
        </Select>
      </FormControl>
       </Grid>
       <Grid item xs={12}>
           <TextField

               label="Password"
               variant="outlined"
               input type="password"
               value={this.state.password}

               onChange={this.onChangePassword}
           />
       </Grid>
       <Grid item xs={12}>
           <Button variant="contained" onClick={this.onSubmit}>
               Register
           </Button>
       </Grid>
   </Grid>
   </div>
      /*<div>

        <form onSubmit={this.onSubmit}>
        
          <div className="form-group">



            <label>Name: </label>
            <input type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          
          <div className="form-group">
            <label>Email: </label>
            <input type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />

          </div>
          <div className="form-group">
            <label>Contact Number: </label>
            <input type="text"
              className="form-control"
              value={this.state.contact_number}
              onChange={this.onChangeContactNumber}
            />

          </div>
          <div className="form-group">
            <label>Age: </label>
            <input type="text"
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />

          </div>
          <div className="form-group">
            <label>Batch: </label>
            <input type="text"
              className="form-control"
              value={this.state.batch}
              onChange={this.onChangeBatch}
            />

            
            

          </div>
          <div className="form-group">
            <label>Password: </label>
            <input type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />

          </div>
          <div className="form-group">
        <input type="submit" value="Register" className="btn btn-primary" onChange={this.onSubmit} />
      </div>
        </form>
        
      </div>*/
   : 
   <div></div>
  }
  { this.state.usertype==='vendor' ? 
    <Grid container align={"center"} spacing={2}>

    <Grid item xs={12}>
        <TextField
            label="Manager Name"
            variant="outlined"
            value={this.state.manager_name}
            onChange={this.onChangeManagerName}
        />
    </Grid>
    <Grid item xs={12}>
        <TextField

            label="Email"
            variant="outlined"
            //input type="password"
            value={this.state.email}

            onChange={this.onChangeEmail}
        />
    </Grid>
    <Grid item xs={12}>
        <TextField

            label="Contact Number"
            variant="outlined"
            //input type="password"
            value={this.state.contact_number}

            onChange={this.onChangeContactNumber}
        />
    </Grid>
    <Grid item xs={12}>
        <TextField

            label="Shop Name"
            variant="outlined"
            //input type="password"
            value={this.state.shop_name}

            onChange={this.onChangeShopName}
        />
    </Grid>
    <Grid item xs={12}>
        <TextField

            label="Opening Time"
            variant="outlined"
            //input type="password"
            value={this.state.opening_time}

            onChange={this.onChangeOpeningTime}
        />
    </Grid>
    <Grid item xs={12}>
        <TextField

            label="Closing Time"
            variant="outlined"
            //input type="password"
            value={this.state.closing_time}

            onChange={this.onChangeClosingTime}
        />
    </Grid>
    <Grid item xs={12}>
        <TextField

            label="Password"
            variant="outlined"
            input type="password"
            value={this.state.password}

            onChange={this.onChangePassword}
        />
    </Grid>
    <Grid item xs={12}>
        <Button variant="contained" onClick={this.onSubmit}>
            Register
        </Button>
    </Grid>
</Grid>
    /*<div>

    <form onSubmit={this.onSubmit}>
      <div className="form-group">



        <label>Manager Name: </label>
        <input type="text"
          className="form-control"
          value={this.state.manager_name}
          onChange={this.onChangeManagerName}
        />
      </div>
      <div className="form-group">
        <label>Email: </label>
        <input type="text"
          className="form-control"
          value={this.state.email}
          onChange={this.onChangeEmail}
        />

      </div>
      <div className="form-group">
        <label>Contact Number: </label>
        <input type="text"
          className="form-control"
          value={this.state.contact_number}
          onChange={this.onChangeContactNumber}
        />

      </div>
      <div className="form-group">
        <label>Shop Name: </label>
        <input type="text"
          className="form-control"
          value={this.state.shop_name}
          onChange={this.onChangeShopName}
        />

      </div>
      <div className="form-group">
        <label>Opening Time: </label>
        <input type="text"
          className="form-control"
          value={this.state.opening_time}
          onChange={this.onChangeOpeningTime}
        />

        
        

      </div>
      <div className="form-group">
        <label>Closing Time: </label>
        <input type="text"
          className="form-control"
          value={this.state.closing_time}
          onChange={this.onChangeClosingTime}
        />

        
        

      </div>
      <div className="form-group">
        <label>Password: </label>
        <input type="password"
          className="form-control"
          value={this.state.password}
          onChange={this.onChangePassword}
        />

      </div>
      <div className="form-group">
    <input type="submit" value="Register" className="btn btn-primary" onChange={this.onSubmit} />
  </div>
    </form>
    
  </div>*/
  :
   <div></div>}
    
    </div>)
  }
}