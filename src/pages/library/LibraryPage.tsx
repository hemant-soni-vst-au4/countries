import React, {useState} from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonThumbnail,
  useIonRouter,
  IonCardHeader,
  useIonViewWillEnter,
} from '@ionic/react'
import {chevronForward} from 'ionicons/icons'
import * as ReactQuery from 'react-query'
import {fetchApi, fetchSuggestedCurriculum} from '../../fetchApis'
import {useGetProfileQuery} from '../../schema/types-and-hooks'

import './LibraryPage.scss'

async function fetchSearchLessons(
  page: number = 1,
  videoLevel: string,
  day: string,
  searchKeyWord: string,
) {
  const res = await fetchApi(`/lesson/search-lessons/${page}`, {
    method: 'POST',
    body: JSON.stringify({
      videoLevel,
      day,
      searchKeyWord,
    }),
  })

  return res.data
}

const weeklyImages = {
  Monday: '/assets/images/search/news1.png',
  Tuesday: '/assets/images/search/general-english1.png',
  Wednesday: '/assets/images/search/tv-shows-movies1.png',
  Thursday: '/assets/images/search/business-english1.png',
  Friday: '/assets/images/search/speech1.png',
  Weekend: '/assets/images/search/pop-songs1.png',
}

const getThumbnail = (youtubeId: string) =>
  'https://img.youtube.com/vi/' + youtubeId + '/mqdefault.jpg'

const PAGE_SIZE = 10

const weekdays = [
  'Weekend', //'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Weekend', //'Saturday',
]

function SearchList({searchKeyWord}) {
  const [noMore, setNoMore] = React.useState(false)
  const [page, setPage] = React.useState(1)
  

  const {
    data: {profile},
  } = useGetProfileQuery()
  const today = weekdays[new Date().getDay()]
  const query = ReactQuery.useInfiniteQuery(
    ['searchLessons', today, searchKeyWord],
    ({pageParam = 1}) => {
      return fetchSearchLessons(pageParam, profile.userLevelName, today, searchKeyWord)
    },
    {
      // keepPreviousData: true
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length >= PAGE_SIZE) {
          return pages.length + 1
        }
        return undefined
      },

      onSuccess: () => {
        setNoMore(true)
      },
    },
  )
  const {
    error,
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = query

  console.log("isLoading", isLoading)

  if (error) {
    return <div>Error!</div>
  }

  function handleInfinite(e) {
    fetchNextPage().finally(() => {
      e.target.complete()
    })
  }
  const lessons = data?.pages || []

  return (
    <>
      <IonRow>
        <IonCol size="12" className="ion-no-padding">
      {isLoading ? 
        ( <div className="ion-padding-top"><IonSpinner></IonSpinner></div>)
        : ( 
          data?.pages[0].length ? (
            <IonRow className="ion-justify-content-center">
              <IonCol
                sizeXs="12"
                sizeSm="12"
                sizeMd="10"
                sizeLg="9"
                sizeXl="9"
                className="ion-align-self-center"
              >
                <IonList
                  mode="md"
                  className="ion-no-padding"
                  // list="none"
                >
                  {lessons.map((group, i) => (
                    <React.Fragment key={i}>
                      {group.map((lesson) => (
                        <IonItem
                          key={lesson._id}
                          className="pointer"
                          routerLink={`/lesson-details/${lesson._id}`}
                          routerDirection="forward"
                          mode="md"
                          style={{cursor: 'pointer'}}
                        >
                          <IonThumbnail slot="start">
                            <IonImg src={getThumbnail(lesson.youtubeId)}></IonImg>
                          </IonThumbnail>
                          <IonLabel>
                            <h2 className="ion-text-wrap">{lesson.lessonName}</h2>
                            <p>
                              <IonText>{lesson.videoLevel}</IonText>
                            </p>
                            {/* <p>
                          <IonText>{lesson.course.topic.title}</IonText>
                        </p> */}
                          </IonLabel>
                          <IonIcon mode="ios" icon={chevronForward} slot="end"></IonIcon>
                        </IonItem>
                      ))}
                    </React.Fragment>
                  ))}
                </IonList>
              </IonCol>
            </IonRow>
          ) : 
          (
            
              <IonRow className="explore ion-text-center ion-align-items-center ion-justify-content-center ion-margin-top">
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="6"
                  sizeXl="4"
                  sizeLg="4"
                  className="ion-align-self-center"
                >
                  <img
                    className="ion-margin-bottom"
                    src="/assets/images/search-lessons-not-found1.png"
                    width="30%"
                    alt="lessons not found"
                  />
                  <h3>
                    No results for <b>"{searchKeyWord}"</b>
                    <br />
                    </h3>
                    <IonText>
                    Try again using different spelling or keywords
                    </IonText>
                </IonCol>
              </IonRow>
            
          ))
        }
        </IonCol>
      </IonRow>
      

      <IonInfiniteScroll
        disabled={!hasNextPage || isFetchingNextPage}
        onIonInfinite={handleInfinite}
        threshold="200px"
      >
        <IonInfiniteScrollContent>
          <IonSpinner />
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  )
}

export default function SearchLessons() {
  const {
    data: {profile},
  } = useGetProfileQuery({fetchPolicy: 'cache-only'})
  const [searchKeyWord, setSearchKeyWord] = React.useState('')
  const [trialLessonsLeft, setTrialLessonsLeft] = useState(0)
  const [isFocus, setIsFocus] = React.useState(false)
  const router = useIonRouter()
  const query = ReactQuery.useQuery('suggested-curriculum', fetchSuggestedCurriculum)
  const {isLoading, error, data} = query

  

  if (isLoading) {
    return (
      <IonPage className="libray-page">
        {/* <DesktopTabBar /> */}
        <IonContent>
          <IonProgressBar type="indeterminate" />
        </IonContent>
      </IonPage>
    )
  }
  if (error) {
    return <div>Error...</div>
  }

  const list = Object.keys(weeklyImages).map((k) => ({
    ...data.find((t) => t.day === k),
    icon: weeklyImages[k],
  }))

  async function leftLesson() {
    const res = await fetchApi(`/lesson/my-course`)
    if (res) {
      setTrialLessonsLeft(profile.trialLessonLimit - res.data.length)
    }
  }

  if (profile) {
    leftLesson()
  }

  // const trialLessonsLeft = profile.trialLessonLimit - profile.completedLesson

  function handleFocus() {
    setIsFocus(true)
  }
  function handleCancel() {
    setIsFocus(false)
  }
  function handleClear() {
    // console.log('handleClear')
  }
  function handleChange(e) {
    setSearchKeyWord(e.target.value)
  }

  return (
    <IonPage className="libray-page">
      <IonContent>
        <IonGrid className="ion-no-padding">
          <IonRow 
          style={{paddingTop: '8%'}}
          className="ion-margin-top ion-padding-top ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="8"
              sizeXl="4"
              sizeLg="6"
              className="ion-align-self-center"
            >
              <IonSearchbar
                mode="md"
                id="searchKeyWord"
                onIonFocus={handleFocus}
                onIonCancel={handleCancel}
                onIonClear={handleClear}
                onIonChange={handleChange}
                showCancelButton="focus"
                clear-icon="close-circle"
                animated
                placeholder="Search your lesson"
              ></IonSearchbar>

              {!isFocus && searchKeyWord === '' ? (
                <>
                  <IonRow>
                    {list.map((topic) => (
                      <IonCol size="6">
                        <IonCard
                          key={topic._id}
                          mode="ios"
                          className="card ion-padding"
                          routerLink={`/library/${topic.lessonTopicId}`}
                        >
                          <IonCardHeader>
                            <IonRow className="ion-align-items-center ion-justify-content-center">
                              <IonImg
                                style={{width: '50%', height: '8vh'}}
                                className="search-categories-icon"
                                src={topic.icon}
                              ></IonImg>
                            </IonRow>
                          </IonCardHeader>
                          <IonCardContent className="search-categories" mode="ios">
                            <IonRow className="ion-align-items-center ion-justify-content-center">
                              <p>
                                <strong>{topic.title}</strong>
                              </p>
                            </IonRow>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    ))}
                  </IonRow>
                  {profile.currentPackage === 'Subscription' ? (
                    <>
                      {/* <p className="ion-text-center">Help friends improve English</p>
                      <IonButton
                        mode="ios"
                        className="Sub"
                        shape="round"
                        expand="block"
                        routerLink="/share-app"
                        // routerLinkActive="router-link-active"
                      >
                        <strong>SHARE NOW</strong>
                      </IonButton> */}
                      <IonRow className="ion-justify-content-center ion-no-padding ion-align-items-center">
                        <IonCol
                          onClick={() => {
                            router.push('/share-app', 'forward')
                          }}
                          className="ion-align-item-center 
                              ion-no-padding ion-align-self-center
                              ion-justify-content-center"
                          sizeXs="12"
                          sizeSm="12"
                          sizeMd="10"
                          sizeLg="9"
                          sizeXl="8"
                        >
                          <img
                            src="../../../assets/images/share_app-h.png"
                            alt="subscribe"
                          />
                        </IonCol>
                      </IonRow>
                    </>
                  ) : (
                    <>
                      <IonRow
                        style={{
                          backgroundImage: `url("../../../assets/images/subscribeBg-Explore.png")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '100% 100%',
                          height: '32vh',
                          padding: '0px 20px'
                        }}
                        className="ion-align-items-center"
                      >
                        <IonCol
                          className="ion-align-item-center 
                                    ion-align-self-center
                                      ion-justify-content-center"
                          sizeXs="12"
                          sizeSm="12"
                          sizeMd="10"
                          sizeLg="9"
                          sizeXl="8"
                        >
                          <div className="ion-padding-top ion-padding-bottom  ">
                            <h6 className="ion-text-center ion-padding-top">
                              <strong>
                                "{trialLessonsLeft}" free{' '}
                                {trialLessonsLeft <= 1 ? 'lesson is' : 'lessons are'}{' '}
                                left. <br />
                              </strong>
                            </h6>
                            <p className="ion-text-center ion-padding-top ion-padding-bottom">
                              Subscribe to unlock more lessons.
                            </p>

                            <IonButton
                              mode="ios"
                              className="Sub"
                              shape="round"
                              expand="block"
                              routerLink="/subscriptionplans"
                            >
                              <strong>SUBSCRIBE NOW</strong>
                            </IonButton>
                          </div>
                        </IonCol>
                      </IonRow>
                    </>
                  )}
                </>
              ) : (
                searchKeyWord === '' && (
                  <div className="explore ion-padding-top">
                    <img
                      className="ion-margin-bottom ion-padding-top"
                      src="/assets/images/search-lessons1.png"
                      width="30%"
                      alt="expore lessons"
                    />
                    <h3>Explore the lessons</h3>
                    <IonText>Search for keywords, accents, topics, and genres.</IonText>
                  </div>
                )
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-no-padding">
              {isFocus && searchKeyWord !== '' && (
                <SearchList key={searchKeyWord} searchKeyWord={searchKeyWord} />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
