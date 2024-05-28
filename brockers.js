const express = require("express");
const router = express.Router();

router.get("/getPolicy/:id", (req, res) => {
    req.params.id
    res.send("User Policy");
})
router.post("/postPolicy", (req, res) => {
    
})
router.put("/putPolicy/:id", (req, res) => {
    
})