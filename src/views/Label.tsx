import React from 'react';
import { Button } from "@mui/material"
import * as tf from '@tensorflow/tfjs';
import { buildUseLabelImage, GraphModel } from '../hooks/use-label-image';
import { LinearProgressWithLabel } from '../components/LinearProgressWithLabel';
import { useAppState } from '../components/AppContext';
import { Action } from '../reducer';
import { LabelResult } from '../types';
import { OrganiseFiles } from '../components/OrganiseFiles';

export const Label: React.FC = () => {
    const { dispatch } = useAppState();
    const labelImage = buildUseLabelImage();
    const [files, setFiles] = React.useState<File[]>([]);
    const [count, setCount] = React.useState(0);
    const [max, setMax] = React.useState(0);

    const selectFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList === null) return;

        setCount(0);
        setMax(fileList.length);

        const f = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList.item(i);
            if (!file) continue;
            f.push(file);
        }
        setFiles(f);
    }

    const labelImages = async () => {
        const model = await tf.loadGraphModel('./model.json');

        const results: LabelResult[] = [];
        const profile = await tf.profile(async () => {
            for (let i = 0; i < files.length; i++) {
                results.push(await labelImage(model as GraphModel, files[i]));
                setCount(i + 1);
            }
        });
        console.log(profile);
        console.log(results);
        dispatch({
            type: Action.ReportCreated, report: {
                timestamp: new Date(),
                results,
            }
        });
    }

    return <>
        <input type="file" multiple={true} onChange={selectFiles}></input>
        <Button disabled={files.length === 0} onClick={labelImages}>
            Label Images
        </Button>
        <p>
            Loaded {count}/{max} images.
        </p>
        <LinearProgressWithLabel value={(count / max) * 100 || 0} />

        <hr/>
        <OrganiseFiles />
    </>
}