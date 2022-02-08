var express = require("express");
var router = express.Router();
const FoodItem = require("../models/Foods");
// Load User model
const Vendor = require("../models/Vendors");
const User = require("../models/Users");
const Order = require("../models/Order");
//const Vendor = require("../models/Vendors");
//const User = require("../models/Users");
//const Vendor = require("../models/")
// GET request 
// Getting all the users

// }



router.post("/pickup", (req, res) => {
    const id = req.body.id
    //const status=req.body.status
    Order.updateOne({ _id: id }, { $set: { status: "Completed" } }).then(out => {
        console.log("compl")
        return res.status(200).json({ status: "success" })

    })


});

router.get("/foods", function (req, res) {
    FoodItem.find(function (err, foods) {

        if (err) {
            console.log(err);
        } else {
            Vendor.find(function (err, sellers) {
                if (err) {
                    console.log(err)
                }
                else {
                    res.json({ foods, sellers });
                }
            })

        }
    })
});
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});
router.post("/placeorder", function (req, res) {
    //let usertype=localStorage.getItem('usertype')
    //let user = new User(req.body);

    const email = req.body.email
    const bil = req.body.price
    User.findOne({ email: email }).then(out => {
        var curr_bal = out.wallet
        if (curr_bal >= bil) {
            User.updateOne({ email: req.body.email }, {
                $set:
                    { wallet: Number(curr_bal - bil) }
            }).then(out => {

                //console.log(req.body.wallet)
                const newProduct = new Order({
                    name: req.body.name,
                    vendor: req.body.shop_name,
                    price: req.body.price,
                    buyer: req.body.email,
                    quantity: req.body.quantity,
                    placed_time: req.body.placed_time,
                    status: "Placed",
                    add_on: req.body.add_on
                });
                console.log(newProduct);
                newProduct
                    .save()
                    .then(newProduct => {
                        //console.log("lessgoo")
                        return res.status(200).json({ status: "success" });
                    })
                    .catch(err => {
                        console.log("oops")
                        return res.status(400).json({ status: "failed to order", product: newProduct });
                    });
            })
                .catch(err => {
                    console.log(err)
                    res.status(400).json();
                });

        }
        else {
            return res.status(400).json({ status: "Insufficient balance" })
        }
    })



});
router.post("/myorders", function (req, res) {
    //let usertype=localStorage.getItem('usertype')
    //let user = new User(req.body);

    const email = req.body.email;
    Order.find({ buyer: email }).then(order => {
        // Check if user email exists

        console.log("order");
        res.status(200).json(order);
        return order;

    });



});
router.post("/wallet", function (req, res) {
    //let usertype=localStorage.getItem('usertype')
    let user = new User(req.body);

    const email = req.body.email;
    User.findOne({ email }).then(user => {
        // Check if user email exists

        //console.log("Done1");
        res.status(200).json({ wallet: user.wallet });
        return user;

    });



});
router.post("/cutwallet", function (req, res) {
    //let usertype=localStorage.getItem('usertype')
    var balance = req.body.bil;

    var email = req.body.email;
    User.findOne({ email }).then(output => {
        // Check if user email exists

        //console.log("Done1");
        const bal = Number(output.wallet);
        console.log(balance)
        console.log(bal)
        if (bal >= balance) {
            User.updateOne({ email: req.body.email }, {
                $set:
                    { wallet: Number(bal - balance) }
            })
                .then(out => {
                    console.log("Done")
                    //console.log(req.body.wallet)
                    return res.status(200).json({ status: "success", bal: Number(bal - balance) });
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json();
                });
            //res.status(200).json({ wallet: balance });
        }
        else {
            console.log("adi");
            return res.status(400).json({ status: "Insufficient Balance", bal: bal - balance })
        }
        // return user;

    });



});
router.post("/updatewallet", (req, res) => {
    /*const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact_number:req.body.contact_number,
        age:req.body.age,
        batch:req.body.batch,
        password:req.body.password,
        usertype:req.body.usertype
    });*/
    let user = new User(req.body);
    User.updateOne({ email: req.body.email }, {
        $set:
            { wallet: Number(req.body.wallet) }
    })
        .then(user => {
            console.log("Done")
            console.log(req.body.wallet)
            res.status(200).json({ status: "success" });
        })
        .catch(err => {
            console.log(err)
            res.status(400).json();
        });
});
router.post("/profile", function (req, res) {
    //let usertype=localStorage.getItem('usertype')
    let user = new User(req.body);
    if (!req.body.name) {
        const email = req.body.email;
        User.findOne({ email }).then(user => {
            // Check if user email exists

            //console.log("Done1");
            res.status(200).json({ name: user.name, email: user.email, contact_number: user.contact_number, age: user.age, batch: user.batch, password: user.password, favorite: user.favorite });
            return user;

        });
    }
    else {
        const email = req.body.email;
        const info = ({ name: user.name, contact_number: user.contact_number, age: user.age, batch: user.batch, password: user.password })
        //User.update({email})
        console.log(info)
        console.log("hogaya")
        User.updateOne({ email: email }, { $set: info }).then(user => {
            res.status(200).json({ status: "success" })
        })
            .catch(err => {
                console.log(err)
                res.status(400).json();
            });
        return user
    }

});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    /*const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact_number:req.body.contact_number,
        age:req.body.age,
        batch:req.body.batch,
        password:req.body.password,
        usertype:req.body.usertype
    });*/
    let user = new User(req.body);
    user.save()
        .then(user => {
            console.log("Done")
            res.status(200).json({ User: "User registered!" });
        })
        .catch(err => {
            console.log(err)
            res.status(400).json();
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            //console.log("Done2");
            return res.json({
                status: "Email not found",
            });
        }
        else {
            if (user.password != req.body.password) {
                //console.log("Done");
                return res.json({
                    status: "Incorrect password",
                })
            }
            else {
                //console.log("Done1");
                res.status(200).json({ status: "success", name: user.name });
                return user;
            }
        }
    });
});
router.post("/rating", (req, res) => {
    const id = req.body.id
    const rating=Number(req.body.rating)
    Order.findOne({ _id: id }).then(ords => {
        const name=ords.name;
        const shop=ords.vendor
        FoodItem.findOne({name:name,shop_name:shop}).then(output =>{
            var curr_rating=output.rating;
            console.log(output);
            Order.find({name:name,vendor:shop}).then(out =>{
               const n=out.length
                console.log(rating);
                console.log(curr_rating)
               const final=((curr_rating*(n-1)+rating)/n).toFixed(2);
               console.log(final)
                FoodItem.updateOne({name:name,shop_name:shop},{$set:{ rating: final } }).then(up =>{
                    Order.updateOne({_id:id},{$set:{ rating: rating } }).then(rt =>{
                        res.status(200).json({status:"success"})
                    })
                })
    
            })

        })
    })
});

module.exports = router;

