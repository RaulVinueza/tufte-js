import React, {Component} from 'react'

export default class Main extends Component {
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <h1>Tufte-js</h1>
                <h4>React components that implement Prof. Edward Tufte's principles
                     for data visualization</h4>
                <h2>Time Series - Default Behavior</h2>
                <h2>Modifying Scaling Behavior</h2>
                <h2>Modifying Mouseover and Background Behaviors</h2>
                <h2>Modifying Layering and Tooltip Behaviors</h2>
                <h2>Sparklines - Default Behavior</h2>
                <h2>Modifying Drawing Behavior</h2>
                <h2>Embedding Sparklines Inline</h2>
                <h2>Custom Visualizations</h2>
                <h2>Using Visualizations as Building Blocks</h2>
            </div>
        )
    }
    
}

// const canvas = document.querySelector('#visualizer')
// canvas.setAttribute('width', document.querySelector('#wrapper').clientWidth)
// canvas.setAttribute('height', document.querySelector('#wrapper').clientHeight)
// const canvasContext = canvas.getContext('2d')