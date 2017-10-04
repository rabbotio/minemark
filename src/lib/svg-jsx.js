import React from 'react'

const fontFamily = 'Helvetica'

export default class SVG {
  constructor (w = '100%', h = '100%') {
    this.elements = []
    this.w = w
    this.h = h

    this.tooltipX = 0
    this.tooltipY = 0

    this.index = 0
  }

  size = (w, h) => {
    this.w = w
    this.h = h
  }

  from = element => {
    this.elements.push(element)
    return element
  }

  text = props => {
    if (typeof props === 'string') props = { text: props }
    const _props = Object.assign({ key: ++this.index, x: 0, y: 0, text: '', fontSize: 9, fontFamily: fontFamily, fill: '#000000' }, props)
    const text = _props.text
    delete _props.text
    const _element = React.createElement('text', _props, text, _props.children)
    this.elements.push(_element)
    return _element
  }

  tspan = props => {
    if (typeof props === 'string') props = { text: props }
    const _props = Object.assign({ key: ++this.index, text: '' }, props)
    const text = _props.text
    delete _props.text
    return <tspan {..._props}>{text}</tspan>
  }

  rect = props => {
    const _props = Object.assign({ key: ++this.index, x: 0, y: 0, width: 100, height: 100, fill: '#000000' }, props)
    const _element = <rect {..._props} />
    this.elements.push(_element)
    return _element
  }

  line = props => {
    const _props = Object.assign({ key: ++this.index, x1: 0, y1: 0, x2: 100, y2: 100, stroke: '#000000', strokeWidth: 1 }, props)
    const _element = <line {..._props} />
    this.elements.push(_element)
    return _element
  }

  image = props => {
    const _props = Object.assign({ key: ++this.index, x: 0, y: 0, width: 100, height: 100 }, props)
    const _element = <image {..._props} xlinkHref={_props.href} />
    this.elements.push(_element)
    return _element
  }

  jsx = () => (
    <svg id='svg' width={this.w} height={this.h} viewBox={`0 0 ${this.w} ${this.h}`}>
      <g>{this.elements}</g>
    </svg>
  )
}
