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
//var s;
//let stuff;
//localStorage.setItem('edit', 0)
//let edit = localStorage.getItem('edit')
const Create = (props) => {
    const [name, setName] = useState("");

    const [price, setPrice] = useState(0);

    const [veg_nonveg, setVegNonveg] = useState("");
    const [shop_name, setShopName] = useState("");
    const [tag, setTag] = useState("");
    const [add_on, setAddOn] = useState("");
    //const [add_on_price, setAddOnPrice] = useState("");
    const [s, setVar] = useState("")
    const onChangeName = (event) => {
        //if (localStorage.getItem('edit') === '1')
        setName(event.target.value);
    };
    const onChangeVar = (event) => {
        //if (localStorage.getItem('edit') === '1')

        setVar(event.target.value);

    };
    const onChangePrice = (event) => {
        //if (localStorage.getItem('edit') === '1')
        if (Number(event.target.value) > 0)
            setPrice(Number(event.target.value));
        else {
            alert("Price can't be negative")
            window.location.reload()
        }
    };

    const onChangeVegNonveg = (event) => {
        //if (localStorage.getItem('edit') === '1')
        setVegNonveg(event.target.value);
    };
    /*const onChangeTag = (event) => {
        //if (localStorage('edit')=== '1')
        
        setTag(event.target.value);
    };*/
    const onChangeTag = (event) => {
        console.log("doing")
        var s = event.target.value;
        console.log(s)
        //setTag(s);
        setTag(s.split(','))
        /*var match=s.split(',');
        setTag(match);
        console.log(match);
        ;*/
        console.log(tag)

    };



    const onChangeShopName = (event) => {
        // if (localStorage.getItem('edit') === '1')
        setShopName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        var match;
        match = s.split(',');
        const buf = [{ item: String, price: Number }];
        for (let x = 0; x < match.length; x += 2) {
            var b = match[x];
            var c = Number(match[x + 1]);
            buf.push({ item: b, price: c });
        }
        buf.shift();
        const newUser = {


            name: name,
            shop_name: shop_name,
            price: price,
            veg_nonveg: veg_nonveg,
            tag: tag,
            add_on: buf,
            email: localStorage.getItem('email')
        };
        console.log(newUser)
        axios
            .post('http://localhost:4000/vendor/create', newUser)
            .then((res) => {
                console.log(res.data)
                if (res.data.status === "success") {
                    console.log("yo!")
                    console.log(newUser)
                    alert("Item added successfully!")
                }
                else {
                    alert("Some error occured")
                }
            })
            .catch(err => {
                console.log(err)
                alert("Error")
            })
    }

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
                        label="Food Item Name"
                        variant="outlined"
                        value={name}

                        onChange={onChangeName}

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

                        label="Price"
                        variant="outlined"
                        //input type="password"
                        value={price}

                        onChange={onChangePrice}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: 205 }}>
                        <InputLabel id="demo-simple-select-label">Veg/Non-Veg</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={veg_nonveg}
                            label="Veg/Non-Veg"
                            onChange={onChangeVegNonveg}
                        >
                            <MenuItem value={"Veg"}>Veg</MenuItem>
                            <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField

                        label="Tag"
                        variant="outlined"
                        // input type="password"
                        value={tag}

                        onChange={onChangeTag}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField

                        label="Add-Ons"
                        variant="outlined"
                        // input type="password"
                        value={s}

                        onChange={onChangeVar}
                    />
                </Grid>

                <Grid item xs={12}>

                    <div>
                        <Button variant="contained" onClick={onSubmit}>
                            Add Item

                        </Button>
                    </div>


                </Grid>

            </Grid>
        </div>

    );

}
export default Create;


