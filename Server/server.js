require('dotenv').config();
const app=require('./src/app');
const connectDB = require('./src/db/db');
const { generateResponse } = require('./src/services/ai.service');
const { jobTitle, jobDescription, resumeText } = require('./src/services/example');


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const report ={"jobTitle":jobTitle, "jobDescription":jobDescription, "resumeText":resumeText};
  generateResponse(report);
  console.log(`Server is running on port ${PORT}`);
});