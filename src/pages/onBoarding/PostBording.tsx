import React, {useEffect, useState} from 'react'
import {Suspense} from 'react'
import ReactPlayer from 'react-player/youtube'
import {
  IonContent,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonRow,
  IonCol,
  IonSpinner,
  useIonRouter,
  IonToggle,
  useIonToast,
  IonCardContent,
  IonCard,
  useIonAlert,
  useIonViewWillEnter
} from '@ionic/react'
import ActionButton from './components/ActionButton'
import styled, {keyframes, css} from 'styled-components/macro'
import {LocalNotifications} from '@capacitor/local-notifications'
import {DatePicker} from '@ionic-native/date-picker'

// import {useGetProfileQuery} from '../../schema/types-and-hooks'
import {storageHelper} from '../../utils/storageHelper'
import {fadeIn} from 'react-animations'
import {Button} from './components/Button'

import {authenticationStore} from '../../store/globalStore'
import {fetchApi} from '../../fetchApis'

//Material Ui components
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import {ThemeProvider} from '@material-ui/core/styles'
import GlobalMaterialStyles from '../../styles/globalMaterialStyles'
import moment from 'moment'

// Multilanguage page content object
import {useTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
// import {setTimeout} from 'timers'
import './Postboarding.scss'

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
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 95%;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 100%;
    height: 95%;
  }
  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    overflow-y: auto;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 60%;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 80%;
    height: 70%;
    flex-direction: row;
  }
`

const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 992px) {
    height: 50%;
    flex-direction: row;
  }
`
const Footer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    height: 80%;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    height: 80%;
  }
`
const BackButton = styled(IconButton)`
  && {
    padding: 5%;
    display: inline;
    align-self: flex-start;
    color: #979797;
    @media only screen and (min-width: 992px) {
      display: none;
    }
  }
`

const Navigator = styled.div`
  display: none;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    display: flex;
    padding-top: 7%;
  }
`
const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex: 8;
  flex-direction: column;
  justify-content: center;
`
const Mobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 992px) {
    display: none;
  }
`
const Desktop = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 992px) {
    display: flex;
  }
`

const GroupDesktop = styled.div`
  height: 100%;
  width: 100%;
  display: none;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    display: flex;
  }
`

const GroupDesktop2 = styled.div`
  width: 100%;

  display: none;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    display: flex;
    height: 70%;
  }
`
// const Card = styled(Paper)`
//   && {
//     margin: 2%;
//     height: 80%;
//     display: flex;
//     flex: 1;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     background: #fdfdfd;
//     box-shadow: 2px 2px 20px 4px rgba(0, 0, 0, 0.1);
//     border-radius: 17px;
//   }
// `

const DesktopCard = styled(Paper)<{value: any}>`
  && {
    margin: 2%;
    height: 50%;
    display: flex;
    cursor: pointer;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fdfdfd;
    box-shadow: 2px 2px 20px 4px rgba(0, 0, 0, 0.1);
    border-radius: 17px;
  }
`

const GroupMobile = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: 992px) {
    display: none;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    display: none;
  }
`
const LightRadio = withStyles({
  root: {
    color: '#979797',
    '&$checked': {
      color: 'primary',
    },
  },
  checked: {},
})((props) => <Radio color="primary" {...props} />)

const Question = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 1.2px;
  color: #e22d2d;
  mix-blend-mode: normal;
`

const Internals = styled.div`
  padding: 2%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media only screen and (min-width: 992px) {
    padding: 0%;
  }
`
const VideoWrapper = styled.div`
  width: 100%;
  border-radius: 10%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
`

const Video = styled.div`
  width: 100%;
  padding: 2%;
  border-radius: 10%;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  align-self: center;
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 50%;
  }
`
const ButtonWrapper = styled.div`
  width: 90%;
  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 40%;
  }
`

const Option = styled(Paper)`
  margin: 2%;
  padding: 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  && {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`

const Image = styled.img`
  animation: 1.5s ${keyframes`${fadeIn}`};
  margin: 0px;
`
const Text = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`};
  text-align: center;
  font-family: Open Sans;
`
const Title = styled.h3`
  padding-left: 4%;
  padding-right: 4%;
  margin: 1%;
  animation: 1.5s ${keyframes`${fadeIn}`};
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  color: #000000;
  @media only screen and (min-width: 992px) {
    text-align: center;
    font-size: 1.1em;
  }
`
const SubTitle = styled.span`
  padding: 5%;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-size: 1em;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.432px;
  color: #979797;
  @media only screen and (min-width: 992px) {
    text-align: center;
    font-size: 1.1em;
    padding: 2%;
  }
`
const Box = styled.div<{col?: boolean}>`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.col &&
    css`
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
`

export const PostBordingPage: React.FC = () => {
  let history = useIonRouter()
  const [pres] = useIonAlert()
  const [present] = useIonToast()
  const authComponentState = authenticationStore((store) => store.authComponentState)
  // Local State
  const totatlQuestions = 3
  const [question, setQuestion] = useState(1)
  const [activeCard, setActiveCard] = useState(0)
  const [isDisabled, toggleDisabled] = useState(true)
  const [checked] = useState(false)
  const [complete, setComplete] = useState(false)

  // Form input from 3 Questions
  const [formOne, setFormOne] = React.useState(null)
  const [formTwo, setFormTwo] = React.useState(null)

  // reminder
  const [reminder, setreminder] = useState(false)
  const [reminderTime, setreminderTime] = useState('')


  const handleFormOne = (event) => {
    setFormOne(event.currentTarget.getAttribute('value'))
    toggleDisabled(false)
    if (
      event.currentTarget.getAttribute('value') != 'Korean' &&
      event.currentTarget.getAttribute('value') != 1
    ) {
      pres({
        cssClass: 'startBoardingAlert',
        header: 'Sorry, service in this language is coming soon...',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
            cssClass: 'startLessonBtn',
            handler: (blah) => {
              console.log('Confirm Cancel: blah')
            },
          },
        ],
      })
    }
  }
  const handleFormTwo = (event) => {
    setFormTwo(event.currentTarget.getAttribute('value'))
    toggleDisabled(false)
  }

  // useEffect(() => () => console.log('unmount'), [])

  // Page content based on injected Language
  const {t} = useTranslation()

  const changeLanguage = async () => {
    const lang = await fetchApi('/subTitleLanguages/list')

    const langId = await lang.data.filter((number) => {
      return number.languageName === formOne
    })
    if (formOne === 'Korean') {
      const res = await fetchApi('/user/set-subtitleLanguage', {
        method: 'POST',
        body: JSON.stringify({
          subTitleLanguageId: langId[0]._id,
        }),
      })
      if (res.error) {
        await present(`${res.error}`, 1000)
      } else {
        await present(`${res.message}`, 1000)
      }
    }
  }

  const changeLevel = async () => {
    const level = await fetchApi('/changelevel/list')
    const levelId = level.data.filter((number) => {
      return number.name === formTwo
    })
    const res = await fetchApi('/changelevel/update', {
      method: 'POST',
      body: JSON.stringify({
        userLevelId: levelId[0]._id,
      }),
    })
    if (res.error) {
      await present(`${res.error}`, 1000)
    } else {
      await present(`${res.message}`, 1000)
    }
  }

  // back navigation
  const previousPage = () => {
    if (question === 1) {
      history.push('/login')
    } else if (question > 1) {
      setActiveCard(Math.min(cards.length - 1, activeCard - 1))
      setQuestion(question - 1)
    }
  }

  // Next Question Card
  const next = async () => {
    if (question === 1) {
      changeLanguage()
      setActiveCard(Math.min(cards.length - 1, activeCard + 1))
      setQuestion(question + 1)
      toggleDisabled(true)
    } else if (question === 2) {
      changeLevel()
      setActiveCard(Math.min(cards.length - 1, activeCard + 1))
      setQuestion(question + 1)
      setFormTwo(null)
    } else {
      setComplete(true)
      setTimeout(() => {
        history.push('/dashboard/lessons', 'forward')
      }, 2000)
    }
  }

  // Available cards
  var cards = [
    {
      id: 1,
      title: t('postbording.title1'),
      subTitle: t('postbording.subTitle1'),
      description: t('description1'),
    },
    {
      id: 2,
      title: t('postbording.title2'),
      title2: t('postbording.title2p2'),
      titleDesktop: t('postbording.titleDesktop'),
      description: t('description2'),
    },
    {
      id: 3,
      title: t('postbording.title3'),
      title2: t('postbording.title3p3'),
      description: t('description2'),
    },
  ]

  const onChangeReminder = (event) => {
    if (event === false) {
      storageHelper.removeNativeStorage('reminder')
      setreminder(false)
      setreminderTime(undefined)
      LocalNotifications.cancel({notifications: [{id: 42}]})
    } else if (event) {
      setReminder()
    } else {
      storageHelper.removeNativeStorage('reminder')
      setreminderTime(undefined)
      LocalNotifications.cancel({notifications: [{id: 42}]})
    }
  }

  const setReminderTime = async (date) => {
    const time = new Date(date.getTime())
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          id: 42,
          title: 'SpeakyPeaky',
          body: '20 mins a day = big gains in 3 months',
          schedule: {
            repeats: true,
            every: 'day',
            on: {
              hour: time.getHours(),
              minute: time.getMinutes(),
            },
          },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null,
        },
      ],
    })
    console.log('notify', notifs)
  }
  const setReminder = async () => {
    try {
      const date = await DatePicker.show({
        date: new Date(),
        mode: 'time',
        androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      })

      storageHelper.setNativeStorage('reminder', date.getTime())

      await setReminderTime(date)
      setreminderTime(date.getTime().toString())
      setreminder(true)

      pres({
        header: 'Reminder is set!',
        message:
          'Perfect. We will send you a nudge at <strong>' +
          `${moment(date).format('LT')}` +
          '</strong> everyday',
        cssClass: 'user-level-alert',
        buttons: ['OK'],
      })
    } catch (err) {
      // console.log('Error occurred while getting date: ', err)
    }
  }
  useIonViewWillEnter(() => {
    LocalNotifications.requestPermissions()
    storageHelper.getNativeStorage('reminder').then((reminder) => {
      console.log("reminder", reminder?.data)
      
      if (reminder?.data) {
        setreminderTime(new Date(reminder.data).toString())
        setreminder(true)
        setReminderTime(new Date(reminder.data))
      }
    })
  })

  useEffect(() => {
    storageHelper.getNativeStorage('reminder').then((reminder) => {
      
      if (reminder?.data) {
        setreminderTime(new Date(reminder.data).toString())
        setreminder(true)
        setReminderTime(new Date(reminder.data))
      }
    })
  }, [checked, reminder, reminderTime])

  return (
    <Wrapper>
      {complete ? (
        <IonCol
          style={{paddingTop: '10%'}}
          size="12"
          class="ion-align-item-center ion-justify-content-center"
        >
          <IonRow className="ion-justify-content-center ion-margin-top ion-margin-bottom">
            <IonCol
              sizeXs="7"
              sizeSm="7"
              sizeLg="2"
              sizeXl="2"
              sizeMd="2"
              className="ion-align-self-center ion-text-center"
            >
              <img src="./assets/images/loading.gif" alt="loading" width="75%" />
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeLg="4"
              sizeXl="4"
              sizeMd="6"
              className="ion-text-center ion-align-self-center"
            >
              <h1 className="on-boarding-text ion-padding-end">
                Just a moment... <br />
                while we’re developing
                <br />
                your personalized lessons
              </h1>
            </IonCol>
          </IonRow>
        </IonCol>
      ) : (
        <Container>
          <Navigator>
            <ActionButton
              color="secondary"
              size="medium"
              direction="left"
              onClick={previousPage}
            ></ActionButton>
          </Navigator>
          <Body>
            <Header>
              <BackButton onClick={previousPage}>
                <ArrowBackIosIcon />
              </BackButton>
              <Question>
                {t('postbording.question')} {question} / {totatlQuestions}
              </Question>
            </Header>
            <Content>
              {question <= 2 ? (
                <QuestionCard
                  style={{height: '100%'}}
                  activeCard={activeCard}
                  cards={cards}
                  t={t}
                  formOne={formOne}
                  formTwo={formTwo}
                  handleFormOne={handleFormOne}
                  handleFormTwo={handleFormTwo}
                />
              ) : (
                <Internals>
                  <Title style={{paddingTop: '10%'}}>{cards[activeCard].title}</Title>
                  <SubTitle>{cards[activeCard].title2}</SubTitle>
              { reminderTime === '' || reminderTime === undefined ? 
              <IonRow className="ion-align-items-center ion-justify-content-center ion-text-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeLg="6"
                  sizeMd="7"
                  sizeXl="4"
                  className="ion-align-self-center"
                >
                  {/* <h3 className="ion-text-center ion-margin-bottom">
                    Would you like to receive a reminder?
                  </h3> */}
                </IonCol>
              </IonRow>
              :
              <IonRow className="ion-align-items-center ion-justify-content-center">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeLg="6"
                  sizeMd="7"
                  sizeXl="4"
                  className="ion-align-self-center ion-text-center ion-margin-top"
                >
                  
                  <h3 className="ion-text-center ion-margin-bottom">
                    We will send you a nudge <br />
                    at <span className="c-orange"> { moment(reminderTime).format('LT') } </span> everyday
                  </h3>
                </IonCol>
              </IonRow> 
              }
              {reminderTime === '' || reminderTime === undefined ? (
                    <IonRow className="ion-align-items-center ion-justify-content-center">
                      <IonCol
                        sizeXs="10"
                        sizeSm="10"
                        sizeMd="7"
                        sizeLg="6"
                        sizeXl="4"
                        className="ion-align-self-center ion-text-center"
                      >
                        <IonItem lines="none">
                          <IonLabel color="danger">
                            Yes, set a reminder. <br />
                            <IonText color="medium">(Push notification)</IonText>
                          </IonLabel>
                          <IonToggle
                            checked={reminder}
                            onIonChange={(e) => {
                              onChangeReminder(e.detail.checked)
                            }}
                            mode="ios"
                          ></IonToggle>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  ) : (
                    <IonRow className="ion-align-items-center ion-justify-content-center">
                      <IonCol
                        sizeXs="10"
                        sizeSm="10"
                        sizeMd="7"
                        sizeLg="6"
                        sizeXl="4"
                        className="ion-align-self-center ion-text-center"
                      >
                        <IonItem lines="none">
                          <IonToggle
                            mode="ios"
                            checked={reminder}
                            onIonChange={(e) => {
                              onChangeReminder(e.detail.checked)
                            }}
                          ></IonToggle>
                        </IonItem>
                        <p
                          style={{cursor: 'pointer'}}
                          className="c-orange ion-margin-top ion-text-center ion-align-self-center"
                          onClick={setReminder}
                        >
                          Edit
                        </p>
                      </IonCol>
                    </IonRow>
                  )}
                </Internals>
              )}

              {formTwo === 'Elementary' ||
              formTwo === 'Intermediate' ||
              formTwo === 'Advanced' ? (
                <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top ion-margin-bottom">
                  <IonCol
                    size-xs="12"
                    size-sm="12"
                    size-md="10"
                    size-xl="10"
                    size-lg="10"
                    className="ion-align-self-center"
                  >
                    <IonCard
                      className="ion-no-margin ion-align-items-center ion-justify-content-center"
                      mode="ios"
                    >
                      <IonCardContent>
                        Cool, we'll recommend
                        <IonText color="danger">
                          {' '}
                          {formTwo === 'Elementary'
                            ? 'upper-beginner'
                            : formTwo === 'Intermediate'
                            ? 'intermediate'
                            : formTwo === 'Advanced'
                            ? 'advanced'
                            : ''}{' '}
                          lessons{' '}
                        </IonText>
                        for you. You can always change your level in settings.
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                </IonRow>
              ) : (
                ''
              )}
            </Content>
            <Footer>
              <ButtonWrapper>
                <Button
                  size="medium"
                  disabled={isDisabled}
                  label="Continue"
                  color="primary"
                  onClick={next}
                ></Button>
              </ButtonWrapper>
            </Footer>
          </Body>
          <Navigator>
            <ActionButton
              style={{opacity: '0%'}}
              color="secondary"
              size="medium"
              direction="left"
            ></ActionButton>
          </Navigator>
        </Container>
      )}
    </Wrapper>
  )
}

function QuestionCard({
  activeCard,
  cards,
  t,
  formOne,
  formTwo,
  handleFormOne,
  handleFormTwo,
  ...props
}) {
  const [selection, setSelection] = useState(formOne)

  useEffect(() => {}, [selection])

  if (activeCard === 0) {
    return (
      <Internals {...props} key={activeCard}>
        <Title>{cards[activeCard].title}</Title>
        <SubTitle>{cards[activeCard].subTitle}</SubTitle>

        <GroupDesktop>
          <DesktopCard
            value="Korean"
            style={selection === 1 ? {boxShadow: '0px 0px 0px 2px #E22D2D'} : {}}
            onClick={(event) => {
              setSelection(1)
              handleFormOne(event)
            }}
          >
            <Image src={'/assets/images/postboarding/korean-lg.svg'}></Image>
            <Text>{t('postbording.q2o1')}</Text>
          </DesktopCard>
          <DesktopCard
            value="Spanish"
            style={selection === 2 ? {boxShadow: '0px 0px 0px 2px #E22D2D'} : {}}
            onClick={(event) => {
              setSelection(2)
              handleFormOne(event)
            }}
          >
            <Image src={'/assets/images/postboarding/spanish-lg.svg'}></Image>
            <Text>{t('postbording.q2o2')}</Text>
          </DesktopCard>
          <DesktopCard
            value="Vietnamese"
            style={selection === 3 ? {boxShadow: '0px 0px 0px 2px #E22D2D'} : {}}
            onClick={(event) => {
              setSelection(3)
              handleFormOne(event)
            }}
          >
            <Image src={'/assets/images/postboarding/vietnamese-lg.svg'}></Image>
            <Text>{t('postbording.q2o3')}</Text>
          </DesktopCard>
          <DesktopCard
            value="Portuguese"
            style={selection === 4 ? {boxShadow: '0px 0px 0px 2px #E22D2D'} : {}}
            onClick={(event) => {
              setSelection(4)
              handleFormOne(event)
            }}
          >
            <Image src={'/assets/images/postboarding/portuguese-lg.svg'}></Image>
            <Text>{t('postbording.q2o4')}</Text>
          </DesktopCard>
        </GroupDesktop>

        <FormControl component="fieldset">
          <RadioGroup name="formOne" value={formOne} onChange={handleFormOne}>
            <GroupMobile>
              <Option>
                <Box>
                  <Image src={'/assets/images/postboarding/korean.svg'}></Image>
                  <Text style={{paddingLeft: '10px'}}>{t('postbording.q2o1')}</Text>
                </Box>
                <FormControlLabel label="" value="1" control={<LightRadio />} />
              </Option>
              <Option>
                <Box>
                  <Image src={'/assets/images/postboarding/spanish.svg'}></Image>
                  <Text style={{paddingLeft: '10px'}}>{t('postbording.q2o2')}</Text>
                </Box>

                <FormControlLabel label="" value="2" control={<LightRadio />} />
              </Option>
              <Option>
                <Box>
                  <Image src={'/assets/images/postboarding/vietnamese.svg'}></Image>
                  <Text style={{paddingLeft: '10px'}}>{t('postbording.q2o3')}</Text>
                </Box>

                <FormControlLabel label="" value="3" control={<LightRadio />} />
              </Option>
              <Option>
                <Box>
                  <Image src={'/assets/images/postboarding/portuguese.svg'}></Image>
                  <Text style={{paddingLeft: '10px'}}>{t('postbording.q2o4')}</Text>
                </Box>

                <FormControlLabel label="" value="4" control={<LightRadio />} />
              </Option>
            </GroupMobile>
          </RadioGroup>
        </FormControl>
      </Internals>
    )
  } else if (activeCard === 1) {
    return (
      <Internals {...props} key={activeCard}>
        <Mobile>
          <Title>{cards[activeCard].title}</Title>
          <Title>{cards[activeCard].title2}</Title>
        </Mobile>
        <Desktop>
          <Title>{cards[activeCard].titleDesktop}</Title>
        </Desktop>
        <VideoWrapper>
          <Video>
            <Suspense fallback={<div>Loading...</div>}>
              <ReactPlayer
                style={{borderRadius: '16px'}}
                width="100%"
                height="30vh"
                playing={true}
                controls={false}
                light={'/assets/images/postboarding/thumbnail.png'}
                playIcon={
                  <img src={'/assets/images/postboarding/play.svg'} alt="play"></img>
                }
                url="https://www.youtube.com/watch?v=v6zPVKXSSWc"
              />
            </Suspense>
          </Video>
        </VideoWrapper>

        <GroupDesktop2>
          <DesktopCard
            value="Elementary"
            style={
              selection === 5
                ? {
                    boxShadow: '0px 0px 0px 2px #E22D2D',
                  }
                : {}
            }
            onClick={(event) => {
              setSelection(5)
              handleFormTwo(event)
            }}
          >
            <Text>{t('postbording.q1o1')}</Text>
          </DesktopCard>
          <DesktopCard
            value="Intermediate"
            style={
              selection === 6
                ? {
                    boxShadow: '0px 0px 0px 2px #E22D2D',
                  }
                : {}
            }
            onClick={(event) => {
              setSelection(6)
              handleFormTwo(event)
            }}
          >
            <Text>{t('postbording.q1o2')}</Text>
          </DesktopCard>
          <DesktopCard
            value="Advanced"
            style={
              selection === 7
                ? {
                    boxShadow: '0px 0px 0px 2px #E22D2D',
                  }
                : {}
            }
            onClick={(event) => {
              setSelection(7)
              handleFormTwo(event)
            }}
          >
            <Text>{t('postbording.q1o3')}</Text>
          </DesktopCard>
        </GroupDesktop2>

        <FormControl component="fieldset">
          <RadioGroup name="formTwo" value={formTwo} onChange={handleFormTwo}>
            <GroupMobile>
              <Option>
                <Text>{t('postbording.q1o1')}</Text>
                <FormControlLabel label="" value="1" control={<LightRadio />} />
              </Option>
              <Option>
                <Text>{t('postbording.q1o2')}</Text>
                <FormControlLabel label="" value="2" control={<LightRadio />} />
              </Option>
              <Option>
                <Text>{t('postbording.q1o3')}</Text>
                <FormControlLabel label="" value="3" control={<LightRadio />} />
              </Option>
            </GroupMobile>
          </RadioGroup>
        </FormControl>
      </Internals>
    )
  }
}

// export default PostBordingPage
const PostBoarding: React.FC = () => {
  return (
    <ThemeProvider theme={GlobalMaterialStyles}>
      <Suspense fallback={<IonSpinner />}>
        <IonPage>
          <IonContent>
            <PostBordingPage />
          </IonContent>
        </IonPage>
      </Suspense>
    </ThemeProvider>
  )
}
export default PostBoarding
