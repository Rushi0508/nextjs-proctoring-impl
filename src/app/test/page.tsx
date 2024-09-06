'use client'

import React, { useEffect, useState } from 'react'

const Test = () => {
    const [warningShown, setWarningShown] = useState(false);
    const [tabChanges, setTabChanges] = useState(0);
    const [timer, setTimer] = useState(300);

    const onTestExit = () => {
        // Redirect to the home page
        alert("You are being exited from the test. Redirecting");
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);

        // Add a blur effect to the screen
        document.body.style.filter = 'blur(5px)';
        document.body.style.pointerEvents = 'none';
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden && !warningShown) {
                setTabChanges(prevTabChanges => prevTabChanges + 1);
                alert("Warning: The next tab change will exit the test.");
                setWarningShown(true);
            } else if (document.hidden && warningShown) {
                onTestExit();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [warningShown]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
        </div>
    )
}

export default Test
