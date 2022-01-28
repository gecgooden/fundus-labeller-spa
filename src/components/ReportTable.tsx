import { DataGrid } from '@mui/x-data-grid';
import { Report } from "../types";

interface ReportTableProps {
    report: Report
}

export const ReportTable: React.FC<ReportTableProps> = ({ report }) => {
    const rows = report.results.map((result, index) => ({
        id: index,
        name: result.file.name,
        label: result.label,
        confidence: getPrediction(result.label, result.predictions)?.toFixed(2) ?? '-'
    }));

    return (
        <div style={{ display: 'flex' }}>

        <DataGrid
            columns={[
                { type: 'string', headerName: 'Name', field: 'name', flex: 1 },
                { type: 'string', headerName: 'Label', field: 'label', flex: 1 },
                { type: 'string', headerName: 'Confidence', field: 'confidence', flex: 1 }
            ]}
            rows={rows}
            autoHeight={true}
            />
            </div>
    )
}

const getPrediction = (label: string | undefined, predictions: Array<{ label: string, prediction: number }>): number | undefined => {
    if (!label) return undefined;
    return predictions
        .filter(prediction => prediction.label === label)
        .pop()?.prediction;
}