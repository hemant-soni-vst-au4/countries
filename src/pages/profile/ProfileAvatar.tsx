import React from 'react'
// import {CameraDirection, CameraResultType, CameraSource, Plugins} from '@capacitor/core'
import {Camera, CameraDirection, CameraResultType, CameraSource} from '@capacitor/camera'

import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonModal,
  useIonToast,
  isPlatform,
} from '@ionic/react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {close} from 'ionicons/icons'
// import {
//   useGetProfileQuery,
//   useUploadProfilePictureMutation,
// } from '../../../schema/types-and-hooks'
// import {usePlatform} from '@capacitor-community/react-hooks/platform'
import {getCroppedImg} from './getCroppedImg'
import {
  useGetProfileQuery,
  useUploadProfilePictureMutation,
} from '../../schema/types-and-hooks'

// const {Camera, Device} = Plugins

const toBase64 = (file): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result.toString())
    reader.onerror = (error) => reject(error)
  })

const ProfileImageUploadModal: React.FC<{
  loading: boolean
  onDismiss: () => void
  onSubmit: (imageBase64: string) => void
}> = ({loading, onDismiss, onSubmit}) => {
  const [crop, setCrop] = React.useState<ReactCrop.Crop>({aspect: 1})
  const [croppedImage, setCroppedImage] = React.useState<string>()
  const [image, setImage] = React.useState<HTMLImageElement>()
  const [imageBase64, setImageBase64] = React.useState<string | null>()
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files.item(0)
    if (file) {
      const base64 = await toBase64(file)
      setImageBase64(base64)
    }
  }
  console.log(croppedImage)
  async function takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        correctOrientation: true,
      })

      if (image.base64String) {
        setImageBase64('data:image/jpeg;base64,' + image.base64String)
      }
    } catch {}
  }

  function handleSubmit() {
    const croppedImage = getCroppedImg(image, crop)

    setCroppedImage(croppedImage)
    onSubmit(croppedImage)
  }

  return (
    <>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="secondary">
            <IonButton color="light" onClick={onDismiss}>
              <IonIcon slot="icon-only" icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Update Profile Picture</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-padding h-100">
          <IonRow className="ion-justify-content-center h-100">
            <IonCol size="12" className="ion-align-self-center">
              {/* {croppedImage && <img src={croppedImage} alt="cropped" />} */}
              {imageBase64 ? (
                <ReactCrop
                  src={imageBase64}
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  keepSelection
                  onImageLoaded={(image) => {
                    const min = Math.min(image.width, image.height)

                    setCrop({
                      x: 0,
                      y: 0,
                      width: min,
                      aspect: 1,
                    })
                    setImage(image)

                    return false // Return false when setting crop state in here.
                  }}
                />
              ) : (
                <IonRow className="ion-justify-content-center">
                  <IonCol
                    size-xs="12"
                    size-sm="12"
                    size-md="12"
                    size-xl="6"
                    size-lg="6"
                    className="ion-align-self-center"
                  >
                    <label className="profile-image ion-margin-bottom">
                      Choose Image
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>

                    <IonButton
                      mode="ios"
                      className="ion-margin-top"
                      color="danger"
                      shape="round"
                      expand="block"
                      onClick={takePicture}
                    >
                      Capture Image
                    </IonButton>
                  </IonCol>
                </IonRow>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      {imageBase64 && (
        <IonFooter>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size-xs="12"
              size-sm="12"
              size-md="12"
              size-xl="8"
              size-lg="8"
              className="ion-align-self-center"
            >
              <IonButton
                mode="ios"
                color="danger"
                shape="round"
                expand="block"
                disabled={loading}
                onClick={handleSubmit}
              >
                <strong>UPLOAD</strong>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonFooter>
      )}
    </>
  )
}

export function ProfileAvatar() {
  const {
    data: {profile},
  } = useGetProfileQuery()
  const [uploadProfile, {loading}] = useUploadProfilePictureMutation({
    onCompleted: (data) => {
      // console.log('onCompleted', {data})
      presentToast('Profile updated successfully.', 2000)
      dismiss()
    },
    onError: (err) => {
      presentToast('Error! While updating user profile picture.', 2000)
    },
  })
  const [presentToast] = useIonToast()
  const [present] = useIonActionSheet()
  const [presentModal, dismiss] = useIonModal(ProfileImageUploadModal, {
    loading,
    onDismiss: () => dismiss(),
    onSubmit: (imageBase64) => {
      // console.log(imageBase64)
      uploadProfile({variables: {imageBase64}})
    },
  })

  async function takePicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 20,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: source,
        direction: CameraDirection.Front,
        promptLabelHeader: 'Update profile picture',
        promptLabelCancel: 'Cancel',
        promptLabelPhoto: 'Load from Library',
        promptLabelPicture: 'Use Camera',
      })

      if (image.base64String) {
        uploadProfile({
          variables: {imageBase64: 'data:image/jpeg;base64,' + image.base64String},
        })
      }
    } catch {}
  }

  function presentUploadImage() {
    present(
      [
        {
          text: 'Use Camera',
          handler: () => takePicture(CameraSource.Camera),
        },
        {
          text: 'Load from Library',
          handler: () => takePicture(CameraSource.Photos),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
      'Update profile picture',
    )
  }
  
  function handleUploadClick() {
    if (isPlatform('desktop')) {
      presentModal({
        cssClass: 'profile-upload-modal',
      })
    } else {
      takePicture(CameraSource.Prompt)
      //   presentUploadImage()
    }
  }

  return (
    <>
      <IonLoading isOpen={loading} message="Please wait..." />
      <IonAvatar className="pointer" onClick={handleUploadClick}>
        <img
          src={profile?.profilePic || '/assets/images/defaultProfile.svg'}
          alt="profile"
        />
      </IonAvatar>
      <IonIcon
        onClick={handleUploadClick}
        className="update-picture"
        src="/assets/images/update-profile-plus-icon.svg"
      ></IonIcon>

      <h3
        className="ion-text-center"
        //  *ngIf="profile !== undefined; else noProfile"
      >
        <strong style={{textTransform: 'capitalize'}}>{profile.fullName}</strong>
      </h3>
    </>
  )
}
