// TODO: merge into  /src/reactapp/components/Comments.tsx
import * as React from 'react'
import {Plugins} from '@capacitor/core'
import {
  IonAvatar,
  IonCol,
  IonIcon,
  IonItem,
  IonRow,
  IonInput,
  IonButton,
  IonImg,
  IonText,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  IonLoading,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonGrid,
  IonPopover,
  IonList,
  IonAlert,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react'
import {send, ellipsisVertical, close} from 'ionicons/icons'
import clsx from 'clsx'
import useFetch from 'use-http'
// import {useQuery} from 'react-query'
import {format} from 'date-fns/fp'
import {isPlatform} from '@ionic/react'
import './Comments.scss'

window['React'] = React

const formatDate = format('MMM d, y')

const {Keyboard} = Plugins

function Reply({comment, onPresentCommentActionsPopover}) {
  return (
    <IonItem lines="none" className="comment ion-no-padding pointer">
      <IonAvatar slot="start" className="reply-avatar">
        <img
          src={comment?.userProfile || '../../../assets/images/defaultProfile.svg'}
          alt="user profile"
        />
      </IonAvatar>
      <IonLabel>
        <IonText className="comment-user">
          {comment.userName} . {formatDate(new Date(comment.createdAt))}
        </IonText>
        {
          <p className="comment-description">
            {comment.reply}
            {comment.isOwner && (
              <span
                className="ion-float-right"
                onClick={(e) => onPresentCommentActionsPopover(e, comment)}
              >
                <IonIcon icon={ellipsisVertical}></IonIcon>
              </span>
            )}
          </p>
        }
      </IonLabel>
    </IonItem>
  )
}

function OnlyComment({comment}) {
  return (
    <IonItem lines="none" className="comment ion-no-padding pointer">
      <IonAvatar slot="start">
        <img
          src={comment?.userProfile || '../../../assets/images/defaultProfile.svg'}
          alt="user profile"
        />
      </IonAvatar>
      <IonLabel>
        <IonText className="comment-user">
          {comment.userName} . {formatDate(new Date(comment.createdAt))}
        </IonText>
        {
          <p className="comment-description">
            <span>{comment.comment}</span>
          </p>
        }
      </IonLabel>
    </IonItem>
  )
}
function Comment({
  comment,
  isComment,
  isReply,
  onPresentCommentRepliesModal,
  onDisLikeComment,
  onPresentCommentActionsPopover,
  onLikeComment,
}) {
  function handlePopover(e, comment) {
    e.persist()
    // setShowPopover(e)
    onPresentCommentActionsPopover(e, comment)
  }
  return (
    <IonItem lines="none" className="comment ion-no-padding pointer">
      <IonAvatar slot="start" className={clsx('reply-avatar' && !isComment)}>
        <img
          src={comment?.userProfile || '../../../assets/images/defaultProfile.svg'}
          alt="user profile"
        />
      </IonAvatar>
      <IonLabel>
        <IonText className="comment-user">
          {comment.userName} . {formatDate(new Date(comment.createdAt))}
        </IonText>
        {isComment ? (
          <p className="comment-description">
            <span onClick={() => onPresentCommentRepliesModal(comment)}>
              {comment.comment}
            </span>
            {comment.isOwner && !isComment && isReply && (
              <span
                className="ion-float-right"
                onClick={(e) => handlePopover(e, comment)}
              >
                <IonIcon icon={ellipsisVertical}></IonIcon>
              </span>
            )}
          </p>
        ) : (
          <p className="comment-description">
            {comment.reply}
            {comment.isOwner && !isComment && isReply && (
              <span
                className="ion-float-right"
                onClick={(e) => handlePopover(e, comment)}
              >
                <IonIcon icon={ellipsisVertical}></IonIcon>
              </span>
            )}
          </p>
        )}
        {isComment && isReply && (
          <p>
            <span className="comment-like" onClick={(e) => onLikeComment(comment)}>
              <IonImg
                src={
                  comment.isCurrentUserlike
                    ? '/assets/images/thumb-up-filled.png'
                    : '/assets/images/thumb-up.png'
                }
              ></IonImg>
              <IonText>{comment.totalLike}</IonText>
            </span>
            <span className="comment-disLike" onClick={(e) => onDisLikeComment(comment)}>
              <IonImg
                src={
                  comment.isCurrentUserDislike
                    ? '/assets/images/thumb-down-filled.png'
                    : '/assets/images/thumb-down.png'
                }
              ></IonImg>
              <IonText>{comment.totalDislike}</IonText>
            </span>
            <span onClick={() => onPresentCommentRepliesModal(comment)}>
              <IonImg src="/assets/images/black-bubble.png"></IonImg>
              <IonText>{comment.totalReply}</IonText>
            </span>
            {comment.isOwner && (
              <span
                className="ion-float-right pointer"
                onClick={(e) => handlePopover(e, comment)}
              >
                <IonIcon icon={ellipsisVertical}></IonIcon>
              </span>
            )}
          </p>
        )}
        {comment.totalReply > 0 && isComment && isReply && (
          <p
            className="view-replies c-orange"
            onClick={() => onPresentCommentRepliesModal(comment)}
          >
            VIEW {comment.totalReply} REPLIES
          </p>
        )}
      </IonLabel>
    </IonItem>
  )
}

async function presentToast(message) {
  const toast = document.createElement('ion-toast')
  toast.message = message
  toast.duration = 500

  document.body.appendChild(toast)
  return toast.present()
}

const PER_PAGE = 10

function CommentReply({comment, lessonId, subLessonId, onDismiss, profile}) {
  const [reply, setReply] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [replies, setReplies] = React.useState([])
  const [noMore, setNoMore] = React.useState(false)
  const [event, setEvent] = React.useState(null)
  const [replyToEdit, setReplyToEdit] = React.useState<any>()

  const commentId = comment._id
  const [replyToDelete, setReplyToDelete] = React.useState<any>()
  const [showPopover, setShowPopover] = React.useState<any>()
  const {post, response, loading} = useFetch(`/comments/reply-list`)

  async function getReplies() {
    const data = await post(`/${page}`, {commentId})
    if (response.ok) {
      if (data.total <= page) {
        setNoMore(true)
      }
      if (page === 1) {
        setReplies([...data.data])
      } else {
        setReplies((l) => [...l, ...data.data])
      }
    }
  }

  React.useEffect(() => {
    getReplies()
  }, [page])

  const {post: postReply, loading: replyLoading} = useFetch(`/comments/user/reply`)
  const {post: postDelete, loading: deleteLoading} = useFetch(`/comments/reply-delete`)

  async function reload() {
    setPage(1)
    setNoMore(false)
    getReplies()
  }

  React.useEffect(() => {
    if (event) {
      event.target.complete()
      setEvent(null)
    }
  }, [event, setEvent])

  async function saveReply() {
    if (reply === undefined || reply.trim() === '') {
      return
    }

    // this.sharedService.presentLoader('Please wait...')

    try {
      const res = await postReply({
        lessonId: lessonId,
        subLessonId: subLessonId,
        commentId: commentId,
        reply: reply.trim(),
      })
      if (res.message) {
        presentToast(res.message)
      }
      if (isPlatform('capacitor')) {
        Keyboard.hide()
      }
      await reload()
      setReply('')
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteReply() {
    if (replyToDelete === undefined) {
      return
    }

    // this.sharedService.presentLoader('Please wait...')

    try {
      const res = await postDelete({replyId: replyToDelete?._id})
      if (res.message) {
        presentToast(res.message)
      }
      await reload()
    } catch (error) {
      console.log(error)
    }
  }
  const showLoading = replyLoading
  // const {loading, error, data, get, cache} = useFetch('/payments/get-stripe-user', {}, [])
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Replies</IonTitle>
          <IonButtons slot="end">
            <IonButton
              mode="md"
              //  (click)="dismiss()"
              onClick={onDismiss}
            >
              <IonIcon color="dark" slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading
          // cssClass="my-custom-class"
          isOpen={showLoading}
          // onDidDismiss={() => setShowLoading(false)}
          message={'Please wait...'}
          // duration={5000}
        />
        <IonGrid>
          <IonRow>
            <IonCol>
              <OnlyComment comment={comment} />
            </IonCol>
          </IonRow>
          <AddComment
            comment={reply}
            placeholder="Add a reply"
            onCommentChange={(e) => setReply(e.detail.value)}
            profile={profile}
            onSubmit={saveReply}
          />
          <IonRow className="ml-16">
            <IonCol>
              {replies.map((comment, i) => (
                <Reply
                  key={i}
                  comment={comment}
                  onPresentCommentActionsPopover={(e, comment) => {
                    e.persist()
                    setShowPopover({event: e, comment})
                  }}
                />
              ))}
              {/* <app-comment
          [comments]="replies"
          [isComment]="false"
          [isReply]="true"
          (likeComment)="likeComment($event)"
          (disLikeComment)="disLikeComment($event)"
          (presentCommentActionsPopover)="presentCommentActionsPopover($event)"
        ></app-comment> */}
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          threshold="100px"
          disabled={noMore}
          onIonInfinite={(e: any) => {
            setPage((p) => p + 1)
            setEvent(e)
          }}
        >
          <IonInfiniteScrollContent>
            <div style={{textAlign: 'center'}}>
              <IonSpinner name="crescent" />
            </div>
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
      <IonPopover
        isOpen={!!showPopover}
        event={showPopover?.event}
        mode="md"
        onDidDismiss={() => setShowPopover(null)}
      >
        <IonList lines="none">
          <IonItem
            onClick={() => {
              setShowPopover(null)
              setReplyToEdit(showPopover?.comment)
            }}
          >
            <IonLabel>Edit</IonLabel>
          </IonItem>
          <IonItem
            onClick={() => {
              setShowPopover(null)
              setReplyToDelete(showPopover?.comment)
            }}
          >
            <IonLabel>Delete</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
      <IonAlert
        isOpen={!!replyToDelete}
        onDidDismiss={() => setReplyToDelete(null)}
        header={'Delete reply'}
        message={'Delete your reply permanently?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {},
          },
          {
            text: 'Delete',
            handler: deleteReply,
          },
        ]}
      />
      <IonModal
        mode="ios"
        isOpen={!!replyToEdit}
        cssClass="comment-replies-modal"
        onWillDismiss={() => setReplyToEdit(undefined)}
      >
        {replyToEdit && (
          <EditReply
            profile={profile}
            reply={replyToEdit}
            onDismiss={() => {
              setReplyToEdit(undefined)
              reload()
            }}
          />
        )}
      </IonModal>
    </>
  )
}
function EditReply({reply, onDismiss, profile}) {
  const [newReply, setNewReply] = React.useState(reply.reply)
  const [event, setEvent] = React.useState(null)

  const {post: postEdit, loading: editLoading} = useFetch(`/comments/reply-edit`)

  React.useEffect(() => {
    if (event) {
      event.target.complete()
      setEvent(null)
    }
  }, [event, setEvent])

  async function editComment() {
    if (newReply === undefined || newReply.trim() === '') {
      return
    }

    try {
      const res = await postEdit({
        replyId: reply._id,
        reply: newReply.trim(),
      })
      if (res.message) {
        presentToast(res.message)
      }

      if (isPlatform('capacitor')) {
        Keyboard.hide()
      }
      setNewReply('')
      onDismiss()
    } catch (error) {
      console.log(error)
    }
  }

  const showLoading = editLoading
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Reply</IonTitle>
          <IonButtons slot="end">
            <IonButton mode="md" onClick={onDismiss}>
              <IonIcon color="dark" slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={showLoading} message={'Please wait...'} />
        <IonGrid>
          <AddComment
            comment={newReply}
            placeholder="Edit a reply"
            onCommentChange={(e) => setNewReply(e.detail.value)}
            profile={profile}
            onSubmit={editComment}
          />
        </IonGrid>
      </IonContent>
    </>
  )
}
function EditComment({comment, onDismiss, profile}) {
  const [newComment, setNewComment] = React.useState(comment.comment)
  const [event, setEvent] = React.useState(null)

  const {post: postEdit, loading: editLoading} = useFetch(`/comments/edit`)

  React.useEffect(() => {
    if (event) {
      event.target.complete()
      setEvent(null)
    }
  }, [event, setEvent])

  async function editComment() {
    if (newComment === undefined || newComment.trim() === '') {
      return
    }

    try {
      const res = await postEdit({
        commentId: comment._id,
        comment: newComment.trim(),
      })
      if (res.message) {
        presentToast(res.message)
      }
      if (isPlatform('capacitor')) {
        Keyboard.hide()
      }
      setNewComment('')
      onDismiss()
    } catch (error) {
      console.log(error)
    }
  }

  const showLoading = editLoading
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Comment</IonTitle>
          <IonButtons slot="end">
            <IonButton mode="md" onClick={onDismiss}>
              <IonIcon color="dark" slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={showLoading} message={'Please wait...'} />
        <IonGrid>
          <AddComment
            comment={newComment}
            placeholder="Edit a comment"
            onCommentChange={(e) => setNewComment(e.detail.value)}
            profile={profile}
            onSubmit={editComment}
          />
        </IonGrid>
      </IonContent>
    </>
  )
}

export function Comments({lessonId, subLessonId, profile}) {
  const [selectedComment, setSelectedComment] = React.useState()
  const [commentToEdit, setCommentToEdit] = React.useState<any>()
  const [commentToDelete, setCommentToDelete] = React.useState<any>()
  const [showPopover, setShowPopover] = React.useState<any>()
  const [comment, setComment] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [noMore, setNoMore] = React.useState(false)
  const [event, setEvent] = React.useState(null)
  const [ts, setTs] = React.useState(0)
  const [{data = [], loading}, setResult] = React.useState({data: [], loading: true})

  const {post: postSave, loading: saveLoading} = useFetch(`/comments/user/save`)
  const {post: postLike, loading: likeLoading} = useFetch(`/comments/user/like`)
  const {post: postDislike, loading: dislikeLoading} = useFetch(`/comments/user/dislike`)
  const {post: postDelete, loading: deleteLoading} = useFetch(`/comments/delete`)

  // const { post, response } = useFetch(`/comments/list`);

  const {post} = useFetch(`/comments/list`)
  React.useEffect(() => {
    post(`/${page}`, {subLessonId})
      .then((res) => {
        if (res.total <= page || res.data.length === 0) {
          setNoMore(true)
        }
        if (page === 1) {
          return setResult({data: res.data, loading: false})
        }
        const newData = [...data, ...res.data]
        return setResult({data: newData, loading: false})
      })
      .catch((err) => {
        console.log({err})
      })
  }, [page, subLessonId, setNoMore, ts])

  React.useEffect(() => {
    if (event) {
      event.target.complete()
      setEvent(null)
    }
  }, [event, setEvent])

  function reload() {
    setNoMore(false)
    setPage(1)
    setTs(+new Date())
  }

  async function likeComment(comment) {
    try {
      const res = await postLike({
        lessonId: lessonId,
        subLessonId: subLessonId,
        commentId: comment._id,
      })
      if (res.message) {
        presentToast(res.message)
      }
      reload()
    } catch (error) {
      console.log(error)
    }
  }
  async function dislikeComment(comment) {
    try {
      const res = await postDislike({
        lessonId: lessonId,
        subLessonId: subLessonId,
        commentId: comment._id,
      })
      if (res.message) {
        presentToast(res.message)
      }
      reload()
    } catch (error) {
      console.log(error)
    }
  }

  async function saveComment() {
    if (comment === undefined || comment.trim() === '') {
      return
    }

    try {
      const res = await postSave({
        lessonId: lessonId,
        subLessonId: subLessonId,
        comment: comment.trim(),
      })
      if (res.message) {
        presentToast(res.message)
      }
      if (isPlatform('capacitor')) {
        Keyboard.hide()
      }
      reload()
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const showLoading = likeLoading || dislikeLoading || saveLoading || deleteLoading
  return (
    <div className="comments-component">
      <IonLoading isOpen={showLoading} message={'Please wait...'} />
      <AddComment
        comment={comment}
        onCommentChange={(e) => setComment(e.detail.value)}
        profile={profile}
        onSubmit={saveComment}
      />
      <IonRow className="ion-align-items-center ion-justify-content-center">
        <IonCol sizeXs="12" sizeSm="12" className="ion-align-self-center">
          {data.map((comment, i) => (
            <Comment
              key={i}
              isComment={true}
              isReply={true}
              comment={comment}
              onPresentCommentRepliesModal={(comment) => setSelectedComment(comment)}
              onPresentCommentActionsPopover={(e, comment) => {
                e.persist()
                setShowPopover({event: e, comment})
              }}
              onLikeComment={likeComment}
              onDisLikeComment={dislikeComment}
            />
          ))}
        </IonCol>
      </IonRow>
      <IonInfiniteScroll
        threshold="100px"
        disabled={noMore}
        onIonInfinite={(e: any) => {
          setPage((p) => p + 1)
          setEvent(e)
        }}
      >
        <IonInfiniteScrollContent>
          <div style={{textAlign: 'center'}}>
            <IonSpinner name="crescent" />
          </div>
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
      <IonModal
        mode="ios"
        isOpen={!!commentToEdit}
        cssClass="comment-replies-modal"
        onWillDismiss={() => setCommentToEdit(undefined)}
      >
        {commentToEdit && (
          <EditComment
            profile={profile}
            comment={commentToEdit}
            onDismiss={() => {
              setCommentToEdit(undefined)
              reload()
            }}
          />
        )}
      </IonModal>
      <IonModal
        mode="ios"
        isOpen={!!selectedComment}
        cssClass="comment-replies-modal"
        onWillDismiss={() => setSelectedComment(undefined)}
      >
        {selectedComment && (
          <CommentReply
            lessonId={lessonId}
            subLessonId={subLessonId}
            profile={profile}
            comment={selectedComment}
            onDismiss={() => {
              setSelectedComment(undefined)
              reload()
            }}
          />
        )}
      </IonModal>
      <IonPopover
        isOpen={!!showPopover}
        event={showPopover?.event}
        mode="md"
        onDidDismiss={() => setShowPopover(null)}
      >
        <IonList lines="none">
          <IonItem
            onClick={() => {
              setShowPopover(null)
              setCommentToEdit(showPopover?.comment)
            }}
          >
            <IonLabel>Edit</IonLabel>
          </IonItem>
          <IonItem
            onClick={() => {
              setShowPopover(null)
              setCommentToDelete(showPopover?.comment)
            }}
          >
            <IonLabel>Delete</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
      <IonAlert
        isOpen={!!commentToDelete}
        onDidDismiss={() => setCommentToDelete(null)}
        header={'Delete comment'}
        message={'Delete your comment permanently?'}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {},
          },
          {
            text: 'Delete',
            handler: async () => {
              if (commentToDelete) {
                await postDelete({commentId: commentToDelete?._id})
                reload()
              }
            },
          },
        ]}
      />
    </div>
  )
}

function AddComment({
  onSubmit,
  profile,
  comment,
  onCommentChange,
  placeholder = 'Add a comment',
}) {
  const [cnt] = React.useState(0)

  function showKeyBoard() {
    if (isPlatform('capacitor')) {
      Keyboard.show()
    }
  }
  return (
    <IonRow className="add-comment ion-align-items-center ion-justify-content-center">
      <IonCol size="12" className="ion-align-self-center">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <IonItem lines="none" mode="ios" className=" ion-no-padding">
            <IonAvatar slot="start">
              <img
                src={profile?.profilePic || '/assets/images/defaultProfile.svg'}
                alt="user profile"
              />
            </IonAvatar>
            <IonInput
              key={cnt}
              type="text"
              placeholder={placeholder}
              id="comment"
              name="comment"
              autofocus
              value={comment || ''}
              onIonChange={onCommentChange}
              onIonFocus={showKeyBoard}
            ></IonInput>

            <IonIcon slot="end" icon={send} onClick={onSubmit}></IonIcon>
          </IonItem>
        </form>
      </IonCol>
    </IonRow>
  )
}
