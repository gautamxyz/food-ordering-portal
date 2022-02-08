var express = require("express");
var router = express.Router();

// Load User model
//const User=require("../models/Users");
const Vendor = require("../models/Vendors");
const FoodItem = require("../models/Foods");
const Order = require("../models/Order");
const Users = require("../models/Users");
//const User = require("../models/Users");
//const Vendor = require("../models/")
// GET request 
// Getting all the users
router.post("/findaitem", (req, res) => {
    //let usertype=localStorage.getItem('usertype')
    //let email = (req.body.email);
    //if (!req.body.manager_name) {
    // Vendor.findOne({email:email})
    //const email = req.body.email;

    // Check if user email exists
    const id = req.body.id
    FoodItem.findOne({ _id: id }).then(output => {
        const shop = output.shop_name
        Vendor.findOne({ shop_name: shop }).then(out => {
            return res.status(200).json(out)

        })
        //console.log(res);


        //console.log("Done1");
        //res.status(200).json({ manager_name: vendor.manager_name, email: vendor.email, contact_number: vendor.contact_number, shop_name: vendor.shop_name, opening_time: vendor.opening_time, closing_time: vendor.closing_time, password: vendor.password });
        //return user;

    });
});
router.post("/vendororder", (req, res) => {
    //const Product = require("../models/products");
    //const { errors, isValid } = validateProductInput(req.body);
    // Check validation
    console.log("checking")

    const email = req.body.email
    Vendor.findOne({ email: email }).then(out => {
        Order.find({ vendor: out.shop_name }).then(output => {
            return res.status(200).json(output)
        })
    });
});
router.post("/changestatus", (req, res) => {
    const id = req.body.id
    const status = req.body.status
    Order.findOne({ _id: id }).then(output => {
        const refund = output.price;
        const buyer = output.buyer;
        Users.findOne({ email: buyer }).then(bahar => {
            const bal = bahar.wallet;
            const fin = Number(bal + refund)
            Users.updateOne({ email: buyer }, { $set: { wallet: fin } }).then(op => {
                Order.updateOne({ _id: id }, { $set: { status: status } }).then(out => {
                    return res.status(200).json({ status: "success",details:output })
                })
            })
        })
    })
});
router.post("/nextstage", (req, res) => {
    const id = req.body.id
    console.log(id)
    const email = req.body.email;
    //const status=req.body.status
    Order.findOne({ _id: id }).then(out => {

        const s = out.status
        if (s === "Placed") {
            Vendor.findOne({ email: email }).then(sell => {
                const shop = sell.shop_name
                console.log(shop)
                Order.find({ vendor: shop }).then(all => {
                    var c = 0;
                    var see;

                    const arr = all;
                    console.log(arr);
                    for (let i = 0; i < arr.length; i++) {
                        see = all[i].status;
                        console.log(see)
                        if (see === "Accepted" || see === "Cooking")
                            c++;
                    }
                    console.log(c);
                    if (c < 10) {
                        Order.updateOne({ _id: id }, { $set: { status: "Accepted" } }).then(output => {
                            return res.status(200).json({ status: "success",details:out })
                        })
                    }
                    else {
                        return res.status(200).json({ status: "Too many orders!" });
                    }
                })
            })
        }
        if (s === "Accepted") {
            console.log("something")
            Order.updateOne({ _id: id }, { $set: { status: "Cooking" } }).then(output => {
                return res.status(200).json({ status: "success" })
            })
        }
        if (s === "Cooking") {
            Order.updateOne({ _id: id }, { $set: { status: "Ready for pickup" } }).then(output => {
                return res.status(200).json({ status: "success" })
            })
        }
        //return res.status(200).json();


    })
        .catch(err => {
            console.log(err)
            res.status(400).json();
        });


});
router.post("/edititem", (req, res) => {
    //const Product = require("../models/products");
    //const { errors, isValid } = validateProductInput(req.body);
    // Check validation
    console.log("checking")

    const email = req.body.email
    console.log(req.body.price)
    const newProduct = new FoodItem({
        name: req.body.name,
        //shop_name: req.body.shop_name,
        price: Number(req.body.price),
        //rating: req.body.rating,
        veg_nonveg: req.body.veg_nonveg,
        tag: req.body.tag,
        add_on: req.body.add_on
    });
    Vendor.findOne({ email: email }).then(out => {
        const shop = out.shop_name
        FoodItem.updateOne({ name: newProduct.name, shop_name: shop }, { $set: { name: newProduct.name, price: newProduct.price, veg_nonveg: newProduct.veg_nonveg, tag: newProduct.tag, add_on: newProduct.add_on } }).then(food => {
            res.status(200).json({ status: "success", food: food })
        })
            .catch(err => {
                console.log(err)
                res.status(400).json();
            });

    })
});
router.post("/viewitems", (req, res) => {
    //let usertype=localStorage.getItem('usertype')
    //let email = (req.body.email);
    //if (!req.body.manager_name) {
    // Vendor.findOne({email:email})
    const email = req.body.email;
    Vendor.findOne({ email }).then(vendor => {
        // Check if user email exists
        const shop_name = vendor.shop_name;
        FoodItem.find({ shop_name: shop_name }).then(output => {
            console.log("doesit?")
            console.log(output)
            //console.log(res);
            return res.status(200).json(output)

        })
        //console.log("Done1");
        //res.status(200).json({ manager_name: vendor.manager_name, email: vendor.email, contact_number: vendor.contact_number, shop_name: vendor.shop_name, opening_time: vendor.opening_time, closing_time: vendor.closing_time, password: vendor.password });
        //return user;

    });
    // }


});
router.post("/finditem", (req, res) => {
    //let usertype=localStorage.getItem('usertype')
    //let email = (req.body.email);
    //if (!req.body.manager_name) {
    // Vendor.findOne({email:email})
    const email = req.body.email;

    // Check if user email exists
    const id = req.body.id
    FoodItem.findOne({ _id: id }).then(output => {
        console.log("doesit?")
        console.log(output)
        //console.log(res);
        return res.status(200).json(output)


        //console.log("Done1");
        //res.status(200).json({ manager_name: vendor.manager_name, email: vendor.email, contact_number: vendor.contact_number, shop_name: vendor.shop_name, opening_time: vendor.opening_time, closing_time: vendor.closing_time, password: vendor.password });
        //return user;

    });
    // }


});
router.post("/deleteitems", (req, res) => {

    console.log("what")
    const name = req.body.name
    Vendor.findOne({ email: req.body.email }).then(out => {
        FoodItem.deleteOne({ name: name, shop_name: out.shop_name })
            .then(output => {
                if (output) {
                    res.json({ status: "success", output: output })
                }
                else {
                    //console.log(shop_name);
                    return res.status(400).json({ status: "failed" });
                }
            })
    })

});
router.post("/create", (req, res) => {
    //const Product = require("../models/products");
    //const { errors, isValid } = validateProductInput(req.body);
    // Check validation
    console.log("checking")

    const email = req.body.email
    const newProduct = new FoodItem({
        name: req.body.name,
        shop_name: req.body.shop_name,
        price: req.body.price,
        //rating: req.body.rating,
        veg_nonveg: req.body.veg_nonveg,
        tag: req.body.tag,
        add_on: req.body.add_on
    });
    Vendor.findOne({ email: email }).then(out => {
        if (out.shop_name !== newProduct.shop_name) {
            return res.status(400).json({ status: "failed to add food item", product: newProduct });
        }
        else {

            FoodItem.findOne({ name: newProduct.name, shop_name: req.body.shop_name }).then(output => {
                if (!output) {
                    newProduct
                        .save()
                        .then(newProduct => {
                            return res.status(200).json({ status: "success" });
                        })
                        .catch(err => {
                            return res.status(400).json({ status: "failed to add food item", product: newProduct });
                        });
                }
                else {
                    //console.log(shop_name);
                    return res.status(400).json({ status: "Item already exists in the given shop" });
                }
            })
        }
    })
});
router.get("/", function (req, res) {
    Vendor.find(function (err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    })
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
    let vendor = new Vendor(req.body);
    vendor.save()
        .then(vendor => {
            console.log("Done")
            res.status(200).json({ Vendor: "Vendor registered!" });
        })
        .catch(err => {
            console.log(err)
            res.status(400).json();
        });
});
router.post("/profile", function (req, res) {
    //let usertype=localStorage.getItem('usertype')
    let vendor = new Vendor(req.body);
    if (!req.body.manager_name) {
        const email = req.body.email;
        Vendor.findOne({ email }).then(vendor => {
            // Check if user email exists

            //console.log("Done1");
            res.status(200).json({ manager_name: vendor.manager_name, email: vendor.email, contact_number: vendor.contact_number, shop_name: vendor.shop_name, opening_time: vendor.opening_time, closing_time: vendor.closing_time, password: vendor.password });
            //return user;

        });
    }
    else {
        const email = req.body.email;
        const info = ({ manager_name: vendor.manager_name, contact_number: vendor.contact_number, shop_name: vendor.shop_name, opening_time: vendor.opening_time, closing_time: vendor.closing_time, password: vendor.password })
        //User.update({email})
        console.log(info)
        console.log("hogaya")
        Vendor.updateOne({ email: email }, { $set: info }).then(vendor => {
            res.status(200).json({ status: "success" })
        })
            .catch(err => {
                console.log(err)
                res.status(400).json();
            });
        return vendor
    }

});
// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // Find user by email
    Vendor.findOne({ email }).then(vendor => {
        // Check if user email exists
        if (!vendor) {
            //console.log("Done2");
            return res.json({
                status: "Email not found",
            });
        }
        else {
            if (vendor.password != req.body.password) {
                //console.log("Done");
                return res.json({
                    status: "Incorrect password",
                })
            }
            else {
                //console.log("Done1");
                res.status(200).json({ status: "success", name: vendor.manager_name });
                return vendor;
            }
        }
    });
});

module.exports = router;

router.post("/stats", function (req, res) {
    //let usertype=localStorage.getItem('usertype')
    const email = req.body.email
    Vendor.findOne({ email: email }).then(output => {
        const shop = output.shop_name;
        Order.find({ vendor: shop }).then(out => {
            const arr = out;
            var buffer = {}
            var placed = arr.length, pending = 0, completed = 0;
            for (let i = 0; i < out.length; i++) {
                if (arr[i].status === "Completed") {
                    var name = arr[i].name
                    completed++;
                    if (!buffer[name]) {
                        const val = 1;
                        buffer[name] = val;
                    }
                    else {
                        var val = buffer[name];
                        val++;
                        buffer[name] = val;
                    }
                }
                if (arr[i].status !== "Completed" && arr[i].status !== "Rejected") {
                    pending++;
                }
            }
            var items = Object.keys(buffer).map(
                (key) => { return [key, buffer[key]] });
            items.sort(
                (first, second) => { return first[1] - second[1] }
            );
            var keys = items.map(
                (e) => { return e[0] });
            console.log(keys)

            return res.status(200).json({ placed: placed, pending: pending, completed: completed, top5: keys })
        })
    })
});