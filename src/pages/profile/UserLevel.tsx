import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  useIonAlert,
} from '@ionic/react'
import React from 'react'
import ReactPlayer from 'react-player'
import {
  LevelName,
  useGetProfileQuery,
  useGetUserGuideQuery,
  useSetLevelMutation,
} from '../../schema/types-and-hooks'
// import {useStore} from '../ ../useStore'
import './UserLevel.scss'

const levelLevels = {
  UpperBeginner: 'Upper Beginner',
  'Upper-beginner': 'Upper Beginner',
  Elementary: 'Upper Beginner',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
}

const UserLevelPlayer: React.FC = () => {
  const {data, loading} = useGetUserGuideQuery()
  const [playing, setPlaying] = React.useState(false)
  const playerRef = React.useRef<ReactPlayer>(null)

  function handleProgress(data: any) {}
  function handleOnReady(player: ReactPlayer) {}

  return (
    <>
      <IonRow className="lesson ion-align-items-center ion-justify-content-center">
        <IonCol
          sizeXs="12"
          sizeSm="12"
          sizeLg="12"
          sizeXl="12"
          sizeMd="12"
          className="ion-align-self-center ion-no-padding"
        >
          <h5 className="ion-no-margin ion-padding">
            <IonText color="danger">Level Test: </IonText> How much you can understand
            from the video below?
          </h5>
          <div className="player-wrapper">
            <ReactPlayer
              ref={playerRef}
              url={
                loading
                  ? null
                  : `https://www.youtube.com/watch?v=${data.userGuide.youtubeId}`
              }
              controls={false}
              // playbackRate={2}
              playing={playing}
              width="100%"
              height="auto"
              // light
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    disablekb: 1,
                    controls: 0,
                    cc_load_policy: 0,
                  },
                },
              }}
              progressInterval={500}
              // onPlay={}
              onPause={() => setPlaying(false)}
              onProgress={handleProgress}
              onReady={handleOnReady}
            />
            <div className="player-overlay"></div>
          </div>
        </IonCol>
      </IonRow>

      <IonRow className="youtube-handler ion-align-items-center ion-justify-content-center">
        {playing ? (
          <>
            <IonCol
              onClick={() =>
                playerRef.current.seekTo(playerRef.current.getCurrentTime() - 3)
              }
              sizeXs="3"
              sizeSm="3"
              sizeMd="3"
              sizeLg="3"
              sizeXl="3"
              className="ion-align-self-center ion-no-padding"
            >
              <IonIcon
                className="pointer"
                src="/assets/images/lessons/3seconds-back.svg"
              ></IonIcon>
            </IonCol>
            <IonCol
              onClick={() => setPlaying(false)}
              sizeXs="4"
              sizeSm="4"
              sizeMd="4"
              sizeLg="4"
              sizeXl="4"
              className="ion-align-self-center ion-no-padding"
            >
              <IonIcon
                className="pointer"
                src="/assets/images/lessons/pause-lesson.svg"
              ></IonIcon>
            </IonCol>
          </>
        ) : (
          <IonCol
            onClick={() => setPlaying(true)}
            sizeXs="2"
            sizeSm="2"
            sizeMd="2"
            sizeLg="2"
            sizeXl="2"
            className="ion-text-center ion-align-self-center ion-no-padding"
          >
            <IonIcon
              className="pointer"
              src="/assets/images/lessons/play-lesson.svg"
            ></IonIcon>
          </IonCol>
        )}
      </IonRow>
    </>
  )
}

const UserLevelList: React.FC = () => {
  const {
    data: {profile},
  } = useGetProfileQuery({fetchPolicy: 'cache-only'})
  // const sharedService = useStore((state) => state.sharedService)
  const [levelName, setUserLevelId] = React.useState<string>(profile.userLevelName)
  const [present] = useIonAlert()
  const [setLevel] = useSetLevelMutation({
    onCompleted: (data) => {
      present({
        cssClass: 'user-level-alert',
        message:
          'Great! We will recommend <strong>' +
          levelLevels[data.setLevel.userLevelName] +
          '</strong> lessons for you.',
        buttons: [
          {
            text: 'Ok',
            handler: (d) => {
              console.log('ok pressed')
              // sharedService.gaTrackEvent(
              //   'LevelChangeOnProfileLevel',
              //   data.setLevel.userLevelId,
              // )
            },
          },
        ],
      })
    },
  })

  const list = [
    {value: LevelName.UpperBeginner, label: 'Not much (0-40%)'},
    {value: LevelName.Intermediate, label: 'About half (40-70%)'},
    {value: LevelName.Advanced, label: 'Quite a lot (70%~)'},
  ]

  function handleChange(e) {
    console.log(e.detail.value)
    const lastLevelName = levelName
    setUserLevelId(e.detail.value)
    setLevel({variables: {levelName: e.detail.value}}).catch(() => {
      setUserLevelId(lastLevelName)
    })
  }

  return (
    <>
      <IonRow className="ion-align-items-center ion-justify-content-center">
        <IonCol
          sizeXs="12"
          sizeSm="12"
          sizeLg="12"
          sizeXl="12"
          sizeMd="12"
          className="ion-align-self-center"
        >
          <IonRadioGroup
            value={levelName}
            onIonChange={handleChange}
            id="selectedLevel"
            name="selectedLevel"
          >
            {list.map((level) => (
              <IonItem lines="none" key={level.value}>
                <IonLabel>{level.label}</IonLabel>

                <IonRadio
                  color="danger"
                  mode="md"
                  slot="end"
                  value={level.value}
                ></IonRadio>
              </IonItem>
            ))}
          </IonRadioGroup>
        </IonCol>
      </IonRow>{' '}
    </>
  )
}

const UserLevel: React.FC = () => {
  const {
    data: {profile},
  } = useGetProfileQuery()

  return (
    <IonGrid class="user-level-panel ion-no-padding ">
      <IonRow className="ion-align-items-center ion-justify-content-center ion-margin-top">
        <IonCol
          sizeXs="12"
          sizeSm="12"
          sizeLg="12"
          sizeXl="12"
          sizeMd="12"
          className="ion-padding-start ion-padding-end ion-align-self-center"
        >
          <IonCard className="ion-no-margin" mode="ios">
            <IonCardContent>
              We're currently recommending
              <IonText color="danger"> "{levelLevels[profile.userLevelName]}" </IonText>
              lessons for you.
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
      <UserLevelPlayer />
      <UserLevelList />

      <IonRow>
        <IonCol>
          <IonImg
            src="/assets/images/level-up-guideline.svg"
            style={{paddingTop: '5px', borderTop: '2px solid #f8f6f6'}}
          ></IonImg>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default UserLevel
