const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

const ReportZodSchema = z.object({

    matchScore: z.number()
        .min(0)
        .max(100)
        .describe("ATS compatibility score from 0 to 100"),

    overallFeedback: z.string()
        .describe("Overall evaluation of the resume"),

    strengths: z.array(z.string())
        .describe("List of strengths that align with the job requirements"),

    weaknesses: z.array(z.string())
        .describe("Areas where the resume does not match the job description"),

    skillGap1Skill:     z.string().describe("Name of missing/weak skill #1"),
    skillGap1Severity:  z.enum(["Low", "Medium", "High"]).describe("Severity of skill gap #1"),

    skillGap2Skill:     z.string().describe("Name of missing/weak skill #2"),
    skillGap2Severity:  z.enum(["Low", "Medium", "High"]).describe("Severity of skill gap #2"),

    skillGap3Skill:     z.string().describe("Name of missing/weak skill #3"),
    skillGap3Severity:  z.enum(["Low", "Medium", "High"]).describe("Severity of skill gap #3"),

    skillGap4Skill:     z.string().describe("Name of missing/weak skill #4"),
    skillGap4Severity:  z.enum(["Low", "Medium", "High"]).describe("Severity of skill gap #4"),

    skillGap5Skill:     z.string().describe("Name of missing/weak skill #5"),
    skillGap5Severity:  z.enum(["Low", "Medium", "High"]).describe("Severity of skill gap #5"),

    technicalQuestion1:          z.string().describe("Technical interview question #1"),
    technicalQuestion1Intention: z.string().describe("What skill technical question #1 is testing"),

    technicalQuestion2:          z.string().describe("Technical interview question #2"),
    technicalQuestion2Intention: z.string().describe("What skill technical question #2 is testing"),

    technicalQuestion3:          z.string().describe("Technical interview question #3"),
    technicalQuestion3Intention: z.string().describe("What skill technical question #3 is testing"),

    technicalQuestion4:          z.string().describe("Technical interview question #4"),
    technicalQuestion4Intention: z.string().describe("What skill technical question #4 is testing"),

    technicalQuestion5:          z.string().describe("Technical interview question #5"),
    technicalQuestion5Intention: z.string().describe("What skill technical question #5 is testing"),

    behavioralQuestion1:          z.string().describe("Behavioral interview question #1"),
    behavioralQuestion1Intention: z.string().describe("What soft skill behavioral question #1 is testing"),

    behavioralQuestion2:          z.string().describe("Behavioral interview question #2"),
    behavioralQuestion2Intention: z.string().describe("What soft skill behavioral question #2 is testing"),

    behavioralQuestion3:          z.string().describe("Behavioral interview question #3"),
    behavioralQuestion3Intention: z.string().describe("What soft skill behavioral question #3 is testing"),

    behavioralQuestion4:          z.string().describe("Behavioral interview question #4"),
    behavioralQuestion4Intention: z.string().describe("What soft skill behavioral question #4 is testing"),

    behavioralQuestion5:          z.string().describe("Behavioral interview question #5"),
    behavioralQuestion5Intention: z.string().describe("What soft skill behavioral question #5 is testing"),

    preparationPlan1FocusArea: z.string().describe("Main focus area for day 1"),
    preparationPlan1Task1:     z.string().describe("Task 1 for day 1"),
    preparationPlan1Task2:     z.string().describe("Task 2 for day 1"),
    preparationPlan1Task3:     z.string().describe("Task 3 for day 1"),

    preparationPlan2FocusArea: z.string().describe("Main focus area for day 2"),
    preparationPlan2Task1:     z.string().describe("Task 1 for day 2"),
    preparationPlan2Task2:     z.string().describe("Task 2 for day 2"),
    preparationPlan2Task3:     z.string().describe("Task 3 for day 2"),

    preparationPlan3FocusArea: z.string().describe("Main focus area for day 3"),
    preparationPlan3Task1:     z.string().describe("Task 1 for day 3"),
    preparationPlan3Task2:     z.string().describe("Task 2 for day 3"),
    preparationPlan3Task3:     z.string().describe("Task 3 for day 3"),

    preparationPlan4FocusArea: z.string().describe("Main focus area for day 4"),
    preparationPlan4Task1:     z.string().describe("Task 1 for day 4"),
    preparationPlan4Task2:     z.string().describe("Task 2 for day 4"),
    preparationPlan4Task3:     z.string().describe("Task 3 for day 4"),

    preparationPlan5FocusArea: z.string().describe("Main focus area for day 5"),
    preparationPlan5Task1:     z.string().describe("Task 1 for day 5"),
    preparationPlan5Task2:     z.string().describe("Task 2 for day 5"),
    preparationPlan5Task3:     z.string().describe("Task 3 for day 5"),
});

async function generateResponse(report) {
   const prompt = `
You are a senior career coach, ATS optimization expert, and technical interviewer with 15+ years of experience 
in talent acquisition across top tech companies. Your task is to perform a deep, comprehensive analysis of the 
candidate's resume against the provided job description and generate a structured, actionable report.

INPUT DATA

JOB TITLE:
${report.jobTitle}

JOB DESCRIPTION:
${report.jobDescription}

CANDIDATE RESUME:
${report.resumeText}

YOUR ANALYSIS TASKS

1. MATCH SCORE (matchScore)
   - Calculate an ATS compatibility score from 0 to 100.
   - Consider: keyword overlap, required skills present, experience level match,
     education requirements, tools/technologies mentioned in JD vs resume.
   - Be strict and realistic. Do NOT inflate the score.
   - 90–100: Near-perfect match. 70–89: Strong match. 50–69: Moderate. Below 50: Weak.


2. OVERALL FEEDBACK (overallFeedback)
   - Write a detailed 4–6 sentence professional evaluation.
   - Cover: candidate's current standing, how well they match the role,
     major red flags, standout strengths, and top priority improvements.
   - Be honest, constructive, and specific to THIS resume and THIS job.


3. STRENGTHS (strengths)
   - List 4–6 specific strengths from the resume that directly align with the JD.
   - Each strength should mention the skill/experience AND why it matters for this role.
   - Example: "3 years of React experience directly matches the JD's requirement for frontend development."


4. WEAKNESSES (weaknesses)
   - List 3–5 honest weaknesses or gaps in the resume relative to the JD.
   - Be specific. Don't say "lacks experience" — say WHAT experience is missing and WHY it matters.
   - Example: "No mention of CI/CD pipelines, which is listed as a required skill in the JD."

5. SKILL GAP ANALYSIS — Generate exactly 5 skill gaps
   Fill these fields: skillGap1Skill, skillGap1Severity ... skillGap5Skill, skillGap5Severity

   - skillGapNSkill: The exact name of the missing or weak skill
   - skillGapNSeverity: Must be exactly one of "High", "Medium", or "Low"
       • "High"   → Required/critical in JD, completely missing from resume
       • "Medium" → Mentioned in JD, weakly or indirectly present in resume
       • "Low"    → Nice-to-have in JD, minor gap
   - Order them from most critical (High) to least critical (Low).
   - Be specific: write "JWT Authentication" not just "Authentication".


6. TECHNICAL INTERVIEW QUESTIONS — Generate exactly 5 technical questions
   Fill these fields: technicalQuestion1, technicalQuestion1Intention ... technicalQuestion5, technicalQuestion5Intention

   - technicalQuestionN: A clear, specific, non-generic technical question based on missing skills or weak areas
   - technicalQuestionNIntention: What exact skill/concept is being tested and why it matters for THIS role
   - Range from conceptual (Q1–Q2) to practical/scenario-based (Q3–Q5).
   - Do NOT ask generic questions like "What is OOP?" — make them specific to the JD and resume.

7. BEHAVIORAL INTERVIEW QUESTIONS — Generate exactly 5 behavioral questions
   Fill these fields: behavioralQuestion1, behavioralQuestion1Intention ... behavioralQuestion5, behavioralQuestion5Intention

   - behavioralQuestionN: A STAR-format situational question ("Tell me about a time when...")
   - behavioralQuestionNIntention: The exact soft skill or trait being evaluated and its relevance to this role
   - Focus on: teamwork, problem-solving, deadline management, conflict resolution, learning agility.


8. PREPARATION PLAN — Generate exactly 5 days
   Fill these fields: preparationPlan1FocusArea, preparationPlan1Task1/2/3 ... preparationPlan5FocusArea, preparationPlan5Task1/2/3

   - preparationPlanNFocusArea: The specific skill or topic to focus on that day (not vague — e.g. "JWT Auth in Express.js" not "Backend")
   - preparationPlanNTask1/2/3: Three concrete, actionable tasks for that day. Examples:
       • "Build a login/register API using Express.js and JWT from scratch"
       • "Read the official MongoDB aggregation pipeline documentation"
       • "Watch Traversy Media's Node.js crash course on YouTube"
       • "Practice 5 LeetCode medium problems on arrays and hashmaps"
   - Day 1–2: Most critical High severity skill gaps
   - Day 3–4: Medium severity skill gaps with hands-on projects
   - Day 5:   Mock interview prep — practice all 10 generated questions out loud, record yourself

   STRICT OUTPUT RULES

- Output ONLY valid JSON. No markdown, no explanation, no text outside JSON.
- Every single field must be filled. No empty strings, no null values.
- Exactly 5 skill gaps, exactly 5 technical questions, exactly 5 behavioral questions, exactly 5 prep days.
- Each prep day must have exactly 3 tasks (Task1, Task2, Task3).
- severity values must be EXACTLY "High", "Medium", or "Low" — no other values accepted.
- Be specific to THIS resume and THIS job description. No generic filler content.
- Do not hallucinate skills not present in the resume or JD.
- Do not copy-paste raw text from the resume — always synthesize and analyze.
`;

    const rawSchema = zodToJsonSchema(ReportZodSchema);
    

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",          
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: rawSchema,  
        }
    });

    const parsed = JSON.parse(response.text);
    console.log("AI Response:", parsed);
    return parsed;                           
}

module.exports = {
    generateResponse
}