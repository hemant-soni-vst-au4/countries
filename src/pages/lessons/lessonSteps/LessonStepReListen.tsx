import * as React from 'react'
import {
  IonButton,
  IonCol,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
  useIonRouter,
} from '@ionic/react'
import ApiProvider from '../../../ApiProvider'
import {useLessonStore} from './useLessonStore'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'
import {NextButton} from './NextButton'
import {ActionBar} from './ActionBar'
import {useCurrentLesson} from './lessonHooks'
import {
  useGetProfileQuery,
  useSetLessonCompletedMutation,
} from '../../../schema/types-and-hooks'
// import {Box} from '@chakra-ui/react'
import { Comments } from '../Comments'
// import {useStore} from '../../..//useStore'
import clsx from 'clsx'
import {storageHelper} from '../../../utils/storageHelper'

export function LessonStepReListen({Footer}) {
  const {
    data: {profile},
  } = useGetProfileQuery()
  const [showScript, setShowScript] = React.useState(true)
  const router = useIonRouter()

  const lesson = useCurrentLesson()
  const [sceneIdx, setSceneIdx] = React.useState(0)
  const [segment, setSegment] = React.useState('comments')
  const [isEnd, setIsEnd] = React.useState(false)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const play = useLessonStore((state) => state.play)
  const playerState = useLessonStore((state) => state.playerState)
  const setOverlay = useLessonStore((state) => state.setOverlay)
  // const [setLessonCompleted] = useSetLessonCompletedMutation({
  //   onCompleted: (data) => {
  //     storageHelper.removeNativeStorage('leftOfData')
  //   },
  // })

  const scene = lesson.scenes[sceneIdx]

  

  // React.useEffect(() => {
  //   if (!lesson.isCompleted) {
  //     setLessonCompleted({variables: {lessonId: lesson._id}})
  //   }
  // }, [lesson])
  React.useEffect(() => {
    ytPlayer.seekTo(scene.start, true)
    ytPlayer.playVideo()
    if (sceneIdx === 0) {
      setOverlay(
        <div
          style={{textAlign: 'center', fontWeight: 400, textShadow: '0px 0px 4px black'}}
        >
          <div>
            Listen again <br />
            to see how much more <br />
            you can understand <br />
          </div>
        </div>,
      )
    } else {
      setOverlay(null)
    }

    const to = setTimeout(
      () => {
        setOverlay(null)
      },
      sceneIdx === 0 ? 2000 : 800,
    )

    return () => {
      setOverlay(null)
      clearTimeout(to)
    }
  }, [sceneIdx])

  React.useEffect(() => {
    if (playerState === PlayerStates.PLAYING) {
      const itv = setInterval(() => {
        const cur = ytPlayer.getCurrentTime()
        if (cur > scene.end) {
          clearInterval(itv)
          const lastIdx = lesson.scenes.length - 1
          if (sceneIdx < lastIdx) {
            ytPlayer.seekTo(scene.start, true)
            setSceneIdx(sceneIdx + 1)
          } else {
            ytPlayer.pauseVideo()
            setIsEnd(true)
          }
        }
      }, 100)
      return () => clearInterval(itv)
    }
  }, [playerState, scene, sceneIdx])

  return (
    <>
      <ActionBar
        onPlayClick={() => {
          if (isEnd) {
            ytPlayer.seekTo(lesson.scenes[0].start, true)
            setSceneIdx(0)
            setIsEnd(false)
          } else {
            play()
          }
        }}
      />
      <div className="re-listen">
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol
            size-xs="12"
            size-sm="12"
            size-md="10"
            size-xl="8"
            size-lg="8"
            className="ion-align-self-center ion-no-padding"
          >
            <IonSegment
              color="danger"
              mode="md"
              value={segment}
              onIonChange={(e) => setSegment(e.detail.value)}
            >
              <IonSegmentButton id="highlight-comment" mode="md" value="comments">
                <IonLabel>Comments</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton mode="md" value="scripts">
                <IonLabel>Script</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCol>
        </IonRow>
        <div className="tab-content">
          {segment === 'comments' ? (
            <div>
              <p>
                How was this lesson? Leave your thoughts and share new things you’ve
                learned.
              </p>
              <ApiProvider>
              <Comments
                lessonId={lesson?.lessonId}
                subLessonId={lesson?._id}
                profile={profile}
              />
              </ApiProvider>
            </div>
          ) : (
            <div style={{padding: '4px'}}>
              <div>
                {showScript ? (
                  <IonButton
                    onClick={() => setShowScript(false)}
                    className="ion-float-right show-hide-btn"
                    color="dark"
                    mode="ios"
                    shape="round"
                    size="small"
                    fill="outline"
                    id="script-label"
                  >
                    Hide
                  </IonButton>
                ) : (
                  <IonButton
                    onClick={() => setShowScript(true)}
                    className="ion-float-right show-hide-btn"
                    color="dark"
                    mode="ios"
                    fill="solid"
                    shape="round"
                    size="small"
                  >
                    Show
                  </IonButton>
                )}
              </div>
              <div className="scripts">
                {showScript &&
                  lesson.scenes.map((scene, i) => (
                    <p key={i} className={clsx(sceneIdx === i && 'c-red')}>
                      {i + 1}. {scene.langs.En.txt}
                    </p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer>
        <NextButton
          onClick={() => {
            ytPlayer.stopVideo()
            router.push('/lesson-complete', 'root')
          }}
        />
      </Footer>
    </>
  )
}
