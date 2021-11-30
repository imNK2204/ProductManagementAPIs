const express = require("express");
const router = express.Router();
router.use(express.json());

const product = require("../models/product");

router.get("/productByCompanyId", async (req,res)=>{
    const cId = req.body.company_id;
    if(cId){
        const details = await product.findOne({company_id:cId});
        return res.json({data:details});
    }
    return res.json({data:"No Data Found"});
});

router.get("/productBySellerId", async (req,res)=>{
    const sId = req.body.seller_id;
    if(sId){
        const details = await product.findOne({seller_id:sId});
        return res.json({data:details});
    }
    return res.json({data:"No Data Found"});
});


router.post("/addProduct",(req,res)=>{
    const {addProduct} = req.body;

    if(addProduct){
        product.create(addProduct);
        return res.json({data:"New Product Add Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

router.put("/updateProductCategory", async (req,res)=>{
    const pId = req.body.product_id;
    const c = req.body.category;
    const details = await product.findOne({product_id:pId});
    if(details){
        product.updateMany({product_id:pId , category:c});
        return res.json({data:"Product Category Update Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

router.delete("/deleteProduct", async (req,res)=>{
    const pId = req.body.product_id;
    const deatils = await product.findOneAndDelete({product_id:pId});
    if(deatils){
        return res.json({data:"Delete Product Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

module.exports = router;