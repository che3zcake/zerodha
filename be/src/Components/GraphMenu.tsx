import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useGraph} from "./graphOptions.tsx";

export default function GraphMenu() {
    const graphs = [ {'value':{'name':'Candle','dtype':'candlestick'}}, {'value':{'name':'Bar','dtype':'candlestick'}}, {'value':{'name':'Colored Bar','dtype':'candlestick'}},  {'value':{'name':'Line','dtype':'line'}}, {'value':{'name':'Vertex Line','dtype':'line'}}, {'value':{'name':'Step','dtype':'line'}}, {'value':{'name':'Mountain','dtype':'line'}}, {'value':{'name':'Baseline','dtype':'line'}}, {'value':{'name':'Hollow Candle','dtype':'candlestick'}}, {'value':{'name':'Histogram','dtype':'histogram'}}]
    const agraphs = [{'value':{'name':'Heikin Ashi','dtype':'heikinashi'}}]
    // @ts-ignore
    const currentGraph = useGraph((state)=>state.graph)
   // @ts-ignore
    const updateGraph = useGraph((state)=>state.updateGraph)
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm hover:cursor-pointer">
                    {currentGraph.name}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="flex flex-col absolute z-10 mt-2 w-40 pb-2 origin-top-right rounded-b-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >   <div className="ml-2 mt-2 text-blue-700 text-[12px]">Charts</div>
                {graphs.map((item)=>(
                    <div className="py-1 mx-3 my-1 hover:bg-gray-100 rounded-xl ">
                        <MenuItem>
                            <button onClick={()=>updateGraph(item.value)} className="px-1 py-1 text-[13px] text-gray-600">{item.value.name}</button>
                        </MenuItem>
                    </div>
                ))}
                <div>----------------------------</div>
                <div className="ml-2 my-1 text-blue-700 text-[12px]">Aggregate Charts</div>
                {agraphs.map((item)=>(
                    <div className="py-1 mx-3 mt-1 hover:bg-gray-100 rounded-xl ">
                        <MenuItem>
                            <button onClick={()=>updateGraph(item.value)} className="px-1 py-1 text-[13px] text-gray-600">{item.value.name}</button>
                        </MenuItem>
                    </div>
                ))}
            </MenuItems>
        </Menu>
    )
}