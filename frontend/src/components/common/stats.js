import axios from "axios";
import React, { Component } from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TableCell } from "@mui/material";
import Paper from "@mui/material/Paper";
//import Grid from "@mui/material/Grid";
//import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
let a = localStorage.getItem('loggedin')
let type = localStorage.getItem('usertype')
let stuff;
localStorage.setItem('edit', 0)
let edit = localStorage.getItem('edit')
const Stats = (props) => {
    const [curr_bal, setWallet] = useState("");
    const [added_money, setAddedMoney] = useState("");
    const [placed,setPlaced]=useState(0);
    const [pending,setPending]=useState(0);
    const [completed,setCompleted]=useState(0);
    const [top5,setTop5]=useState([]);
    const onChangeWallet = (event) => {
        
          setAddedMoney(event.target.value);
    };
    useEffect((event) => {

        const newUser = {

            email: localStorage.getItem('email')
        };

        axios
            .post('http://localhost:4000/vendor/stats', newUser)
            .then((res) => {
                setPlaced(res.data.placed)
                setPending(res.data.pending)
                setCompleted(res.data.completed)
                setTop5(res.data.top5);
            })
            .catch(err => {
                console.log(err)
                alert("Error")
            })

    }, []);
    




   




    return (

        <Grid item xs={12} md={9} lg={9}>
        <Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                
                
                <TableCell>Orders Placed</TableCell>
                <TableCell>Pending Orders</TableCell>
                <TableCell>Completed Orders</TableCell>
                <TableCell>Top 5 items sold</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             
                <TableRow >
                  <TableCell>{placed}</TableCell>
                  <TableCell>{pending}</TableCell>
                  <TableCell>{completed}</TableCell>
                  <TableCell>
                      <tr>
                          <td>{top5[top5.length-1]}</td>
                          
                          
                      </tr>
                      <tr>
                          <td>{top5[top5.length-2]}</td>
                          
                          
                      </tr>
                      <tr>
                          <td>{top5[top5.length-3]}</td>
                          
                          
                      </tr>
                      <tr>
                          <td>{top5[top5.length-4]}</td>
                          
                          
                      </tr>
                      <tr>
                          <td>{top5[top5.length-5]}</td>
                          
                          
                      </tr>
                  </TableCell>
                </TableRow>
              
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    

    );

}


export default Stats;


