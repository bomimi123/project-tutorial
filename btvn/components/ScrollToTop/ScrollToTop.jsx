import React, { useContext, useEffect, useState } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false); // Thêm useState vào đây

    const toggleScrollButtonVisibility = () => {
        if (window.pageYOffset > 1500) {
            setIsScrollButtonVisible(true);
        } else {
            setIsScrollButtonVisible(false);
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
            {isScrollButtonVisible &&
                <button onClick={scrollToTop} className='scroll-button'>
                    <i  className="fa-solid fa-arrow-up"></i>
                 </button>
                 
            }
            
        </div>
    );
};

export default ScrollToTop;
