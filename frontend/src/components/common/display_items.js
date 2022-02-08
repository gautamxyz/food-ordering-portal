import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
let a = localStorage.getItem('loggedin')
let type = localStorage.getItem('usertype')
let stuff;
localStorage.setItem('edit', 0)
let edit = localStorage.getItem('edit')
const Items = (props) => {
    //const name [String];
    const [rows, setRows] = useState([]);
    const [add_ons, setAddOns] = useState([]);
    const [array, setArray] = useState([]);
    const [final, setFinal] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [itemname, setItemName] = useState("");
    const [itemprice, setItemPrice] = useState(0);
    const [itemvegnonveg, setItemVegNonveg] = useState("");
    const [itemtag, setItemTag] = useState("");
    const [s, setVar] = useState("")

    const [newprice, setNewPrice] = useState(0);
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
                //setOpen(false);
                //setItemName("");
                setItemPrice(res.data.price);
                setItemName(res.data.name);
                setItemVegNonveg(res.data.veg_nonveg);
                setItemTag(res.data.tag)
                const buf = [{ item: String, price: Number }];
                var arr = [];
                for (let x = 0; x < res.data.add_on.length; x++) {
                    arr.push(res.data.add_on[x].item)
                    arr.push(res.data.add_on[x].price)

                }
                setVar(arr.join(','));
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
        setItemName("");
        setItemPrice("");
        setItemVegNonveg("");
        setItemTag("");
        setVar("");
    };

    const onChangeItemName = (event) => {
        //if (localStorage.getItem('edit') === '1')
        setItemName((event.target.value));
    };
    const onChangeItemPrice = (event) => {
        //if (localStorage.getItem('edit') === '1')
        setItemPrice((event.target.value));
    };
    const onChangeItemVegNonveg = (event) => {
        //if (localStorage.getItem('edit') === '1')
        setItemVegNonveg(event.target.value);
    };
    const onChangeItemTag = (event) => {
        //if (localStorage.getItem('edit') === '1')
        setItemTag(event.target.value);
    };
    const onChangeVar = (event) => {
        //if (localStorage.getItem('edit') === '1')
        setVar(event.target.value);
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
            name: itemname,
            price: itemprice,
            veg_nonveg: itemvegnonveg,
            tag: itemtag,
            add_on: buf,
            email: localStorage.getItem('email')
        };
        console.log(newUser)
        axios
            .post('http://localhost:4000/vendor/edititem', newUser)
            .then((res) => {
                console.log(res.data)
                if (res.data.status === "success") {
                    console.log("yo!")
                    console.log(newUser)
                    console.log(res.data.food)
                    setOpen(false);
                    setItemName("");
                    setItemPrice(0);
                    setItemVegNonveg("");
                    setItemTag("");
                    setVar("");
                    alert("Item edited successfully!")
                    window.location.reload()
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

    const onDelete = (event) => {
        let item = event.target.value
        event.preventDefault();
        console.log(item);
        //console.log(e);
        /*if (localStorage.getItem('edit') === '1') {
          localStorage.setItem('edit', 2);
        }
        console.log("hi!")*/

        const newUser = {

            email: localStorage.getItem('email'),
            name: item
        };
        axios
            .post('http://localhost:4000/vendor/deleteitems', newUser)
            .then((res) => {
                if (res.data.status === "success") {
                    alert("Item Deleted!")
                    window.location.reload();
                }
                else {
                    alert("Failed to delete item")
                }
            })
            .catch(err => {
                //console.log(err)
                //console.log(rows);
                alert("Error")
            })

    }

    useEffect((event) => {

        const newUser = {

            email: localStorage.getItem('email')
        };

        axios
            .post('http://localhost:4000/vendor/viewitems', newUser)
            .then((res) => {
                // console.log(res.data)
                setRows(res.data);
                setItemName(res.data.name);
                setItemPrice(res.data.price);
                setAddOns(res.data.add_on);
                //console.log(res.data[0].name);
                //console.log(rows)
                //setFavorite(res.data.favorite)
                /*for (let i = 0; i < rows.length; i++) {
                    console.log("smth")
                    add_ons.push(rows[i].add_on.item);
                    add_ons.push(rows[i].add_on.price);
                }
                for (let i = 0; i < add_ons.length; i+=2) {
                    var x=add_ons[i]+" "+add_ons[i+1]
                    array.push(x);
                }*/


            })
            .catch(err => {
                //console.log(err)
                console.log(rows);
                alert("Error")
            })


    }, []);





    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Food Item</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Veg/Non-Veg</TableCell>
                            <TableCell align="center">Tags</TableCell>
                            <TableCell align="left">Add Ons</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.rating}</TableCell>
                                <TableCell align="center">{row.veg_nonveg}</TableCell>
                                <TableCell align="center">{row.tag.join(', ')}</TableCell>
                                <TableCell align="center">
                                    {row.add_on.map((it, i) => (
                                        <tr align='center'>
                                            <td align='center'>{i + 1}:</td>
                                            <td align='center'>{it.item}</td>
                                            <td align='center'>Rs.{it.price}</td>

                                        </tr>
                                    ))}
                                </TableCell>
                                <TableCell><Button variant="contained" value={row.name} onClick={onDelete}>
                                    Delete
                                </Button>
                                </TableCell>
                                <TableCell><Button variant="contained" value={row._id} onClick={handleClickOpen}>
                                    Edit
                                </Button>
                                </TableCell>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Edit Food Item</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Enter updated details. Click on CANCEL to discard changes, click on SAVE to save changes.
                                        </DialogContentText>

                                        <TextField
                                            autoFocus
                                            //margin="dense"
                                            id="name"
                                            label="Price"
                                            //type="email"
                                            type="Number"
                                            //contentEditable={true}
                                            onChange={onChangeItemPrice}
                                            value={itemprice}
                                            fullWidth
                                            variant="standard"

                                        />
                                        <FormControl sx={{ m: 1, width: 205 }}>
                                            <InputLabel id="demo-simple-select-label">Veg/Non-Veg</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={itemvegnonveg}
                                                label="Veg/Non-Veg"
                                                onChange={onChangeItemVegNonveg}
                                            >
                                                <MenuItem value={"Veg"}>Veg</MenuItem>
                                                <MenuItem value={"Non-Veg"}>Non-Veg</MenuItem>

                                            </Select>
                                        </FormControl>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Tags"
                                            //type="email"
                                            value={itemtag}
                                            fullWidth
                                            variant="standard"
                                            onChange={onChangeItemTag}
                                        />
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Add-Ons"
                                            //type="email"
                                            value={s}
                                            onChange={onChangeVar}

                                            fullWidth
                                            variant="standard"
                                        />


                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={onSubmit}>Save</Button>
                                    </DialogActions>
                                </Dialog>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );

}

export default Items;


