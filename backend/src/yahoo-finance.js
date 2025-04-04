import yahooFinance from "yahoo-finance2";
import { adx } from "@ixjb94/indicators-js";

const queryOptions = { period1: '2023-01-01', period2: '2024-12-31', interval: "1d" };
const result = await yahooFinance.chart('AAPL', queryOptions);

// const ok = result['quotes'].map((item, index, arr) => {
//     if (index === 0) {
//         return item;
//     }
//
//     const prevHA = arr[index - 1];
//     const curr = item;
//
//     return {
//         ...item,
//         open: (prevHA.open + prevHA.close) / 2,
//         close: (curr.open + curr.close + curr.high + curr.low) / 4,
//         high: Math.max(curr.high, (prevHA.open + prevHA.close) / 2, (curr.open + curr.close + curr.high + curr.low) / 4),
//         low: Math.min(curr.low, (prevHA.open + prevHA.close) / 2, (curr.open + curr.close + curr.high + curr.low) / 4)
//     };
// });

const formatted = result['quotes'].map(item => ({
    ... item,
    time: new Date(item.date).toISOString().split('T')[0]
}));
//
// const ok = formatted.map((item, index, arr) => ({
//     time: item.time,
//     value: item.value,
//     color: index > 0 && item.value < arr[index - 1].value ? '#ef5350' : '#26a69a'
// }));
// console.log(ok)

const smaFormat = formatted.map(item => ({
    time: new Date(item.date).toISOString().split('T')[0],
    value: item.close
}))


const high = [];
result['quotes'].forEach(item => {
    high.push(item.high);
});
const low = [];
result['quotes'].forEach(item => {
    low.push(item.low);
});
const close = [];
result['quotes'].forEach(item=>{
    close.push(item.close)
})

const adxresult = adx(high,low,14)
const adxWithTime = adxresult.map((item,index)=>({
    time: formatted[index + (14-1)]?.time,
    value: item
}))

console.log(adxresult)


// function movingAverageWithTime(data, windowSize) {
//     return data.map((entry, index, fullArr) => {
//         if (index < windowSize - 1) return { time: entry.time, sma: null }; // Not enough data points
//         let window = fullArr.slice(index - windowSize + 1, index + 1).map(e => e.value);
//         let avg = window.reduce((sum, num) => sum + num, 0) / windowSize;
//         return { time: entry.time, sma: avg };
//     });
// }
//
//
// const windowSize = 20;
// const smaData = movingAverageWithTime(smaFormat, windowSize);
//
// console.log(smaData);


// console.log(formatted);
// Output: [null, null, 101, 102.67, 104.67, 107.67, 110]




