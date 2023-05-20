const express = require("express");
const router = express.Router();
const AdminSchema = require("../Models/AdmindataModel")

router.post("/add", async (req, res) => {
    try {
        const formDataChunks = req.body;
        const responses = [];

        for (let chunk of formDataChunks) {
            const response = await AdminSchema.insertMany(chunk);
            responses.push(response);
        }

        res.status(200).json(responses);
    } catch (err) {
        res.status(500).json({ error: "Data not submitted." });
    }
});



// get all data from the data base 
router.get("/getdata", async (req, res) => {
    try {
        const response = await AdminSchema.find({})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


// get data by id 
router.get("/getbyid/:id", async (req, res) => {
    try {
        const Id = req.params.id
        const isData = await AdminSchema.findById(Id)
        if (isData) {
            res.status(200).json(isData)
        } else {
            res.status(400).json({ message: "No data Found" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

// filed data value in the single array 
router.get("/list/:fielName", async (req, res) => {
    try {
        const FieldName = req.params.fielName
        const isData = await AdminSchema.distinct(FieldName)
        if (isData) {
            res.status(200).json(isData)
        }
    } catch (error) {
        res.status(500).json({ message: "No data found" })
    }
})

// data filed name with id in a array 
router.get("/objlist/:fieldName", async (req, res) => {
    try {
        const FieldName = req.params.fieldName
        const isData = await AdminSchema.find({}).select(FieldName)
        if (isData) {
            res.status(200).json(isData)
        }
    } catch (error) {
        res.status(500).json({ message: "No data found" })
    }
})


router.get("/multidata/:fieldNames", async (req, res) => {
    try {
        const fieldNames = req.params.fieldNames.split(",");
        const projection = fieldNames.join(" ");

        const isData = await AdminSchema.find({}).select(projection);
        if (isData) {
            res.status(200).json(isData);
        }
    } catch (error) {
        res.status(500).json({ message: "No data found" });
    }
});





module.exports = router

