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
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonSpinner,
  IonThumbnail,
  IonToolbar,
} from '@ionic/react'
import {chevronBack} from 'ionicons/icons'
import React from 'react'
import * as ReactQuery from 'react-query'
import {fetchApi} from '../../fetchApis'
import {useGetProfileQuery} from '../../schema/types-and-hooks'
import {weekdays} from '../../utils/utils'
import './PopularLessonList.scss'

const getThumbnailUrl = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`

const LessonItem = ({id, title, youtubeId, videoLevel}) => (
  <IonItem
    routerLink={`/lesson-details/${id}`}
    // [routerLink]="['/lesson-details', item.subLessonId, false, false]"
    mode="md"
  >
    <IonThumbnail slot="start">
      <IonImg src={getThumbnailUrl(youtubeId)}></IonImg>
    </IonThumbnail>
    <IonLabel>
      <h2 className="ion-text-wrap">{title}</h2>
      <p>{videoLevel}</p>
    </IonLabel>
    <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
  </IonItem>
)

function LoadingLessonItem() {
  return (
    <IonItem mode="md">
      <IonThumbnail slot="start">
        <IonImg src="../../../../assets/images/thumbnail-youtube.jpg"></IonImg>
      </IonThumbnail>
      <IonLabel>
        <h2 className="ion-text-wrap">
          <IonSkeletonText animated style={{width: '90%'}}></IonSkeletonText>
          <IonSkeletonText animated style={{width: '75%'}}></IonSkeletonText>
        </h2>
        <p>
          <IonSkeletonText animated style={{width: '60%'}}></IonSkeletonText>
        </p>
      </IonLabel>
      <IonIcon mode="ios" name="chevron-forward" slot="end"></IonIcon>
    </IonItem>
  )
}

const PAGE_SIZE = 10

async function fetchSavedLessonList(page: number = 1) {
  const res = await fetchApi(`/lesson/savedLessons/${page}`)

  return res.data
}

export default function SavedLessonsList() {
  const query = ReactQuery.useInfiniteQuery(
    ['savedLessons'],
    ({pageParam = 1}) => {
      return fetchSavedLessonList(pageParam)
    },
    {
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
    <IonPage className="popular-lessons-page">
      <IonHeader mode="ios">
        <IonToolbar mode="md">
          <IonButtons slot="start">
            <IonButton mode="md" routerLink="/dashboard/lessons" routerDirection="back">
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

      <IonContent className="ion-padding">
        <IonGrid className="ion-no-padding">
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              sizeXs="12"
              sizeSm="12"
              sizeMd="10"
              sizeLg="9"
              sizeXl="9"
              className="ion-align-self-center"
            >
              <h1 className="ion-no-margin ion-padding-bottom">
                <strong>My Saved Lessons</strong>
              </h1>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol
              className="ion-no-padding ion-align-self-center"
              sizeXs="12"
              sizeSm="12"
              sizeMd="10"
              sizeLg="9"
              sizeXl="9"
            >
              {isLoading ? (
                <IonList mode="md" className="ion-no-padding">
                  <LoadingLessonItem />
                  <LoadingLessonItem />
                  <LoadingLessonItem />
                  <LoadingLessonItem />
                  <LoadingLessonItem />
                </IonList>
              ) : (
                <IonList mode="md" className="ion-no-padding">
                  {courses.map((group, i) => (
                    <React.Fragment key={i}>
                      {group.map((lesson) => (
                        <LessonItem
                          key={lesson._id}
                          id={lesson.subLessonId}
                          title={lesson.lessonName}
                          videoLevel={lesson.videoLevel}
                          youtubeId={lesson.youtubeId}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </IonList>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonInfiniteScroll
          disabled={!hasNextPage || isFetchingNextPage}
          onIonInfinite={handleInfinite}
          threshold="200px"
        >
          <IonInfiniteScrollContent>
            <IonSpinner />
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  )
}
