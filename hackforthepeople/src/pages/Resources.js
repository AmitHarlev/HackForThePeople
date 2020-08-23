import React from 'react'
import './../index.css';
import './Resources.css';

const Resources = () => {
    return (
        <div className="grid-container grid-background">
            <div className="resources-grid-wrapper">
                <div className="resources-area">
                   <p className="resources-text">Watch this video to learn more about how to have better political conversations!</p>
                    <iframe width="500" height="337.5" className="resources-vid"
                        src="https://www.youtube.com/embed/cU6BrgBg-cs">
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default Resources
