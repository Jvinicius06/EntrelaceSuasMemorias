import React, { useRef, useEffect } from 'react';

const Canvas: React.FC<{
    drawAnimation?: (context: CanvasRenderingContext2D, frameCount: number) => void,
    draw?: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void,
    style?: React.CSSProperties | undefined,
    width?: number | string,
    height?: number | string,
}> = ({ drawAnimation, draw, ...rest }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        let frameCount = 0;
        let animationFrameId: number;

        const render = () => {
            frameCount++;
            if (context && drawAnimation) drawAnimation(context, frameCount);
            if (drawAnimation) animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [drawAnimation, canvasRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (context && draw && canvas) draw(context, canvas);
    }, [draw]);

    return <canvas ref={canvasRef} {...rest} />
};

export default Canvas;