import * as React from 'react'
import {
  IonAlert,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonRippleEffect,
  useIonPopover,
} from '@ionic/react'
import YouTube from 'react-youtube'
import {useLessonStore} from './useLessonStore'
import clsx from 'clsx'

const playRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

export function LessonPlayer({youtubeId, onClickReportIssue}) {
  const playerRef = React.useRef<YouTube>(null)
  const setPlayer = useLessonStore((state) => state.setPlayer)
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const setPlayerState = useLessonStore((state) => state.setPlayerState)
  const play = useLessonStore((state) => state.play)
  const overlay = useLessonStore((state) => state.overlay)
  const [showAlert, setShowAlert] = React.useState(false)
  const [playedSeconds, setPlayedSeconds] = React.useState(0)
  //   const [playbackRate, setPlaybackRate] = React.useState(1)

  function handleUnstarted() {
    // console.log('Unstarted')
    // const st = playerRef.current?.getCurrentTime()
    // setTimeout(() => {
    //   const ed = playerRef.current?.getCurrentTime()
    //   if (st === ed) {
    //     stop()
    //     setShowAlert(true)
    //   }
    // }, 1200)
  }

  function handleProgress(data: any) {
    setPlayedSeconds(data.playedSeconds)
    // if (data.playedSeconds >= firstScene.start + 20) {
    // setPlaying(false)
    // playerRef.current?.seekTo(firstScene.start)
  }

  return (
    <div className="player-wrapper" >
      <YouTube
        ref={playerRef}
        videoId={youtubeId}
        opts={{
          playerVars: {
            showinfo: 0,
            disablekb: 1,
            controls: 0,
            //@ts-ignore
            cc_load_policy: 0,
            playsinline: 1,
            autoplay: 0,
            origin: window.location.origin,
          },
          width: '100%',
          height: "350vh",
        }}
        onReady={(event) => {
          const player = event.target
          //   player.setVolume(0.2)
          setTimeout(() => {
            setPlayer(player)
            setPlayerState(player.getPlayerState())
          }, 200)
          //   player.playVideo()

          //   console.log('on ready')
        }}
        onStateChange={(e) => {
          setPlayerState(e.data)
          //   console.log({onStateChange: e.data})
        }}
        
      />

      <div className="player-overlay">
        <div
          id="info"
          className="ion-activatable ripple-parent pointer"
          onClick={onClickReportIssue}
        >
          <IonImg src="/assets/images/info_for_lesson.png" />
          <IonRippleEffect />
        </div>
        {ytPlayer && <PlaybackMenu />}

        {overlay && <div className="overlay-msg">{overlay}</div>}
      </div>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={'Can not Autoplay!'}
        message={'Autoplay is not allowed without <strong>User interacts</strong>!!!'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Play',
            handler: () => {
              // console.log('Confirm Okay')
              play()
            },
          },
        ]}
      />
    </div>
  )
}

function Menus({onDissmis}) {
  const ytPlayer = useLessonStore((state) => state.ytPlayer)
  const playbackRate = ytPlayer?.getPlaybackRate() || 1
  function handlePlaybackRateChange(playbackRate: number) {
    ytPlayer.setPlaybackRate(playbackRate)
    onDissmis()
  }

  return (
    <IonItemGroup class="playrate-menu">
      {playRates.map((r) => (
        <IonItem key={r} lines="none" onClick={() => handlePlaybackRateChange(r)}>
          <IonLabel className={clsx(playbackRate === r && 'playrate-active')}>
            {r === 1 ? 'normal' : r}
          </IonLabel>
        </IonItem>
      ))}
    </IonItemGroup>
  )
}

function PlaybackMenu() {
  const [presentMenu, dissmis] = useIonPopover(Menus, {
    onDissmis: () => dissmis(),
  })

  return (
    <div id="playback-rate">
      <div
        className="ion-activatable ripple-parent pointer"
        onClick={(e) => {
          presentMenu({
            cssClass: 'playRatePopover',
            mode: 'md',
            event: e.nativeEvent,
          })
        }}
      >
        <IonImg src="/assets/images/lesson_snail.png" />
        <IonRippleEffect />
      </div>
    </div>
  )
}
