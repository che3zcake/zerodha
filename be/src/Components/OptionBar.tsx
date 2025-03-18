import IntervalMenu from "./IntervalMenu.tsx";
import GraphMenu from "./GraphMenu.tsx";
import IndicatorMenu from "./IndicatorMenu.tsx";
import {useCompany} from "./CompanyContext.tsx";

export default function OptionBar(){
    // @ts-ignore
    const { company } = useCompany();

    return <div className="px-6 flex justify-between items-center text-sm gap-150">
        <div className="items-center"><button className="hover:cursor-pointer">{ company }</button></div>
        <div className="flex flex-1 items-center gap-15">
            <div>
                <GraphMenu/>
            </div>
            <div>
                <IntervalMenu/>
            </div>
            <div>
                <IndicatorMenu/>
            </div>
        </div>
    </div>
}