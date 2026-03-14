const express = require("express");
const {authMiddleware} = require("../middleware/auth.middleware");
const {reportController,getReportById,getAllReports} = require("../controller/report.controller");
const {upload} = require("../middleware/resumePdf.middleware");


const reportRouter = express.Router();


reportRouter.post("/", authMiddleware,upload.single("resume"),reportController);
reportRouter.get("/getall",authMiddleware,getAllReports);
reportRouter.get("/:reportId", authMiddleware, getReportById);

module.exports = reportRouter;