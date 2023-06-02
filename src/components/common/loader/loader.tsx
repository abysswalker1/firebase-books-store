import React from 'react';
import './loader.css'

const Loader = () => {
    return (
        <div className='loader'>
            <div id="loading-bar-spinner" className="spinner">
                <div className="spinner-icon"></div>
            </div>
        </div>
    );
};

export default Loader;