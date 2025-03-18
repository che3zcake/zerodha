import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useInterval} from "./intervalOptions.tsx";

export default function IntervalMenu() {
    const intervals = [ {'name':'1d','value':'1d'}, {'name':'5d','value':'5d'}, {'name':'1wk','value':'1wk'}, {'name':'1mo','value':'1mo'}, {'name':'3mo','value':'3mo'}]
    // @ts-ignore
    const currentInterval = useInterval((state)=>state.interval)
    // @ts-ignore
    const updateInterval = useInterval((state)=>state.updateInterval)
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm hover:cursor-pointer">
                    {currentInterval}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="flex flex-col absolute z-10 mt-2 w-25 origin-top-right rounded-b-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                {intervals.map((item)=>(
                    <div className="py-1 mx-3 my-1 hover:bg-gray-100 rounded-xl ">
                        <MenuItem>
                            <button onClick={()=>updateInterval(item.value)} className="px-1 py-1 text-[13px] text-gray-600">{item.name}</button>
                        </MenuItem>
                    </div>
                ))}
            </MenuItems>
        </Menu>
    )
}
