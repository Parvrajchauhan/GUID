const {generateResponse} = require("../services/ai.service");
const pdfParse = require("pdf-parse");
const Report = require("../models/Report.model");


const reportController = async (req, res) => {
    const resumeBuffer = req.file.buffer;
    const resumeText = (await (new pdfParse.PDFParse(Uint8Array.from(resumeBuffer))).getText()).text;
    const {jobTitle, jobDescription} = req.body;

    const aiResponse = await generateResponse({jobTitle, jobDescription, resumeText});

    const newReport = await Report.create({
        userId: req.user.id,
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

module.exports = {reportController}


