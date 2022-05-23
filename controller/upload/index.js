const express = require("express");
const router = express.Router();
const {dataInput} = require('./upFileController');
// 上传文件 pdf png jpg excel word 等
router.post('/upload', (req, res) => {
    return dataInput(req,res)

})
module.exports = router
