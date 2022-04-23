import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonToolbar,
  IonTitle
} from '@ionic/react'
import {format} from 'date-fns/fp'
import {chevronBack, chevronDown, chevronUp} from 'ionicons/icons'
import React from 'react'
import * as ReactQuery from 'react-query'
import {useHistory, useParams} from 'react-router-dom'
import {fetchApi, fetchSuggestedCurriculum} from '../../fetchApis'
import {getOldUserLevel} from '../../utils/userLevels'
import './SearchListPage.scss'

const getThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`

const formatDate = format('MMM d, y')

function Course({course}) {
  const history = useHistory()
  const [expanded, setExpanded] = React.useState(false)
  return (
    <IonRow className="course pointer ion-align-items-center ion-justify-content-center">
      <IonCol
        sizeXs="12"
        sizeSm="12"
        sizeMd="10"
        sizeLg="9"
        sizeXl="8"
        className="ion-padding-top ion-align-self-center"
      >
        <IonRow>
          <IonCol sizeXs="5" sizeSm="5" sizeMd="3" sizeLg="3" sizeXl="2">
            <IonThumbnail>
              <IonImg src={getThumbnailUrl(course.youtubeId)}></IonImg>
            </IonThumbnail>
          </IonCol>
          <IonCol
            className="ion-padding-start"
            sizeXs="7"
            sizeSm="7"
            sizeMd="9"
            sizeLg="9"
            sizeXl="10"
          >
            <IonLabel>
              <h2 className="ion-text-wrap">{course.title || course.introduction}</h2>
              <p id="scenes-count">
                <IonText>
                  {course.subLessons.length} Episode
                  {course.subLessons.length > 1 && 's'}
                </IonText>
              </p>
              <IonRow
                onClick={() => setExpanded((exp) => !exp)}
                className="ion-align-items-center ion-justify-content-center"
              >
                <IonCol size="10" className="ion-no-padding ion-align-self-center">
                  <IonText color="medium c-orange" id="tags">
                    {course.tags}
                  </IonText>
                </IonCol>
                <IonCol
                  size="2"
                  className="ion-no-padding ion-text-center ion-align-self-center collapsible-icon"
                >
                  <IonIcon
                    color="medium"
                    mode="ios"
                    icon={expanded ? chevronUp : chevronDown}
                  />
                </IonCol>
              </IonRow>
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className={`expand-wrapper ${expanded ? '' : 'collapsed'}`}>
          <IonCol 
          
          >
            {course.subLessons.map((lesson, index) => (
              <IonRow
                className="subLesson"
                key={lesson._id}
                onClick={() => history.push(`/lesson-details/${lesson._id}`)}
              >
                <IonCol id="lesson-name" size="8">
                  <p id="sub-lessons">{`${lesson.lessonName}`}</p>
                </IonCol>
                <IonCol className="ion-padding-top studied-date" size="4">
                  {lesson.completedLesson?.createdAt && (
                    <span>{formatDate(new Date(lesson.completedLesson.createdAt))}</span>
                  )}
                </IonCol>
              </IonRow>
            ))}
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  )
}

function LoadingCourse() {
  return (
    <IonRow className="course ion-align-items-center ion-justify-content-center">
      <IonCol
        sizeXs="12"
        sizeSm="12"
        sizeMd="10"
        sizeLg="9"
        sizeXl="8"
        className="ion-no-padding ion-align-self-center"
      >
        <IonRow>
          <IonCol sizeXs="5" sizeSm="5" sizeMd="3" sizeLg="3" sizeXl="2">
            <IonThumbnail>
              <IonImg src="/assets/images/thumbnail-youtube.jpg"></IonImg>
            </IonThumbnail>
          </IonCol>
          <IonCol sizeXs="7" sizeSm="7" sizeMd="9" sizeLg="9" sizeXl="10">
            <IonLabel>
              <h2 className="ion-text-wrap">
                <IonSkeletonText animated style={{width: '100%'}}></IonSkeletonText>
              </h2>
              <p id="scenes-count">
                <IonText>
                  <IonSkeletonText animated style={{width: '40%'}}></IonSkeletonText>
                </IonText>
              </p>
              <p id="tags">
                <IonSkeletonText animated style={{width: '70%'}}></IonSkeletonText>
                <IonSkeletonText animated style={{width: '60%'}}></IonSkeletonText>
              </p>
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonCol>
    </IonRow>
  )
}

const PAGE_SIZE = 10

async function fetchCourseList(
  page: number = 1,
  videoLevel: string,
  lessonTopicId: string,
) {
  const res = await fetchApi(`/lesson/course-list/${page}`, {
    method: 'POST',
    body: JSON.stringify({
      videoLevel,
      lessonTopicId,
    }),
  })

  return res.data
}

function CourseList({level, topicId}) {
  const query = ReactQuery.useInfiniteQuery(
    ['searchLessons', level, topicId],
    ({pageParam = 1}) => {
      return fetchCourseList(pageParam, getOldUserLevel(level), topicId)
    },
    {
      // keepPreviousData: true
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length >= PAGE_SIZE) {
          return pages.length + 1
        }
        return undefined
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

  if (error) {
    return <div>Error!</div>
  }

  function handleInfinite(e) {
    fetchNextPage().finally(() => {
      e.target.complete()
    })
  }

  const courses = data?.pages || []

  return (
    <>
      {courses.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </React.Fragment>
      ))}

      {isLoading && (
        <IonRow>
          <IonCol className="ion-no-padding">
            <LoadingCourse />
            <LoadingCourse />
            <LoadingCourse />
          </IonCol>
        </IonRow>
      )}

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

export default function SearchList() {
  const {topicId} = useParams<{topicId: string}>()
  const [level, setLevel] = React.useState('Upper-Beginner')

  const query = ReactQuery.useQuery('suggested-curriculum', fetchSuggestedCurriculum)
  const {isLoading, data, error} = query

  if (isLoading) {
    return (
      <IonPage className="search-list">
        <IonHeader mode="ios">
          <IonToolbar mode="md">
            <IonButtons slot="start">
              <IonButton mode="md" routerLink="/dashboard/library" routerDirection="back">
                <IonIcon slot="icon-only" icon={chevronBack}></IonIcon>
              </IonButton>
            </IonButtons>
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
          <IonProgressBar type="indeterminate" />
        </IonContent>
      </IonPage>
    )
  }
  if (error) {
    return <div>Error...</div>
  }
  const topic = data.find((t) => t.lessonTopicId === topicId)

  return (
    <IonPage className="search-list">
      <IonHeader mode="ios">
        <IonToolbar mode="md">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/dashboard/library" routerDirection="back">
              <IonIcon slot="icon-only" icon={chevronBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>
          <div style={{textAlign: 'center'}}>
          <b>{topic.title}</b>
          </div>
          </IonTitle>
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
      <IonContent className="ion-no-padding">
        <IonGrid className="ion-no-padding">
          {/* <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs={'12'}
              sizeSm={'12'}
              sizeMd={'10'}
              sizeLg={'9'}
              sizeXl={'8'}
              className="ion-align-self-center "
            >
              <h1 style={{margin: '10px 0 0 15px'}}>
                <strong>{topic.title}</strong>
              </h1>
            </IonCol>
          </IonRow> */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs={'12'}
              sizeSm={'12'}
              sizeMd={'10'}
              sizeLg={'9'}
              sizeXl={'8'}
              className="ion-no-padding ion-align-self-center"
            >
              <IonSegment
                mode="md"
                color="danger"
                value={level}
                onIonChange={(e) => setLevel(e.detail.value)}
              >
                <IonSegmentButton value="Upper-Beginner">
                  <IonLabel>Upper-Beginner</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Intermediate">
                  <IonLabel>Intermediate</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="Advanced">
                  <IonLabel>Advanced</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          <div className="ion-padding-top">
            <CourseList
              key={`${topic.lessonTopicId}-${level}`}
              topicId={topic.lessonTopicId}
              level={level}
            />
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
