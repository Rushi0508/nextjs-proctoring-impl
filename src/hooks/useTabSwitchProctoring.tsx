import { useState, useEffect, useCallback } from 'react';

interface TabSwitchProctoringOptions {
    onWarning?: () => void;
    onExit?: () => void;
    exitOnSecondSwitch?: boolean;
}

export const useTabSwitchProctoring = ({
    onWarning = () => alert("Warning: The next tab change will exit the test."),
    onExit = () => window.location.href = '/',
    exitOnSecondSwitch = true
}: TabSwitchProctoringOptions = {}) => {
    const [warningShown, setWarningShown] = useState(false);
    const [tabChanges, setTabChanges] = useState(0);

    const handleVisibilityChange = useCallback(() => {
        if (!document.hidden && !warningShown) {
            onWarning();
            setTabChanges(prevTabChanges => prevTabChanges + 1);
            setWarningShown(true);
        } else if (document.hidden && warningShown && exitOnSecondSwitch && tabChanges === 1) {
            onExit();
        }
    }, [warningShown, onWarning, onExit, exitOnSecondSwitch, tabChanges]);

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [handleVisibilityChange]);

    return { warningShown, tabChanges };
};