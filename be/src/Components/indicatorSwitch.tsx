import { create } from 'zustand'

const useIndicatorSwitch = create((set)=>({
    switch: false,
    updateIndicatorSwitch: (newIndicatorSwitch:any)=>set(()=>({switch:newIndicatorSwitch}))
}))

export {useIndicatorSwitch}