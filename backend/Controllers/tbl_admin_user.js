const connection = require("../Model/model");
const bcrypt = require('bcrypt');///changes

const Joi = require("joi");
const getAdminUser = async(req, res) =>{ 
   try{
    let sqlQuery = "select * from tbl_admin_user";
    let data = req.body;

    await connection.query(sqlQuery, data, function(error, result){
        if(error){
            console.log("error", error.sqlMessage)
        }
        else{
            res.json(result)
        }
    })
   }catch(error){
    console.log(error.message)
   }
}

// const addAdminUser = async(req, res)=>{
//     try{
//         let sqlQuery = "insert into tbl_admin_user set?";
//         let data = {
//             uid: req.body.uid,
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password,
//             mobile: req.body.mobile,
//             photo:req.file.location,
//             aadhaar: req.body.aadhaar,
//             doj: req.body.doj,
//             qualification: req.body.qualification,
//             dob: req.body.dob,
//             address: req.body.address,
//             //state: req.body.state,
//             city: req.body.city,
//             pin: req.body.pin,
            
//         }

//         await connection.query(sqlQuery, data, function(error, result){
//             if(error){
//                 console.log("error", error.sqlMessage)
//             }
//             else{
//                 res.json(result)
//             }
//         })

//     }catch(error){
//         console.log("error found...")
//     }
// }




const addAdminUser = async (req, res) => {
    try {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const data = {
        uid: req.body.uid,
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    mobile: req.body.mobile,
                    photo:req.file.location,
                    aadhaar: req.body.aadhaar,
                    doj: req.body.doj,
                    qualification: req.body.qualification,
                    dob: req.body.dob,
                    address: req.body.address,
                    state: req.body.state,
                    city: req.body.city,
                    pin: req.body.pin,
      };
  
      const sqlQuery = "INSERT INTO tbl_admin_user SET ?";
  
      await connection.query(sqlQuery, data, (error, result) => {
        if (error) {
          console.log("Error:", error.sqlMessage);
          res.status(500).json({ error: "Internal Server Error" }); // Return an error response
        } else {
          res.json(result);
        }
      });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal Server Error" }); // Return an error response
    }
  };

const updateAdminUser = async (req, res) => {
    try {
        const userId = req.params.useruid; // Assuming you pass the user ID as a URL parameter
        const updatedData = {
            // Extract updated data from req.body
            uid: req.body.uid,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile,
            photo: req.body.photo,
            aadhaar: req.body.aadhaar,
            doj: req.body.doj,
            qualification: req.body.qualification,
            dob: req.body.dob,
            address: req.body.address,
            city: req.body.city,
            pin: req.body.pin,
            status: req.body.status,
            
        };

        const sqlQuery = "UPDATE tbl_admin_user SET ? WHERE uid = ?";
        
        await connection.query(sqlQuery, [updatedData, userId], (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Failed to update user" });
            } else {
                res.json({ message: "User updated successfully" });
            }
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
////////////////////////////////////////////////////////////////////////////////////////////
const deleteAdminUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming you pass the user ID as a URL parameter
        const sqlQuery = "DELETE FROM tbl_admin_user WHERE uid = ?";
        
        await connection.query(sqlQuery, userId, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Failed to delete user" });
            } else {
                res.json({ message: "User deleted successfully" });
            }
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const statusAdminUser = (req, res) => {
    try {
        let SqlQuery = 'UPDATE  tbl_admin_user SET status=? WHERE uid=?'
        let id = req.query.uid
        let data = req.query.status
        connection.query(SqlQuery, [data,id], function(err, result){
            if (err) {
            console.log("Error", err.sqlMessage)
            }  
            else {
                res.json(result)
            }
        })
    } catch (error) {
        console.log(error) 
}
}

const countAdminUsersByStatus = (req, res) => {
    try {
        const status = req.params.status; // Assuming you pass the status as a URL parameter
        const sqlQuery = "SELECT COUNT(*) AS count FROM tbl_admin_user WHERE status = ?";
        
        connection.query(sqlQuery, status, (error, result) => {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: "Failed to count users" });
            } else {
                const count = result[0].count;
                res.json({ count });
            }
        });
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports = {getAdminUser, addAdminUser, deleteAdminUser, updateAdminUser, statusAdminUser, countAdminUsersByStatus}