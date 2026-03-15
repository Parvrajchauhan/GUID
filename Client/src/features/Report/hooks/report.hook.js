import { useContext } from "react";
import { ReportContext } from "../report.context";
import { genrate, getById, getall, ResumeBoost } from "../service/report.api";



export const useReport = () => {
    const context = useContext(ReportContext);
    const { Report, setReport, Loader, setLoader, Reports, setReports } = context;

    const Usegenrate = async ({ jobDescription, jobTitle, resume }) => {
        setLoader(true)
        let resp = null
        try {
            resp = await genrate({ jobDescription, jobTitle, resume })
            setReport(resp.report);
        }
        catch (error) {
            console.error('Report genration error:', error);
        }
        finally {
            setLoader(false);
        }
        return resp.report
    }

    const Usegetall = async () => {
        setLoader(true)
        try {
            const resp = await getall()
            setReports(resp.reports)
        }
        catch (error) {
            console.error('Report genration error:', error);
        }
        finally {
            setLoader(false);
        }
    }

    const UsegetById = async (reportId) => {
        setLoader(true)
        try {
            const resp = await getById(reportId)
            setReport(resp.report)
        }
        catch (error) {
            console.error('Report genration error:', error);
        }
        finally {
            setLoader(false);
        }
    }

    const ResumePdf = async (reportId) => {
        setLoader(true);

        try {
            const response = await ResumeBoost({ reportId });

            const blob = new Blob([response], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `resume_${reportId}.pdf`;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("PDF download error:", error);
        } finally {
            setLoader(false);
        }
    };
    return { Report, Loader, Reports, UsegetById, Usegetall, Usegenrate, ResumePdf }
}