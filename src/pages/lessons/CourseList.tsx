import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
  IonThumbnail,
  IonToolbar,
  IonTitle,
} from '@ionic/react'

import {chevronBack} from 'ionicons/icons'
import React from 'react'
import * as ReactQuery from 'react-query'
import {fetchApi} from '../../fetchApis'
import {fromOldUserLevel} from '../../utils/userLevels'
import './CourseList.scss'

const getThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`

const LoadingCourseItem = () => (
  <IonItem lines="none" mode="md">
    <IonThumbnail slot="start">
      <IonImg src="../../../../assets/images/thumbnail-youtube.jpg" />
    </IonThumbnail>
    <IonLabel>
      <h2 className="ion-text-wrap">
        <IonSkeletonText animated style={{width: '90%'}} />
        <IonSkeletonText animated style={{width: '75%'}} />
      </h2>
      <p>
        <IonSkeletonText animated style={{width: '60%'}} />
      </p>
    </IonLabel>
    <IonIcon mode="ios" name="chevron-forward" slot="end" />
  </IonItem>
)
const CourseItem = ({id, title, youtubeId, episodeCount, videoLevel}) => (
  <IonItem lines="none" routerLink={`/course-details/${id}/myCourse`} mode="md">
    <IonThumbnail slot="start">
      <IonImg src={getThumbnailUrl(youtubeId)} />
    </IonThumbnail>
    <IonLabel>
      <h2 className="ion-text-wrap">{title}</h2>
      <IonText color="medium">
        <p>{episodeCount}</p>
        <p>
          {/* <IonText>
            {episodeCount === 1 ? 'Single - ' : `${episodeCount} episode - `}
          </IonText> */}

          {fromOldUserLevel(videoLevel)}
        </p>
      </IonText>
    </IonLabel>
    <IonIcon mode="ios" name="chevron-forward" slot="end" />
  </IonItem>
)

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

export default function CourseListPage() {
  const query = ReactQuery.useQuery('my-cources', fetchMyCourses,{
    // Refetch the data every second
    refetchInterval: 20,
  })
  // console.log("query", query)
  const {isLoading, data, error} = query

  if (error) {
    return <div>Error...</div>
  }

  return (
    <IonPage className="my-courses">
      <IonHeader mode="ios">
        <IonToolbar mode="md">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/dashboard/lessons" routerDirection="back">
              <IonIcon slot="icon-only" icon={chevronBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>
          <div style={{textAlign: 'center'}}>
          <b>My Unfinished Courses</b>
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
      <IonContent className="ion-padding">
        <IonGrid className="ion-no-padding">
          {/* <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs={'12'}
              sizeSm={'12'}
              sizeMd={'10'}
              sizeLg={'9'}
              sizeXl={'9'}
              className="ion-align-self-center"
            >
              <h1 className="ion-no-margin ion-padding-bottom">
                <strong>My Unfinished Courses</strong>
              </h1>
            </IonCol>
          </IonRow> */}
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              className="ion-no-padding ion-align-self-center"
              sizeXs={'12'}
              sizeSm={'12'}
              sizeMd={'10'}
              sizeLg={'9'}
              sizeXl={'9'}
            >
              {isLoading ? (
                <IonList mode="md" className="ion-no-padding">
                  <LoadingCourseItem />
                  <LoadingCourseItem />
                  <LoadingCourseItem />
                  <LoadingCourseItem />
                  <LoadingCourseItem />
                </IonList>
              ) : (
                <IonList mode="md" className="ion-no-padding">
                  {data.map((course) => {
                    return (
                      <CourseItem
                        key={course._id}
                        id={course._id}
                        youtubeId={course.youtubeId}
                        title={course.title || course.introduction}
                        episodeCount={course.topicDetails.title}
                        videoLevel={course.videoLevel}
                      />
                    )
                  })}
                </IonList>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
