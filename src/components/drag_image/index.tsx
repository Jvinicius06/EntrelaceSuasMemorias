import React, { useState, useCallback } from 'react';
import { Uploader, Icon, Loader } from 'rsuite';
import './index.scss';

const DragImageComponent: React.FC<{ onImage: (file: string | null | undefined) => void }> = ({ onImage }) => {
    const [baseFile, setBaseFile] = useState<string | null | undefined>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    const setBaseFileHandles = useCallback((inImage?: string | null) => {
        setBaseFile(inImage);
        onImage(inImage);
    }, [onImage]);

    return (
        <div className="UploaderSession" style={{ display: 'flex' }}>
            <Uploader
                style={{ flex: 1 }}
                autoUpload={false}
                fileListVisible={false}
                listType="picture"
                multiple={false}
                draggable
                action="#"
                onChange={(arr) => {
                    if (arr.length > 0) {
                        const blobFile = arr[arr.length - 1].blobFile;
                        if (blobFile) {
                            setUploading(true);
                            const fr = new FileReader();
                            fr.addEventListener("load", (e) => {
                                const st = e.target?.result?.toString();
                                setBaseFileHandles(st);
                                setUploading(false);
                            });
                            fr.readAsDataURL(blobFile);
                        }
                    }
                }}
            >
                <div className="UploaderBoddy">
                    <div>
                        {
                            baseFile ?
                                (
                                    <div className="ImageStretch">
                                        <img className="ImageStretch" src={baseFile} />
                                    </div>
                                )
                                : (<Icon icon="image" size="5x" />)
                        }
                    </div>
                </div>
            </Uploader>
        </div>
    );
}

export default DragImageComponent;