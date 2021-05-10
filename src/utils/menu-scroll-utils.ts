import { Dispatch, SetStateAction } from 'react';

interface UpdatePosition {
    positionOffset: number;
    updatePosition: boolean;
}

const MAIN_CONTAINER = 'main-container';

const calcDiffTop = () => {
    const wrapper = document.getElementById(MAIN_CONTAINER);
    if (wrapper) {
        return wrapper.offsetTop - window.pageYOffset;
    }
    return 0;
};

const calcDiffBottom = () => {
    const wrapper = document.getElementById(MAIN_CONTAINER);
    if (wrapper) {
        return (
            window.pageYOffset +
            window.innerHeight +
            (document.body.scrollHeight - (wrapper.offsetHeight + wrapper.offsetTop)) -
            document.body.scrollHeight -
            80
        );
    }
    return 0;
};

export const initPosition = () => {
    return calcPosition().positionOffset;
};

export const getPosition = (setTopOffset: Dispatch<SetStateAction<number>>) => {
    const currentPosition = calcPosition();
    if (currentPosition.updatePosition) {
        setTopOffset(currentPosition.positionOffset);
    }
};

const calcPosition = (): UpdatePosition => {
    const diffTop = calcDiffTop();
    if (diffTop > 0) {
        return { positionOffset: diffTop > 0 ? diffTop : 0, updatePosition: true };
    }

    const diffBottom = calcDiffBottom();
    if (diffBottom > 0) {
        return { positionOffset: diffBottom > 0 ? -1 * diffBottom : 0, updatePosition: true };
    }
    return { positionOffset: 0, updatePosition: false };
};
