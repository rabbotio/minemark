import canvg from 'canvg-browser'

// Styles
import styled from 'styled-components'

const Buttonz = styled.button`
position:relative;
width: auto;
display:inline-block;
color:#ecf0f1;
text-decoration:none;
border-radius:5px;
border:solid 1px #bdc3c7;
background:#95a5a6;
text-align:center;
padding:4px 8px 6px;
margin: 12px;
outline: none;

-webkit-transition: all 0.1s;
-moz-transition: all 0.1s;
transition: all 0.1s;

-webkit-box-shadow: 0px 3px 0px #7f8c8d;
-moz-box-shadow: 0px 3px 0px #7f8c8d;
box-shadow: 0px 3px 0px #7f8c8d;

:active{
    -webkit-box-shadow: 0px 2px 0px #7f8c8d;
    -moz-box-shadow: 0px 2px 0px #7f8c8d;
    box-shadow: 0px 2px 0px #7f8c8d;
    position:relative;
    top:4px;
}
`

const PIXEL_RATIO = (function () {
  const ctx = document.createElement('canvas').getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1

  return dpr / bsr
})()

const setHiDPICanvas = function (canvas, w, h, ratio = PIXEL_RATIO) {
  canvas.width = w * ratio
  canvas.height = h * ratio
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
}

const onShare = svg => {
  const canvas = document.getElementById('canvas')
  const svgSize = svg.getBoundingClientRect()
  const w = svgSize.width
  const h = svgSize.height
  // setHiDPICanvas(canvas, w, h)

  // svg.setAttribute('transform', 'scale(2,2)')

  // const svg2container = document.createElement('div')
  // svg.setAttribute('id', 'svg2')
  svg.setAttribute('width', '640')
  svg.setAttribute('height', '640')
  svg.setAttribute('transform', 'scale(2,2)')

  canvg(canvas, svg.outerHTML, {
    scaleWidth: 640,
    scaleHeight: 640
  })

  svg.setAttribute('width', '320')
  svg.setAttribute('height', '320')
  svg.setAttribute('transform', 'scale(1,1)')
}

export { Buttonz, onShare }
