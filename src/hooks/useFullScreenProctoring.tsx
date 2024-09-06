import { useState, useEffect, useCallback } from 'react';

export const useFullScreenProctoring = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleFullScreenChange = useCallback(() => {
        setIsFullScreen(!!document.fullscreenElement);
        if (!document.fullscreenElement) {
            setShowWarning(true);
        }
    }, []);

    const requestFullScreen = useCallback(() => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                setShowWarning(true);
            });
        }
    }, []);

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        // Check full-screen status on mount
        if (!document.fullscreenElement) {
            setShowWarning(true);
        }

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [handleFullScreenChange]);

    return { isFullScreen, requestFullScreen, showWarning, setShowWarning };
};
