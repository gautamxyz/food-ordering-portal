import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Home from "./Home"
/*export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            usertype: ''
        }

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password,
            usertype: this.state.usertype
        }

        axios.post('http://localhost:4000/verify', newUser)
            .then(res => {
                console.log(res.data)
                if (res.data.status === "success") {
                    localStorage.setItem('email', newUser.email);
                    localStorage.setItem('usertype', res.data.type);
                    localStorage.setItem('logggedin', 1);
                    window.location.reload()

                }
                else {
                    alert("invalid credentials")
                }
            })
            .catch(err => {
                console.log(err)
                alert("Email not unique or a required field left empty")
            })

        this.setState({
            email: '',
            password: '',
            usertype: ''
        });
        // window.location.reload()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
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
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}*/
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState(null);



    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {

            email: email,
            password: password,
            date: Date.now(),
        };

        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((res) => {
                console.log(res.data)
                if (res.data.status === "success") {
                    localStorage.setItem('email', newUser.email);
                    localStorage.setItem('usertype', "customer");
                    localStorage.setItem('loggedin', 1);
                    
                    console.log('loggedin');
                    //myCursor = db.inventory.find( { email: 'email' } )
                    //this.props.history.push("/");
                    //console.log('Successfully Login');
                    
                    window.location.reload()
                    window.location.href="/";
                    alert("Welcome " + res.data.name + " !");

                }
                if (res.data.status === "Email not found" || res.data.status === "Incorrect password") {
                    axios
                        .post("http://localhost:4000/vendor/login", newUser)
                        .then((res) => {
                            console.log(res.data)
                            if (res.data.status === "success") {
                                localStorage.setItem('email', newUser.email);
                                localStorage.setItem('usertype', "vendor");
                                localStorage.setItem('loggedin', 1);
                              //  localStorage.setItem('manager_name',newUser.ma)
                                //myCursor = db.inventory.find( { email: 'email' } )
                                //this.props.history.push("/");
                                //console.log('Successfully Login');
                                window.location.reload()
                                window.location.href="/";
                                alert("Welcome " + res.data.name + " !");

                            }
                            else {
                                alert("invalid credentials");
                            }
                        }
                    
                        )
                        .catch(err => {
                            console.log(err)
                            alert("Email not unique or a required field left empty")
                        })
                    
                }
            })
            .catch(err => {
                console.log(err)
                alert("Email not unique or a required field left empty")
            })

        resetInputs();
    };
    const resetInputs = () => {

        setEmail("");
        setPassword("");
        setDate(null);
    };

    return (
        <Grid container align={"center"} spacing={2}>

            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
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
                    Login
                </Button>
            </Grid>
        </Grid>
    );
};

export default Login;
