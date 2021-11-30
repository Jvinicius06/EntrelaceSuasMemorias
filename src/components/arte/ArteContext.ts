import React, { createContext } from 'react';
import { Line } from '../../controllers/utils';
import { FormatArtControler } from './formats/types';

export interface ArtCore {
    originalImage?: string;
    editImage?: string;
    form?: FormatArtControler;
    nails?: number;
    size?: number;
    stateNumberLine?: number;
    arrayLines?: Array<Line>;
    lenght?: number;
    [index: number]: boolean;
}

export interface ArtContextContext {
    myArte: ArtCore,
    setFormat: (formmat: FormatArtControler) => void,
    setNNails: (nais: number) => void,
    setOriginalImage: (image: string) => void,
    setEditeImage: (image: string) => void,
    setArrayLine: (callback: (arra: Array<Line>) => Array<Line>) => void,
    setStateNumberLine: (index: number) => void,
}

const ArteContext = createContext<Partial<ArtContextContext>>({});

export default ArteContext;