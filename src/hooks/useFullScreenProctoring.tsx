import { useState, useEffect, useCallback } from 'react';

export const useFullScreenProctoring = () => {
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const handleFullScreenChange = useCallback(() => {
        const fullScreenStatus = !!document.fullscreenElement;
        setIsFullScreen(fullScreenStatus);

        if (!fullScreenStatus) {
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 1000); // 1 second delay
        } else {
            setIsTransitioning(false);
        }
    }, []);

    const requestFullScreen = useCallback(() => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                setIsFullScreen(false);
                setIsTransitioning(false);
            });
        }
    }, []);

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        // Check full-screen status on mount
        handleFullScreenChange();

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [handleFullScreenChange]);

    return { isFullScreen, isTransitioning, requestFullScreen };
};
