import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormControlLabel } from '@mui/material';
import { io, loadGraphModel } from '@tensorflow/tfjs';
import { GraphModel } from '../hooks/use-label-image';
import { useAppState } from './AppContext';
import { Action } from '../reducer';


export interface LoadModelDialogProps {
    visible: boolean
    close: () => void
}

export const LoadModelDialog: React.FC<LoadModelDialogProps> = ({
    visible,
    close,
}) => {
    const { dispatch } = useAppState();
    const [jsonFile, setJsonFile] = React.useState<File>();
    const [weightFiles, setWeightFiles] = React.useState<File[]>([]);

    const onSubmit = async () => {
        if (!jsonFile) return;
        console.log([jsonFile, ...weightFiles]);
        const model = await loadGraphModel(io.browserFiles([jsonFile, ...weightFiles])) as GraphModel;

        const result = await model.save('localstorage://model');
        console.log(result);

        dispatch({ type: Action.ModelLoaded });
    }

    const onJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList === null || fileList.length !== 1) return;
        const file = fileList.item(0);
        if (file === null) return;
        setJsonFile(file);
    }

    const onWeights = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList === null || fileList.length === 0) return;

        const files: File[] = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList.item(i);
            if (file === null) return;
            files.push(file);
        }
        setWeightFiles(files);
    }

    return (
        <Dialog open={visible}>
            <DialogTitle>Import Model</DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <FormControlLabel
                        label="JSON"
                        labelPlacement='start'
                        control={<input type="file" onChange={onJSON} />} />
                    <FormControlLabel
                        label="Weights"
                        labelPlacement='start'
                        control={<input type="file" multiple={true} onChange={onWeights} />} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={onSubmit}>Import</Button>
            </DialogActions>
        </Dialog>
    );
}