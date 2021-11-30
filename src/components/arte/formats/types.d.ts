
export type FormatArtControler = {
    getRangerLine: (inPointer: number, outPointer: number) => [number, (range: number) => [number, number]];
    getCoordinatePointer: (pointer: number) => { x: number, y: number }
    setInside: (index: boolean) => void
}
