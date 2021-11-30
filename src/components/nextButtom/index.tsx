import React from 'react';
import Lottie from 'lottie-react-web';

import ButtomAnimation from '../../assets/video/Buttom/buttom.json';

const ButtomOption = {
    loop: true,
    autoplay: false,
    prerender: false,
    animationData: ButtomAnimation,
}

// eslint-disable-next-line @typescript-eslint/ban-types
const NextButttom: React.FC<{
    title?: string
    onClick?: () => void,
}> = ({
    title,
    onClick,
}) => {
        return (
            <div style={{ minWidth: '150px', height: '100px' }}>
                <div style={{ minWidth: '150px', height: '100px' }}>
                    <Lottie
                        options={ButtomOption}
                    />
                    <h1
                        onClick={onClick}
                        className="txt-body-home"
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            cursor: 'pointer',
                            display: 'flex',
                            height: '100%',
                            width: '100%',
                            top: '-100%',
                            fontSize: '24px',
                            fontWeight: 900,
                        }}
                    >{title || 'Faça o seu'}</h1>
                </div>
            </div>
        );
    }

export default NextButttom;