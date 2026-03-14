const express = require("express");
const {authMiddleware} = require("../middleware/auth.middleware");
const {reportController} = require("../controller/report.controller");
const {upload} = require("../middleware/resumePdf.middleware");

const reportRouter = express.Router();


reportRouter.post("/", authMiddleware,upload.single("resume"),reportController);
module.exports = reportRouter;