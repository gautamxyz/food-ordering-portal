import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
let a = localStorage.getItem('loggedin')
let type = localStorage.getItem('usertype')
let stuff;
localStorage.setItem('edit', 0)
let edit = localStorage.getItem('edit')
const Wallet = (props) => {
    const [curr_bal, setWallet] = useState("");
    const [added_money, setAddedMoney] = useState("");

    const onChangeWallet = (event) => {
        
          setAddedMoney(event.target.value);
    };
    useEffect((event) => {

        const newUser = {

            email: localStorage.getItem('email')
        };

        axios
            .post('http://localhost:4000/user/wallet', newUser)
            .then((res) => {
                console.log(res.data)
                setWallet(res.data.wallet)

            })
            .catch(err => {
                console.log(err)
                alert("Error")
            })

    }, []);
    const onSubmit = (event) => {
        event.preventDefault();
        /*if (localStorage.getItem('edit') === '1') {
          localStorage.setItem('edit', 2);
        }
        console.log("hi!")*/
        if (Number(added_money) >= 0) {
            const newUser = {
                email: localStorage.getItem('email'),
                wallet: Number(curr_bal) + Number(added_money)
            };

            axios
                .post('http://localhost:4000/user/updatewallet', newUser)
                .then((res) => {
                    //console.log(res.data)
                    if (res.data.status === "success") {
                        console.log("yo!")
                        alert("Money Added")
                        console.log(newUser.wallet);
                        window.location.href="/";
                    }
                    else {
                        alert("Some error occured")
                    }
                })
                .catch(err => {
                    console.log(err)
                    alert("Error")
                })
           // localStorage.setItem('edit', '0')
        }
        else {
            alert("Enter appropriate amount!")
        }
    }




   




    return (

        <div>
            {/* <Grid item xs={12}>
     <Button variant="contained" onClick={onSubmit}>
         Edit Profile
     </Button>
 </Grid> */}

            <Grid item xs={12}>
                <TextField

                    label="Current Balance"
                    variant="outlined"
                    //input type="password"
                    value={curr_bal}

                //onChange={onChangePassword}
                />
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs={12}>
                <TextField

                    label="Add Money"
                    variant="outlined"
                    //input type="password"
                    //value={curr_bal}

                onChange={onChangeWallet}
                />
            </Grid>
            <br></br>
            <br></br>
            <Grid item xs={12}>
                {localStorage.getItem('edit') === '0' ?
                    <div>
                        <Button variant="contained" onClick={onSubmit}>
                            Add Money

                        </Button>
                    </div>
                    : <div></div>}

            </Grid>
        </div>

    );

}


export default Wallet;


