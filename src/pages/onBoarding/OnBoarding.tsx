import React, {useState, useEffect, useRef, Suspense} from 'react'
import {useHistory} from 'react-router-dom'
// Components
import CardIndicator from './components/CardIndicator'
import Button from './components/Button'
import ActionButton from './components/ActionButton'
import LanguageSelectorMobile from './components/LanguageSelectorMobile'
// Global Store
// import {languageStore} from '../../store/globalStore'

// Style library
import styled, {keyframes} from 'styled-components'
import {fadeIn} from 'react-animations'

// Multilanguage page content object
import {withTranslation} from 'react-i18next'
import {useTranslation} from 'react-i18next'
// import i18n from '../../language/i18n'
import {ThemeProvider} from '@material-ui/core/styles'

import GlobalMaterialStyles from '../../styles/globalMaterialStyles'

// Defines global styles for User styled components
import GlobalStyles from '../../styles/globalStyles'
import {createGesture, Gesture, useIonRouter} from '@ionic/react'

import {useSwipeable} from 'react-swipeable'

// Styles
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-height: 600px) {
    width: 100%;
    height: 100%;
    padding-top: 5%;
    padding-bottom: 5%;
  }
`
const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

const Navigator = styled.div`
  height: 80%;
  padding: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    height: 6%;
    width: 100%;
    padding: 2%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

const PrevBar = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 600px) {
    display: none;
  }
`
const NextBar = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 600px) {
    display: none;
  }
`
const SkipBarMobile = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`

const SkipBar = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-right: 5%;
  padding-left: 5%;
  @media (min-width: 600px) {
    display: none;
  }
`

const Content = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: center;
  align-items: center;
  @media only screen and (min-width: 600px) {
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
  @media (min-width: 600px) {
    height: 80%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }

  @media (min-width: 1200px) {
    width: 80%;
    height: 80%;
  }
`
const NavButtons = styled.p`
  padding: 1%;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 1px;
  letter-spacing: 0.5px;
  color: #626262;
  width: max-content;
  cursor: pointer;
`

const NavigatorBarMobile = styled.div`
  height: 5%;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 600px) {
    display: none;
  }
`
const NavigatorBar = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    display: none;
  }
`
const Internals = styled.div`
  height: 80%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const Image = styled.img`
  animation: 1.5s ${keyframes`${fadeIn}`};
  width: 100%;
  height: 70%;
`
const Title = styled.h3`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.0853333px;
  color: #000000;
`
const Text = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
  padding-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const OnBoardingPage: React.FC = () => {
  // const navController = useStore((state) => state.navController)
  // const router = useIonRouter()

  const history = useHistory()
  const [activeCard, setActiveCard] = useState(0)
  const {t, i18n} = useTranslation()
  

  // useEffect(() => () => console.log('unmount'), [])

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
  }

  // Redirect operation to next view
  const redirect = () => {
    history.push('/sign-up', 'forward')
  }

  // Next card
  const next = () => {
    setActiveCard(Math.min(cards.length - 1, activeCard + 1))
  }
  // Previous card
  const prev = () => {
    setActiveCard(Math.max(0, activeCard - 1))
  }
  const skip = () => {
    setActiveCard(cards.length - 1)
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  // Available cards
  var cards = [
    {
      id: 1,
      title: t('onbording.title1'),
      image: '/assets/images/onboarding/feature1.min.svg',
      description: t('onbording.description1'),
    },
    {
      id: 2,
      title: t('onbording.title2'),
      image: '/assets/images/onboarding/feature2.min.svg',
      description: t('onbording.description2'),
    },
    {
      id: 3,
      title: t('onbording.title3'),
      image: '/assets/images/onboarding/feature3.min.svg',
      description: t('onbording.description3'),
    },
  ]
  const isLast = activeCard === cards.length - 1
  const isFirst = activeCard === 0

  return (
    <Container>
      <Wrapper {...handlers}>
        <Navigator>
          <SkipBar>
            <LanguageSelectorMobile applyLanguage={handleLanguageChange} />
            <NavButtons style={isLast ? {opacity: 0} : {opacity: 100}} onClick={skip}>
              {t('onbording.skip')}
            </NavButtons>
          </SkipBar>

          <PrevBar>
            <SkipBarMobile>
              <LanguageSelectorMobile applyLanguage={handleLanguageChange} />
            </SkipBarMobile>
            <ActionButton
              color="secondary"
              size="medium"
              direction="left"
              style={activeCard === 0 ? {opacity: 0} : {opacity: 100}}
              onClick={prev}
            ></ActionButton>
            <div></div>
          </PrevBar>
        </Navigator>

        <Content>
          <Feature styles={{height: '100%'}} current={activeCard} cards={cards} />

          <NavigatorBar>
            <div style={{display: isLast ? 'none' : 'inline'}}>
              <CardIndicator size={3} position={activeCard}></CardIndicator>
            </div>
            <div style={{display: isLast ? 'inline' : 'none', width: '40%'}}>
              <Button label={t('onbording.button')} onClick={redirect}></Button>
            </div>
          </NavigatorBar>
        </Content>
        <Navigator>
          <NextBar>
            <SkipBarMobile>
              <NavButtons style={isLast ? {opacity: 0} : {opacity: 100}} onClick={skip}>
                <div>{t('onbording.skip')}</div>
              </NavButtons>
            </SkipBarMobile>
            <ActionButton
              color="secondary"
              size="medium"
              direction="right"
              style={activeCard !== 2 ? {display: 'flex'} : {display: 'none'}}
              onClick={next}
            ></ActionButton>
            <div></div>
          </NextBar>

          <NavigatorBarMobile>
            <NavButtons style={{opacity: isFirst ? 0 : 100}} onClick={prev}>
              {t('onbording.prev')}
            </NavButtons>
            <div style={{display: isLast ? 'none' : 'inline'}}>
              <CardIndicator size={3} position={activeCard}></CardIndicator>
            </div>
            <NavButtons style={{display: isLast ? 'none' : 'inline'}} onClick={next}>
              {t('onbording.next')}
            </NavButtons>
            <Button
              style={isLast ? {display: 'inline', width: '50%'} : {display: 'none'}}
              label={t('onbording.button')}
              onClick={redirect}
            ></Button>
          </NavigatorBarMobile>
        </Navigator>
      </Wrapper>
    </Container>
  )
}

function Feature({current, cards, ...props}) {
  const ref = useRef()

  React.useEffect(() => {
    if (ref.current) {
      const gesture: Gesture = createGesture({
        el: ref.current,
        threshold: 15,
        gestureName: 'my-gesture',
        onMove: (ev) => console.log(ev),
      })
      gesture.enable()
      return () => {
        gesture.destroy()
      }
    }
  }, [ref])

  return (
    <Internals ref={ref} key={current}>
      <Image src={cards[current].image} alt="ilustration"></Image>
      <Text>
        <Title>{cards[current].title}</Title>
        <div style={{width: '100%', whiteSpace: 'pre-line'}}>
          <p>{cards[current].description}</p>
        </div>
      </Text>
    </Internals>
  )
}

const OnBoardingPageWithTranslation = withTranslation()(OnBoardingPage)

const OnBoarding: React.FC = () => (
  <ThemeProvider theme={GlobalMaterialStyles}>
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyles />
      <OnBoardingPageWithTranslation />
    </Suspense>
  </ThemeProvider>
)
export default OnBoarding
