import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useIndicator} from "./indicatorOptions.tsx";
import {useIndicatorSwitch} from "./indicatorSwitch.tsx";

export default function IndicatorMenu() {
    const indicators = [{'value':{'name':'SMA','dtype':'sma'}},{'value':{'name':'EMA','dtype':'ema'}},{'value':{'name':'RSI','dtype':'rsi'}},{'value':{'name':'BB','dtype':'bb'}},{'value':{'name':'ADL','dtype':'adl'}}]
    // @ts-ignore
    const currentIndicator = useIndicator((state)=>state.indicator)
    // @ts-ignore
    const updateIndicator = useIndicator((state)=>state.updateIndicator)
    // @ts-ignore
    const indicatorSwitch = useIndicatorSwitch((state)=>state.switch)
    // @ts-ignore
    const updateIndicatorSwitch = useIndicatorSwitch((state)=>state.updateIndicatorSwitch)
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm hover:cursor-pointer">
                    {currentIndicator.name}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="flex flex-col absolute z-10 mt-2 w-25 origin-top-right rounded-b-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                {indicatorSwitch?
                    <div>
                        <div className="flex justify-between content-center mx-3 mt-2 bg-grey-700">
                            <div className="text-[13px] mt-1 text-blue-700">{currentIndicator.name}</div>
                            <button className="hover:cursor-pointer" onClick={()=>{
                                updateIndicator({'name':'Indicator','dtype':'adx'})
                                updateIndicatorSwitch(false)
                            }}>x</button>
                        </div>
                        <div>-----------------</div>
                    </div>
                    :<div>{indicatorSwitch}</div>}
                {indicators.map((item)=>(
                    <div className="py-1 mx-3 my-1 hover:bg-gray-100 rounded-xl ">
                        <MenuItem>
                            <button onClick={()=>{
                                updateIndicator(item.value)
                                updateIndicatorSwitch(true)
                            }} className="px-1 py-1 text-[13px] text-gray-600">{item.value.name}</button>
                        </MenuItem>
                    </div>
                ))}
            </MenuItems>
        </Menu>
    )

}