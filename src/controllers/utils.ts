
interface ImageArt {
    size: number;
    radius: number;
    pointers: number;
    centerImg?: number;
    blackPixels?: number;

    length: number;
    [index: number]: boolean;
}

interface Line {
    inPointer: number;
    outPointer: number;
}

export const createRemapXY = (inMin: number, inMax: number, outXMin: number, outXMax: number, outYMin: number, outYMax: number): (index: number) => [x: number, y: number] => {
    return function remaper(index: number) {
        return [
            Math.round((index - inMin) * (outXMax - outXMin) / (inMax - inMin) + outXMin),
            Math.round((index - inMin) * (outYMax - outYMin) / (inMax - inMin) + outYMin),
        ];
    };
}

export const createRemap = (inMin: number, inMax: number, outMin: number, outMax: number): (x: number) => number => {
    return function remaper(x: number) {
        return Math.round((x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
    };
}

export type {
    Line,
    ImageArt,
}