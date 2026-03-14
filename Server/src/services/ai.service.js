const { GoogleGenAI } = require("@google/genai");
const { zodToJsonSchema } = require("zod-to-json-schema");

const { ReportZodSchema } = require("./zodSchema");

const {prompt} = require('./promte');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

function reshapeResponse(data) {
    return {
        matchScore:      data.matchScore,
        overallFeedback: data.overallFeedback,
        strengths:       data.strengths,
        weaknesses:      data.weaknesses,

        skillGap: [1, 2, 3, 4, 5].map(i => ({
            skill:    data[`skillGap${i}Skill`],
            severity: data[`skillGap${i}Severity`],
        })),

        technicalQuestions: [1, 2, 3, 4, 5].map(i => ({
            question:  data[`technicalQuestion${i}`],
            intention: data[`technicalQuestion${i}Intention`],
        })),

        behavioralQuestions: [1, 2, 3, 4, 5].map(i => ({
            question:  data[`behavioralQuestion${i}`],
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

module.exports = {
    generateResponse
}