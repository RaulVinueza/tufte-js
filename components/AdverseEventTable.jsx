import React, {Component} from 'react'
import throttle from 'lodash.throttle'

export default class CustomVisual  extends Component {
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
        ctx.fillRect(0, 0, width, height)
        const data = this.props.data
        const widthStep = xDimension / data.length
        const blockheight = 30
        const rectStartingCoord = bottomRail - blockheight
        
        function lightnessValue(severity){
            return 90 - (25 * severity)
        }
        data.forEach((val, idx) => {
             if(val === null) return
            const lightness = lightnessValue(val.severity)
            ctx.fillStyle = `hsl(0,0%,${lightness}%`
             const xVal = leftRail + widthStep * idx
            ctx.fillRect(xVal, rectStartingCoord, widthStep, blockheight)  
        })
        const interactionLayer = document.querySelector(`#${this.props.id}-interaction`)
        const iCtx = interactionLayer.getContext('2d')
        iCtx.fillStyle = 'rgb(147, 150, 155)'
        iCtx.setLineDash([2, 2])
        const canvasBoundingRect = canvas.getBoundingClientRect()
        const topLeftCorner = {top: canvasBoundingRect.top, left: canvasBoundingRect.left}
        function calculateDataIndex(xCoord){
            return Math.floor((xCoord - leftRail)/ widthStep)
        }
        const mouseOverBehavior = throttle(evt => {
            const trueX = evt.pageX - topLeftCorner.left 
            if(trueX < leftRail || trueX > rightRail) iCtx.clearRect(0, 0, width, height)
            else {
                const day = calculateDataIndex(trueX)
                const classification = data[day] && data[day].classification || ''
                const severity = data[day] && 'Severity: ' + data[day].severity || ''
                iCtx.beginPath()
                iCtx.clearRect(0, 0, width, height)
                iCtx.moveTo(trueX, 0)
                iCtx.lineTo(trueX, height)
                iCtx.stroke()
                iCtx.fillText(`Day ${day}`, trueX + 10, 20)
                iCtx.fillText(classification, trueX + 10, 40)
                iCtx.fillText(severity, trueX + 10, 60)
            }
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