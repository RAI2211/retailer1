const connection = require("../Model/model");

const addRetailer = async (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_register SET ?";
        let data = {
            Reg_no: req.body.Reg_no,
            Gst_no: req.body.GST_no,
            Tin: req.body.Tin,
            Pan: req.body.Pan,
            Shop_name: req.body.shop_name,
            Owner_name: req.body.Owner_name,
            Password: req.body.Password,
            Mobile: req.body.Mobile,
            Email: req.body.Email,
            Address: req.body.Address,
            State: req.body.State,
            Region: req.body.Region,
            City: req.body.City,
            Pin: req.body.Pin,
            Registration_doc: req.file.location,
            Pan_doc: req.body.Pan_doc,
            Shop_doc: req.body.Shop_doc,
            Terms_and_Conditions: req.body.Terms_and_Conditions,
            Status: req.body.Status,
        };

        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error inserting data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const getRetailerByRegNo = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "SELECT * FROM tbl_retailer_register WHERE Reg_no = ?";
        await connection.query(sqlQuery, [regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error retrieving data" });
            } else {
                if (result.length === 0) {
                    res.status(404).json({ message: "Data not found" });
                } else {
                    res.json(result);
                }
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

// Update other functions in a similar way to use the correct field names based on the database schema.

const updateRetailer = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "UPDATE tbl_retailer_register SET ? WHERE Reg_no = ?";
        let updatedData = {
            Gst_no: req.body.GST_no,
            Tin: req.body.TIN_no,
            Pan: req.body.PAN,
            Shop_name: req.body.shop_name,
            Owner_name: req.body.owner_name,
            Password: req.body.password,
            Mobile: req.body.mobile,
            Email: req.body.email,
            Address: req.body.address,
            State: req.body.state,
            Region: req.body.region,
            City: req.body.city,
            Pin: req.body.pin,
            Registration_doc: req.file.location,
            Pan_doc: req.body.docpan,
            Shop_doc: req.body.docshop,
            Terms_and_Conditions: req.body.terms_and_conditions,
            Status: req.body.status,
        };

        await connection.query(sqlQuery, [updatedData, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const updateStatus = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "UPDATE tbl_retailer_register SET Status = ? WHERE Reg_no = ?";
        const updatedStatus = req.body.status;
        await connection.query(sqlQuery, [updatedStatus, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating status" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const updatePassword = async (req, res) => {
    try {
        const regno = req.params.regno;
        let sqlQuery = "UPDATE tbl_retailer_register SET Password = ? WHERE Reg_no = ?";
        const updatedPassword = req.body.password;
        await connection.query(sqlQuery, [updatedPassword, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating password" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const updateDocuments = async (req, res) => {
    try {
        const Reg_no = req.params.Reg_no;
        let sqlQuery = "UPDATE tbl_retailer_register SET Registration_doc = ?, Pan_doc = ?, Shop_doc = ? WHERE Reg_no = ?";
        const Registration_doc = req.file.location;
        const Pan_doc = req.body.Pan_doc;
        const Shop_doc = req.body.Shop_doc;
        await connection.query(sqlQuery, [Registration_doc, Pan_doc, Shop_doc, regno], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error updating documents" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

const viewAllShops = async (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_retailer_register";
        await connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                res.status(500).json({ error: "Error retrieving data" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("error found...");
        res.status(500).json({ error: "Error processing request" });
    }
};

module.exports = { addRetailer, getRetailerByRegNo, updateRetailer, updateStatus, updatePassword, updateDocuments, viewAllShops };
