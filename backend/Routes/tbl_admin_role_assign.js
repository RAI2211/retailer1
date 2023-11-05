const express = require('express');
const AdminRoleAssign = express.Router();


const {addAdminRoleAssign,getAdminRoleAssign,getUserRoleAssign,revokeRole} = require("../Controllers/tbl_admin_role_assign");

AdminRoleAssign.get("/api/admin/roleassign/getroleAssign", getAdminRoleAssign);

AdminRoleAssign.post("/api/admin/roleassign/addroleAssign", addAdminRoleAssign);

AdminRoleAssign.get("/api/user/roleassign/getroleAssign/:uid", getUserRoleAssign);

AdminRoleAssign.delete("/api/admin/roleassign/revokeroles/:uid/:rolename",  revokeRole);

module.exports = { AdminRoleAssign };