import { useState, useEffect, useCallback } from 'react';

interface FullScreenOptions {
}

export const useFullScreenProctoring = ({
}: FullScreenOptions = {}) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleFullScreenChange = useCallback(() => {
        setIsFullScreen(!!document.fullscreenElement);
        if (!document.fullscreenElement) {
            setShowWarning(true);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [handleFullScreenChange]);

    const requestFullScreen = useCallback(() => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
    }, []);

    return { isFullScreen, requestFullScreen, showWarning, setShowWarning };
};
