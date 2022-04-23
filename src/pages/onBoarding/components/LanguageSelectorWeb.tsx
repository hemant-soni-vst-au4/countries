//@ts-nocheck
import React, {useEffect, useState} from 'react'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import LanguageIcon from '@material-ui/icons/Language'
import Paper from '@material-ui/core/Paper'
import styled, {keyframes} from 'styled-components'
import {fadeIn} from 'react-animations'
// import i18n from '../language/i18n'

const Container = styled.div`
  z-index: 1000 !important;
`

const Content = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  justify-content: space-evenly;
  align-items: center;
`
const Language = styled.div`
  display: flex;
  height: 100%;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 1px;
  letter-spacing: 0.5px;
  color: #626262;
`

const Text = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 1px;
  letter-spacing: 0.5px;
  color: #626262;
`
const Selection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding-left: 7%;
`
const Wrapper = styled.div`
  padding: 5%;
`
const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 1.5s ${keyframes`${fadeIn}`};
  padding: 1%;
`
function LanguageSelectorMobile({applyLanguage, lang = 'ENGLISH'}) {
  const [toggle, setToggle] = useState(false)
  const [language, setLanguage] = useState(lang)

  // app detect initial language
  useEffect(() => {
    applyLanguage(navigator.language)
    if (navigator.language.includes('en')) {
      setLanguage('ENGLISH')
    } else if (navigator.language.includes('ko')) {
      setLanguage('KOREAN')
    }
  }, [])

  // handle manual language changes
  useEffect(() => {
    if (language === 'ENGLISH') {
      applyLanguage('en')
    } else if (language == 'KOREAN') {
      applyLanguage('ko')
    }
  }, [language])

  const changeLanguage = (event) => {
    setLanguage(event.currentTarget.attributes['value'].value)

    setToggle(false)
  }

  if (toggle) {
    return (
      <Container>
        <Content row onClick={() => setToggle(false)}>
          <Text style={{whiteSpace: 'nowrap'}}>
            <LanguageIcon />
            <span>&#160;</span>{' '}
          </Text>

          <Content row onClick={() => setToggle(false)}></Content>
        </Content>
        <Paper
          style={{position: 'absolute', zIndex: 1000, width: '150px', height: '90px'}}
          elevation={3}
        >
          <Wrapper>
            <Selection onClick={changeLanguage} value="ENGLISH" name="english">
              <Image src={'/assets/images/onboarding/english.svg'}></Image>
              <Language>ENGLISH</Language>
            </Selection>
            <Selection onClick={changeLanguage} value="KOREAN" name="korean">
              <Image src={'/assets/images/onboarding/korean.svg'}></Image>
              <Language>한국어</Language>
            </Selection>
            {/* <Selection onClick={changeLanguage} value="Spanish" name="spanish">
              <Image src={'/assets/images/on-bording/english.svg'}></Image>
              <Language>Español</Language>
            </Selection>
            <Selection onClick={changeLanguage} value="Vietnamese" name="viet">
              <Image src={'/assets/images/on-bording/english.svg'}></Image>
              <Language>Tiếng Việt</Language>
            </Selection>
            <Selection onClick={changeLanguage} value="Portuguese" name="port">
              <Image src={'/assets/images/on-bording/english.svg'}></Image>
              <Language>Português</Language>
            </Selection> */}
          </Wrapper>
        </Paper>
      </Container>
    )
  } else {
    return (
      <Container>
        <Content row onClick={() => setToggle(true)}>
          <Text style={{whiteSpace: 'nowrap'}}>
            <LanguageIcon />
            <span>&#160;</span>{' '}
          </Text>
          <Content row></Content>
        </Content>
      </Container>
    )
  }
}
export default LanguageSelectorMobile
