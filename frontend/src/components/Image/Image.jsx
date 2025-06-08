import React from 'react';
import './Image.css';

const Image = ({ src, alt = 'preview', onClick }) => {
    return (
        <div className="image-overlay" onClick={onClick}>
            <div className="image-container" onClick={(e)=>e.stopPropagation()}>
                <img src={src} alt={alt} className="image-centered" />
            </div>
        </div>
    );
};

export default Image;
