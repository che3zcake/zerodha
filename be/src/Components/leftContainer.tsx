import {Button} from "./Button.tsx";
import {useCompany} from "./CompanyContext.tsx";
import {useNavigate} from "react-router-dom";

export default function LeftContainer(){
    // @ts-ignore
    const { setCompany } = useCompany();
    const buttonCompany = [{'id':'AAPL','name':'Apple'}, {'id':'AMZN','name':'Amazon'}, {'id':'WMT','name':'Walmart'}, {'id':'NVDA','name':'Nvidia'}, {'id':'TSLA','name':'Tesla'}, {'id':'DIS','name':'Disney'}, {'id':'F','name':'Ford'}, {'id':'T','name':'AT&T'}, {'id':'DPZ','name':"Domino's Pizza"}, {'id':'YUM','name':'Yum'}]
    const navigate = useNavigate()


    return <div className="h-full border-b border-l border-r border-gray-200 shadow-md">
        <div className="flex items-center justify-between border-b border-gray-200 ">
            <div className="flex py-2 pl-3 items-center gap-2 flex-grow">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                    </svg>
                </div>
                <div className="w-full text-sm">
                    <input className="border-none focus:outline-none w-full" placeholder="Search"/>
                </div>
            </div>
            <div className="pr-3 text-sm">
                {/*need to add some functionality here*/}
                0/10
            </div>
        </div>
        <div className="pt-3">
            <ul>
                {buttonCompany.map((item) => (
                    <li key={item.id} className={"flex justify-between hover:bg-gray-100 items-center px-6"}>
                        <Button
                            onClick={()=>{
                                setCompany(item.id)
                                navigate('/chart')
                            }}
                            label={item} />
                    </li>
                ))}
            </ul>
        </div>
    </div>
}