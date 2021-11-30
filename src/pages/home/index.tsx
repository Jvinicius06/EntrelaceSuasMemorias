import React, { useRef, useEffect, useState, memo } from "react";
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { useHistory } from "react-router-dom";
import Lottie from 'lottie-react-web';
import useDimensions from 'use-react-dimensions';
import './index.scss';

import LogoAnimation from '../../assets/video/data.json';
import ArrowAnimation from '../../assets/video/arrow.json';

import ExempleComponent from "../../components/example";
import MyLoader from "../../components/myLoader";
import NextButttom from "../../components/nextButtom";

// eslint-disable-next-line @typescript-eslint/ban-types
const HomePage: React.FC<{}> = (props) => {
    const [load, setLoad] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const refAnimation = useRef<Lottie>(null);
    const refParallax = useRef<IParallax>(null);
    const history = useHistory();

    const InitialPage = () => {
        history.push('image');
    }

    const LogoOptions = {
        loop: false,
        autoplay: true,
        prerender: true,
        animationData: LogoAnimation,
    }

    const ArrowOption = {
        loop: false,
        autoplay: false,
        prerender: false,
        animationData: ArrowAnimation,
    }

    return (
        <div className="SessionHomePage">
            <Parallax ref={refParallax} pages={3} enabled={false} horizontal={false}>
                <ParallaxLayer offset={0} speed={2.5} factor={1} >
                    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        <Lottie
                            ref={refAnimation}
                            options={LogoOptions}
                            eventListeners={[
                                {
                                    eventName: 'complete',
                                    callback: () => setLoad(true),
                                },
                            ]}
                        />
                        {
                            load &&
                            <div style={{ position: 'absolute', width: '100%', bottom: '0' }}>
                                <div className="HomePageArrow" onClick={() => { refParallax.current?.scrollTo(1); setNextPage(true) }} >
                                    <Lottie options={ArrowOption} speed={2} />
                                </div>
                            </div>
                        }
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1}
                    speed={1}
                    factor={0.5}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div className="teste" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', justifyContent: 'stretch', width: '100%', height: 'var(--app-height)' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                {
                                    nextPage && (<ExempleComponent />)
                                }
                            </div>
                        </div>
                        <div className="sesion-body-home-txt" style={{ flex: 1 }}>
                            <div className="session">
                                <div>
                                    <h1 className="txt-body-home-title">Entrelace suas Memorias</h1>
                                    <p className="txt-body-home" style={{ color: '#000' }}>Explore sua criatividade com nossa ferramenta, descubra todos os caminhos para criar a imagem perfeita com nosso algoritmo.</p>
                                </div>
                                <div className="inside-buttom">
                                    <NextButttom onClick={() => history.push('/size')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div >
    );
};

export default HomePage;
