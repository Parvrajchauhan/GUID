
const { z } = require("zod");

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


module.exports = { ReportZodSchema };