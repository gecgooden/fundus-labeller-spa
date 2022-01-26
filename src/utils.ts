export const readAsDataURL = (fileReader: FileReader = new FileReader()) =>
    (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            fileReader.onerror = reject;
            fileReader.addEventListener('load', () => {
                if (typeof fileReader.result === 'string') {
                    resolve(fileReader.result);
                } else {
                    reject();
                }
            });
            fileReader.readAsDataURL(file);
        });

export const createImage = (image: HTMLImageElement) => 
    (data: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            image.addEventListener('load', () => {
                resolve(image);
            });
            image.onerror = reject;
            image.src = data;
        })

export const imageToCanvas = async (file: File, targetSize: number = 224, fileReader: FileReader, imageElement: HTMLImageElement): Promise<HTMLCanvasElement> => {
    let data = await readAsDataURL(fileReader)(file);
    const image = await createImage(imageElement)(data);

    let canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    canvas.getContext('2d')?.drawImage(image, 0, 0, image.width, image.height,
                                              0, 0, targetSize, targetSize)

    return canvas;
}

export const downloadCSV = (input: string, filename: string) => {
    const blob = new Blob([input], { type: 'text/csv' });
    const anchor = document.createElement('a');
    anchor.download = `${filename}.csv`;
    anchor.href = URL.createObjectURL(blob)
    anchor.click()
}