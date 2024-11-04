'use client';
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const pathname = usePathname(); // Get the current path

    const isActive = (href) => {
        return pathname === href ? 'border-b-4 border-red-500 pb-2' : 'hover:border-b-4 hover:border-red-500 pb-2';
    }

    return (
        <>
            <nav className="bg-blue-600 md:h-20 hidden md:flex font-bold py-2">
                <div className="container mx-auto hidden md:flex py-4 items-center space-x-6">
                    <a href="/" className={`text-white ${isActive('/')}`}>HOME</a>
                    <a href="/LiveScore" className={`text-white ${isActive('/LiveScore')}`}>LIVE SCORE</a>
                    <a href="/PlayerStats" className={`text-white ${isActive('/PlayerStats')}`}>PLAYER STATS</a>
                    <a href="/TeamReg" className={`text-white ${isActive('/TeamReg')}`}>TEAM REGISTRATION</a>
                    <a href="#" className={`text-white ${isActive('/FanZone')}`}>FAN ZONE</a>
                    <a href="/Blog" className={`text-white ${isActive('/Blog')}`}>BLOG</a>
                    <a href="/ContactUs" className={`text-white ${isActive('/ContactUs')}`}>CONTACT US</a>
                </div>
            </nav>
        </>
    );
}

export default Navigation;
