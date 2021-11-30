import React, { useState, useRef, useCallback, useEffect } from 'react';

import Canvas from '../canvas';

// eslint-disable-next-line @typescript-eslint/ban-types
const Threshold: React.FC<{
    image?: string,
    onChange?: (img: ImageData) => void,
}> = ({ image, onChange }) => {
    const imageThr = useRef(new Image());
    const [invert, setInvert] = useState<boolean>(false);
    const [threshold, setThreshold] = useState<number>(100);
    const [img, setImg] = useState<ImageData | null>();

    const draw = useCallback(
        (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
            imageThr.current.onload = function () {
                canvas.width = 400;
                canvas.height = 400;

                const w = canvas.width; //imageThr.current.width;
                const h = canvas.height; //imageThr.current.height;

                context.drawImage(imageThr.current, 0, 0, w, h);
                const im = context.getImageData(0, 0, w, h);

                for (let i = 0; i < im.data.length; i += 4) {
                    im.data[i + 3] = 255 - (im.data[i] = im.data[i + 1] = im.data[i + 2] = (im.data[i + 1] > threshold || im.data[i + 3] === 0) ? invert ? 0 : 255 : invert ? 255 : 0);
                }

                context.putImageData(im, 0, 0);
                setImg(im);
            };

            if (typeof image === 'string') imageThr.current.src = image;
        },
        [image, threshold, invert],
    );

    useEffect(() => {
        if (img && onChange) onChange(img);
    }, [img, onChange]);

    return (
        <div style={{ height: '100%', aspectRatio: '1', display: 'flex', flexDirection: 'row' }}>
            <div style={{ aspectRatio: '1', height: '100%', flex: 1 }} >
                <Canvas draw={draw} style={{ transform: 'scale(0.5)', position: 'static', left: 0, top: 0 }} />
            </div>
            <div style={{ aspectRatio: '1', height: '100%', flex: 1 }} >
                <input type="range" max={255} min={0} value={threshold} onChange={(e) => { setThreshold(parseInt(e.target.value)); }} />
                <input type="button" value="Invert" onClick={() => { setInvert(!invert); }} />
            </div>
        </div>
    );
};

export default Threshold