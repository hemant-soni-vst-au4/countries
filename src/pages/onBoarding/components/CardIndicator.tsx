//@ts-nocheck
import React from 'react'
import {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Circle = styled.div`
  width: 10px;
  height: 10px;
  background-color: #cfc5fa;
  position: relative;
  border-radius: 20px;
  margin-right: 4px;
  overflow: hidden;
`
const Mover = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 15px;
  height: 10px;
  border-radius: 15px;
  background-color: #1e2d47;
  transition: transform 0.5s ease;
`

/**
 * Indicator component
 */
export const CardIndicator = ({position, size}) => {
  const items = [...Array(size).keys()]
  const [index, setIndex] = useState(position - 1)
  const increment = useRef(1)

  useEffect(() => {
    let interval = setInterval(() => {
      if (index >= items.length - 1) {
        // increment.current = -1;
      } else if (index <= 0) {
        // increment.current = 1;
      }

      // setIndex(index + increment.current);
    }, 200)
    return () => clearInterval(interval)
  })
  return (
    <Wrapper>
      <Container>
        {items.map((i) => {
          return (
            <Circle key={i}>
              <Mover
                style={{
                  transform: `translateX(${(position - i) * 40}px)`,
                }}
              />
            </Circle>
          )
        })}
      </Container>
    </Wrapper>
  )
}

CardIndicator.propTypes = {
  position: PropTypes.number,
  size: PropTypes.number,
}

export default CardIndicator
