import axios from "axios";

const VITE_API_URL='https://guid-2.onrender.com'

const api = axios.create({
    baseURL: VITE_API_URL,
    withCredentials: true
});

export const genrate = async ({ jobDescription, jobTitle, resume }) => {

    const form = new FormData()
    form.append("jobDescription", jobDescription);
    form.append("jobTitle", jobTitle);
    form.append("resume", resume);

    const response = await api.post("/api/report/", form, {
        headers: { "Content-Type": "multipart/form-data" }
    })

    return response.data
}

export const getById = async (reportId) => {

    const response = await api.get(`/api/report/${reportId}`)

    return response.data
}

export const getall = async () => {

    const response = await api.get("/api/report/getall")

    return response.data
}

export const ResumeBoost = async ({ reportId }) => {
    const response = await api.post(
        `/api/report/resume/pdf/${reportId}`
    );
    return response.data.html;
};
