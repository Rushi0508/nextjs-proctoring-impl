'use client'

import React, { useEffect, useState } from 'react'
import { useTabSwitchProctoring } from '@/hooks/useTabSwitchProctoring'
import { useFullScreenProctoring } from '@/hooks/useFullScreenProctoring'

const Test = () => {
    const [timer, setTimer] = useState(300);

    // Tab Change Proctoring
    const onExit = () => {
        // Redirect to the home page
        alert("You are being exited from the test. Redirecting");
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);

        // Add a blur effect to the screen
        document.body.style.filter = 'blur(5px)';
        document.body.style.pointerEvents = 'none';
    }

    const onWarning = () => {
        alert("Warning: The next tab change will exit the test.");
    }
    const { warningShown, tabChanges } = useTabSwitchProctoring({ onWarning, onExit });

    // Full Screen Proctoring
    const { isFullScreen, requestFullScreen, showWarning, setShowWarning } = useFullScreenProctoring();

    const handleContinue = () => {
        setShowWarning(false);
        requestFullScreen();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isFullScreen) {
            requestFullScreen();
        }
    }, [requestFullScreen]);

    return (
        <div className='flex flex-col my-10 items-center h-screen gap-2'>
            {
                warningShown ?
                    <p className='font-bold text-2xl text-red-500'>Next Tab change will exit the test.</p>
                    :
                    <p className='font-bold text-2xl'>Please do not switch tabs during the test.</p>
            }
            <p>Tab Changes: {tabChanges}</p>
            <h1 className='text-4xl'>{timer}</h1>

            {/* Warning Modal  */}
            {showWarning && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Warning</h2>
                        <p className="mb-6">You have exited full screen mode. Please return to full screen to continue the test.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleContinue}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Continue
                            </button>
                            <button
                                onClick={onExit}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Exit Test
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Test
