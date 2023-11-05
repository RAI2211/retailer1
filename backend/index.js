const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var cors = require("cors");
app.use(cors());


const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 5000;

const {AdminUser} = require("./Routes/tbl_admin_user")
app.use("/", AdminUser);

const {AdminRole} = require("./Routes/tbl_admin_roles")
app.use("/", AdminRole);
  
const {Product} = require("./Routes/tbl_admin_product_category")
app.use("/",Product); 

const {Subcategory} = require("./Routes/tbl_admin_subcategory")
app.use("/",Subcategory); 
const {AdminRoleAssign} = require("./Routes/tbl_admin_role_assign")
app.use("/",AdminRoleAssign); 



 const {adminoffer} = require("./Routes/tbl_admin_offer")
 app.use("/",adminoffer); 
 const {Retailer} = require("./Routes/Tbl_retailer_register")
 app.use("/",Retailer); 
 const {bankingdetail} = require("./Routes/tbl_retailer_banking")
 app.use("/",bankingdetail); 
 const {product} = require("./Routes/tbl_retailer_products")
 app.use("/",product); 
 const {productdescription} = require("./Routes/tbl_retailer_product_description")
 app.use("/",productdescription); 
 const {retailerProductsImages} = require("./Routes/tbl_retailer_product_images")
 app.use("/",retailerProductsImages); 



 
//    SWAGGER REQUIRE 
const swaggerui = require('swagger-ui-express') 
const swaggerJSDoc = require('swagger-jsdoc');


const option = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "NODE API documentation  BY Rai",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./Routes/tbl_admin_user.js"]
}


const swaggerSpec = swaggerJSDoc(option)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec))

// app.use('/testing', swaggerui.serve, swaggerui.setup(swaggerJSDoc(option)));





app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
});