
const Navigation = () => {

    return (
        <>
            <nav className="bg-blue-600 md:h-20 hidden md:flex font-bold py-2">
                    <div className="container mx-auto hidden md:flex py-4 items-center space-x-6">
                        <a href="/" className="text-white border-b-4 border-red-500">HOME</a>
                        <a href="/LiveScore" className="text-white hover:border-b-4  hover:border-red-500">LIVE SCORE</a>
                        <a href="/PlayerStats" className="text-white hover:border-b-4 hover:border-red-500">PLAYER STATS</a>
                        <a href="/TeamReg" className="text-white hover:border-b-4 hover:border-red-500">TEAM REGISTRATION</a>
                        <a href="#" className="text-white hover:border-b-4 hover:border-red-500">FAN ZONE</a>
                    </div>
            </nav>
        </>
    )
}

export default Navigation   