import { create } from 'zustand'

const useInterval = create((set) => ({
    interval: '1mo',
    updateInterval: (newInterval:any)=>set(()=>({interval:newInterval}))
}))

export {useInterval}
