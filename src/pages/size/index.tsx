import React, { useContext, useEffect, useState } from 'react';
import './index.scss'
import CircleComponentSize from '../../components/circle';
import NextButtom from '../../components/nextButtom';
import ArteContext from '../../components/arte/ArteContext';

import NumberInterpolate from '../../components/numberInterpolate';
import CircleCore from '../../components/arte/formats/circle';
import { useHistory } from 'react-router';

const arrayConfigCircle = [
    {
        label: 'Primeiro de tudo selecione um tamanho adequado para sua moldura',
    },
    {
        label: 'Grande',
        nails: 150,
        circle: [150, 300],
        diamter: [47, 95],
        nais_distance: '1-2cm',
    },
    {
        label: 'Medio',
        nails: 120,
        circle: [120, 240],
        diamter: [38, 76],
        nais_distance: '1-2cm',
    },
    {
        label: 'Pequeno',
        nails: 60,
        circle: [60, 120],
        diamter: [19, 38],
        nais_distance: '1-2cm',
    },
]

// eslint-disable-next-line @typescript-eslint/ban-types
const SelectSizePage: React.FC<{}> = ({ }) => {
    const history = useHistory();
    const [sizeSelect, setSizeSelect] = useState(0);
    const { setFormat, setNNails, myArte } = useContext(ArteContext);
    const { label, nails, circle, nais_distance, diamter } = arrayConfigCircle[sizeSelect];


    useEffect(() => {
        if (nails) {
            setNNails?.(nails);
            if (myArte?.size) setFormat?.(new CircleCore(nails, myArte.size));
        }
    }, [nails, setNNails, setFormat, myArte?.size]);


    return (
        <>
            <div className="circle-size-session">
                <div className="circle-size-title">
                    <p>Tamanho</p>
                </div>
                <div className="circle-size">
                    <div className="MM">
                        <CircleComponentSize
                            acctive={sizeSelect == 2}
                            onClickAfterLoader={() => { setSizeSelect(2) }}
                        />
                    </div>
                    <div className="GG">
                        <CircleComponentSize
                            acctive={sizeSelect == 1}
                            onClickAfterLoader={() => { setSizeSelect(1) }}
                        />
                    </div>
                    <div className="PP">
                        <div>
                            <CircleComponentSize
                                acctive={sizeSelect == 3}
                                onClickAfterLoader={() => { setSizeSelect(3) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="circle-size-footer">
                    <div>
                        <p>{label}</p>
                    </div>
                    <div className="footer">
                        <div>
                            {circle && <p>
                                <span id="n">Tamanho da circunferência: </span>
                                <NumberInterpolate value={circle[0]} />
                                -
                                <NumberInterpolate value={circle[1]} />
                                cm
                            </p>}
                            {diamter && <p>
                                <span id="n">Diâmetro do circulo: </span>
                                <NumberInterpolate value={diamter[0]} />
                                -
                                <NumberInterpolate value={diamter[1]} />
                                cm
                            </p>}
                        </div>
                        <div>
                            {nails && <p><span id="n">Numero de pregos: </span><NumberInterpolate value={nails} /></p>}
                            {nais_distance && <p>
                                <span id="n">Distancia entre os pregos:</span>{nais_distance}</p>}
                        </div>
                    </div>
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        {sizeSelect != 0 && <NextButtom title="Próximo" onClick={() => history.push('/uploader')} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectSizePage;
