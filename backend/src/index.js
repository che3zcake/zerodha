import express from 'express';
import cors from 'cors';
import yahooFinance from 'yahoo-finance2';
import {adx} from "@ixjb94/indicators-js";


const app = express();
app.use(cors());
app.use(express.json());

app.post('/candlestick', async (req, res) => {
    try {
        const  company  = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = { period1: '2023-01-01', period2: '2024-12-31', interval: interval };
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        res.json(formattedResult);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
});

app.post('/heikinashi', async (req, res) => {
    try {
        const  company  = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = { period1: '2023-01-01', period2: '2024-12-31', interval: interval };
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const heikinAshiData = [];

        for (let index = 0; index < formattedResult.length; index++) {
            const curr = formattedResult[index];

            if (index === 0) {
                heikinAshiData.push({
                    time: curr.time,
                    open: (curr.open + curr.close) / 2,
                    close: (curr.open + curr.high + curr.low + curr.close) / 4,
                    high: curr.high,
                    low: curr.low
                });
            } else {
                const prevHA = heikinAshiData[index - 1];

                heikinAshiData.push({
                    time: curr.time,
                    open: (prevHA.open + prevHA.close) / 2,
                    close: (curr.open + curr.high + curr.low + curr.close) / 4,
                    high: Math.max(curr.high, prevHA.open, prevHA.close),
                    low: Math.min(curr.low, prevHA.open, prevHA.close)
                });
            }
        }

        res.json(heikinAshiData);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
});

app.post('/line', async (req, res) => {
    try {
        const  company  = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = { period1: '2023-01-01', period2: '2024-12-31', interval: interval };
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            value: (item.close+item.open)/2,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        res.json(formattedResult);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
});

app.post('/histogram', async (req, res) => {
    try {
        const  company  = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = { period1: '2023-01-01', period2: '2024-12-31', interval: interval };
        const result = await yahooFinance.chart(company, queryOptions);

        const formatted = result['quotes'].map(item => ({
            value: item.close,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const formattedResult = formatted.map((item, index, arr) => ({
            time: item.time,
            value: item.value,
            color: index > 0 && item.value < arr[index - 1].value ? '#ef5350' : '#26a69a'
        }));

        res.json(formattedResult);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
});

app.post('/adx', async (req, res) => {
    try {
        const  company  = req.body.company;
        const interval = req.body.interval;

        console.log("adx called")

        const queryOptions = { period1: '2023-01-01', period2: '2024-12-31', interval: interval };
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const high = [];
        result['quotes'].forEach(item => {
            high.push(item.high);
        });
        const low = [];
        result['quotes'].forEach(item => {
            low.push(item.low);
        });

        const adxresult = adx(high,low,14)
        const adxWithTime = adxresult.map((item,index)=>({
            time: formattedResult[index + (14-1)]?.time,
            value: item
        }))

        res.json(adxresult);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
});

app.post('/sma', async ( req, res )=>{
    try {
        const company = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = {period1: '2023-01-01', period2: '2024-12-31', interval: interval};
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const smaFormat = formattedResult.map(item => ({
            time: new Date(item.date).toISOString().split('T')[0],
            value: item.close
        }))

        function movingAverageWithTime(data, windowSize) {
            return data
                .map((entry, index, fullArr) => {
                    if (index < windowSize - 1) return null; // Skip early values
                    let window = fullArr.slice(index - windowSize + 1, index + 1).map(e => e.value);
                    let avg = window.reduce((sum, num) => sum + num, 0) / windowSize;
                    return { time: entry.time, value: avg };
                })
                .filter(entry => entry !== null); // Remove null values
        }


        const windowSize = 3;
        const smaData = movingAverageWithTime(smaFormat, windowSize);

        res.json(smaData)

    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
})

app.post('/ema', async ( req, res )=>{
    try {
        const company = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = {period1: '2023-01-01', period2: '2024-12-31', interval: interval};
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const emaFormat = formattedResult.map(item => ({
            time: new Date(item.date).toISOString().split('T')[0],
            value: item.close
        }))

        function calculateEMA(data, period) {
            if (data.length < period) {
                throw new Error("Not enough data points to calculate EMA.");
            }

            const k = 2 / (period + 1); // Smoothing factor
            let emaArray = [];
            let sum = 0;

            for (let i = 0; i < period; i++) {
                sum += data[i].value;
            }
            let prevEMA = sum / period;
            emaArray.push({ time: data[period - 1].time, value: prevEMA });

            // Calculate EMA for remaining points
            for (let i = period; i < data.length; i++) {
                let ema = (data[i].value * k) + (prevEMA * (1 - k));
                emaArray.push({ time: data[i].time, value: ema });
                prevEMA = ema;
            }

            return emaArray;
        }


        const period = 3;
        const emaData = calculateEMA(emaFormat, period);

        res.json(emaData)

    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
})

app.post('/rsi', async ( req, res )=>{
    try {
        const company = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = {period1: '2023-01-01', period2: '2024-12-31', interval: interval};
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const rsiFormat = formattedResult.map(item => ({
            time: new Date(item.date).toISOString().split('T')[0],
            value: item.close
        }))

        function calculateRSI(data, period = 14) {
            if (data.length < period) return []; // Not enough data

            let gains = [], losses = [];

            for (let i = 1; i < data.length; i++) {
                let change = data[i].value - data[i - 1].value;
                gains.push(change > 0 ? change : 0);
                losses.push(change < 0 ? Math.abs(change) : 0);
            }

            let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
            let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

            let rsiValues = [];

            for (let i = period; i < gains.length; i++) {
                avgGain = (avgGain * (period - 1) + gains[i]) / period;
                avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

                let rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
                let rsi = 100 - (100 / (1 + rs));

                rsiValues.push({
                    time: data[i + 1].time, // Align with the closing price time
                    value: rsi
                });
            }

            return rsiValues;
        }

        const period = 3;
        const rsiData = calculateRSI(rsiFormat, period);

        res.json(rsiData)

    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
})

app.post('/bb', async ( req, res )=>{
    try {
        const company = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = {period1: '2023-01-01', period2: '2024-12-31', interval: interval};
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const bbFormat = formattedResult.map(item => ({
            time: new Date(item.date).toISOString().split('T')[0],
            value: item.close
        }))

        function calculateBollingerBands(data, period = 20, multiplier = 2) {
            if (data.length < period) return []; // Not enough data

            let bands = [];

            for (let i = period - 1; i < data.length; i++) {
                let window = data.slice(i - period + 1, i + 1).map(e => e.value);

                // Calculate SMA (Simple Moving Average)
                let sma = window.reduce((sum, val) => sum + val, 0) / period;

                // Calculate Standard Deviation
                let variance = window.reduce((sum, val) => sum + Math.pow(val - sma, 2), 0) / period;
                let stdDev = Math.sqrt(variance);

                // Calculate Upper and Lower Bands
                let upperBand = sma + multiplier * stdDev;
                let lowerBand = sma - multiplier * stdDev;

                bands.push({
                    time: data[i].time,  // Align time with the last element of the window
                    sma: sma,
                    value: upperBand,
                    lower: lowerBand
                });
            }

            return bands;
        }


        const period = 3;
        const bbData = calculateBollingerBands(bbFormat, period, 2);

        res.json(bbData)

    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
})


app.post('/adl', async ( req, res )=>{
    try {
        const company = req.body.company;
        const interval = req.body.interval;

        console.log("Fetching data for:", company);

        const queryOptions = {period1: '2023-01-01', period2: '2024-12-31', interval: interval};
        const result = await yahooFinance.chart(company, queryOptions);

        const formattedResult = result['quotes'].map(item => ({
            ...item,
            time: new Date(item.date).toISOString().split('T')[0]
        }));

        const adlFormat = formattedResult.map(item => ({
            time: new Date(item.date).toISOString().split('T')[0],
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume
        }))

        function calculateADL(data) {
            let adl = 0;
            return data.map((entry) => {
                const { time, high, low, close, volume } = entry;

                if (high === low) {
                    return { time, value: adl }; // Avoid division by zero
                }

                const mfm = ((close - low) - (high - close)) / (high - low);
                const moneyFlowVolume = mfm * volume;
                adl += moneyFlowVolume;

                return { time, value: adl };
            });
        }

        const adlData = calculateADL(adlFormat);

        res.json(adlData)

    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Failed to fetch stock data." });
    }
})



app.listen(3000, () => {
    console.log("Server running at port 3000");
});
