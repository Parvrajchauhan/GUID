const express = require("express");
const {authMiddleware} = require("../middleware/auth.middleware");
const {reportController,getReportById,getAllReports,generatePdf} = require("../controller/report.controller");
const {upload} = require("../middleware/resumePdf.middleware");


const reportRouter = express.Router();


reportRouter.post("/", authMiddleware,upload.single("resume"),reportController);
reportRouter.get("/getall",authMiddleware,getAllReports);
reportRouter.get("/:reportId", authMiddleware, getReportById);
reportRouter.post("/resume/pdf/:reportId",authMiddleware,generatePdf)

module.exports = reportRouter;