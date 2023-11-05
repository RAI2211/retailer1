const express = require('express')
const Retailer= express.Router();

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

const { addRetailer, getRetailerByRegNo, updateRetailer, updateStatus, updatePassword, updateDocuments, viewAllShops } = require("../Controllers/Tbl_retailer_register")

Retailer.post("/api/retailer/newshopregister", upload.single('photo'), addRetailer);  
Retailer.get("/api/retailer/viewshop/:regno", getRetailerByRegNo);
Retailer.put("/api/retailer/updateshop/:regno", updateRetailer );               
Retailer.patch("/api/retailer/updatestatus/:regno", updateStatus );               
Retailer.patch("/api/retailer/updatepwd/:regno", updatePassword );               
Retailer.patch("/api/retailer/updatedocuments/:regno", updateDocuments );               
Retailer.get("/api/admin/viewshops", viewAllShops );               
  
 
module.exports = { Retailer }
