import React from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'

import Reactive from '@permettezmoideconstruire/react-ive'

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    font-family: 'Source Sans Pro', sans-serif
  }
`

const StyledReactive = styled(Reactive)`
  padding: 30px;
  text-align: center;
  user-select: none;
  cursor: initial;
`

const StyledClickableReactive = styled(StyledReactive)`
  cursor: pointer;
`

const ReactiveContentWrapperDiv = styled.div`
  width: 100%;
`

const statusSpan = css`
  display: block;
`

const HoverMe = styled.span`
  ${statusSpan}
  opacity: 0.8;
`

const HoveredMe = styled.span`
  ${statusSpan}
  font-weight: bold;
`

const AllInteractionsDiv = ({
  children,
  ...restProps
}) => (
  <StyledClickableReactive
    hoverable
    pressable
    {...restProps}
  >
    {({ isHovered, isPressed }) => (
      <ReactiveContentWrapperDiv>
        {isHovered ? (
          <HoveredMe>Hovered</HoveredMe>
        ) : (
          <HoverMe>Hover me</HoverMe>
        )}
        {isPressed ? (
          <HoveredMe>Pressed</HoveredMe>
        ) : (
          <HoverMe>Press me</HoverMe>
        )}

        {children}
      </ReactiveContentWrapperDiv>
    )}
  </StyledClickableReactive>
)

const HoverableDiv = ({
  children,
  ...restProps
}) => (
  <StyledReactive
    hoverable
    {...restProps}
  >
    {({ isHovered }) => (
      <ReactiveContentWrapperDiv>
        {isHovered ? (
          <HoveredMe>Hovered</HoveredMe>
        ) : (
          <HoverMe>Hover me</HoverMe>
        )}

        {children}
      </ReactiveContentWrapperDiv>
    )}
  </StyledReactive>
)

const PressableDiv = ({
  children,
  ...restProps
}) => (
  <StyledClickableReactive
    pressable
    {...restProps}
  >
    {({ isPressed }) => (
      <ReactiveContentWrapperDiv>
        {isPressed ? (
          <HoveredMe>Pressed</HoveredMe>
        ) : (
          <HoverMe>Press me</HoverMe>
        )}

        {children}
      </ReactiveContentWrapperDiv>
    )}
  </StyledClickableReactive>
)

const ParentReactiveDiv = styled(AllInteractionsDiv)`
  background-color: #7dd8be;
  color: #3f3f3f;
  width: 50%;
`

const ChildWrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 50px;
`

const childDiv = css`
  width: 20%;
  margin: 30px;
`

const ChildHoverableDiv = styled(HoverableDiv)`
  ${childDiv}
  background-color: #f2495e;
  color: #f9f9f9;
`

const ChildPressableDiv = styled(PressableDiv)`
  ${childDiv}
  background-color: #f2495e;
  color: #f9f9f9;
`

const App = () => (
  <>
    <GlobalStyle />

    <ParentReactiveDiv>
      <ChildWrapperDiv>
        <ChildHoverableDiv />
        <ChildHoverableDiv />
        <ChildPressableDiv />
        <ChildPressableDiv />
      </ChildWrapperDiv>
    </ParentReactiveDiv>
  </>
)

const domContainer = document.querySelector('#app-container')
ReactDOM.render(<App />, domContainer)
