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
import emailjs from '@emailjs/browser';
const VendorOrder = (props) => {
  const [users, setUsers] = useState([]);

  const onReject = (event) => {
    console.log("dekho")
    const newUser = {

      id: event.target.value,
      status: "Rejected",
      email: localStorage.getItem('email')
    };
    axios
      .post("http://localhost:4000/vendor/changestatus", newUser)
      .then((response) => {
        //setUsers(response.data);
        console.log(response.data.details.vendor)
        console.log(response.data.details.buyer)
        emailjs.send("service_lg4ccz8", "template_hno068a", {
          status: "Rejected",
          shop_name: response.data.details.vendor,
          buyer: response.data.details.buyer,
        }, "user_VFqheCHMAXwwWYzw2BulN")
          .then((result) => {
            if (result.text === "OK") {
              alert("Email sent order rejected")
              window.location.reload()
            }
            else {
              console.log(result.text);
              alert("error in email sending")
              window.location.reload()
            }
          }, (error) => {
            alert("Error in email sending")
            window.location.reload()
            console.log(error.text);
          });
        alert("Ok,Order rejected")
        window.location.reload()
        //setSortedUsers(response.data);
        //setSearchText("");

      })
      .catch((error) => {
        console.log(error);
      });

  };
  const onNext = (event) => {
    const newUser = {
      id: event.target.value,
      email: localStorage.getItem('email')
    };
    axios
      .post("http://localhost:4000/vendor/nextstage", newUser)
      .then((res) => {
        // setUsers(response.data);
        //console.log(response)
        if (res.data.status === "success") {
          alert("Order moved to next stage")
          if (res.data.details.status !== "Placed") {
            window.location.reload()
          }
          else {
            emailjs.send("service_lg4ccz8", "template_hno068a", {
              status: "Accepted",
              shop_name: res.data.details.vendor,
              buyer: res.data.details.buyer,
            }, "user_VFqheCHMAXwwWYzw2BulN")
              .then((result) => {
                if (result.text === "OK") {
                  alert("Email sent order Accepted")
                  window.location.reload()
                }
                else {
                  console.log(result.text);
                  alert("error in email sending")
                  window.location.reload()
                }
              }, (error) => {
                alert("Error in email sending")
                window.location.reload()
                console.log(error.text);
              });
          }
        }

        if (res.data.status === "Too many orders!")
          alert("Max order limit reached!")
        //setSortedUsers(response.data);
        //setSearchText("");

      })
      .catch((error) => {
        console.log(error);
      });


  };
  useEffect((event) => {
    const newUser = {

      email: localStorage.getItem('email')
    };
    axios
      .post("http://localhost:4000/vendor/vendororder", newUser)
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
      Orders<br></br><br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Food Item</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Buyer</TableCell>
              <TableCell align="center">Vendor</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Placed Time</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="left">Add Ons</TableCell>
              <TableCell align="left">Change Stage</TableCell>

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
                <TableCell align="center">{row.buyer}</TableCell>
                <TableCell align="center">{row.vendor}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.placed_time}</TableCell>
                <TableCell align="center">{row.status}</TableCell>

                <TableCell align="center">
                  {row.add_on.map((it, i) => (
                    <tr align='center'>
                      <td align='center'>{i + 1}:</td>
                      <td align='center'>{it.item}</td>
                      <td align='center'>Rs.{it.price}</td>

                    </tr>
                  ))}
                </TableCell>
                <TableCell>
                  {row.status !== "Rejected" && row.status !== "Completed" ?
                    <Button variant="contained" value={row._id} onClick={onNext}>
                      Next Stage
                    </Button>
                    : <Button variant="contained" disabled={true} value={row._id} onClick={onNext}>
                      Next Stage
                    </Button>}
                  <br></br><br></br>
                  {row.status === "Placed" ?
                    <Button variant="contained" value={row._id} onClick={onReject} >
                      Reject
                    </Button>
                    : <div></div>}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default VendorOrder;
