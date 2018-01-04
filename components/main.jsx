const canvas = document.querySelector('#visualizer')
canvas.setAttribute('width', document.querySelector('#wrapper').clientWidth)
canvas.setAttribute('height', document.querySelector('#wrapper').clientHeight)
const canvasContext = canvas.getContext('2d')