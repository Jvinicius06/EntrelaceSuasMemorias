import React, { useContext, useEffect, useState, useCallback } from 'react';
import ArteContext from '../../components/arte/ArteContext';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import './index.scss';
import RangerInputComponent from '../../components/ranger';
import NextButttom from '../../components/nextButtom';
import getCroppedImg from '../../controllers/canvas/cropimage';
import { useHistory } from 'react-router';

// eslint-disable-next-line @typescript-eslint/ban-types
const EditePage: React.FC<{}> = ({ }) => {
    const history = useHistory();
    const { myArte, setEditeImage } = useContext(ArteContext);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);

    const [image, setImage] = useState<string | null>(null)
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [threshold, setThreshold] = useState<number>(100);


    useEffect(() => {
        if (myArte?.form === undefined || myArte?.form === null) history.push('/');
        if (myArte?.originalImage === undefined || myArte?.originalImage === null) history.push('/');
    }, [history, myArte?.form, myArte?.originalImage]);

    const onChangeRotate = (n: number) => {
        while (n < 360) {
            n += 360;
        }
        setRotation(n % 360);
    }

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCoomplet = () => {
        if (croppedImage && setEditeImage) {
            setEditeImage?.(croppedImage);
            history.push('/results');
        }
    }


    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let cancel: (res: any) => void | undefined;
        if (image && croppedAreaPixels) {
            getCroppedImg(
                image,
                croppedAreaPixels,
                rotation,
                (e) => {
                    cancel = e;
                }
            )
                .then((img) => {
                    setCroppedImage(img);
                })
                .catch((e) => {
                    if (e != 'Cancel') console.error(e)
                });
        }
        return () => {
            if (typeof cancel === 'function') cancel('Cancel');
        }
    }, [croppedAreaPixels, image, rotation]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let cancel: (res: any) => void = (_res: any) => { 1 }
        if (myArte) {
            new Promise<HTMLImageElement>((resolved, reject) => {
                cancel = reject;
                const { originalImage } = myArte;
                if (originalImage) {
                    const _img = new Image();
                    _img.src = originalImage;
                    _img.setAttribute('crossOrigin', 'anonymous');
                    _img.addEventListener('load', () => {
                        resolved(_img);
                    })
                } else {
                    cancel('No image');
                }
            })
                .then((_img) => {
                    if (croppedAreaPixels === undefined) {
                        const arr: Area = {
                            width: _img.width,
                            height: _img.height,
                            x: 0,
                            y: 0,
                        }
                        setCroppedAreaPixels(arr)
                    }
                    const canv = document.createElement("canvas");
                    const cxt = canv.getContext('2d');
                    canv.width = _img.width;
                    canv.height = _img.height;
                    cxt?.drawImage(_img, 0, 0);
                    canv.setAttribute('crossOrigin', 'anonymous');
                    const im = cxt?.getImageData(0, 0, canv.width, canv.height);
                    if (im) {
                        const { data } = im;
                        for (let i = 0; i < data.length; i += 4) {
                            data[i + 3] = 255 - (data[i] = data[i + 1] = data[i + 2] = ((data[i + 1] > threshold || data[i + 3] === 0) ? 255 : 0));
                        }
                        cxt?.putImageData(im, 0, 0);
                        setImage(canv.toDataURL('PNG'));
                    }
                })
                .catch((e) => {
                    if (e != 'Cancel') console.log(e);
                })
        }
        return () => {
            cancel('Cancel');
        }
    }, [croppedAreaPixels, myArte, threshold]);

    return (
        <div className="edite-page-session">
            <div className="edite-page-session-title">
                <p>Edite</p>
                <span>Posicione sua imagem e tente deixar ela somente com contornos</span>
            </div>
            <div className="edite-page-session-image">
                <div className="edite-page-session-image-results">
                    <Cropper
                        image={image || ''}
                        crop={crop}
                        rotation={rotation}
                        zoom={zoom}
                        minZoom={0.5}
                        aspect={1}
                        onCropChange={setCrop}
                        onRotationChange={onChangeRotate}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        style={{
                            containerStyle: { height: '100%', width: '100%', position: "relative" },
                        }}
                    />
                </div>
                <div className="edite-page-session-image-menu">
                    <div className="co">
                        <h4>Zoom</h4>
                        <RangerInputComponent value={zoom} onChange={setZoom} min={0.5} max={3} steps={0.1} />
                        <h4>Rotação</h4>
                        <RangerInputComponent value={rotation} onChange={setRotation} max={360} />
                        <h4>Saturação</h4>
                        <RangerInputComponent value={threshold} onChange={setThreshold} max={200} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <NextButttom onClick={() => onCoomplet()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditePage;
