/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useCallback, useEffect, useState } from 'react';
import ArteContext, { ArtCore } from '../../components/arte/ArteContext';
import { useSpring, to as interpolate } from '@react-spring/core';
import RangerInputComponent from '../../components/ranger';
import { ResizeObserver } from '@juggle/resize-observer';
import { Line } from '../../controllers/utils';
import NextButttom from '../../components/nextButtom';
import MyLoader from '../../components/myLoader';
import { animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';
import { Link } from 'react-router-dom';
import './index.scss';

// eslint-disable-next-line @typescript-eslint/ban-types
const ResultPage: React.FC<{}> = ({ }) => {
    const [scrubRef, bounds] = useMeasure({ polyfill: ResizeObserver });
    const [stateNumber, _setStateNumber] = useState(0);
    const [{ numberLine }, set] = useSpring(() => ({ numberLine: 0 }));
    const [load, setLoad] = useState<boolean | null>(null);
    const { myArte, setArrayLine, setStateNumberLine } = useContext(ArteContext);
    const { form, editImage, nails, size, arrayLines, stateNumberLine } = myArte || {};

    useEffect(() => {
        if (stateNumberLine) _setStateNumber(stateNumberLine);
    }, [stateNumberLine])

    useEffect(() => {
        set({ numberLine: stateNumber });
    }, [stateNumber]);

    const setStateNumber = useCallback((index: number) => {
        setStateNumberLine?.(index);
        _setStateNumber(index);
    }, [_setStateNumber, setStateNumberLine]);

    useEffect(() => {
        if (editImage && myArte && size) {
            const cnv = document.createElement('canvas');
            cnv.setAttribute('crossOrigin', 'anonymous');
            const cxt = cnv.getContext('2d');
            const img = new Image();
            img.src = editImage;
            img.setAttribute('crossOrigin', 'anonymous');
            img.addEventListener('error', () => { setLoad(false) });
            img.addEventListener('load', () => {
                cnv.height = cnv.width = size;
                if (cxt) cxt.imageSmoothingEnabled = false;
                cxt?.drawImage(img, 0, 0, img.width, img.height, 0, 0, cnv.width, cnv.height);
                const imageData = cxt?.getImageData(0, 0, cnv.width, cnv.height);
                if (imageData) {
                    const { data } = imageData;
                    myArte.lenght = size * size;
                    for (let i = 0; i < data.length; i += 4) {
                        myArte[(i / 4)] = (data[i + 3] > 0) ? true : false;
                    }
                }
                setTimeout(() => {
                    setLoad(true);
                }, 1000)
            });
        }
    }, [editImage, myArte, size]);

    const startProcessing = useCallback(() => {
        setLoad(null);
        if (myArte) {
            const myArtProtect = Object.assign({}, myArte);
            myArtProtect?.form?.setInside(false);
            for (let index = 0; myArte.lenght && index < myArte.lenght; index++) {
                myArtProtect[index] = myArte[index];
            }
            myArtProtect?.form?.setInside(false);
            processing(
                myArtProtect,
                (n) => {
                    console.log(n);
                }
            )
                .then((n) => {
                    setArrayLine?.(() => n);
                    setTimeout(() => {
                        setLoad(true);
                    }, 1000);
                    console.log(n)
                });
        }
    }, [myArte, processing]);

    const pathD = interpolate([numberLine, arrayLines?.length], (n, _b) => {
        let arrSTRPath = ' ';
        myArte?.form?.setInside(true);
        for (let i = 0; arrayLines && n && i < n; i++) {
            if (arrayLines[i]) {
                if (i === 0) {
                    const line = form?.getCoordinatePointer(arrayLines[i].outPointer);
                    if (line) arrSTRPath = `M ${line.x},${line.y}`;
                }
                const line = form?.getCoordinatePointer(arrayLines[i].outPointer);
                if (line) arrSTRPath += ` L ${line.x},${line.y}`;
            }
        }
        return arrSTRPath;
    });

    const pathLastLine = interpolate([numberLine, arrayLines?.length], () => {
        let arrSTRPath = '';
        if (form && arrayLines) {
            if (arrayLines[stateNumber]) {
                const lineIn = form?.getCoordinatePointer(arrayLines[stateNumber]?.inPointer);
                arrSTRPath += `M ${lineIn.x},${lineIn.y}`;
                const lineOut = form?.getCoordinatePointer(arrayLines[stateNumber]?.outPointer);
                arrSTRPath += `L ${lineOut.x},${lineOut.y}`;
            }
        }
        return arrSTRPath;
    });

    const getPointer = () => {
        if (arrayLines && form) {
            const lineIn = form?.getCoordinatePointer(arrayLines?.[stateNumber]?.inPointer);
            const lineOut = form?.getCoordinatePointer(arrayLines?.[stateNumber]?.outPointer);
            if (lineIn && lineOut)
                return (
                    <>
                        <circle cx={lineIn.x} cy={lineIn.y} r="8" stroke="none" fill="#00ff00" />
                        <circle cx={lineOut.x} cy={lineOut.y} r="8" stroke="none" fill="#0000ff" />
                    </>
                )
        }
        return null;
    }

    const divSize = (bounds.width > bounds.height ? bounds.height : bounds.width) - 10;

    if (load === null) return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ height: '300px' }}>
                <MyLoader size={200} />
            </div>
            <p>Este processo pode demorar de 1 a 2 minutos!</p>
            <p>Aguarde. mesmo que a pagina trave!</p>
        </div>
    );

    if (load === false) return <Link to="/"><h1>Erro inesperado inicia novamente!</h1></Link>;
    return (
        <div className="results-session">
            {(arrayLines == null || arrayLines?.length == 0) ? (
                <div className="startPros">
                    <div>
                        <NextButttom title="Start" onClick={() => startProcessing()} />
                    </div>
                    <p>Este processo pode demorar de 1 a 2 minutos!</p>
                </div>
            ) : (
                <>
                    <div className="topbar">
                        <div className="bef">
                            <NextButttom title="Anterior" onClick={() => { setStateNumber(stateNumber > 0 ? stateNumber - 1 : stateNumber) }} />
                        </div>
                        <div className="ranger">
                            <h3>{stateNumber}{' / '}{arrayLines?.length || 0}{' - '}{Math.floor(stateNumber / (arrayLines?.length || 0) * 100)}{'%'}</h3>
                            <RangerInputComponent
                                min={0}
                                max={arrayLines?.length || 0}
                                value={stateNumber}
                                onChange={(n) => {
                                    setStateNumber(n)
                                }} />
                        </div>

                        <div className="next">
                            <NextButttom title="Proximo" onClick={() => { setStateNumber((stateNumber < (arrayLines?.length || 0)) ? stateNumber + 1 : stateNumber) }} />
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h4>
                            {' do ponto '}
                            <span style={{ color: '#00bb00' }}>{arrayLines?.[stateNumber]?.inPointer}</span>
                            {' para o ponto '}
                            <span style={{ color: '#0000ff' }}>{arrayLines?.[stateNumber]?.outPointer}</span>
                        </h4>
                    </div>
                    <div ref={scrubRef} className="image">
                        <div style={{ width: `${divSize}px`, height: `${divSize}px` }}>
                            <svg width={1000} height={1000} style={{ transform: `scale(${(divSize) / 1000})` }}>
                                <animated.path fill="none" stroke="black" d={pathD} />
                                <animated.path fill="none" stroke="#ff0000" strokeWidth="6" d={pathLastLine} />
                                {
                                    getPointer()
                                }
                            </svg>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}


const getBlackPixlesImage = (arte: ArtCore) => {
    let count = 0;
    if (arte) {
        for (let i = 0; arte.lenght && i < arte.lenght; i += 4) {
            if (arte[i] == true) count++;
        }
    }
    return count;
}

const getNextLine = (arte: ArtCore, inPointer: number, lastLine?: Line) => {
    const largerPointer = { pointer: 0, numBlack: 0 };
    for (let i = 0; arte && arte.size && arte.form && arte.nails && i < arte.nails; i++) {
        if (inPointer === i) continue;
        if (lastLine?.outPointer === i) continue;
        if (lastLine?.inPointer === i) continue;
        const [distance, ranger] = arte.form.getRangerLine(inPointer, i);
        let count = 0;
        for (let d = 0; d < distance; d += 1) {
            const [x, y] = ranger(d);
            if (x <= arte.size && y <= arte.size && x >= 0 && y >= 0) {
                if (arte[(y * arte.size) + x]) count += 1;
            }
        }
        if (count > largerPointer.numBlack) {
            largerPointer.numBlack = count;
            largerPointer.pointer = i;
        }
    }
    return {
        inPointer,
        outPointer: largerPointer.pointer,
    }
};

const paintLine = (arte: ArtCore, line: Line, _clear = false) => {
    if (arte.size && arte && arte.form) {
        const [distance, rangeDistance] = arte.form.getRangerLine(line.inPointer, line.outPointer);
        for (let i = 0; i < distance; i++) {
            const [x, y] = rangeDistance(i);
            if (x <= arte.size && y <= arte.size && x >= 0 && y >= 0) {
                arte[x + (y * arte.size)] = (_clear == false);
            }
        }
    }
}

const processing: (myArte: ArtCore, calback: (number: number) => void) => Promise<Array<Line>> = (myArte, calback) => {
    return new Promise<Array<Line>>((results, _reject) => {
        setTimeout(() => {
            const arraLines: Array<Line> = [];
            const bp = getBlackPixlesImage(myArte);
            let pb = bp;
            let count = 0;
            for (; pb > (bp * 0.1) && count < 2000;) {
                myArte.form?.setInside(false);
                if (count % 20 === 0) calback(Math.floor((bp * 0.1) / Math.max(pb, (bp * 0.2)) * 100));
                count++;
                const pin = arraLines.length > 0 ? arraLines[arraLines.length - 1].outPointer : 0;
                const ln = getNextLine(myArte, pin, arraLines[arraLines.length - 1])
                arraLines.push(ln);
                paintLine(myArte, ln, true);
                pb = getBlackPixlesImage(myArte);
            }
            results(arraLines);
        }, 1000);
    });
}

export default ResultPage;
