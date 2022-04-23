import React from 'react'
import {
  IonButton,
  IonCol,
  IonIcon,
  IonImg,
  IonModal,
  IonRow,
  IonSkeletonText,
  IonSpinner,
  isPlatform,
  useIonToast,
} from '@ionic/react'
import {close} from 'ionicons/icons'
import {upperFirst} from 'lodash'
import Highlighter from 'react-highlight-words'
import {msg} from '../../../language/translation.en'
import {
  Phrase,
  useGetProfileQuery,
  useSearchDictionaryQuery,
  useSetNoteMutation,
} from '../../../schema/types-and-hooks';
import {useTextSelection} from 'use-text-selection';
import {useCurrentLesson} from './lessonHooks'
import {useLessonStore} from './useLessonStore'
import useSpeak from '../../../hooks/useSpeak'

const NO_TRANSLATION_TEXT =
  'Sorry, the translation for this lesson is missing. Please report it to the team using the exclamation mark (!) at the upper right corner of the video.'

export default function ScriptView() {
  const {
    data: {profile},
  } = useGetProfileQuery()
  const lesson = useCurrentLesson()
  const sceneIdx = useLessonStore((state) => state.sceneIdx)
  let [showTranslation, setShowTranslation] = React.useState(false)
  let [showInfo, setShowInfo] = React.useState(false)

  console.log("showInfo",showInfo)

  const scene = lesson.scenes[sceneIdx]
  // console.log("scene", scene)
  const langKey = profile.nativeLanguage.languageKey
  // console.log("langKey", langKey)
  const script = scene.langs.En.txt
  // console.log("script", script)

  const translation = scene.langs[langKey]
    ? scene.langs[langKey].txt
    : NO_TRANSLATION_TEXT

    // console.log("translation", translation)

  const tip = scene.langs[langKey]?.tip
  // console.log("tip", tip.split("."))

  return (
    <>
      <div style={{display: 'flex', alignItems: 'flex-end'}}>
        <div style={{flex: 1, color: '#747474'}}>Script:</div>
        <IonButton
          className="translation-btn"
          color="dark"
          mode="ios"
          shape="round"
          size="small"
          // id="script-label"
          id="translation"
          fill={showTranslation ? 'solid' : 'outline'}
          onClick={() => setShowTranslation((v) => !v)}
        >
          Translation
        </IonButton>
        <div style={{padding: '4px'}} onClick={() => setShowInfo(true)}>
          <IonImg
            src="../../../../../assets/images/dictionary-icon.png"
            className=" dictionary-icon pointer"
          ></IonImg>
        </div>
      </div>
      <ScriptBox script={script} phrases={lesson.phrases} />
      {showTranslation && (
        <div className="ion-margin-top">
          <div style={{color: '#747474'}}>Translation:</div>
          <div style={{marginTop: '4px'}}>{translation}</div>
        </div>
      )}
      {tip && (
        <div className="ion-margin-top">
          <div style={{color: '#747474'}}>#Tip:</div>
          {tip.split('\n').map((tip) => <div className="ion-padding-bottom">{tip}</div>)}
        </div>
      )}

      <IonModal
        mode="ios"
        isOpen={showInfo}
        cssClass="reviewingStepInfo"
        onDidDismiss={() => setShowInfo(false)}
      >
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol size="9" className="ion-align-self-center">
            <h4 className="ion-no-margin c-orange">Use Dictionary</h4>
          </IonCol>
          <IonCol size="3" className="ion-align-self-center ion-text-right">
            <IonIcon
              mode="md"
              icon={close}
              className="pointer"
              id="modal-dismiss"
              onClick={() => setShowInfo(false)}
            ></IonIcon>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol size="12" className="ion-align-self-center">
            <p>
              {isPlatform('mobile')
                ? 'Long press any words to learn the meanings'
                : 'Drag any words to learn the meanings'}
            </p>
          </IonCol>
        </IonRow>
      </IonModal>
    </>
  )
}

const langKeyMap = {
  En: 'Eng',
  Ko: 'Kor',
  Sp: 'Spa',
  Vi: 'Vie',
  Po: 'Por',
}

interface WordDialogProps {
  word: string
  loading: boolean
  saveDisabled?: boolean
  onDismiss: () => void
  onSaveClick: () => void
}

const WordDialog: React.FC<WordDialogProps> = ({
  word,
  onDismiss,
  onSaveClick,
  loading,
  children,
  saveDisabled,
}) => {
  const speak = useSpeak()
  return (
    <IonRow>
      <IonCol>
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol size="9" className="ion-align-self-center">
            <h5 className="ion-no-margin c-red header">
              <img
                id="play-icon"
                className="pointer"
                src="../../../../../../assets/images/icon_play.svg"
                onClick={() => {
                  speak(word)
                }}
              />
              <strong>{word}</strong>
            </h5>
          </IonCol>
          <IonCol size="3" className="ion-align-self-center ion-text-right">
            <IonIcon
              mode="md"
              icon={close}
              className="pointer"
              id="modal-dismiss"
              onClick={onDismiss}
              //   (click)="onDismiss()"
            ></IonIcon>
          </IonCol>
        </IonRow>
        <IonRow
          className="ion-align-items-center ion-justify-content-center"
          style={{top: '17%'}}
        >
          <IonCol size="12" className="ion-align-self-center">
            {children}
          </IonCol>
        </IonRow>

        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol size="12" className="ion-align-self-center">
            <IonButton
            className="button-c"
              mode="ios"
              // color="danger"
              shape="round"
              expand="block"
              onClick={onSaveClick}
              disabled={saveDisabled || loading}
            >
              {loading ? <IonSpinner /> : <strong>SAVE</strong>}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  )
}

function PhraseMeaning({
  phraseWord,
  onDismiss,
}: {
  phraseWord: Phrase
  onDismiss: () => void
}) {
  const {
    data: {profile},
  } = useGetProfileQuery()
  const [presentToast] = useIonToast()
  const [setNote, {loading: saveLoading}] = useSetNoteMutation({
    onCompleted: (data) => {
      if (data.setNote) {
        presentToast(msg[data.setNote], 2000)
      } else {
        presentToast(msg['TRY_AGAIN'], 2000)
      }
    },
  })

  const languageKey = profile?.nativeLanguage?.languageKey
  
  const engMean =
    phraseWord.meanings.find((m) => m.lang === langKeyMap.En)?.meaning ||
    phraseWord.meaning

    // console.log("engMean", engMean)
  const myMean = phraseWord.meanings.find((m) => m.lang === langKeyMap[languageKey])
    // console.log("myMean", myMean)
  function handleSave() {
    setNote({
      variables: {
        wordData: {
          word: phraseWord.word,
          meaning: engMean,
          kor: myMean?.meaning || '',
          noun: '',
          verb: '',
          adv: '',
          adj: '',
        },
      },
    })
  }

  return (
    <WordDialog
      word={phraseWord.word}
      loading={saveLoading}
      onSaveClick={handleSave}
      onDismiss={onDismiss}
    >
      <p>
        <b className="c-orange">(Eng)</b> {engMean}
      </p>
      {myMean && (
        <p>
          <b className="c-orange">({myMean.lang})</b> {myMean.meaning}
        </p>
      )}
    </WordDialog>
  )
}

function WordMeaning({word, onDismiss}) {
  const [presentToast] = useIonToast()
  const [notFound, setNotFound] = React.useState(false)
  const {loading, data, error} = useSearchDictionaryQuery({
    variables: {search: word},
    onCompleted: (data) => {
      if (!data.dictionary) {
        presentToast('Word not found', 2000)
        setNotFound(true)
        // onDismiss()
      }
    },
  })
  const keys = ['korean', 'noun', 'verb', 'adverb', 'adjective']
  const {
    data: {profile},
  } = useGetProfileQuery()

  const [setNote, {loading: saveLoading}] = useSetNoteMutation({
    onCompleted: (data) => {
      if (data.setNote) {
        presentToast(msg[data.setNote], 2000)
      } else {
        presentToast(msg['TRY_AGAIN'], 2000)
      }
    },
  })

  const languageKey = profile?.nativeLanguage?.languageKey

  function handleSave() {
    if (notFound) {
      return
    }
    const {dictionary} = data

    setNote({
      variables: {
        wordData: {
          word: word,
          meaning: '',
          kor: languageKey === 'Ko' ? data.dictionary.meaning.korean : '',
          noun: dictionary.meaning.noun,
          verb: dictionary.meaning.verb,
          adv: dictionary.meaning.adverb,
          adj: dictionary.meaning.adjective,
        },
      },
    })
  }

  return (
    <WordDialog
      word={word}
      loading={saveLoading}
      onSaveClick={handleSave}
      saveDisabled={notFound}
      onDismiss={onDismiss}
    >
      {loading ? (
        <>
          <IonSkeletonText />
          <IonSkeletonText />
          <IonSkeletonText />
        </>
      ) : notFound ? (
        <div style={{color: '#e22d2d'}}>Word not Found</div>
      ) : error ? (
        <div>{error}</div>
      ) : !data?.dictionary ? (
        <div>not found </div>
      ) : (
        keys
          .filter((key) => data.dictionary.meaning[key])
          .map((key) => (
            <p
              key={key}
              // *ngIf="meaning?.korean && userSubTitleLanguage?.languageKey === 'Ko'"
            >
              <b className="c-orange">({upperFirst(key)})</b>{' '}
              {data.dictionary.meaning[key]}
            </p>
          ))
      )}
    </WordDialog>
  )
}

function ScriptBox({script, phrases}) {
  const ref = React.useRef()
  const {clientRect, textContent, isCollapsed} = useTextSelection(ref.current)
  const [dicWord, setDicWord] = React.useState(null)
  const [selection, setSelection] = React.useState(null)
  const [phraseWord, setPhraseWord] = React.useState<Phrase>(null)



  React.useEffect(() => {
    if (clientRect && textContent && ref.current) {
      //@ts-ignore
      const scriptRect = ref.current.getClientRects()[0]

      const x = clientRect.x - scriptRect.x
      const y = clientRect.y - scriptRect.y
      const width = clientRect.width
      const height = clientRect.height
      const rect = {
        x: x,
        y: y,
        width: clientRect.width,
        height: clientRect.height,
        top: height >= 0 ? y : y + height,
        right: width >= 0 ? x + width : x,
        bottom: height >= 0 ? y + height : y,
        left: width >= 0 ? x : x + width,
      }

      setSelection({clientRect: rect, textContent})
    } else {
      let to = setTimeout(() => {
        setSelection(null)
      }, 20)
      return () => {
        clearTimeout(to)
      }
    }
  }, [clientRect, textContent])

  return (
    <>
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          ref={ref}
          id="subTitle"
          style={{
            marginTop: 4,
            userSelect: 'text',
            position: 'relative',
          }}
        >
          <Highlighter
            highlightClassName="phrase"
            searchWords={phrases
              .map((p) => p.word)
              .filter((word) => new RegExp(`\\b${word}\\b`, 'ig').test(script))}
            autoEscape={true}
            textToHighlight={script}
            highlightTag={({children, highlightIndex}) => {
              // console.log({children, highlightIndex})

              return (
                <div
                  style={{
                    userSelect: 'none',
                    display: 'inline',
                    backgroundColor: '#e0e0ff',
                  }}
                  onClick={() => {
                    setPhraseWord(
                      phrases.find(
                        (p) => p.word.toUpperCase() === children.toUpperCase(),
                      ),
                    )
                  }}
                  className="highlighted-text"
                >
                  {children}
                </div>
              )
            }}
          />
        </div>
        {selection && (
          <div
            style={{
              zIndex: 1000,
              userSelect: 'none',
              position: 'absolute',
              left: selection.clientRect.left + selection.clientRect.width / 2,
              top: selection.clientRect.bottom + 10,
            }}
            className="indicator"
          >
            <div className="indicator__cta">
              <div
                className="indicator__cta-link"
                style={{zIndex: 100, cursor: "pointer"}}
                onClick={(e) => {
                  
                  e.preventDefault()
                  setDicWord(selection.textContent)
                }}
                onTouchEnd = {(e) => {
                  e.preventDefault()
                  setDicWord(selection.textContent)
                }}
              >
                Meaning of {selection.textContent}
              </div>
            </div>
          </div>
        )}
      </div>
      <IonModal
        mode="ios"
        isOpen={!!phraseWord}
        cssClass="dictionaryModal"
        onDidDismiss={() => setPhraseWord(undefined)}
      >
        {phraseWord && (
          <PhraseMeaning
            phraseWord={phraseWord}
            onDismiss={() => setPhraseWord(undefined)}
          />
        )}
      </IonModal>
      <IonModal
        mode="ios"
        isOpen={!!dicWord}
        cssClass="dictionaryModal"
        onDidDismiss={() => setDicWord(undefined)}
        onWillDismiss={() => setDicWord(undefined)}
      >
        {dicWord && (
          <WordMeaning word={dicWord} onDismiss={() => setDicWord(undefined)} />
        )}
      </IonModal>
    </>
  )
}
