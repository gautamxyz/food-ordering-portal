import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


let username = localStorage.getItem('email')

export default class logout extends Component {

    constructor(props) {
        super(props);
        this.state = { orders: [] }
        this.updateproduct = this.updateproduct.bind(this);
    }
    // /*
    updateproduct(event) {
        localStorage.clear()
        window.location.reload()
        window.location.href = "/";
    }
    // */
    componentDidMount() {
        axios.post('http://localhost:4000/disp', {
            userName: username
        })
            .then(response => {
                //console.log(response.data[0].newmerge[0].Price)
                this.setState({ orders: response.data });
                localStorage.setItem('loggedin', 0);
                console.log('loggedin');
                //myCursor = db.inventory.find( { email: 'email' } )
                //this.props.history.push("/");
                //console.log('Successfully Login');

               // window.location.reload()
                //window.location.href = "/";
                alert("Logged out " + username + " !");
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div style={{textAlign:'center'}} >
                Are you sure you wanna logout?
                <div ><td ><button  onClick={this.updateproduct} > Logout</button></td>
                </div>
            </div>
        )
    }
}