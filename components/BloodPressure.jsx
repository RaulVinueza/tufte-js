import React, {Component} from 'react'
import throttle from 'lodash.throttle'

export default class BloodPressure extends Component {
    constructor(){
        super()
    }
    
    componentDidMount(){
        const canvasSys = document.querySelector(`#${this.props.id}-s`)
        const canvasDia = document.querySelector(`#${this.props.id}-d`)
        const ctx = canvasSys.getContext('2d', {alpha: false})
        const ctx2 = canvasDia.getContext('2d', {alpha: false})
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx2.fillStyle = 'rgb(255, 255, 255)'
        const width = this.props.width
        const height = this.props.height
        const leftRail = 50
        const rightRail = width - 50
        const topRail = 10
        const bottomRail = height - 10
        const xDimension = rightRail - leftRail
        const yDimension = bottomRail - topRail
        ctx.fillRect(0, 0, width, height)
        ctx2.fillRect(0, 0, width, height)
        const systolic = this.props.systolicData
        const diastolic = this.props.diastolicData
        const sMin = 70
        const sMax = 140
        const sRange = sMax - sMin
        const dMin = 50
        const dMax = 100
        const dRange = dMax - dMin
        const sysUpperNorm = 120
        const sysLowerNorm = 90
        const diaUpperNorm = 80
        const diaLowerNorm = 60
        function maptoCoord(val){
            return (yDimension - ((val - sMin)/sRange) * yDimension) + topRail
        }
        function maptoCoordD(val){
            return (yDimension - ((val - dMin)/dRange) * yDimension) + topRail
        }
        ctx.fillStyle = 'hsl(0,0%,90%)'
        ctx2.fillStyle = 'hsl(0,0%,90%)'
        const sNormalRange = maptoCoord(sysLowerNorm) - maptoCoord(sysUpperNorm)
        const dNormalRange = maptoCoordD(diaLowerNorm) - maptoCoordD(diaUpperNorm)
        ctx.fillRect(leftRail, maptoCoord(sysUpperNorm), xDimension, sNormalRange)
        ctx2.fillRect(leftRail, maptoCoordD(diaUpperNorm), xDimension, dNormalRange)
        const widthStep = xDimension / (systolic.length - 1)
        const systolicYCoord = systolic.map(val => {
            return maptoCoord(val)
        })
        const diastolicYCoord = diastolic.map(val => {
            return maptoCoordD(val)
        })
        ctx.fillStyle = 'rgb(0, 0, 0)'
        ctx2.fillStyle = 'rgb(0, 0, 0)'
        systolicYCoord.forEach((val, idx) => {
            if(idx === 0) ctx.moveTo(leftRail, val)
            else ctx.lineTo(idx * widthStep + leftRail, val)
        })
        ctx.stroke()
        diastolicYCoord.forEach((val, idx) => {
            if(idx === 0) ctx2.moveTo(leftRail, val)
            else ctx2.lineTo(idx * widthStep + leftRail, val)
        })
        ctx2.stroke()
        const interactionLayer = document.querySelector(`#${this.props.id}-interaction`)
        const iCtx = interactionLayer.getContext('2d')
        iCtx.fillStyle = 'rgb(147, 150, 155)'
        iCtx.setLineDash([2, 2])
        const canvasBoundingRect = canvasSys.getBoundingClientRect()
        const topLeftCorner = {top: canvasBoundingRect.top, left: canvasBoundingRect.left}
        
        const mouseOverBehavior = throttle(evt => {
            const trueX = evt.pageX - topLeftCorner.left 
            iCtx.beginPath()
            iCtx.clearRect(0, 0, width, height * 2 + 10)
            iCtx.moveTo(trueX, topRail)
            iCtx.lineTo(trueX, yDimension)
            iCtx.moveTo(trueX, topRail + height + 10)
            iCtx.lineTo(trueX, height + 10 + topRail + yDimension)
            iCtx.stroke()

        }, 64)
        interactionLayer.addEventListener("mousemove", mouseOverBehavior)
    }

    render(){
        return (
            <div className="visualization" 
            style={{position: 'relative', height: this.props.height * 2 + 10, width: this.props.width}}>
            <canvas 
                id={`${this.props.id}-s`} 
                height={this.props.height} 
                width={this.props.width}
                style={{position: 'absolute', left: 0, top: 0, zIndex: 0}}
            ></canvas>
            <canvas 
                id={`${this.props.id}-d`} 
                height={this.props.height} 
                width={this.props.width}
                style={{position: 'absolute', left: 0, top: this.props.height + 10, zIndex: 0}}
            ></canvas>
            <canvas 
                id={`${this.props.id}-interaction`} 
                height={this.props.height * 2 + 10} 
                width={this.props.width}
                style={{position: 'absolute', left: 0, top: 0, zIndex: 1}}
            ></canvas>
            </div>
        )
    }
}