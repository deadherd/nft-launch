// components/TaglineCircle.tsx
'use client'

import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

interface SvgProps {
  color?: string
}

const range = ['4%', '16.5%', '29%', '41.5%', '54%', '66.5%', '79%', '91.5%']

const Svg: FC<SvgProps> = ({ color = '#59fd53' }) => {
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + 45)
    }, 10000) // every 10s

    return () => clearInterval(interval)
  }, [])
  return (
    <svg className='svgCircle' width='240' height='240' viewBox='0 0 240 240' fill={color}>
      <g className='rotatingGroup' style={{ transform: `rotate(${angle}deg)` }}>
        {/* define the path */}
        <defs>
          <path id='circlePath' d='M120,120 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0' />
          <path id='outerCirclePath' d='M120,120 m-105,0 a105,105 0 1,1 210,0 a105,105 0 1,1 -210,0' />
        </defs>

        {/* text wrapped around the circle */}
        <text className='svgText'>
          <textPath className='svgTextWhite' href='#circlePath' startOffset={range[0]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrEight'>0</tspan>
          </textPath>
          <textPath className='svgTextWhite svgTextLarge' href='#circlePath' startOffset={range[1]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrOne'>0</tspan>
          </textPath>
          <textPath className='svgTextWhite' href='#circlePath' startOffset={range[2]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrTwo'>0</tspan>
          </textPath>
          <textPath className='svgTextWhite' href='#circlePath' startOffset={range[3]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrThree'>0</tspan>
          </textPath>
          <textPath className='svgTextWhite' href='#circlePath' startOffset={range[4]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrFour'>0</tspan>
          </textPath>
          <textPath className='svgTextWhite' href='#circlePath' startOffset={range[5]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrFive'>0</tspan>
          </textPath>
          <textPath className='svgTextWhite' href='#circlePath' startOffset={range[6]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrSix'>0</tspan>
          </textPath>
          <textPath className='svgTextWhite' href='#circlePath' startOffset={range[7]} textAnchor='middle'>
            <tspan></tspan>
            <tspan id='mfrSeven'>0</tspan>
          </textPath>
        </text>
        <text className='svgTitle'>
          <textPath href='#outerCirclePath' startOffset={range[0]} textAnchor='middle'>
            <tspan>Rank</tspan>
          </textPath>
          <textPath href='#outerCirclePath' startOffset={range[1]} textAnchor='middle'>
            <tspan>Time</tspan>
          </textPath>
          <textPath href='#outerCirclePath' startOffset={range[2]} textAnchor='middle'>
            <tspan>Runt</tspan>
          </textPath>
          <textPath href='#outerCirclePath' startOffset={range[3]} textAnchor='middle'>
            <tspan>Made</tspan>
          </textPath>
          <textPath href='#outerCirclePath' startOffset={range[4]} textAnchor='middle'>
            <tspan>Yolk</tspan>
          </textPath>
          <textPath href='#outerCirclePath' startOffset={range[5]} textAnchor='middle'>
            <tspan>Gold</tspan>
          </textPath>
          <textPath href='#outerCirclePath' startOffset={range[6]} textAnchor='middle'>
            <tspan>Nosh</tspan>
          </textPath>
          <textPath href='#outerCirclePath' startOffset={range[7]} textAnchor='middle'>
            <tspan>Zoom</tspan>
          </textPath>
        </text>
      </g>
    </svg>
  )
}

export default Svg
