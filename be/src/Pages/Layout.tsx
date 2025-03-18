import {Outlet} from "react-router-dom";
import NavBar from "../Components/NavBar.tsx";
import LeftNav from "../Components/leftNav.tsx";
import LeftContainer from "../Components/leftContainer.tsx";
import {CompanyProvider} from "../Components/CompanyContext.tsx";

export default function Layout(){
    return <div className="">
        <CompanyProvider>
            <div className="flex h-screen overflow-hidden">
                <div className="flex flex-col ">
                    <LeftNav/>
                    <div className="pl-9 flex-grow">
                        <LeftContainer/>
                    </div>
                </div>
                <div className="flex-auto h-full">
                    <NavBar/>
                    <div className="pr-9 h-full"><Outlet/></div>
                </div>
            </div>
        </CompanyProvider>
    </div>
}