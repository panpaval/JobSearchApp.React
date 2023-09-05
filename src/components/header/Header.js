/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.css';
import { useState } from 'react';


const Header = () => {
    const [activeLink, setActiveLink] = useState(null)

    const handleClick = (link) => {
         setActiveLink(link)
    }


    return (
        <div className="container-header">
            <header className="header">
            <div className="header-logo">
                <div className="logo-all">
                    <div className="logo-oval"></div>
                </div>
                <span className="logo-text">Jobored</span>
            </div>

            <nav className="header-nav">
                <a href="#" 
                className={`header-link ${activeLink === 'search' ? 'active' : ''}`} 
                onClick={() => handleClick('search')}>Поиск вакансий</a>

                <a href="#" 
                className={`header-link ${activeLink === 'favorites' ? 'active' : ''}`}
                onClick={() => handleClick('favorites')}>Избранное</a>
                    
            </nav>
            
            </header>
        </div>
    )
}

export default Header;

/* const [color, setColor] = useState('black') изменение цвета

    const handleClick = () => {
        if(color === 'black') {
            setColor('#5E96FC');
        } else {
            setColor('black');
        }
    }


    return (
        <div className="container">
            <header className="header">
            <div className="header-logo">
                <div className="logo-all">
                    <div className="logo-oval"></div>
                </div>
                <span className="logo-text">Jobored</span>
            </div>

            <nav className="header-nav">
                <a href="#" 
                className='header-link'
                style={{color: color}} 
                onClick={handleClick}>Поиск вакансий</a>

                <a href="#" className='header-link'>Избранное</a>
                    
            </nav>
            
            </header>
        </div>
    )
} */