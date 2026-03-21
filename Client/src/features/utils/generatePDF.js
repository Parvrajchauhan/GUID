import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDFFromHTMLString(htmlString, filename = 'resume.pdf') {
    const container = document.createElement('div');
    container.innerHTML = `
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body, div { font-family: Arial, sans-serif; color: #1a1a1a; }

            h1 {
                font-size: 26px;
                font-weight: bold;
                color: #111;
                margin-bottom: 4px;
            }
            h2 {
                font-size: 15px;
                font-weight: bold;
                color: #2563eb;
                border-bottom: 2px solid #2563eb;
                padding-bottom: 4px;
                margin: 20px 0 10px 0;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            p {
                font-size: 13px;
                line-height: 1.6;
                color: #444;
                margin-bottom: 6px;
            }
            ul {
                padding-left: 18px;
                margin-bottom: 8px;
            }
            li {
                font-size: 13px;
                line-height: 1.7;
                color: #333;
                margin-bottom: 4px;
            }
            strong {
                font-weight: 600;
                color: #111;
            }
            a {
                color: #2563eb;
                text-decoration: none;
            }
            section {
                margin-bottom: 16px;
            }
        </style>
        ${htmlString}
    `;

    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '-9999px';
    container.style.width = '794px';
    container.style.background = '#ffffff';
    container.style.zIndex = '-1';

    document.body.appendChild(container);

    try {
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 794,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * pageWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(filename);

    } finally {
        document.body.removeChild(container);
    }
}