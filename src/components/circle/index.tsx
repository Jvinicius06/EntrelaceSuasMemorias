import React, { useState, useEffect, useCallback } from "react";
import Lottie from 'lottie-react-web';

import Cicle from '../../assets/video/Cicle/loader.json';
import CicleSelect from '../../assets/video/Cicle/select.json';

const CircleConnfig = {
    loop: false,
    autoplay: true,
    prerender: true,
    animationData: Cicle,
}

const CircleSelectConfig = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: CicleSelect,
}
interface CircleComponentSizeProps {
    acctive: boolean,
    onClickAfterLoader?: () => void
}

const CircleComponentSize: React.FC<CircleComponentSizeProps> = ({ acctive, onClickAfterLoader }) => {
    const [selected, setSelected] = useState(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setSelected(acctive)
    }, [acctive]);

    const handlesClick = useCallback(() => {
        if (loader) onClickAfterLoader?.();
    }, [loader, onClickAfterLoader])

    return (
        <div style={{ maxHeight: '500px', maxWidth: '500px' }} onClick={() => handlesClick()}>
            {
                loader && selected ?
                    <Lottie options={CircleSelectConfig} /> :
                    <Lottie
                        options={CircleConnfig}
                        speed={3}
                        eventListeners={[{
                            eventName: 'complete',
                            callback: () => { setLoader(true) }
                        }]}
                    />
            }
        </div>
    );
}

export default CircleComponentSize;
