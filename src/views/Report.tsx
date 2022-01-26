import { Button } from '@mui/material';
import React from 'react';
import { useAppState } from '../components/AppContext';
import { ReportTable } from '../components/ReportTable';
import { downloadCSV } from '../utils';

export const Report: React.FC = () => {
    const { report } = useAppState();
    if (!report) {
        return <>Please label images before attempting to view the report</>
    }

    const downloadReportAsCSV = () => {
        const header = ["path", "label"];
        const rows = report.results.map(result => {
            const row: any = {}
            // row.path = result.file.path;
            row.label = result.label;
            Object.values(result.predictions).forEach(({ label, prediction }) => {
                const h = `${label}-confidence`;
                if (!header.includes(h)) header.push(h);
                row[h] = prediction;
            });
            return row;
        })

        const csv = [header, ...rows.map(row => header.map((h) => row[h]))];
        const csvString = csv.map(row => row.join(',')).join('\n');
        console.log(csvString);
        downloadCSV(csvString, `report-${report.timestamp.toISOString()}`)

    }
    return <>
        <Button onClick={downloadReportAsCSV}>Download as CSV</Button>

        <ReportTable report={report} />
    </>;
}