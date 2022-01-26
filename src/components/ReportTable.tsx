import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Report } from "../types";

interface ReportTableProps {
    report: Report
}

export const ReportTable: React.FC<ReportTableProps> = ({ report }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Confidence</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
            {report.results.map(({ file, label, predictions }, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>
                        {file.name}
                    </TableCell>
                    <TableCell>
                        {label || '-'}
                    </TableCell>
                    <TableCell>
                        {getPrediction(label, predictions)?.toFixed(4) || '-'}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)

const getPrediction = (label: string | undefined, predictions: Array<{ label: string, prediction: number }>): number | undefined => {
    if (!label) return undefined;
    return predictions
        .filter(prediction => prediction.label === label)
        .pop()?.prediction;
}