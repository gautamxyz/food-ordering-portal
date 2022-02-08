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
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';


const BuyerOrder = (props) => {
    const [users, setUsers] = useState([]);
    const [rated, setRated] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = useState(5);
    const onPickup = (event) => {
        const newUser = {
            id: event.target.value
        };
        axios
            .post("http://localhost:4000/user/pickup", newUser)
            .then((response) => {
                //setUsers(response.data);
                console.log(response)
                alert("Order picked up!")
                window.location.reload();
                //setSortedUsers(response.data);
                //setSearchText("");

            })
            .catch((error) => {
                console.log(error);
            });


    };
    const handleClose = () => {
        setOpen(false);

        setCount(5);

        /*setItemName("");
        setItemPrice("");
        setItemVegNonveg("");
        setItemTag("");
        setVar("");*/
    };
    const onChangeCount = (event) => {
        let x = event.target.value
        if (x >= 0 && x < 6) {
            //var fif=count+x;
            setCount(x);
        }
        else {
            alert("Rating can be from 1 to 5 only")
        }
    };
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(count);
        const newUser = {
            id: event.target.value,
            rating:Number(count)
        }



        console.log(newUser)
        axios
            .post('http://localhost:4000/user/rating', newUser)
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

                    alert("Thank you for your feedback!")
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
        setOpen(false)
        setCount(0);
        // }

        //    }
        /*event.preventDefault();
        var match;
        match = s.split(',');
        
        buf.shift();
        */
    }
    const handleClickOpen = (event) => {
        setOpen(true);
    }
    useEffect((event) => {
        const newUser = {

            email: localStorage.getItem('email')
        };
        axios
            .post("http://localhost:4000/user/myorders", newUser)
            .then((response) => {
                setUsers(response.data);
                console.log(response)
                //setSortedUsers(response.data);
                //setSearchText("");

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div style={{ textAlign: 'center', fontSize: 30 }}>
            My Orders<br></br><br></br>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Food Item</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Buyer</TableCell>
                            <TableCell align="center">Vendor</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Placed Time</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="left">Add Ons</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.rating}</TableCell>
                                <TableCell align="center">{row.buyer}</TableCell>
                                <TableCell align="center">{row.vendor}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.placed_time}</TableCell>
                                <TableCell align="center">{row.status}
                                    <br></br>
                                    {row.status === "Ready for pickup" ?
                                        <Button variant="contained" value={row._id} onClick={onPickup} >
                                            Picked up
                                        </Button>
                                        : <div></div>}
                                </TableCell>

                                <TableCell align="center">
                                    {row.add_on.map((it, i) => (
                                        <tr align='center'>
                                            <td align='center'>{i + 1}:</td>
                                            <td align='center'>{it.item}</td>
                                            <td align='center'>Rs.{it.price}</td>

                                        </tr>
                                    ))}
                                </TableCell>
                                <Button variant="contained" value={row._id} disabled ={!(count && row.status==="Completed" && row.rating===0)} onClick={handleClickOpen} >
                                    Rate
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Order</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Please rate this order from 1(poor) to 5(excellent)
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

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button value={row._id} onClick={onSubmit}>Submit Rating</Button>
                                    </DialogActions>
                                </Dialog>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default BuyerOrder;
