import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
import { useAppState } from './AppContext';

interface Summary {
    [label: string]: number
    Total: number
}

export const ReportSummary: React.FC = () => {
    const { report } = useAppState();

    const summary: Summary = { Total: 0 };
    report?.results.forEach(({ label }) => {
        summary.Total++;
        const key = label ?? 'unknown';
        if (!summary[key]) {
            summary[key] = 0;
        }
        summary[key]++;
    })

    console.log(summary);

    return  <Table>
    <TableHead>
        <TableRow>
            { Object.keys(summary).map(key => <TableCell>{key}</TableCell>)}
        </TableRow>
    </TableHead>

    <TableBody>
        { Object.keys(summary).map(key => <TableCell>{summary[key]}</TableCell>)}
    </TableBody>
</Table>
}