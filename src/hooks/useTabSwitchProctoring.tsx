import { useState, useEffect, useCallback } from 'react';

interface TabSwitchProctoringOptions {
}

export const useTabSwitchProctoring = () => {
    const [tabChanges, setTabChanges] = useState(0);

    const handleVisibilityChange = useCallback(() => {
        if (!document.hidden) {
            setTabChanges(prevTabChanges => prevTabChanges + 1);
        }
    }, [tabChanges]);

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [handleVisibilityChange]);

    return { tabChanges };
};