'use client';
import './header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="logoWrap">
            <img src="/images/stargrapher-1.png" />
            <img src="/images/star-grapher.png" />
            </div>
            <div className="searchWrap">
                <img src="/images/search.svg" className="searchIcon" />
                <input 
                    type="text" 
                    placeholder="Search for customer orders, jobs, wheres and assets" 
                    className="searchInput"
                />
            </div>
            <div className="profileWrap">
                <img src="/images/light.svg" className="notificationIcon" />
                <div className="profileInfo">
                    <img src="/images/profile-1.png" className="profileImg" />
                    <div className="profileText">
                        <span className="email">1ys@biscat.co.kr</span>
                        <span className="role">Admin</span>
                    </div>
                    <img src="/images/dropdown.svg" className="chevronIcon" />
                </div>
            </div>
        </div>
    );
};

export default Header;