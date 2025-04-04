import {Link} from "react-router-dom";

export default function NavBar(){
    const navList =[
        {id:1, text:"Home", path:"/"},
        {id:2, text:"Chart", path:"/chart"}
    ]

    return (
        <div className="flex px-10 border-b border-gray-200 py-2">
            {/* Left Section */}
            <div className="flex flex-auto justify-between items-center">
                <Link to="/model">
                    <img
                        src="https://kite.zerodha.com/static/images/kite-logo.svg"
                        alt="Kite Logo"
                        className="hidden md:flex w-full h-6 cursor-pointer min-w-7 max-w-4 pr-2"
                    />
                </Link>
                <ul className="flex gap-x-6 ">
                    {navList.map((item) => (
                        <li key={item.id}>
                            <Link to={item.path} className="hover:text-gray-700 transition">
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Section */}
            <div className="flex items-center px-4 gap-4">
                <Link to={"/"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
                    </svg>
                </Link>
                <Link to={"/"} className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    <div>User</div>
                </Link>
            </div>
        </div>

    )
}