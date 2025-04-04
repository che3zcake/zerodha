import {
    CandlestickSeries,
    createChart,
    ColorType,
    BarSeries,
    LineSeries, AreaSeries, BaselineSeries, HistogramSeries
} from 'lightweight-charts';
import {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useCompany} from "../Components/CompanyContext.tsx";
import Loading from "../Components/Loading.tsx";
import OptionBar from "../Components/OptionBar.tsx";
import {useInterval} from "../Components/intervalOptions.tsx";
import {useGraph} from "../Components/graphOptions.tsx";
import {useIndicator} from "../Components/indicatorOptions.tsx";


//@ts-ignore
export const ChartComponent = props => {
    const {
        data,
        idata,
        indicator,
        graph,
        colors: {
            backgroundColor = 'white',
            lineColor = '#2962FF',
            textColor = 'black',
            areaTopColor = '#2962FF',
            areaBottomColor = 'rgba(41, 98, 255, 0.28)',
        } = {},
    } = props;

    const chartContainerRef = useRef();
    const secondChartRef = useRef()

    useEffect(
        () => {
            const handleResize = () => {
                // @ts-ignore
                chart.applyOptions({width: chartContainerRef.current.clientWidth});
            };

            // @ts-ignore
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: {type: ColorType.Solid, color: backgroundColor},
                    textColor,
                },
                // @ts-ignore
                width: chartContainerRef.current.clientWidth,
                // @ts-ignore
                height: 500,
            });
            chart.timeScale().fitContent();

            let newSeries = null
            if (graph?.name == 'Candle' || graph?.name == 'Heikin Ashi') {
                newSeries = chart.addSeries(CandlestickSeries, {
                    upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                    wickUpColor: '#26a69a', wickDownColor: '#ef5350',
                });
            }

            if (graph?.name == 'Bar') {
                newSeries = chart.addSeries(BarSeries, {
                    upColor: 'black', downColor: 'black'
                });
            }

            if (graph?.name == 'Colored Bar') {
                newSeries = chart.addSeries(BarSeries, {
                    upColor: '#26a69a', downColor: '#ef5350'
                });
            }

            if (graph?.name == 'Line') {
                newSeries = chart.addSeries(LineSeries, { color: 'black',lineWidth: 2});
            }

            if (graph?.name == 'Vertex Line') {
                newSeries = chart.addSeries(LineSeries, { color: 'black',lineWidth: 2, pointMarkersVisible:true, pointMarkersRadius:2});
            }

            if (graph?.name == 'Step') {
                newSeries = chart.addSeries(LineSeries, { color: 'black',lineWidth: 2, lineType: 1});
            }

            if (graph?.name == 'Mountain') {
                newSeries = chart.addSeries(AreaSeries, { lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.28)'});
            }

            if (graph?.name == 'Baseline') {
                let totalSum = 0;
                data.forEach((item: { value: number; }) => {
                    totalSum += item.value;
                });
                const avg = totalSum/data.length
                newSeries = chart.addSeries(BaselineSeries, { baseValue: { type:'price', price:avg}, topLineColor: 'rgba( 38, 166, 154, 1)', topFillColor1: 'rgba( 38, 166, 154, 0.28)', topFillColor2: 'rgba( 38, 166, 154, 0.05)', bottomLineColor: 'rgba( 239, 83, 80, 1)', bottomFillColor1: 'rgba( 239, 83, 80, 0.05)', bottomFillColor2: 'rgba( 239, 83, 80, 0.28)' });
            }

            if (graph?.name == 'Histogram') {
                newSeries = chart.addSeries(HistogramSeries, { color: '#26a69a'});
            }

            if (graph?.name == 'Hollow Candle') {
                newSeries = chart.addSeries(CandlestickSeries, {
                    upColor: 'white', downColor: '#ef5350', borderVisible: true, wickUpColor: '#26a69a', wickDownColor: '#ef5350'
                });
            }

            newSeries?.setData(data);

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
    );

    useEffect(() => {
        // @ts-ignore
        const secondChart = createChart(secondChartRef.current)
        // @ts-ignore
        secondChart.applyOptions({
            layout:{
                background:{type:ColorType.Solid,color:"white"},
                textColor:"black"
            },
            // @ts-ignore
            width: secondChartRef.current.clientWidth,
            height: 200
        })
        let secondSeries = null

        if (indicator?.name == 'SMA'){
            secondSeries = secondChart.addSeries(LineSeries, {color: 'black',lineWidth: 2})
        }

        if (indicator?.name == 'EMA'){
            secondSeries = secondChart.addSeries(LineSeries, {color: 'black',lineWidth: 2})
        }

        if (indicator?.name == 'RSI'){
            secondSeries = secondChart.addSeries(LineSeries, {color: 'black',lineWidth: 2})
        }

        if (indicator?.name == 'BB'){
            secondSeries = secondChart.addSeries(LineSeries, {color: 'green',lineWidth: 2})
        }

        if (indicator?.name == 'ADL'){
            secondSeries = secondChart.addSeries(LineSeries, {color: 'blue',lineWidth: 2})
        }

        console.log(idata)
        secondSeries?.setData(idata)

        return ()=>{
            secondChart.remove()
        }

    }, [idata]);


    return (
        <div>
            <div ref={chartContainerRef}/>
            <div ref={secondChartRef}/>
        </div>
    );
};

function useChartData(company:any, currentGraph:any) {
    const [data, setData] = useState([]);
    // @ts-ignore
    const currentInterval = useInterval((state)=>state.interval)

    useEffect(() => {
        axios
            .post(`http://localhost:3000/${currentGraph.dtype}`, { 'company':company, 'interval':currentInterval})
            .then((response) => {
                setData(response.data || []);
            })
            .catch((err) => {
                console.error('Error fetching data:', err.message);
            });
    }, [company,currentInterval,currentGraph]);

    return data;
}

export default function Chart() {
    // @ts-ignore
    const { company } = useCompany();
    // @ts-ignore
    const currentGraph = useGraph((state)=>state.graph)
    // @ts-ignore
    const currentIndicator = useIndicator((state)=>state.indicator)
    const data = useChartData(company, currentGraph);
    const idata = useChartData(company, currentIndicator)

    return<div className="h-full shadow-md">
        <div className="py-2 border-b-2 border-red-200"><OptionBar/></div>
        <div className="px-10 h-full">
            {!company ? (
                <ChartComponent data={[]}/>
            ) : data.length > 0 ? (
                <ChartComponent data={data} idata={idata} graph={currentGraph} indicator={currentIndicator}/>
            ) : (
                <div className="flex h-3/4 w-full justify-center items-center flex-1">
                    <Loading/>
                </div>
            )}
        </div>
    </div>
}

