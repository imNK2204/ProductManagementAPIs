const express = require("express")
const router = express.Router()
router.use(express.json())

const company = require("../models/company")

router.get("/companyproducts", async (req, res) => {
    const cid = req.body.company_id
    const detail = await company.findOne({ company_id: cid })

    if(detail){
        return res.json({ data: detail })
    }
    res.json({ data: "No reccord found" })
})

router.post("/addCompany", (req, res) => {
    const { addCompany } = req.body

    if(addCompany){
        company.create(addCompany)
        res.json({ data: "New Company Added" })
    }
    res.json({ data: "Something is wrong" })
})

router.put("/updateProductId", async (req,res)=>{
    const cid = req.body.company_id
    const name = req.body.name
    const findCid = await company.findOne({company_id: cid});
    if(findCid){
        const details = await company.findOneAndUpdate(
            { company_id: cid },
            { name: name }
        );
        return res.json({ data:"Company details Updated" })
    }
    return res.json({data:"No Record Found"})
});

router.delete("/deleteCompany", async (req,res)=>{
    const cid = req.body.company_id
    const findCid = await company.findOne({company_id:cid})
    if(findCid){
        company.findOneAndDelete(
            { company_id:cid }
        );
        return res.json({ data:"Delete Company Details" })
    }
    return res.json({data:"No Data Found"})
});


module.exports = router