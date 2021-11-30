import { ArtCore } from "../../components/arte/ArteContext";

export const getBlackPixlesImage = (myImageArt: ArtCore): number => {
    let count = 0;
    for (let i = 0; myImageArt.lenght && i < myImageArt.lenght; i += 4) {
        if (myImageArt[i] == true) count++;
    }
    return count;
}