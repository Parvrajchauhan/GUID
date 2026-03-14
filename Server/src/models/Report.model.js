const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  intention: {
    type: String,
  }
},{
    _id: false
});

const SkillGapSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
},{
    _id: false
});

const PreparationPlanSchema = new mongoose.Schema({
  focusArea: {
    type: String,
  },
  tasks: [String]
},{
    _id: false  
});

const ReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    jobTitle: {
      type: String,
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    overallFeedback: {
      type: String,
    },

    strengths: [
      {
        type: String,
      },
    ],

    weaknesses: [
      {
        type: String,
      },
    ],

    skillGap: [SkillGapSchema],

    technicalQuestions: [QuestionSchema],

    behavioralQuestions: [QuestionSchema],

    preparationPlan: [PreparationPlanSchema]
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;