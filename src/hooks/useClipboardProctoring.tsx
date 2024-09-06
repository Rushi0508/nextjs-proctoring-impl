import { useEffect, useState } from 'react';

export const useClipboardProctoring = () => {
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const preventDefault = (e: ClipboardEvent) => {
            e.preventDefault();
        };

        const disableClipboard = () => {
            document.addEventListener('copy', preventDefault);
            document.addEventListener('cut', preventDefault);
            document.addEventListener('paste', preventDefault);
            setIsDisabled(true);
        };

        const enableClipboard = () => {
            document.removeEventListener('copy', preventDefault);
            document.removeEventListener('cut', preventDefault);
            document.removeEventListener('paste', preventDefault);
            setIsDisabled(false);
        };

        disableClipboard();

        return () => {
            enableClipboard();
        };
    }, []);

    return { isDisabled };
};