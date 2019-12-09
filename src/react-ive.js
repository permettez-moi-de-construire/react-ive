import React, { useState, useEffect } from 'react'
import { useGesture } from 'react-use-gesture'

const Reactive = ({
  hoverable = false,
  pressable = false,
  onHoveredChange = () => {},
  onPressedChange = () => {},
  children = () => {},
  ...restProps
}) => {
  const [{
    isHovered,
    isPressed
  }, setInteracted] = useState({
    isHovered: null,
    isPressed: null
  })

  const handleState = ({ hovering, dragging }) => {
    setInteracted({
      isHovered: hoverable ? hovering : null,
      isPressed: pressable ? dragging : null
    })
  }

  const bindGesture = useGesture({
    onDragStart: handleState,
    onDragEnd: handleState,
    onHover: handleState
  }, {
    drag: pressable,
    pinch: false,
    scroll: false,
    wheel: false,
    move: false,
    hover: hoverable
  })

  useEffect(() => {
    hoverable && onHoveredChange(isHovered)
  }, [isHovered, hoverable])

  useEffect(() => {
    pressable && onPressedChange(isPressed)
  }, [isPressed, pressable])

  return (
    <div
      {...restProps}
      {...bindGesture()}
      style={{
        ...(restProps.style || {}),
        display: 'flex'
      }}
    >
      {children({
        ...(hoverable ? { isHovered } : {}),
        ...(pressable ? { isPressed } : {})
      })}
    </div>
  )
}

export default Reactive
