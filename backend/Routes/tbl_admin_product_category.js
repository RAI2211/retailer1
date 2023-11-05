const express = require('express');
const Product = express.Router();
const { addProduct,getProducts,updateProductCategory, findProductCategoriesByName } = require("../Controllers/tbl_admin_product_category");

Product.get("/api/admin/category/viewcategory", getProducts);


Product.post("/api/admin/category/addcategory", addProduct);
Product.patch("/api/admin/category/addcategory", updateProductCategory);
Product.post("/api/admin/category/addcategory", findProductCategoriesByName );

module.exports = { Product }