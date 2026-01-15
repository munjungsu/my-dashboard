'use client';
import './sidebar.scss';
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="sidebar">
            <div className="nav-buttonWrap">
                <Link href={"/dashboard"} className={pathname === "/dashboard" ? "active" : ""}><img src="/images/dashboard.svg" /></Link>
                <Link href={"/mission"} className={pathname === "/mission" ? "active" : ""}><img src="/images/mission.svg" /></Link>
                <Link href={"/device"} className={pathname === "/device" ? "active" : ""}><img src="/images/device_setting.svg" /></Link>
                <Link href={"/monitor"} className={pathname === "/monitor" ? "active" : ""}><img src="/images/monitoring.svg" /></Link>
                <Link href={"/mission_list"} className={pathname === "/mission_list" ? "active" : ""}><img src="/images/mission_list.svg" /></Link>
                <Link href={"/setting"} className={pathname === "/setting" ? "active" : ""}><img src="/images/setting.svg" /></Link>
            </div>
        </div>
    );
};

export default Sidebar;