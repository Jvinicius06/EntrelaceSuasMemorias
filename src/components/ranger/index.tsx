import React, { useMemo, useRef, useEffect, useCallback, useState } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import useMeasure from 'react-use-measure';
import './index.scss'

interface RangerInputComponentProps {
    max?: number;
    min?: number;
    steps?: number;
    value?: number;
    onChange?: (index: number) => void;
}

const RangerInputComponent: React.FC<RangerInputComponentProps> = ({ max = 100, min = 0, steps = 1, value: initValue = 0, onChange }) => {
    const [scrubRef, bounds] = useMeasure({ polyfill: ResizeObserver });
    const [{ x, scale }, set] = useSpring(() => ({ x: 0, scale: 1 }));
    const draggingControl = useRef(false);
    const relativePosition = useRef(0);

    const [value, setValue] = useState(initValue);

    useEffect(() => {
        setValue(initValue);
    }, [initValue])

    const limits = useMemo(() => [-bounds.width / 2, bounds.width / 2], [bounds.width]);

    const setRelativePosition = useCallback((v: number) => {
        relativePosition.current = v / bounds.width;
        const val = (Math.floor(((v / bounds.width) + 0.5) * (max - min) / steps) * steps) + min;
        onChange?.(val);
    }, [bounds.width, max, min, onChange, steps]);

    const setOffsetToValue = useCallback(() => {
        const t = (bounds.width * (value - min) / (max - min));
        set({ x: (t - bounds.width / 2) });
    }, [bounds.width, max, min, set, value]);

    useEffect(() => {
        set({ x: relativePosition.current * bounds.width });
    }, [x, set, bounds.width]);

    useEffect(() => {
        setOffsetToValue();
    }, [setOffsetToValue, value]);

    const bling = useDrag(
        ({ last, xy: [px], movement: [mx], memo = px - bounds.left - bounds.width / 2 }) => {
            if (draggingControl.current || last) return;
            const x = Math.min(Math.max(memo + mx, limits[0]), limits[1]);
            set({ x });
            setRelativePosition(x);
            return memo;
        }
    );

    const bindControl = useDrag(
        ({ down, movement: [x] }) => {
            draggingControl.current = down;
            set({ x, scale: down ? 1.4 : 1 });
            setRelativePosition(x);
        },
        {
            initial: () => [x.get()],
            bounds: { left: limits[0], right: limits[1] },
        }
    );

    const widtht = x.to(limits, ['0%', '100%']);

    return (
        <div className="ranger-compponent-session">
            <div className="ranger-compponent-body" ref={scrubRef} {...bling()}>
                <animated.div className="ranger-compponent-line" style={{ width: widtht }} />
                <div className="ranger-compponent-line-grid" />
                <animated.div onLoad={() => setOffsetToValue()} className="pointer" style={{ x, scale, cursor: "pointer" }} {...bindControl()} />
            </div>
        </div>
    );
}

export default RangerInputComponent;
