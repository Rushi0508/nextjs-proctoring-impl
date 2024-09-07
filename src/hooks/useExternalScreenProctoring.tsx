import { useEffect, useState } from 'react';

export const useExternalScreenProctoring = () => {
    const [windowFocused, setWindowFocused] = useState(true);

    useEffect(() => {
        const handleBlur = () => {
            setWindowFocused(false);
        };

        const handleFocus = () => {
            setWindowFocused(true);
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return { windowFocused };
};
