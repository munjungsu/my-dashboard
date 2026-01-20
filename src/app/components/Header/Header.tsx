import { auth, signOut } from '../../../../auth';
import './header.scss';

const Header = async () => {
    const session = await auth();
    
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
                        <span className="email">{session?.user?.email ?? 'Unknown'}</span>
                        <span className="role">{session?.user?.role ?? 'User'}</span>
                    </div>
                    <img src="/images/dropdown.svg" className="chevronIcon" />
                </div>
                <form action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/login' });
                }}>
                    <button>로그아웃</button>
                </form>
            </div>
        </div>
    );
};

export default Header;