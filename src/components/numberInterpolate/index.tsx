import React, { useState, useRef, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

interface NumberInterpolateProps {
    value: number
}

const NumberInterpolate: React.FC<NumberInterpolateProps> = ({ value }) => {
    const [val, setVal] = useState<number>(0);
    const oldVal = useRef<number>(0);
    const props = useSpring({ val: val, from: { val: oldVal.current } });

    useEffect(() => {
        setVal((_v) => {
            oldVal.current = _v;
            return value;
        })
    }, [value])

    return (
        <animated.span>
            {props.val.to(e => Math.floor(e))}
        </animated.span>
    );
}

export default NumberInterpolate;
