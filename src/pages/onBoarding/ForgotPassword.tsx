import React, {useState, useEffect, Suspense} from 'react'
//import { Redirect } from "react-router-dom";
import Button from './components/Button'
import Input from './components/Input'
// import {useHistory} from 'react-router-dom'
import {IonContent, IonPage, IonSpinner, useIonRouter} from '@ionic/react'

// User Components
import Notification from './components/Notification'

//Material UI components
import Backdrop from '@material-ui/core/Backdrop'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

// style libraries
import styled, {keyframes, css} from 'styled-components/macro'
import {fadeIn} from 'react-animations'

// Utility modules
import * as Validator from 'validatorjs'
import {SnackbarProvider, useSnackbar} from 'notistack'

// Multilanguage page content object
import {useTranslation} from 'react-i18next'
// import {IonSpinner} from '@ionic/react'
import {ThemeProvider} from '@material-ui/core/styles'

import GlobalMaterialStyles from '../../styles/globalMaterialStyles'

// Styles
const Wrapper = styled.div`
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
  }
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 100%;
    height: 100vh;
    align-self: center;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 100%;
    height: 100vh;
    align-self: center;
  }
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 100%;
    height: 100%;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 60%;
    height: 80%;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 30%;
    height: 80%;
  }
`

const Body = styled.div`
  padding: 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const Box = styled.div`
  padding: 5%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const BackButton = styled(IconButton)`
  && {
    padding: 5%;
    display: inline;
    align-self: flex-start;
    color: #979797;
  }
`

const Logo = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  animation: 1s ${keyframes`${fadeIn}`};
  padding: 2%;
  height: 80%;
`
const Title = styled.h1`
  text-align: start;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: -0.288px;
  color: #212121;
`
const SubTitle = styled.p`
  text-align: start;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.288px;

  color: #212121;
`
const Form = styled.div`
  height: 66%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const Text = styled.div<{noMargin?: boolean}>`
  height: 33%;
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

export const ForgotPasswordPage: React.FC = () => {
  let history = useIonRouter()
  // local state
  const [emailError, setEmailError] = useState(false)
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const {enqueueSnackbar} = useSnackbar()

  // useEffect(() => () => console.log('unmount'), [])

  // Page content based on injected Language
  const {t, i18n} = useTranslation()

  useEffect(() => {
    
  }, [i18n])
  //Events
  const handleClose = () => {
    setOpen(false)
    history.push('/login')
  }
  const handleToggle = () => {
    setOpen(!open)
  }

  const previousPage = () => {
    history.push('/login')
  }

  const resetPassword = async () => {
    let rules = {
      Email: 'required|email',
    }
    // validates fields based on rules
    //@ts-ignore
    let validation = new Validator({Email: email}, rules)

    if (validation.fails()) {
      let error = validation.errors.get('Email')
      setEmailError(true)
      enqueueSnackbar(error[0], {preventDuplicate: true})
    } else {
      /*  TODO  
        Api call to resetPassword
      */
      const baseUrl = process.env.REACT_APP_API_URL

      const userExist = await fetch(baseUrl + '/user/check-user-exist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          loginType: 'Email',
        }),
      }).then((res) => res.json())

      if (userExist.isExist === false) {
        enqueueSnackbar('Email does not exist', {preventDuplicate: true})
      } else if (userExist.error) {
        enqueueSnackbar(userExist.error, {preventDuplicate: true})
      } else {
        const res = await fetch(baseUrl + '/user/requestPasswordURL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          }),
        }).then((res) => res.json())

        if (res.error) {
          enqueueSnackbar(res.error, {preventDuplicate: true})
        } else {
          handleToggle()
        }
      }
    }
  }

  // Handle Email Input change
  const handleInputChange = (event) => {
    setEmail(event.target.value)
  }

  return (
    <Wrapper>
      <Notification visible={open} dismiss={handleClose} />
      <Backdrop
        style={{background: 'rgba(0, 0, 0, 0.5)', zIndex: 2}}
        open={open}
      ></Backdrop>
      <Container>
        <Body>
          <BackButton onClick={previousPage}>
            <ArrowBackIosIcon />
          </BackButton>
          <Logo>
            <Image
              key={1}
              src={'/assets/images/authentication/forgotPassword.min.svg'}
              alt="Logo"
            ></Image>
          </Logo>
          <Box>
            <Text>
              <Title>{t('forgotPassword.title')}</Title>
              <SubTitle>{t('forgotPassword.message')}</SubTitle>
            </Text>
            <Form style={{marginTop: 15}}>
              <Input
                name="Email"
                type="Email"
                label="Email"
                // key="forgotEmail"
                error={emailError}
                placeholder={t('forgotPassword.placeholder')}
                value={email}
                onChange={(e) => {
                  handleInputChange(e)
                  setEmailError(false)
                }}
              />

              <Button
                size="medium"
                label={t('forgotPassword.button')}
                onClick={() => {
                  resetPassword()
                }}
              ></Button>
            </Form>
          </Box>
        </Body>
      </Container>
    </Wrapper>
  )
}

const ForgotPassword: React.FC = () => {
  return (
    <ThemeProvider theme={GlobalMaterialStyles}>
      <SnackbarProvider
        style={{
          width: '95vw',
          textAlign: 'center',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 600,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        maxSnack={1}
      >
        <Suspense fallback={<IonSpinner />}>
          <IonPage>
            <IonContent>
              <ForgotPasswordPage />
            </IonContent>
          </IonPage>
        </Suspense>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
export default ForgotPassword
