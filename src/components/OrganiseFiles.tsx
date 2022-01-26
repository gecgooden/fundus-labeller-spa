import React from 'react';
import { Button } from '@mui/material';
import { useAppState } from "./AppContext"
import { LinearProgressWithLabel } from './LinearProgressWithLabel';

export const OrganiseFiles: React.FC = () => {
    const { report } = useAppState();
    const [numCompleted, setNumCompleted] = React.useState(0);

    if (!report) return <></>;

    const organiseFiles = async () => {
        const dirHandle = await window.showDirectoryPicker();
        for (let i = 0; i < report.results.length; i++) {
            const result = report.results[i];
            const subDirectoryName = result.label ?? 'unknown';
            const subDirectoryHandle = await dirHandle.getDirectoryHandle(subDirectoryName, { create: true });

            const file = await subDirectoryHandle.getFileHandle(result.file.name, { create: true });
            const writer = await file.createWritable();
            await writer.write(result.file);
            await writer.close();
            setNumCompleted(i+1);
        }
    }

    return <>
        <Button onClick={organiseFiles} >
            Organise Files
        </Button>
        <LinearProgressWithLabel value={(numCompleted / report.results.length) * 100 || 0} />
    </>
}