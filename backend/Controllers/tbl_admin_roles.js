const connection = require("../Model/model");

const getAdminRoles = async (req, res) => {
    try {
        let sqlQuery = "SELECT * FROM tbl_admin_roles";
        
        await connection.query(sqlQuery, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Failed to fetch roles" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const addAdminRole = async (req, res) => {
    try {
        let sqlQuery = "INSERT INTO tbl_admin_roles SET ?";
        let data = {
            roleid: req.body.roleid,
            rolename: req.body.rolename,
        };

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Role addition failed" });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("server error");
    }
};

const updateAdminRole = async (req, res) => {
    try {
        const { roleid, rolename } = req.body;

        if (!roleid || !rolename) {
            return res.status(400).json({ error: "Roleid and rolename are required fields" });
        }

        const sqlQuery = "UPDATE tbl_admin_roles SET rolename = ? WHERE roleid = ?";
        const data = [rolename, roleid];

        await connection.query(sqlQuery, data, (error, result) => {
            if (error) {
                console.error("Database Error:", error);
                return res.status(500).json({ error: "Role update failed" });
            } else {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "Role not found" });
                }
                res.status(200).json({ message: "Role updated successfully" });
            }
        });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteAdminRole = async (req, res) => {
    try {
        const roleId = req.params.roleid;
        let sqlQuery = "DELETE FROM tbl_admin_roles WHERE roleid = ?";
        
        await connection.query(sqlQuery, roleId, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Failed to delete role" });
            } else {
                res.json({ message: "Role deleted successfully" });
            }
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { addAdminRole, updateAdminRole, getAdminRoles, deleteAdminRole };


