import { useEffect, useState } from 'react';


export const useRightClickProctoring = () => {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const preventDefault = (e: MouseEvent) => {
            e.preventDefault();
        };

        const disableRightClick = () => {
            document.addEventListener('contextmenu', preventDefault);
            setIsDisabled(true);
        };

        const enableRightClick = () => {
            document.removeEventListener('contextmenu', preventDefault);
            setIsDisabled(false);
        };

        disableRightClick();

        return () => {
            enableRightClick();
        };
    }, []);

    return { isDisabled };
};