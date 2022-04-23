import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonSkeletonText,
  IonText,
  IonThumbnail,
  isPlatform,
  useIonRouter,
  useIonActionSheet,
  useIonViewWillEnter,
} from '@ionic/react'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import React, {useEffect, useState} from 'react'
import {
  useGerReviewCompletedLessonsQuery,
  DashboardLessonFieldsFragment,
  useGetDashboardDraftLessonsQuery,
  useGetDashboardQuery,
  useGetProfileQuery,
} from '../../schema/types-and-hooks'
import {fetchApi, fetchSuggestedCurriculum} from '../../fetchApis'
import * as ReactQuery from 'react-query'

import {storageHelper} from '../../utils/storageHelper'
//   import {useStore} from 'src/reactapp/useStore'
import './LessonsHome.scss'

const StoreHelper = storageHelper

function getThumnailUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
}
function fixVideoLevel(videoLevel) {
  return videoLevel === 'Elementary' ? 'Upper-beginner' : videoLevel
}

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const Section: React.FC = ({children}) => {
  return (
    <IonRow className="ion-justify-content-center ion-padding-start ion-padding-end ion-padding-top ion-padding-bottom">
      <IonCol
        sizeXs="12"
        sizeSm="12"
        sizeMd="10"
        sizeLg="9"
        sizeXl="8"
        className="ion-align-self-center"
      >
        {children}
      </IonCol>
    </IonRow>
  )
}

function TodayLessonView({onClick, thumbnail, lessonName, videoLevel, videoType}) {
  return (
    <IonRow
      className="pointer today-lesson lesson pt-0 ion-justify-content-center"
      onClick={onClick}
    >
      <IonCol
        className="ion-align-self-center"
        sizeXs="6"
        sizeSm="6"
        sizeMd="4"
        sizeLg="4"
        sizeXl="3"
      >
        <IonThumbnail>
          <IonImg src={thumbnail} style={{width: '100%'}}></IonImg>
        </IonThumbnail>
      </IonCol>
      <IonCol
        sizeXs="6"
        sizeSm="6"
        sizeMd="8"
        sizeLg="8"
        sizeXl="9"
      >
        <h5 className="video-title mt-0 ">{lessonName}</h5>

        <IonText color="medium">
          {videoLevel && <h6 className="video-category-label">{videoLevel}</h6>}
          {videoType && <h6 className="video-category-label">{videoType}</h6>}
        </IonText>
      </IonCol>
    </IonRow>
  )
}

const TodayLesson: React.FC<{
  loading: boolean
  todaysLesson: Partial<DashboardLessonFieldsFragment>
}> = ({loading, todaysLesson}) => {
  const router = useIonRouter()

  if (loading) {
    return (
      <TodayLessonView
        thumbnail="../../../assets/images/thumbnail-youtube.jpg"
        lessonName={
          <>
            <IonSkeletonText
              animated
              style={{width: '100%', height: 19}}
            ></IonSkeletonText>
          </>
        }
        videoLevel={<IonSkeletonText animated style={{width: '50%'}}></IonSkeletonText>}
        videoType={<IonSkeletonText animated style={{width: '40%'}}></IonSkeletonText>}
        onClick={() => {}}
      />
    )
  }

  return todaysLesson ? (
    <TodayLessonView
      thumbnail={getThumnailUrl(todaysLesson.youtubeId)}
      lessonName={todaysLesson.lessonName}
      videoLevel={todaysLesson.videoLevelLabel}
      videoType={todaysLesson.videoType}
      onClick={() => {
        //   navCtrl.navigateForward(['/lesson-details', todaysLesson._id, false, false])
        router.push(`/lesson-details/${todaysLesson._id}`)
      }}
    />
  ) : (
    <TodayLessonView
      thumbnail="../../../assets/images/movie.svg"
      lessonName={
        <>
          <strong>Good job!</strong> You've studied all the lessons prepared in 'Business
          English'. Feel free to explore other lessons.
        </>
      }
      videoLevel={null}
      videoType={null}
      onClick={() => {}}
    />
  )
}

function MyCourseItem({thumbnail, title, desc, onClick = null}) {
  return (
    <IonItem
      lines="none"
      mode="md"
      onClick={(e) => {
        e.preventDefault()
        onClick && onClick(e)
      }}
      // className="pointer"
      routerLink={`link`} // for hover effect
    >
      <IonThumbnail slot="start">
        <IonImg src={thumbnail}></IonImg>
      </IonThumbnail>
      <IonLabel>
        <h2 className="ion-text-wrap">{title}</h2>
        <IonText color="medium">{desc}</IonText>
      </IonLabel>
    </IonItem>
  )
}
function MyCourseLoadingItem() {
  return (
    <MyCourseItem
      title={
        <>
          <IonSkeletonText animated style={{width: '80%'}}></IonSkeletonText>
        </>
      }
      thumbnail="../../../../assets/images/thumbnail-youtube.jpg"
      desc={
        <>
          <p>
            <IonSkeletonText animated style={{width: '40%'}}></IonSkeletonText>
          </p>
          <p>
            <IonSkeletonText animated style={{width: '30%'}}></IonSkeletonText>
          </p>
        </>
      }
    />
  )
}

function MyCourses({loading, myCourses = []}) {
  const router = useIonRouter()

  if (loading) {
    return (
      <IonList mode="md" className="ion-no-padding">
        <MyCourseLoadingItem />
        <MyCourseLoadingItem />
        <MyCourseLoadingItem />
      </IonList>
    )
  }
  if (myCourses.length === 0) {
    return null
  }


  return (
    <>
      <IonList
        mode="md"
        className="ion-no-padding"
        // list="none"
      >
        {myCourses.slice(0, 3).map((myCourse) => (
          <MyCourseItem
            key={myCourse._id}
            onClick={() => {
              // navCtrl.navigateForward(['/course-details', myCourse._id, 'myCourse'])
              router.push(`/course-details/${myCourse._id}`)
            }}
            title={myCourse.title || myCourse.introduction}
            thumbnail={getThumnailUrl(myCourse.youtubeId)}
            desc={
              <>
                <p>
                  {/* <IonText>
                    {myCourse?.lessonCount === 1
                      ? 'Single -'
                      : `${myCourse?.lessonCount} episodes - `}
                  </IonText> */}
                  {myCourse.videoLevel}
                </p>
                <p>{myCourse.topicDetails.title}</p>
              </>
            }
          />
        ))}
      </IonList>
    </>
  )
}

function HorizontalLessonLoadingItem() {
  return (
    <IonItem className="pointer horizontal-lesson ion-activatable">
      <IonThumbnail>
        <IonImg
          style={{width: '100%'}}
          src="../../../assets/images/thumbnail-youtube.jpg"
        ></IonImg>
      </IonThumbnail>
      <h5 className=" mt-0">
        <IonSkeletonText animated style={{width: '90%'}}></IonSkeletonText>
        <IonSkeletonText animated style={{width: '30%'}}></IonSkeletonText>
      </h5>
      <IonText color="medium">
        <h6 className="video-category-label">
          <IonSkeletonText animated style={{width: '40%'}}></IonSkeletonText>
        </h6>
        <h6 className="video-category-label">
          <IonSkeletonText animated style={{width: '40%'}}></IonSkeletonText>
        </h6>
      </IonText>
      {/* <IonRippleEffect></IonRippleEffect> */}
    </IonItem>
  )
}

function ShareNow() {
  const router = useIonRouter()
  return (
    <>
      <IonRow className="ion-justify-content-center ion-align-items-center">
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
      <img src="../../../assets/images/share_app-h.png" alt="subscribe" />
      </IonCol>
        {/* <IonCol className="ion-align-item-center trial-package-text ion-justify-content-center">
          <h1 className="ion-text-center ion-padding-bottom ion-no-margin">
            Learn English together
          </h1>
          <p className="ion-text-center ion-padding-bottom ion-no-margin">
            Share with your friends
          </p>
          <IonButton
          size="small"
          expand="full"
          shape="round"
            style={{fontWeight: 800}}
            onClick={() => {
              router.push('/share-app', 'forward')
            }}
          >
            SHARE WITH FRIENDS
          </IonButton>
        </IonCol >
        <IonCol className="ion-align-self-center">
          <img src="../../../assets/images/share_app_home.png" alt="subscribe" />
        </IonCol> */}
      </IonRow>
    </>
  )
}

function SubscribeNow() {
  const router = useIonRouter()
  const [trialLessonsLeft, setTrialLessonsLeft] = useState(0)
  const {
    data: {profile},
  } = useGetProfileQuery()
  async function leftLesson() {
    const res = await fetchApi(`/lesson/my-course`)
    if (res) {
      setTrialLessonsLeft(profile.trialLessonLimit - res.data.length)
    }
  }

  if (profile) {
    leftLesson()
  }
  if (profile?.currentPackage === 'Subscription') {
    return null
  }

  return (
    <>
      <IonRow className="ion-justify-content-center ion-align-items-center">
      <IonCol

          className="ion-align-item-center 
          ion-no-padding ion-align-self-center
          ion-justify-content-center"
          sizeXs="12"
          sizeSm="12"
          sizeMd="10"
          sizeLg="9"
          sizeXl="8"
       onClick={() => {
        router.push('/subscriptionplans', 'forward')
      }}
     >
      <img src="../../../assets/images/subscribe_app_h.png" alt="subscribe Now" />
      </IonCol>
        {/* <IonCol className="ion-align-item-center trial-package-text ion-justify-content-center">
          <h1 className="ion-text-center ion-padding-bottom ion-no-margin">
          {trialLessonsLeft} free {trialLessonsLeft > 1 ? 'lessons are' : 'lesson is'} left!
          </h1>
          <p className="ion-text-center ion-padding-bottom ion-no-margin">
            Subscribe to unlock more lesson
          </p>
          <IonButton
            size="small"
            expand="full"
            shape="round"
            style={{fontWeight: 800}}
            onClick={() => {
              router.push('/subscriptionplans', 'forward')
            }}
          >
            SUBSCRIBE NOW
          </IonButton>
        </IonCol>
        <IonCol className="ion-align-self-center">
          <img src="../../../assets/images/subscribe_home.png" alt="subscribe" />
        </IonCol> */}
      </IonRow>
    </>
  )
}

function HorizontalLessonList({loading, lessons, isDraft = false}) {
  const router = useIonRouter()

  if (loading) {
    return (
      <ul>
        <HorizontalLessonLoadingItem />
        <HorizontalLessonLoadingItem />
        <HorizontalLessonLoadingItem />
      </ul>
    )
  }
  return (
    <>
      <ul>
        {lessons.map((lesson) => (
          <li
            key={lesson._id}
            className="pointer horizontal-lesson ion-activatable"
            onClick={() =>
              router.push(`/lesson-details/${lesson._id}/false/${isDraft}`, 'forward')
            }
          >
            <IonThumbnail>
              <IonImg
                style={{width: '100%'}}
                src={getThumnailUrl(lesson.youtubeId)}
              ></IonImg>
            </IonThumbnail>
            <h5 className="video-title mt-0">{lesson.lessonName}</h5>
            <IonText color="medium">
              <h6 className="video-category-label">
                {fixVideoLevel(lesson.videoLevelLabel)}
              </h6>
              <h6 className="video-category-label">{lesson.videoType}</h6>
            </IonText>
          </li>
        ))}
      </ul>
    </>
  )
}

const DraftLessonsSection: React.FC = () => {
  const router = useIonRouter()
  const {data, loading, error} = useGetDashboardDraftLessonsQuery({
    fetchPolicy: 'network-only',
    // pollInterval: 2000,
  })

  return (
    <Section>
      <IonRow className="ion-padding-bottom">
        <IonCol>
          <h3 className="mt-0 font-weight-400">
            <strong>Draft Lessons</strong>
          </h3>
        </IonCol>
        <IonCol>
          <IonText
            color="danger"
            className="ion-float-right pointer"
            onClick={() => {
              router.push('/draft-lessons', 'forward')
            }}
          >
            See All
          </IonText>
        </IonCol>
      </IonRow>
      <HorizontalLessonList
        loading={loading}
        lessons={data?.draftLessons?.data}
        isDraft
      />
    </Section>
  )
}

type Props = {
  ts: number
}

async function fetchMyCourses() {
  const res = await fetchApi(`/lesson/my-course`)

  const getCompletedLessonsByUsers = await fetchApi(`/lesson/completedLessons`)

  const result = res.data.filter((data) => {
    if (
      data.subLessons.some(
        (c) =>
          !getCompletedLessonsByUsers.data.some((i) => i.lessonId.includes(c.lessonId)),
      )
    ) {
      return data
    }
  })
  return result
}

const LessonsHome: React.FC = () => {
  const query = ReactQuery.useQuery('my-cources', fetchMyCourses,{
    // Refetch the data every second
    refetchInterval: 20,
  })
  

 useEffect(() => {

 },[query.data])
  
  const today = weekdays[new Date().getDay()]
  const {
    data: {profile},
  } = useGetProfileQuery()
  const dashboardRes = useGetDashboardQuery({
    variables: {
      day: today === 'Saturday' || today === 'Sunday' ? 'Weekend' : today,
      videoLevel: profile.userLevelName,
    },
    fetchPolicy: 'cache-and-network',
  })
  
  const PAGE_SIZE = 20
  const result = useGerReviewCompletedLessonsQuery({
    variables: {size: PAGE_SIZE},
  })
  const {data, loading, error, refetch} = dashboardRes
  
  useIonViewWillEnter(() =>{
    fetchMyCourses()
  })

  let onBoarding
  const [showModal, setShowModal] = useState(false)
  const router = useIonRouter()
  const [present, dismiss] = useIonActionSheet()

  const sharedService = StoreHelper
  const isLoading = !data && loading

  React.useEffect(() => {
    // console.log('useEffect')
  }, [today])


  const showQuickActions = async (details) => {
    present({
      buttons: [
        {
          text: 'Resume where I left off',
          handler: () => {
            router.push(`/lesson-steps/${details.lessonID}/false`)
          },
        },
        {
          text: "Begin today's recommended lesson",
          handler: () => {
            router.push(`/lesson-details/${data?.todayLesson._id}`, 'forward')
          },
        },
        {
          text: 'Explore other lessons',
          handler: () => {
            router.push('/dashboard/library')
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    })
  }

  async function handleHelpGuide() {
    const helpLog = await sharedService.getNativeStorage('isTodayLessonHelpModeDone')
    onBoarding = await sharedService.getNativeStorage('isOnBoarding')

    if (onBoarding?.data) {
      setShowModal(true)
    } else {
      if (helpLog?.data) {
        return
      }

      const steps = [
        {
          element: '#today-lesson',
          popover: {
            title: 'Recommendation',
            description:
              'We recommend a new lesson each day based on your level and from different categories.',
            position: 'bottom',
          },
        },
      ]

      if (document.getElementById('my-course')) {
        steps.push({
          element: '#my-course',
          popover: {
            title: 'My Course',
            description: "Lessons you've started but not completed yet.",
            position: 'top',
          },
        })
      }

      showHelpGuide({
        steps,
        onClose: () => {
          sharedService.setNativeStorage('isTodayLessonHelpModeDone', true)
        },
      })
    }
  }

  React.useEffect(() => {
    if (!loading) {
      sharedService
        .getNativeStorage('leftOfData')
        .then((leftOfData) => {
          if (leftOfData?.data) {
            showQuickActions(leftOfData.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      handleHelpGuide()
    }
  }, [loading])

  React.useEffect(() => {
    if (!loading) {
      handleHelpGuide()
    }
  }, [showModal])
  React.useEffect(() => {
    refetch()
  }, [profile])
 

  return (
    <>
      <IonModal isOpen={showModal} cssClass="my-custom">
        <IonContent className="modal">
          <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-end">
              <span>
                <IonIcon
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    padding: '10px',
                    color: 'white',
                  }}
                  size="large"
                  slot="icon-only"
                  name="close"
                  onClick={() => {
                    setShowModal(false)
                    storageHelper.setNativeStorage('isOnBoarding', false)
                  }}
                ></IonIcon>
              </span>
            </IonRow>

            <IonRow className="content ion-align-items-center ion-justify-content">
              <IonCol
                sizeMd="6"
                sizeXs="12"
                className="ion-justify-content-center ion-align-content-center"
              >
                <div className="image-content">
                  <img src="./assets/images/Character.svg" alt="charachter" />
                </div>
              </IonCol>
              <IonCol
                sizeMd="5"
                sizeXs="11"
                className="ion-justify-content-center ion-align-content-center"
              >
                <h2>You’ve just received 5 free lessons! </h2>
                <p>
                  We sent you a verification email. Please check your email so we know
                  you’re a human.{' '}
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>

      <IonGrid className="lessons-page ion-no-padding ion-margin-top">
        {isPlatform('mobile') && (
          <IonRow className="ion-justify-content-center">
            <IonCol
            style={{ display: 'flex', alignItems: 'center', paddingTop:"8%"}}
              className="ion-padding-top ion-padding-right ion-padding-left"
            >
              <img
                src="/assets/images/logo.png"
                width="12%"
                alt="logo"
                className="logo"
              />
              <h3 style={{  fontWeight: "bolder"}}>Hi {profile?.fullName}!</h3>
            </IonCol>
          </IonRow>
        )}

        <Section>
          {isPlatform('desktop') && <div className="ion-margin-top"></div>}
          <div 
          style={{backgroundColor : "#EFEFFF", padding:"2%", borderRadius: '12px'}}
          >
          <h2 id="today-lesson" className="ion-no-margin todaysLessonsHeading">
            <strong>Study Today's Lesson For You</strong>
          </h2>
          <p className="c-medium m-5 ion-padding-bottom">
            <strong>Recommendation</strong>
          </p>
          <TodayLesson loading={isLoading} todaysLesson={data?.todayLesson} />
          </div>
        </Section>
        {/* <hr /> */}
        {query.data && query.data.length > 0 ? (
          <>
            {/* <hr /> */}
            <Section>
              <IonRow>
                <IonCol size="auto">
                  <h3 id="my-course" className="mt-0 font-weight-400">
                    <strong>My Unfinished Courses</strong>
                  </h3>
                </IonCol>
                <IonCol>
                  <IonText
                    color="danger"
                    className="ion-float-right pointer"
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                      router.push('/my-courses', 'forward')
                    }}
                  >
                    See All
                  </IonText>
                </IonCol>
              </IonRow>
              <MyCourses loading={isLoading} myCourses={query.data} />
            </Section>
            {/* <hr /> */}
          </>
        ) : (
          ''
        )}
        {data?.savedLessons?.data?.length > 0 ? (
          <>
            <Section>
              <IonRow>
                <IonCol>
                  <h3 className="mt-0 font-weight-400">
                    <strong>Saved For Later</strong>
                  </h3>
                </IonCol>
                <IonCol>
                  <IonText
                    color="danger"
                    className="ion-float-right pointer"
                    style={{cursor: 'pointer'}}
                    onClick={() => {
                      router.push('/saved-lessons', 'forward')
                    }}
                  >
                    See All
                  </IonText>
                </IonCol>
              </IonRow>
              <HorizontalLessonList
                loading={isLoading}
                lessons={data?.savedLessons?.data}
              />
            </Section>
            {/* <hr /> */}
          </>
        ) : (
          ''
        )}
        {/* <hr /> */}
        <Section>
          <IonRow className="ion-padding-bottom">
            <IonCol size="auto">
              <h3 className="mt-0 font-weight-400">
                <strong>Popular Lessons</strong>
              </h3>
            </IonCol>
            <IonCol>
              <IonText
                color="danger"
                className="ion-float-right pointer"
                style={{cursor: 'pointer'}}
                onClick={() => {
                  router.push('/popular', 'forward')
                }}
              >
                See All
              </IonText>
            </IonCol>
          </IonRow>
          <HorizontalLessonList
            loading={isLoading}
            lessons={data?.popularLessons?.data}
          />
        </Section>
        {/* <hr /> */}
        <Section>
          <IonRow className="ion-padding-bottom">
            <IonCol>
              <h3 className="mt-0 font-weight-400">
                <strong>New Uploads</strong>
              </h3>
            </IonCol>
            <IonCol>
              <IonText
                color="danger"
                className="ion-float-right pointer"
                style={{cursor: 'pointer'}}
                onClick={() => {
                  router.push('/new-uploads', 'forward')
                }}
              >
                See All
              </IonText>
            </IonCol>
          </IonRow>
          <HorizontalLessonList
            loading={isLoading}
            lessons={data?.newUploadLessons?.data}
          />
        </Section>
        {/* <hr /> */}
        {profile.isAdmin && <DraftLessonsSection />}
        {profile.currentPackage === 'Trial' ?
        <SubscribeNow /> :
        <ShareNow />
      }
        
      </IonGrid>
    </>
  )
}

export default LessonsHome

function showHelpGuide({steps, onClose}) {
  setTimeout(() => {
    const driver = new Driver({
      // animate: false, // Whether to animate or not
      // opacity: 0,
      allowClose: false, // Whether the click on overlay should close or not
      overlayClickNext: true, // Whether the click on overlay should move next
      doneBtnText: 'Done', // Text on the final button
      closeBtnText: 'Skip', // Text on the close button for this step
      // stageBackground: '#ffffff', // Background color for the staged behind highlighted element
      nextBtnText: 'Next', // Next button text for this step
      prevBtnText: 'Previous', // Previous button text for this step
      keyboardControl: false, // Allow controlling through keyboard (escape to close, arrow keys to move)
      // onNext: (Element) => {},
      onHighlightStarted: (Element) => {
        const node = Element.getNode() as HTMLElement
        node.scrollIntoView(false)
      },
      onDeselected: (Element) => {
        if (!driver.isActivated) {
          onClose()
        }
      },
    })

    driver.defineSteps(steps)

    driver.start()
  }, 1000)
}
