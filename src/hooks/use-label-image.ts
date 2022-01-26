import { browser, scalar, tidy, reshape, GraphModel as TFGraphModel, Tensor } from "@tensorflow/tfjs";
import { LabelResult, Result } from "../types";
import { imageToCanvas } from "../utils";

interface LabelImage {
    (model: GraphModel, image: File, threshold?: number): Promise<LabelResult>
}

export declare class GraphModel extends TFGraphModel {
    readonly metadata: {
        labels: string[],
    };
}

export const buildUseLabelImage = (
    fileReader: FileReader = new FileReader(),
    img: HTMLImageElement = new Image()
): LabelImage => {
    const subTensor = scalar(127.5);
    const mulTensor = scalar(1 / 127.5);
    return async (model: GraphModel, file: File, threshold: number = 0.9): Promise<LabelResult> => {
        const { shape } = model.inputs[0];
        if (shape === undefined) throw new Error('model has no input shape');
        const labels = model.metadata.labels;

        const canvas = await imageToCanvas(file, shape[1], fileReader, img);

        const imageTensor = await browser.fromPixelsAsync(canvas);
        const results = tidy(() => (
            model.execute({
                'input': reshape(imageTensor, shape).sub(subTensor).mul(mulTensor).toFloat(),
            }) as Tensor).dataSync()
        );

        let label: string | undefined;
        results.forEach((value, i) => {
            if (value >= threshold) {
                label = labels[i];
                return;
            }
        })

        imageTensor.dispose();
        return {
            file,
            label,
            predictions: labels.map<Result>((label, index) => ({
                label: label,
                prediction: results[index],
            })),
        }
    }
}