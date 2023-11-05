const express = require('express');
const Subcategory = express.Router();
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
const { addSubCategory, getSubcategories, updateSubCategory, findSubcategoriesByName } = require("../Controllers/tbl_admin_subcategory");

Subcategory.get("/api/admin/subcategory/viewsubcategory", getSubcategories);

Subcategory.post("/api/admin/subcategory/addsubcategory",upload.single('photo') , addSubCategory);
Subcategory.put("/api/admin/subcategory/updatesubcategory/:subcategoryid", updateSubCategory);
Subcategory.get("/api/admin/subcategory/findsubcategory", findSubcategoriesByName);

module.exports = { Subcategory };
 






