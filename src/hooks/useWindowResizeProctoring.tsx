import { useState, useEffect, useCallback } from 'react';

interface WindowResizeOptions {
    threshold?: number;
}

export const useWindowResizeProctoring = ({
    threshold = 100, // pixels
}: WindowResizeOptions = {}) => {
    const [initialSize, _] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });
    const [currentSize, setCurrentSize] = useState(initialSize);
    const [isResized, setIsResized] = useState(false);

    const handleResize = useCallback(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        const widthDiff = initialSize.width - newWidth;
        const heightDiff = initialSize.height - newHeight;

        if (widthDiff > threshold || heightDiff > threshold) {
            if (!isResized) {
                setIsResized(true);
            }
        } else {
            setIsResized(false);
        }

        setCurrentSize({ width: newWidth, height: newHeight });
    }, [initialSize, threshold, isResized]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return { isResized, currentSize, initialSize };
};
