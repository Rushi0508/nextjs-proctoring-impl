import { useEffect, useState } from 'react';

export const useExternalScreenProctoring = () => {
    const [windowFocused, setWindowFocused] = useState(true);
    const [mouseActivity, setMouseActivity] = useState(false);

    useEffect(() => {
        // Track window focus changes
        const handleFocus = () => {
            setWindowFocused(true);
        };

        const handleBlur = () => {
            setWindowFocused(false);
            alert('You switched windows or monitors!');
        };

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            if (!mouseActivity) {
                setMouseActivity(true);
            }
        };

        // Attach the event listeners
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);
        window.addEventListener('mousemove', handleMouseMove);

        // Clean up the event listeners
        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseActivity]);

    return { windowFocused, mouseActivity };
};
