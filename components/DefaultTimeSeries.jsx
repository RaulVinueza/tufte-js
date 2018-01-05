import React, {Component} from 'react'

export default class DefaultTimeSeries extends Component {
    constructor(){
        super()
    }

    
    componentDidMount(){
        const canvas = document.querySelector(`#${this.props.id}`)
        const ctx = canvas.getContext('2d', {alpha: false})
        ctx.fillStyle = 'rgb(255, 255, 255)'
        const width = this.props.width
        const height = this.props.height
        ctx.fillRect(0, 0, width, height)
        const data = this.props.data
        const min = Math.min(...data)
        const max = Math.max(...data)
        const range = max - min
        const widthStep = width / (data.length - 1)
        const bitmapCoords = data.map(val => {
            if (val === null) return null
            return height - (((val - min) / range) * height)
        })
        ctx.fillStyle = 'rgb(0, 0, 0)'
        bitmapCoords.forEach((val, idx) => {
            if(idx === 0) ctx.moveTo(0, val)
            else ctx.lineTo(idx * widthStep, val)
        })
        ctx.stroke()
        const interactionLayer = document.querySelector(`#${this.props.id}-interaction`)
        const iCtx = interactionLayer.getContext('2d')
        iCtx.fillStyle = 'rgb(147, 150, 155)'
        iCtx.fillRect(0,0,10,10)
        const canvasBoundingRect = canvas.getBoundingClientRect()
        const topLeftCorner = {top: canvasBoundingRect.top, left: canvasBoundingRect.left}
        
        function mouseOverBehavior(evt){
            
            console.log(evt)
        }
        interactionLayer.addEventListener("mousemove", mouseOverBehavior)
    }

    render(){
        return (
            <div style={{position: 'relative', height: this.props.height}}>
            <canvas 
                id={this.props.id} 
                height={this.props.height} 
                width={this.props.width}
                style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}
            ></canvas>
            <canvas 
                id={`${this.props.id}-interaction`} 
                height={this.props.height} 
                width={this.props.width}
                style={{position: 'absolute', left: 0, top: 0, zIndex: 1}}
            ></canvas>
            </div>
        )
    }
}