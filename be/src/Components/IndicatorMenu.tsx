import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function IndicatorMenu() {
    const list=['i am gay']
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white text-sm hover:cursor-pointer">
                    Indicator
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="flex flex-col absolute z-10 mt-2 w-25 origin-top-right rounded-b-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                {list.map((item)=>(
                    <div className="py-1 mx-3 my-1 hover:bg-gray-100 rounded-xl">
                        <MenuItem>
                            <button onClick={()=>{}} className="px-1 py-1  ">{item}</button>
                        </MenuItem>
                    </div>
                ))}
            </MenuItems>
        </Menu>
    )
}