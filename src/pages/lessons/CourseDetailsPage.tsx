import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import {format} from 'date-fns/fp'
import {chevronBack, chevronForward} from 'ionicons/icons'
import React from 'react'
import ReactPlayer from 'react-player'
import {useParams} from 'react-router'
import {Course, useGetCourseQuery} from '../../schema/types-and-hooks'
import './CourseDetailsPage.scss'

const formatDate = format('MMM d, y')

const CourseDetailsLoading: React.FC<any> = () => {
  return (
    <>
      <IonGrid className="ion-no-padding">
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol
            sizeXs="12"
            sizeSm="12"
            sizeMd="10"
            sizeLg="9"
            sizeXl="8"
            className="ion-align-self-center"
          >
            <h1 className="ion-padding-bottom">
              <strong>Course Details</strong>
            </h1>

            <div className="lesson youtube-container">
              <div className="player-wrapper">
                <ReactPlayer
                  controls={false}
                  playing={false}
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
                />

                <div className="player-overlay">
                  <IonSpinner color="medium" name="crescent" />
                </div>
              </div>

              <IonRow className="youtube-handler ion-align-items-center ion-justify-content-center">
                <IonCol
                  size="5"
                  className="ion-text-center ion-align-self-center ion-no-padding"
                ></IonCol>
                <IonCol
                  size="2"
                  className="ion-text-center ion-align-self-center ion-no-padding"
                >
                  <IonIcon src="/assets/images/lessons/play-lesson.svg"></IonIcon>
                </IonCol>
                <IonCol
                  size="5"
                  className="ion-align-self-center ion-no-padding"
                ></IonCol>
              </IonRow>

              <IonRow className="ion-padding-start ion-padding-end ion-align-items-center ion-justify-content-center">
                <IonCol
                  className="ion-no-padding ion-align-self-center"
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="10"
                  sizeLg="9"
                  sizeXl="8"
                >
                  <p className="c-dark-grey">
                    <strong
                    // *ngIf="courseDetails?.subLessons.length <= 1; else moreEpisodes"
                    >
                      <IonSkeletonText animated style={{width: '30%'}} />
                    </strong>
                  </p>

                  <IonText className="c-orange">
                    <IonSkeletonText animated style={{width: '80%'}} />
                  </IonText>
                  <br />
                  <br />

                  <p className="c-dark-grey">
                    <strong>
                      <IonSkeletonText animated style={{width: '80%'}} />
                    </strong>
                  </p>

                  <IonText className="c-dark-grey">
                    <IonSkeletonText animated style={{width: '100%'}} />
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding-start ion-padding-end ion-padding-top ion-align-items-center ion-justify-content-center">
                <IonCol
                  className="ion-no-padding ion-align-self-center"
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="10"
                  sizeLg="9"
                  sizeXl="8"
                >
                  <IonSkeletonText animated style={{width: '100%'}} />
                  <IonSkeletonText animated style={{width: '100%'}} />
                  <IonSkeletonText animated style={{width: '100%'}} />
                </IonCol>
              </IonRow>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  )
}

const CourseDetails: React.FC<{courseDetails: Course}> = ({courseDetails}) => {
  // const navCtrl = useStore((state) => state.navController)
  const router = useIonRouter()
  const [showAlert, setShowAlert] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [playedSeconds, setPlayedSeconds] = React.useState(0)
  const playerRef = React.useRef<ReactPlayer>(null)

  function handleUnstarted() {
    // console.log('Unstarted')
    // const st = playerRef.current?.getCurrentTime()
    // setTimeout(() => {
    //   const ed = playerRef.current?.getCurrentTime()
    //   if (st === ed) {
    //     setPlaying(false)
    //     setShowAlert(true)
    //   }
    // }, 1200)
  }

  const firstScene = courseDetails.lessons[0].scenes[0]
  const scenePlayedSeconds = Math.max(playedSeconds - firstScene.start, 0)
  const playedRate = scenePlayedSeconds / 20 || 0

  function handleProgress(data: any) {
    setPlayedSeconds(data.playedSeconds)

    if (data.playedSeconds >= firstScene.start + 20) {
      setPlaying(false)
      playerRef.current?.seekTo(firstScene.start)
    }
  }
  function handleOnReady(player: ReactPlayer) {
    player.seekTo(Math.floor(firstScene.start))
    setPlaying(true)
  }
  const lessons = courseDetails.lessons

  return (
    <>
      <IonGrid className="ion-no-padding">
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol
            sizeXs="12"
            sizeSm="12"
            sizeMd="10"
            sizeLg="8"
            sizeXl="8"
            className="ion-align-self-center"
          >
            <h1 className="ion-padding-bottom">
              <strong>Course Details</strong>
            </h1>

            <div className="lesson youtube-container">
              <div className="player-wrapper">
                <ReactPlayer
                  ref={playerRef}
                  url={`https://www.youtube.com/watch?v=${courseDetails.youtubeId}`}
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
                      // embedOptions: {},
                      onUnstarted: handleUnstarted,
                    },
                  }}
                  progressInterval={500}
                  // onPlay={}
                  onProgress={handleProgress}
                  onReady={handleOnReady}
                />
                <div className="player-overlay"></div>
              </div>

              <div className="playing-progress-bar" style={{width: '100%'}}>
                <div className={`scene-bar active`} style={{flex: 1}}>
                  <div
                    className="scene-progress"
                    style={{
                      width: `${playedRate * 100}%`,
                    }}
                  />
                </div>
              </div>

              <IonRow className="youtube-handler ion-align-items-center ion-justify-content-center">
                <IonCol
                  size="5"
                  className="ion-text-center ion-align-self-center ion-no-padding"
                >
                  <IonIcon
                    onClick={() => {
                      const curTime = playerRef.current?.getCurrentTime() || 0
                      const time = Math.max(curTime - 3, Math.floor(firstScene.start))
                      playerRef.current?.seekTo(time)
                      setPlayedSeconds(time)
                    }}
                    src="/assets/images/lessons/3seconds-back.svg"
                  ></IonIcon>
                </IonCol>
                <IonCol
                  size="2"
                  className="ion-text-center ion-align-self-center ion-no-padding"
                >
                  {playing ? (
                    <IonIcon
                      onClick={() => setPlaying(false)}
                      src="/assets/images/lessons/pause-lesson.svg"
                    ></IonIcon>
                  ) : (
                    <IonIcon
                      onClick={() => setPlaying(true)}
                      src="/assets/images/lessons/play-lesson.svg"
                    ></IonIcon>
                  )}
                </IonCol>
                <IonCol
                  size="5"
                  className="ion-align-self-center ion-no-padding"
                ></IonCol>
              </IonRow>

              <IonRow className="ion-padding-start ion-padding-end ion-align-items-center ion-justify-content-center">
                <IonCol
                  className="ion-no-padding ion-align-self-center"
                  // sizeXs="12"
                  // sizeSm="12"
                  // sizeMd="10"
                  // sizeLg="9"
                  // sizeXl="8"
                >
                  <p className="c-dark">
                    <strong
                    // *ngIf="courseDetails?.subLessons.length <= 1; else moreEpisodes"
                    >
                      {courseDetails.lessons.length} Episode
                      {courseDetails.lessons.length > 1 && 's'}
                    </strong>
                  </p>

                  <IonText className="c-orange">
                    {courseDetails.tags
                      .split(',')
                      .map((tag) => tag.trim())
                      .join(' ')}
                  </IonText>
                  <br />
                  <br />

                  {courseDetails.title && (
                    <p className="c-dark-grey">
                      <strong>{courseDetails.title}</strong>
                    </p>
                  )}

                  <IonText className="c-dark-grey">{courseDetails.introduction}</IonText>
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding-start ion-padding-end ion-padding-top ion-align-items-center ion-justify-content-center">
                <IonCol
                  className="ion-no-padding ion-align-self-center"
                  // sizeXs="12"
                  // sizeSm="12"
                  // sizeMd="10"
                  // sizeLg="9"
                  // sizeXl="8"
                >
                  <IonList>
                    {courseDetails.lessons.map((lesson) => (
                      <IonItem
                        className="pointer"
                        key={lesson._id}
                        detail={false}
                        routerDirection="forward"
                        routerLink={`/lesson/${lesson._id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setPlaying(false)
                          if (lesson.completedAt) {
                            // navCtrl.navigateForward(
                            //   `/lesson-details/${lesson._id}/true/false`,
                            // )
                            router.push(
                              `/lesson-details/${lesson._id}/true/false`,
                              'forward',
                            )
                          } else {
                            // navCtrl.navigateForward(
                            //   `/lesson-details/${lesson._id}/false/false`,
                            // )
                            router.push(
                              `/lesson-details/${lesson._id}/false/false`,
                              'forward',
                            )
                          }
                          // navCtrl.navigateForward(`/lesson/${lesson._id}`)
                        }}
                      >
                        <IonLabel color="dark">
                          <IonRow>
                            <IonCol
                              className="ion-no-padding lesson-name"
                              size={lesson.completedAt ? '8' : '12'}
                            >
                              {lesson.lessonName}
                            </IonCol>
                            {lesson.completedAt && (
                              <IonCol className="ion-no-padding studied-date" size="4">
                                <p>{formatDate(new Date(lesson.completedAt))}</p>
                              </IonCol>
                            )}
                          </IonRow>
                        </IonLabel>
                        <IonIcon
                          color="medium"
                          icon={chevronForward}
                          mode="ios"
                          slot="end"
                        ></IonIcon>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCol>
              </IonRow>
            </div>
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              cssClass="my-custom-class"
              header={'Can not Autoplay!'}
              message={
                'Autoplay is not allowed without <strong>User interacts</strong>!!!'
              }
              buttons={[
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                },
                {
                  text: 'Play',
                  handler: () => {
                    setPlaying(true)
                  },
                },
              ]}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  )
}

const CourseDetailsPage: React.FC = () => {
  const {lessonId} = useParams<{lessonId: string}>()
  const {data, loading, error} = useGetCourseQuery({
    variables: {
      id: lessonId,
    },
    skip: !lessonId,
  })

  return (
    <IonPage className="course-details-page">
      <IonHeader mode="ios">
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/dashboard/lessons" routerDirection="back">
              <IonIcon color="dark" slot="icon-only" icon={chevronBack}></IonIcon>
            </IonButton>
          </IonButtons>

          <IonTitle></IonTitle>
          <div style={{textAlign: 'center'}}></div>
          <IonButtons slot="end">
            <IonButton mode="md" routerLink="/dashboard/lessons" routerDirection="root">
              <IonIcon
                color="dark"
                mode="md"
                slot="icon-only"
                src="/assets/images/home.svg"
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <CourseDetailsLoading />
        ) : (
          <CourseDetails courseDetails={data.course as Course} />
        )}
      </IonContent>
    </IonPage>
  )
}

export default CourseDetailsPage
