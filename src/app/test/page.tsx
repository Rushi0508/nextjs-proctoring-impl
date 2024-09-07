'use client'

import React, { useEffect, useState } from 'react'
import { useTabSwitchProctoring } from '@/hooks/useTabSwitchProctoring'
import { useFullScreenProctoring } from '@/hooks/useFullScreenProctoring'
import { useWindowResizeProctoring } from '@/hooks/useWindowResizeProctoring'
import { useClipboardProctoring } from '@/hooks/useClipboardProctoring'
import { useRightClickProctoring } from '@/hooks/useRightClickProctoring'
import { useExternalScreenProctoring } from '@/hooks/useExternalScreenProctoring'

const Test = () => {
    const [timer, setTimer] = useState(300);

    // Tab Change Proctoring
    const { tabChanges } = useTabSwitchProctoring();
    if (tabChanges > 2) {
        window.location.href = '/';
    }

    // Full Screen Proctoring
    const { isFullScreen, requestFullScreen } = useFullScreenProctoring();

    const handleContinue = () => {
        requestFullScreen();
    };

    useEffect(() => {
        if (!isFullScreen) {
            requestFullScreen();
        }
    }, [requestFullScreen, isFullScreen]);

    // Window Resize Proctoring
    const { isResized } = useWindowResizeProctoring({ threshold: 100 });
    if (isResized) {
        window.location.href = '/';
    }

    // Clipboard Proctoring
    useClipboardProctoring();

    // Right Click Proctoring
    useRightClickProctoring();

    // External Screen Proctoring
    const { windowFocused } = useExternalScreenProctoring();
    if (!windowFocused) {
        window.location.href = '/';
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className='flex flex-col my-10 items-center h-screen gap-2'>
            <p className='font-bold text-2xl'>Please do not switch tabs during the test.</p>
            <p>Tab Changes: {tabChanges}</p>
            <h1 className='text-4xl'>{timer}</h1>
            <input type="text" className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' />

            {/* Warning Modal  */}
            {!isFullScreen && (
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
                                onClick={() => {
                                    window.location.href = '/';
                                }}
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
