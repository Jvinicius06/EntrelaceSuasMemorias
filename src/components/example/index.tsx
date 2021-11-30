import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react-web';
import './index.scss'

import PlayFile from '../../assets/video/exemple/play.json'
import CoracaoFile from '../../assets/video/exemple/coracao.json'
import BorderFile from '../../assets/video/exemple/border.json'
import ExemmpleFile from '../../assets/video/EmojExemple/emoji.json'


const PlayOptions = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: PlayFile,
}

const CoracaoOptions = {
    loop: false,
    autoplay: true,
    prerender: true,
    animationData: CoracaoFile,
}

const ExempleOptions = {
    loop: false,
    autoplay: true,
    prerender: true,
    animationData: ExemmpleFile,
}

const BorderOptions = {
    loop: true,
    autoplay: true,
    prerender: true,
    animationData: BorderFile,
}

// eslint-disable-next-line @typescript-eslint/ban-types
const ExempleComponent: React.FC<{}> = () => {
    const [size, setSize] = useState(0);
    const [nextPlay, setNextPlay] = useState(false);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            setSize(Math.min(innerWidth, innerHeight) * 0.8);
        }

        handleResize();
        // window.addEventListener('resize', handleResize);
        // return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="exemple-component-session">
            <div className="exemple-component-boddy">
                <div style={{ width: size, height: size }} className="exemple-component-boddy-protec">
                    <div className="exemple-component-item">
                        <Lottie options={BorderOptions} />
                    </div>
                    {
                        play ?
                            (
                                <div className="exemple-component-item" style={{ paddingTop: '10px' /* tava torto */ }}>
                                    <Lottie options={ExempleOptions} />
                                </div>
                            ) :
                            (
                                <>
                                    <div className="exemple-component-item">
                                        <Lottie options={CoracaoOptions} eventListeners={[
                                            {
                                                eventName: 'complete',
                                                callback: () => setNextPlay(true)
                                            },
                                        ]} />
                                    </div>
                                    {nextPlay &&
                                        <div className="exemple-component-item" style={{ cursor: 'pointer' }} onClick={() => { setPlay(true) }}>
                                            <Lottie options={PlayOptions} />
                                        </div>
                                    }
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default ExempleComponent;
