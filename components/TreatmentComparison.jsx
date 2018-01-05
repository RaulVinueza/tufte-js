import React, {Component} from 'react'
import throttle from 'lodash.throttle'

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
        const leftRail = 50
        const rightRail = width - 50
        const topRail = 10
        const bottomRail = height - 10
        const xDimension = rightRail - leftRail
        const yDimension = bottomRail - topRail
        ctx.fillRect(0, 0, width, height)
        const treatmentA = this.props.treatmentA
        const treatmentB = this.props.treatmentB
        const min = 1
        const max = 10
        const range = 10
        const widthStep = xDimension / (treatmentA.length - 1)
        const bitmapCoordsA = treatmentA.map(val => {
            if (val === null) return null
            return yDimension - ((val/range) * yDimension)
        })
        const bitmapCoordsB = treatmentB.map(val => {
            if (val === null) return null
            return yDimension - ((val/range) * yDimension)
        })
        ctx.fillStyle = 'rgb(0, 0, 0)'
        bitmapCoordsA.forEach((val, idx) => {
            if(idx === 0) ctx.moveTo(leftRail, val + topRail)
            else ctx.lineTo(idx * widthStep + leftRail, val + topRail)
        })
        ctx.stroke()
        bitmapCoordsB.forEach((val, idx) => {
            if(idx === 0) ctx.moveTo(leftRail, val + topRail)
            else ctx.lineTo(idx * widthStep + leftRail, val + topRail)
        })
        ctx.stroke()

        const interactionLayer = document.querySelector(`#${this.props.id}-interaction`)
        const iCtx = interactionLayer.getContext('2d')
        iCtx.fillStyle = 'rgb(147, 150, 155)'
        iCtx.setLineDash([2, 2])
        const canvasBoundingRect = canvas.getBoundingClientRect()
        const topLeftCorner = {top: canvasBoundingRect.top, left: canvasBoundingRect.left}
        
        const mouseOverBehavior = throttle(evt => {
            const trueX = evt.pageX - topLeftCorner.left 
            iCtx.beginPath()
            iCtx.clearRect(0, 0, width, height)
            iCtx.moveTo(trueX, 0)
            iCtx.lineTo(trueX, height)
            iCtx.stroke()

        }, 64)
        interactionLayer.addEventListener("mousemove", mouseOverBehavior)
    }

    render(){
        return (
            <div className="visualization" 
            style={{position: 'relative', height: this.props.height, width: this.props.width}}>
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