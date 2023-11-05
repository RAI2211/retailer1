const connection = require("../Model/model");



const addSubCategory = async (req, res) => { 
    try {
        let sqlQuery = "INSERT INTO tbl_admin_subcategory SET ?";
        let data = {
            Pcategoryid: req.body.Pcategoryid,
            subcategoryid: req.body.subcategoryid,
            subcategoryname: req.body.subcategoryname,
            photo: req.file.location, // Use req.body.photo if needed
        };

        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: error.sqlMessage });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error found:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};
const getSubcategories = async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM tbl_admin_subcategory";

        await connection.query(sqlQuery, (error, results) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Error fetching subcategories" });
            } else {
                res.status(200).json({ subcategories: results });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const updateSubCategory = async (req, res) => {
    try {
        const { subcategoryid, subcategoryname, Pcategoryid, photo } = req.body;

        if (!subcategoryid || !subcategoryname || !Pcategoryid) {
            return res.status(400).json({ error: "subcategoryid, subcategoryname, and Pcategoryid are required fields" });
        }

        const sqlQuery = `
            UPDATE tbl_admin_subcategory
            SET subcategoryname = ?,
                Pcategoryid = ?,
                photo = ?,
                added = current_timestamp()
            WHERE subcategoryid = ?;
        `;
        const data = [subcategoryname, Pcategoryid, photo, subcategoryid];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Subcategory update failed" });
            } else {
                res.status(200).json({ message: "Subcategory updated successfully", affectedRows: result.affectedRows });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


const findSubcategoriesByName = async (req, res) => {
    try {
        const subcategoryName = req.query.subcategoryName;

        if (!subcategoryName) {
            return res.status(400).json({ error: "Subcategory name is required for search" });
        }

        const sqlQuery = "SELECT * FROM tbl_admin_subcategory WHERE subcategoryname = ?";
        const data = [subcategoryName];

        const [results] = await connection.query(sqlQuery, data);

        if (results.length === 0) {
            return res.status(404).json({ error: "Subcategory not found" });
        }

        res.status(200).json({ subcategories: results });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { addSubCategory, getSubcategories, updateSubCategory, findSubcategoriesByName };
