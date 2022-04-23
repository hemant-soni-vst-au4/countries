import * as React from 'react'
import {IonButton} from '@ionic/react'

interface Props {
  disabled?: boolean
  onClick: React.MouseEventHandler<HTMLIonButtonElement>
}

export const NextButton: React.FC<Props> = ({onClick, ...props}) => {
  return (
    <IonButton
      mode="ios"
      color="danger"
      fill="outline"
      shape="round"
      expand="block"
      {...props}
      onClick={onClick}
    >
      Next
    </IonButton>
  )
}
