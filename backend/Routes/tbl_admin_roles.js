const express = require('express');
const AdminRole = express.Router();
const { addAdminRole, updateAdminRole, getAdminRoles, deleteAdminRole } = require("../Controllers/tbl_admin_roles");

AdminRole.get("/api/admin/roles", getAdminRoles);
AdminRole.delete("/api/admin/roles/deleterole/:roleid", deleteAdminRole); 

AdminRole.post("/api/admin/roles/newrole", addAdminRole);
AdminRole.put("/api/admin/roles/updaterole/:roleid", updateAdminRole);

module.exports = { AdminRole };



// const express = require('express')
// const AdminRole = express.Router();

// const { addAdminRole, updateAdminRole } = require("../Controllers/tbl_admin_roles")

// AdminRole.post("/api/admin/roles/newrole", addAdminRole);                                  
// AdminRole.patch("/api/admin/roles/updaterole/:roleid", updateAdminRole);                                  

// module.exports = { AdminRole } 