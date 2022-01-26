import React from "react";

interface ImagePreviewProps {
    file: File
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file }) => {
    const [image, setImage] = React.useState<string>();
    const fr = new FileReader();
    
    fr.addEventListener('load', () => {
        if (typeof fr.result === 'string') {
            setImage(fr.result);
        }
    });
    fr.readAsDataURL(file);

    return <img src={image} width={224}/>
}