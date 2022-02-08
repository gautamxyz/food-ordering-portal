import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
let a = localStorage.getItem('loggedin')
let type = localStorage.getItem('usertype')
let stuff;
localStorage.setItem('edit', 0)
let edit = localStorage.getItem('edit')
const Profile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  //const [em, setEmail] = useState("");
  const [favorite, setFavorite] = useState("")
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(null);

  const [manager_name, setManagerName] = useState("");
  const [shop_name, setShopName] = useState("");
  const [opening_time, setOpeningTime] = useState("");
  const [closing_time, setClosingTime] = useState("");
  const onChangeName = (event) => {
    if (localStorage.getItem('edit') === '1')
      setName(event.target.value);
  };
  const onChangeContactNumber = (event) => {
    if (localStorage.getItem('edit') === '1')
      setContactNumber(event.target.value);
  };
  const onChangeAge = (event) => {
    if (localStorage.getItem('edit') === '1')
      setAge(event.target.value);
  };
  const onChangeBatch = (event) => {
    if (localStorage.getItem('edit') === '1')
      setBatch(event.target.value);
  };
  const onChangeFavorite = (event) => {
    if (localStorage('edit') === '1')
      setFavorite(event.target.value);
  };
  const onChangeManagerName = (event) => {
    if (localStorage.getItem('edit') === '1')
      setManagerName(event.target.value);
  };
  const onChangeShopName = (event) => {
    if (localStorage.getItem('edit') === '1')
      setShopName(event.target.value);
  };
  const onChangeOpeningTime = (event) => {
    if (localStorage.getItem('edit') === '1')
      setOpeningTime(event.target.value);
  };
  const onChangeClosingTime = (event) => {
    if (localStorage.getItem('edit') === '1')
      setClosingTime(event.target.value);
  };
  const onChangePassword = (event) => {
    if (localStorage.getItem('edit') === '1')
      setPassword(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    /*if (localStorage.getItem('edit') === '1') {
      localStorage.setItem('edit', 2);
    }
    console.log("hi!")*/
    if (localStorage.getItem('edit') === '1') {
      console.log("hi2")
      //localStorage.setItem('edit', 1)
      if (type === 'customer') {
        console.log("hi3")
        const newUser = {


          name: name,
          contact_number: contact_number,
          age: age,
          batch: batch,
          password: password,
          favorite: favorite,
          email: localStorage.getItem('email')
        };
        console.log(newUser)
        axios
          .post('http://localhost:4000/user/profile', newUser)
          .then((res) => {
            console.log(res.data)
            if (res.data.status === "success") {
              console.log("yo!")
              alert("Profile Updated!Refresh to see changes.")
            }
            else {
              alert("Some error occured")
            }
          })
          .catch(err => {
            console.log(err)
            alert("Error")
          })
        localStorage.setItem('edit', '0')
      }
      if (type === 'vendor') {
        const newUser = {


          manager_name: manager_name,
          contact_number: contact_number,
          shop_name: shop_name,
          opening_time: opening_time,
          closing_time: closing_time,
          password: password,
          email: localStorage.getItem('email')
        };
        axios
          .post('http://localhost:4000/vendor/profile', newUser)
          .then((res) => {
            console.log(res.data)
            if (res.data.status === "success") {
              console.log("yo!")
              alert("Profile Updated! Refresh to see changes.")
            }
            else {
              alert("Some error occured")
            }
            //alert("Profile Updated!")

          })
          .catch(err => {
            console.log(err)
            alert("Error")
          })
        localStorage.setItem('edit', '0')
      }
    }
    else {
      localStorage.setItem('edit', '1')
      alert("Enter Updated Details")
      //window.location.reload()
    }

  }

  useEffect((event) => {

    const newUser = {

      email: localStorage.getItem('email')
    };
    if (type === 'customer') {
      axios
        .post('http://localhost:4000/user/profile', newUser)
        .then((res) => {
          console.log(res.data)
          setName(res.data.name)
          setEmail(res.data.email)
          setContactNumber(res.data.contact_number)
          setAge(res.data.age)
          setBatch(res.data.batch)
          setPassword(res.data.password)
          setFavorite(res.data.favorite)
        })
        .catch(err => {
          console.log(err)
          alert("Error")
        })
    }
    if (type === 'vendor') {
      axios
        .post('http://localhost:4000/vendor/profile', newUser)
        .then((res) => {
          console.log(res.data)
          setManagerName(res.data.manager_name)
          setEmail(res.data.email)
          setContactNumber(res.data.contact_number)
          setShopName(res.data.shop_name)
          setOpeningTime(res.data.opening_time)
          setClosingTime(res.data.closing_time)
          setPassword(res.data.password)

        })
        .catch(err => {
          console.log(err)
          alert("Error")
        })
    }
  }, []);



  /*const resetInputs = () => {
  
    setEmail("");
    setPassword("");
    setDate(null);
  };*/
  //if (localStorage.getItem('edit') !== '1') {
  if (type === 'customer') {
    return (

      <div>
        {/* <Grid item xs={12}>
     <Button variant="contained" onClick={onSubmit}>
         Edit Profile
     </Button>
 </Grid> */}
        <Grid container align={"center"} spacing={2}>
          {/* <form onSubmit={onSubmit}></form> */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}

              onChange={onChangeName}

            />
          </Grid>
          {localStorage.getItem('edit') === '0' ?

            <Grid item xs={12}>
              <TextField

                label="Email"
                variant="outlined"
                //input type="password"
                value={email}

              //onChange={this.onChangeEmail}
              />
            </Grid>

            : <div></div>}
          <Grid item xs={12}>
            <TextField

              label="Contact Number"
              variant="outlined"
              //input type="password"
              value={contact_number}

              onChange={onChangeContactNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField

              label="Age"
              variant="outlined"
              //input type="password"
              value={age}

              onChange={onChangeAge}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: 205 }}>
              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={batch}
                label="Batch"
                onChange={onChangeBatch}
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
              value={password}

              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            {localStorage.getItem('edit') === '0' ?
              <div>
                <Button variant="contained" onClick={onSubmit}>
                  Edit Profile

                </Button>
              </div>
              : <div></div>}
            {localStorage.getItem('edit') === '1' ?
              <div>
                <Button variant="contained" onClick={onSubmit}>
                  Save
                </Button>
              </div>
              : <div></div>}
          </Grid>

        </Grid>
      </div>

    );
  }
  if (type === 'vendor') {
    return (

      <div>
        {/* <Grid item xs={12}>
     <Button variant="contained" onClick={onSubmit}>
         Edit Profile
     </Button>
 </Grid> */}
        <Grid container align={"center"} spacing={2}>
          {/* <form onSubmit={onSubmit}></form> */}
          <Grid item xs={12}>
            <TextField
              label="Manager Name"
              variant="outlined"
              value={manager_name}

              onChange={onChangeManagerName}

            />
          </Grid>
          {localStorage.getItem('edit') === '0' ?

            <Grid item xs={12}>
              <TextField

                label="Email"
                variant="outlined"
                //input type="password"
                value={email}

              //onChange={this.onChangeEmail}
              />
            </Grid>

            : <div></div>}
          <Grid item xs={12}>
            <TextField

              label="Contact Number"
              variant="outlined"
              //input type="password"
              value={contact_number}

              onChange={onChangeContactNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField

              label="Shop Name"
              variant="outlined"
              //input type="password"
              value={shop_name}

              onChange={onChangeShopName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField

              label="Opening Time"
              variant="outlined"
              //input type="password"
              value={opening_time}

              onChange={onChangeOpeningTime}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField

              label="Closing Time"
              variant="outlined"
              //input type="password"
              value={closing_time}

              onChange={onChangeClosingTime}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField

              label="Password"
              variant="outlined"
              input type="password"
              value={password}

              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            {localStorage.getItem('edit') === '0' ?
              <div>
                <Button variant="contained" onClick={onSubmit}>
                  Edit Profile

                </Button>
              </div>
              : <div></div>}
            {localStorage.getItem('edit') === '1' ?
              <div>
                <Button variant="contained" onClick={onSubmit}>
                  Save
                </Button>
              </div>
              : <div></div>}
          </Grid>

        </Grid>
      </div>

    );
  }

  if (a !== '1') {
    return (
      <div style={{ textAlign: 'center' }}>Login to view your profile</div>
    );
  }
}
/*else{
  if (type === 'customer') {
    return (

      <div>
        {/* <Grid item xs={12}>
   <Button variant="contained" onClick={onSubmit}>
       Edit Profile
   </Button>
</Grid> *//*}
         <Grid container align={"center"} spacing={2}>
           {/* <form onSubmit={onSubmit}></form> */
/* <Grid item xs={12}>
   <TextField
     label="Name"
     variant="outlined"
     value={name}
   onChange={onChangeName}
   //{setName()}
   />
 </Grid>
 
 <Grid item xs={12}>
   <TextField

     label="Contact Number"
     variant="outlined"
     //input type="password"
     value={contact_number}

   onChange={onChangeContactNumber}
   />
 </Grid>
 <Grid item xs={12}>
   <TextField

     label="Age"
     variant="outlined"
     //input type="password"
     value={age}

   onChange={onChangeAge}
   />
 </Grid>
 <Grid item xs={12}>
   <TextField

     label="Batch"
     variant="outlined"
     //input type="password"
     value={batch}

   onChange={onChangeBatch}
   />
 </Grid>
 <Grid item xs={12}>
   <TextField

     label="Password"
     variant="outlined"
     input type="password"
     value={password}

   onChange={onChangePassword}
   />
 </Grid>
 <Grid item xs={12}>
   <Button variant="contained" onClick={onSubmit}>
     Save Profile
   </Button>
 </Grid> 

</Grid>
</div>

);
}
if (type === 'vendor') {
return (
<div>
{/* <Grid item xs={12}>
<Button variant="contained" onClick={onSubmit}>
Edit Profile
</Button>
</Grid> *//*}
       <Grid container align={"center"} spacing={2}>
         {/* <form onSubmit={onSubmit}></form> */
/*<Grid item xs={12}>
  <TextField
    label="Manager Name"
    variant="outlined"
    value={manager_name}
  onChange={onChangeManagerName}
  />
</Grid>
 
<Grid item xs={12}>
  <TextField

    label="Contact Number"
    variant="outlined"
    //input type="password"
    value={contact_number}

  onChange={onChangeContactNumber}
  />
</Grid>
<Grid item xs={12}>
  <TextField

    label="Shop Name"
    variant="outlined"
    //input type="password"
    value={shop_name}

  onChange={onChangeShopName}
  />
</Grid>
<Grid item xs={12}>
  <TextField

    label="Opening Time"
    variant="outlined"
    //input type="password"
    value={opening_time}

  onChange={onChangeOpeningTime}
  />
</Grid>
<Grid item xs={12}>
  <TextField

    label="Closing Time"
    variant="outlined"
    //input type="password"
    value={closing_time}

  onChange={onChangeClosingTime}
  />
</Grid>
<Grid item xs={12}>
  <TextField

    label="Password"
    variant="outlined"
    input type="password"
    value={password}

  onChange={onChangePassword}
  />
</Grid>
<Grid item xs={12}>
  <Button variant="contained" onClick={onSubmit}>
    Save Profile
  </Button>
</Grid> 

</Grid>
</div>

);
}
}
};*/

export default Profile;


/*export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.setState = {
      name: '',
      email: '',
      contact_number: '',
      age: '',
      batch: '',
      password: '',
      wallet: '',
      favorite: '',

      manager_name: '',
      shop_name: '',
      opening_time: '',
      closing_time: '',

      usertype: ''
    }
  }
  handleFirstNameChange = (event) => {
    const firstName = event
    this.setState({ name: firstName })
  }
  onSubmit() {
    if (type === 'customer') {
      const newUser = {

        email: localStorage.getItem('email')

      }
      var self=this;

      axios.post('http://localhost:4000/user/profile', newUser)
        .then(res => {
          const person = res.data;
          this.setState({person});

        })
         // stuff=res
         //
        .catch(err => {
          console.log(err)
          alert("Error")
        })
        // console.log(this.state.name)

    }
    else {
      const newUser = {
        manager_name: this.state.manager_name,
        email: this.state.email,
        contact_number: this.state.contact_number,
        shop_name: this.state.shop_name,
        opening_time: this.state.opening_time,
        closing_time: this.state.closing_time,
        password: this.state.password,

        //usertype: this.state.usertype
      }


      axios.post('http://localhost:4000/profile', newUser)
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
        contact_number: '',
        shop_name: '',
        opening_time: '',
        closing_time: '',
        password: '',
        usertype: ''
      });
    }

  }

  /*useEffect(() => {
    let type = localStorage.getItem('loggedin')
    if (type === 'customer') {
      axios
        .get("http://localhost:4000/profile") // unimplemented
        .then((res) => {
          console.log("doneeeee")
          if (res.data.name !== null) {

            this.state.name = res.data.name;
            this.state.email = res.data.email
            this.state.contact_number = res.data.contact_number
            this.state.age = res.data.age
            this.state.batch = res.data.batch
            this.state.password = res.data.password
            this.state.favorite = res.data.favorite
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);*/

  //return <div></div>;




/* render() {
   return (
     
     <div>
       <Grid item xs={12}>
          <Button variant="contained" onClick={this.onSubmit}>
              Edit Profile
          </Button>
      </Grid>
     <Grid container align={"center"} spacing={2}>
      <form onSubmit={this.onSubmit}></form>
      <Grid item xs={12}>
          <TextField
              label="Name"
              variant="outlined"
             value={this.name}
              //onChange={this.onChangeName}
          />
      </Grid>
      <Grid item xs={12}>
          <TextField

              label="Email"
              variant="outlined"
              //input type="password"
              //value={email}

              //onChange={this.onChangeEmail}
          />
      </Grid>
      <Grid item xs={12}>
          <TextField

              label="Contact Number"
              variant="outlined"
              //input type="password"
             // value={contact_number}

              //onChange={this.onChangeContactNumber}
          />
      </Grid>
      <Grid item xs={12}>
          <TextField

              label="Age"
              variant="outlined"
              //input type="password"
              //value={age}

              //onChange={this.onChangeAge}
          />
      </Grid>
      <Grid item xs={12}>
          <TextField

              label="Batch"
              variant="outlined"
              //input type="password"
              //value={batch}

              //onChange={this.onChangeBatch}
          />
      </Grid>
      <Grid item xs={12}>
          <TextField

              label="Password"
              variant="outlined"
              input type="password"
              //value={password}

             // onChange={this.onChangePassword}
          />
      </Grid>
      
  </Grid>
  </div>
  
     /*<>
     <Grid container align={"center"} spacing={2}>
       <Grid item xs={12}>
          <Button variant="contained" onClick={this.onSubmit}>
              View
          </Button>
      </Grid>

    </Grid>
   <h1>Hello</h1>
   </>*/
/*)
}

}*/
