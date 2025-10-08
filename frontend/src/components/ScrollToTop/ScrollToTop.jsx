import React, { useContext, useEffect, useState } from 'react';
import './ScrollToTop.css';
import { StoreContext } from '../../context/StoreContext';

const ScrollToTop = () => {
    const { isScrollButtonVisible } = useContext(StoreContext);
    const [isVisible, setIsVisible] = useState(isScrollButtonVisible);

    const toggleScrollButtonVisibility = () => {
        if (window.pageYOffset > 1500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleScrollButtonVisibility);
        return () => {
            window.removeEventListener('scroll', toggleScrollButtonVisibility);
        };
    }, []);

    return (
        <div className='scroll-to-top'>
            {isVisible &&
                <button onClick={scrollToTop} className='scroll-button'>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
            }
        </div>
    );
};

export default ScrollToTop;
