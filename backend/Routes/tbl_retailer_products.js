const express = require('express')
const product= express.Router();

const aws = require('aws-sdk');
let  multerS3 = require('multer-s3');
let multer = require("multer")
const { S3Client } = require('@aws-sdk/client-s3');

const bucketName = "yatendra222111";

//store file in AWS S3 configuration 
const s3 = new S3Client({
    region:  "ap-south-1",
    credentials: {
        accessKeyId: "AKIA53GBRX3OJIHGIMWE",
        secretAccessKey: "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",
    }
})

//Storage Configuraion
let storage = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname })
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, file.originalname)
    }

})
let upload = multer({ storage: storage })

const { addProduct,getProductByRegNo,updateProductPrice,updateProductDiscount,updateProductQuantity,viewProductDetails } = require("../Controllers/tbl_retailer_products")





product.post('/api/addproduct',upload.single('photo'), addProduct);
product.get('/api/getproductsbyregno/:Reg_no', getProductByRegNo);
product.patch('/api/updateproductprice/:pid', updateProductPrice);
product.patch('/api/updateproductdiscount/:pid', updateProductDiscount);
product.patch('/api/updateproductquantity/:pid', updateProductQuantity);
product.get('/api/viewproductdetails', viewProductDetails);
   

 
module.exports = { product }