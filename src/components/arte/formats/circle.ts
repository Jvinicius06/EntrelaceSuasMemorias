import { createRemapXY } from '../../../controllers/utils';
import { FormatArtControler } from './types';

class CircleCore implements FormatArtControler {
    nails: number;
    size: number;
    radius: number;
    pos: number;

    constructor(nails: number, size: number) {
        this.nails = nails;
        this.size = size;
        this.radius = Math.round(Math.sqrt(Math.pow(size, 2) * 2) / 2);
        this.pos = 0;
        this.getRangerLine = this.getRangerLine.bind(this);
        this.getCoordinatePointer = this.getCoordinatePointer.bind(this);
        this.setInside = this.setInside.bind(this);
        this.setInside(false);
    }

    getRangerLine(inPointer: number, outPointer: number): [number, (range: number) => [number, number]] {
        const { x: initialX, y: initialY } = this.getCoordinatePointer(inPointer);
        const { x: destX, y: destY } = this.getCoordinatePointer(outPointer);
        const d = Math.round(Math.sqrt(Math.pow(destX - initialX, 2) + Math.pow(destY - initialY, 2)));
        return [d, createRemapXY(0, d, initialX, destX, initialY, destY)];
    }

    setInside(index: boolean): void {
        this.pos = index ? (this.size / 2) : this.radius;
    }

    getCoordinatePointer(pointer: number): { x: number, y: number } {
        const stepsPointer = (360 / this.nails);
        const x = (this.pos * Math.cos((stepsPointer * pointer) * Math.PI / 180)) + (this.size / 2);
        const y = (this.pos * Math.sin((stepsPointer * pointer) * Math.PI / 180)) + (this.size / 2);
        return { x, y };
    }

}

export default CircleCore;