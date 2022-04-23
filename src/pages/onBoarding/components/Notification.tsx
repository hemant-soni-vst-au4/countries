// import React, {Fragment, useState, useEffect} from 'react'

// components
import Button from './Button'

//Material Ui components
import Paper from '@material-ui/core/Paper'

// style libraries
import styled, {css} from 'styled-components/macro'
// import {fadeIn} from 'react-animations'

// Multilanguage page content object
import {useTranslation} from 'react-i18next'

// Styles
const Wrapper = styled(Paper)`
  position: absolute;
  width: 295px;
  height: 234px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  z-index: 4;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.5));
`

const Title = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.288px;
  color: #212121;
`
const SubTitle = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.288px;
  color: #212121;
`

const Text = styled.div<{noMargin?: boolean}>`
  padding: 1%;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: -0.0853333px;
  color: #000000;
  ${(props) =>
    props.noMargin &&
    css`
      margin: 0%;
    `}
`

export const Notification = ({visible, dismiss}) => {
  // Page content based on injected Language
  const {t} = useTranslation()
  return (
    <Wrapper style={{display: visible ? 'flex' : 'none'}}>
      <Text>
        <Title>{t('forgotPassword.notificationTitle')}</Title>
        <SubTitle>{t('forgotPassword.notificationMessage')} </SubTitle>
        <br></br>
        <Button label="okay" variant="outlined" onClick={dismiss}></Button>
      </Text>
    </Wrapper>
  )
}

export default Notification
