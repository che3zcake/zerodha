import { create } from 'zustand'

const useGraph = create((set) => ({
    graph: {'name':'Candle','dtype':'candlestick'},
    updateGraph: (newGraph:any)=>set(()=>({graph:newGraph}))
}))

export {useGraph}