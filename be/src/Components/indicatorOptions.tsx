import { create } from 'zustand'

const useIndicator = create((set) => ({
    indicator: {'name':'Indicator','dtype':'adx'},
    updateIndicator: (newIndicator:any)=>set(()=>({indicator:newIndicator}))
}))

export {useIndicator}