// @ts-ignore
export function Button({label, onClick}) {
    return <button onClick={onClick} type="button" className=" hover:bg-gray-100 font-normal text-sm py-2.5 flex justify-between w-full">
        <div>{label.name}</div>
        <div className="text-sm text-gray-400">{label.id}</div>
    </button>
}