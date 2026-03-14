const {generateResponse} = require("../services/ai.service");
const pdfParse = require("pdf-parse");
const Report = require("../models/Report.model");


const reportController = async (req, res) => {
    const resumeBuffer = req.file.buffer;
    const resumeText = (await (new pdfParse.PDFParse(Uint8Array.from(resumeBuffer))).getText()).text;
    const {jobTitle, jobDescription} = req.body;

    const aiResponse = await generateResponse({jobTitle, jobDescription, resumeText});

    const newReport = await Report.create({
        user: req.user.id,
        jobTitle:jobTitle,
        jobDescription: jobDescription,
        resumeText: resumeText,
        matchScore: aiResponse.matchScore,
        overallFeedback: aiResponse.overallFeedback,
        strengths: aiResponse.strengths,
        weaknesses: aiResponse.weaknesses,
        skillGap: aiResponse.skillGap,
        technicalQuestions: aiResponse.technicalQuestions,
        behavioralQuestions: aiResponse.behavioralQuestions,
        preparationPlan: aiResponse.preparationPlan
    });

    res.json({ message: "Report generated successfully", report: newReport });

};

const getReportById = async (req, res) => {
    const {reportId} = req.params;

    try {
        const report = await Report.findOne({ _id: reportId, user: req.user.id });

        if (!report) {
            return res.status(404).json({ message: "Report not found", req: req.body, user: req.user });
        }
        res.json({ message: "Report found", report });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ message: "Reports retrieved successfully", reports });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {reportController, getReportById, getAllReports};


