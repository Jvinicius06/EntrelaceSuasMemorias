import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ArteContext from '../../components/arte/ArteContext';
import DragImageComponent from '../../components/drag_image';
import NextButttom from '../../components/nextButtom';
import './index.scss'

// eslint-disable-next-line @typescript-eslint/ban-types
const UploaderPage: React.FC<{}> = ({ }) => {
    const history = useHistory();
    const { myArte, setOriginalImage, setArrayLine, setEditeImage } = useContext(ArteContext);
    const [image, setImage] = useState<string | null>();

    useEffect(() => {
        if (myArte?.form === undefined || myArte?.form === null) history.push('/');
    }, [history, myArte?.form]);

    const setImageHandles = useCallback((image?: string | null) => {
        if (image) {
            setOriginalImage?.(image);
            setArrayLine?.(() => []);
            setEditeImage?.('');
        }
    }, [setArrayLine, setEditeImage, setOriginalImage]);

    return (
        <div className="uploader-session-page">
            <div className="uploader-session-drag">
                <DragImageComponent
                    onImage={(i) => {
                        setImageHandles(i);
                    }}
                />
            </div>
            <div className="uploader-session-body">
                <p>Selecione a imagem a ser processada pelo nosso algoritmo.</p>
                <p className="smal">Sua imagem não será compartilhada com ninguém.</p>
                {myArte?.originalImage && <NextButttom title="Próximo" onClick={() => { history.push('/edit') }} />}
            </div>
        </div>
    );
}

export default UploaderPage;
