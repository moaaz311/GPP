import React, { useState } from 'react';
import './InternetSpeed.css';

const InternetSpeedChecker = () => {
    const [speed, setSpeed] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [buttonText, setButtonText] = useState('CHECK');

    const checkSpeed = () => {
    const imageLink = "https://upload.wikimedia.org/wikipedia/commons/a/a1/Tokyo_Sky_Tree_East_Tower_2012.JPG";
    const downloadSize = 11855374;
    const time_start = new Date().getTime();
    const chachImg = "?nn=" + time_start;
    const downloadSrc = new Image();

    setShowResult(false);
    setIsLoading(true);

    downloadSrc.src = imageLink + chachImg;

    downloadSrc.onload = () => {
        const time_end = new Date().getTime();
        const timeDuration = (time_end - time_start) / 1000;
        const loadedBytes = downloadSize * 8;
        const totalSpeed = ((loadedBytes / timeDuration) / 1024 / 1024).toFixed(2);

        let i = 0;

        const animate = () => {
            if (i < totalSpeed) {
            setSpeed(i.toFixed(2));
            setTimeout(animate, 20);
            i += 1.02;
            } else {
            setSpeed(totalSpeed);
            }
        };

        animate();
        setIsLoading(false);
        setShowResult(true);
        setButtonText('CHECK AGAIN');
        };
    };

    return (
        <div className="the-all">
                    <div className="contain">
            <div className="loader-widget">
                <h1>CHECK YOUR INTERNET SPEED</h1>
                <span className={`loader ${isLoading ? '' : 'hide'}`}></span>
                <div className={`loader-content ${showResult ? 'result' : ''}`}>
                <div className={`content ${speed ? '' : 'hide'} ${isLoading ? 'hide' : ''}`}>
                    {speed && (
                    <>
                        {speed} <small>Mbps</small>
                    </>
                    )}
                </div>
        <button onClick={checkSpeed} className={`${isLoading ? 'hide' : ''}`}>{buttonText}</button>
        </div>
    </div>
</div>
        </div>


    );
};

export default InternetSpeedChecker;
