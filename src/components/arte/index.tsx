import React, { useCallback, useState, useEffect, useRef } from 'react';
import { json } from 'stream/consumers';
import { Line } from '../../controllers/utils';

import ArteContext, { ArtCore } from './ArteContext';
import CircleCore from './formats/circle';
import { FormatArtControler } from './formats/types';

const sizeMyArte = 1000;

// eslint-disable-next-line @typescript-eslint/ban-types
const ArteProvider: React.FC<{}> = ({ children }) => {
    const [form, _setFormat] = useState<FormatArtControler | null>(null);
    const [nails, setNais] = useState(0);
    const [editImage, _setEditeImage] = useState<string | null>('');
    const [originalImage, _setOriginalImage] = useState<string | null>('');
    const [arrayLines, _setarrayLines] = useState<Array<Line>>([]);
    const [stateNumberLine, _setStateNumberLine] = useState<number>(0);
    const preLoader = useRef(false);

    if (preLoader.current == false) {
        preLoader.current = true;
        const db = localStorage.getItem('oldArt');
        if (db) {
            const { nails, editImage, originalImage, arrayLines, stateNumberLine } = JSON.parse(db) as ArtCore;
            if (nails) _setFormat(new CircleCore(nails, sizeMyArte));
            if (nails) setNais(nails);
            if (editImage) _setEditeImage(editImage);
            if (originalImage) _setOriginalImage(originalImage);
            if (arrayLines) _setarrayLines(arrayLines);
            if (stateNumberLine) _setStateNumberLine(stateNumberLine);
        }
    }

    useEffect(() => {
        localStorage.setItem('oldArt', JSON.stringify({
            nails,
            editImage,
            originalImage,
            arrayLines,
            stateNumberLine,
        }))
    }, [arrayLines, editImage, form, nails, originalImage, stateNumberLine])

    const setFormat = useCallback((formmat: FormatArtControler) => {
        _setFormat(formmat);
    }, []);

    const setNNails = useCallback((nais: number) => {
        setNais(nais);
    }, []);

    const setOriginalImage = useCallback((image: string) => {
        _setOriginalImage(image);
    }, []);

    const setEditeImage = useCallback((image: string) => {
        _setEditeImage(image);
    }, []);

    const setStateNumberLine = useCallback((index: number) => {
        _setStateNumberLine(index);
    }, []);


    const setArrayLine = useCallback((callBackSet: (arr: Array<Line>) => Array<Line>) => {
        _setarrayLines(callBackSet(arrayLines));
    }, [arrayLines])

    return (
        <ArteContext.Provider value={{
            myArte: {
                originalImage,
                size: sizeMyArte,
                nails,
                form,
                editImage,
                arrayLines,
                stateNumberLine,
            } as ArtCore,
            setOriginalImage,
            setNNails,
            setFormat,
            setEditeImage,
            setArrayLine,
            setStateNumberLine,
        }}>
            {children}
        </ArteContext.Provider>
    );
}
export default ArteProvider;