import React from 'react';
import Lottie from 'lottie-react-web';

import loaderFile from '../../assets/video/Loader/loader.json'

const MyLoader: React.FC<{ size: number }> = ({ size }) => {

    const LoaderConfig = {
        loop: true,
        autoplay: true,
        prerender: true,
        animationData: loaderFile,
    }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: `${ size }px`, height: `${ size }px` }}>
                <Lottie options={LoaderConfig} />
            </div>
        </div>
    )
};

export default MyLoader;
