const { GoogleGenAI } = require("@google/genai");
const { zodToJsonSchema } = require("zod-to-json-schema");

const { ReportZodSchema, ResumePdfSchema } = require("./zodSchema");

const { prompt, prompt1 } = require('./promte');
const puppeteer = require('puppeteer');
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

function reshapeResponse(data) {
    return {
        matchScore: data.matchScore,
        overallFeedback: data.overallFeedback,
        strengths: data.strengths,
        weaknesses: data.weaknesses,

        skillGap: [1, 2, 3, 4, 5].map(i => ({
            skill: data[`skillGap${i}Skill`],
            severity: data[`skillGap${i}Severity`],
        })),

        technicalQuestions: [1, 2, 3, 4, 5].map(i => ({
            question: data[`technicalQuestion${i}`],
            intention: data[`technicalQuestion${i}Intention`],
        })),

        behavioralQuestions: [1, 2, 3, 4, 5].map(i => ({
            question: data[`behavioralQuestion${i}`],
            intention: data[`behavioralQuestion${i}Intention`],
        })),

        preparationPlan: [1, 2, 3, 4, 5].map(i => ({
            focusArea: data[`preparationPlan${i}FocusArea`],
            tasks: [
                data[`preparationPlan${i}Task1`],
                data[`preparationPlan${i}Task2`],
                data[`preparationPlan${i}Task3`],
            ].filter(Boolean),
        })),
    };
}

async function generateResponse(report) {
    const promptContent = prompt(report);
    const rawSchema = zodToJsonSchema(ReportZodSchema);


    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: promptContent,
        config: {
            responseMimeType: "application/json",
            responseSchema: rawSchema,
        }
    });

    const rawText = response.text.trim().replace(/^```json|```$/g, "").trim();

    const parsed = JSON.parse(rawText);

    const final = reshapeResponse(parsed);

    return final;
}


async function generatePdfFromHTML(jsonContent) {

    const html = Array.isArray(jsonContent)
        ? jsonContent[0]
        : jsonContent.html;

    if (!html) {
        throw new Error("HTML content missing from AI response");
    }

    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: "networkidle0"
    });

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();


    return pdfBuffer;
}
async function generateResume(report) {
    const promptContent = prompt1(report);
    const rawSchema = zodToJsonSchema(ResumePdfSchema);


    const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: promptContent,
        config: {
            responseMimeType: "application/json",
            responseSchema: rawSchema,
        }
    });


    if (!response.text) {
        throw new Error("AI returned empty response");
    }

    let jsonContent;

    try {
        jsonContent = JSON.parse(response.text);
        const pdfBuffer = await generatePdfFromHTML(jsonContent);
        return pdfBuffer;
    } catch (err) {
        console.error("Invalid JSON from AI:", response.text);
        throw new Error("AI returned invalid JSON");
    }
}

module.exports = {
    generateResponse, generateResume
}