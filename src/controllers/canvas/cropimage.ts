
import { Area } from 'react-easy-crop/types';

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.src = url;
    });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0, cancelFunction?: (rej: (reason: any) => void) => void): Promise<string> {
    return new Promise((acept, reject) => {
        cancelFunction?.(reject);
        createImage(imageSrc)
            .then((image) => {

                const canvas = document.createElement('canvas');
                canvas.setAttribute('crossOrigin', 'anonymous');
                const ctx = canvas.getContext('2d');

                const maxSize = Math.max(image.width, image.height);
                const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

                canvas.width = safeArea;
                canvas.height = safeArea;

                ctx?.translate(safeArea / 2, safeArea / 2);
                ctx?.rotate((rotation * Math.PI) / 180);
                ctx?.translate(-safeArea / 2, -safeArea / 2);

                ctx?.drawImage(
                    image,
                    safeArea / 2 - image.width * 0.5,
                    safeArea / 2 - image.height * 0.5
                );
                const data = ctx?.getImageData(0, 0, safeArea, safeArea);

                canvas.width = pixelCrop.width;
                canvas.height = pixelCrop.height;

                if (data) ctx?.putImageData(
                    data,
                    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
                    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
                );

                acept(canvas.toDataURL());
            })
            .catch(reject);
    });
}
