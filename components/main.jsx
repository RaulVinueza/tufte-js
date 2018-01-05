import React, {Component} from 'react'
import DefaultTimeSeries from './DefaultTimeSeries.jsx'
import DefaultSparkline from './DefaultSparkline.jsx'
import CustomVisual from './CustomVisual.jsx'
import BloodPressure from './BloodPressure.jsx'
import {timeSeriesData, sparklineBinaryData, adverseEventData, systolicData, diastolicData} from '../data'


export default class Main extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <h1>Tufte-JS*</h1>
                <h4>React components that implement Prof. Edward Tufte's principles
                     for data visualization</h4>
                <h2>Time Series - Default Behavior</h2>
                <DefaultTimeSeries 
                    id="defaultTimeSeries"
                    width={600}
                    height={100}
                    data={timeSeriesData}
                />
                <h2>Modifying Scaling Behavior</h2>
                <h2>Modifying Line Drawing Behavior</h2>
                <h2>Modifying Mouseover and Background Behaviors</h2>
                <BloodPressure
                id="bloodPressure"
                width={600}
                height={100}
                systolicData={systolicData}
                diastolicData={diastolicData}
                />
                <h2>Sparklines - Default Behavior</h2>
                <DefaultSparkline
                    id="defaultSparkline"
                    width={300}
                    height={50}
                    data={sparklineBinaryData}
                />
                <h2>Modifying Drawing Behavior</h2>
                <h2>Embedding Sparklines Inline</h2>
                <h2>Custom Visualizations</h2>
                <CustomVisual 
                    id="customVisual"
                    width={400}
                    height={150}
                    data={adverseEventData}
                />
                <h2>Using Visualizations as Building Blocks</h2>
            </div>
        )
    }
    
}
