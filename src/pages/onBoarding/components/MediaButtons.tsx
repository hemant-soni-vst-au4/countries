//@ts-nocheck
import React from 'react'
import Fab from '@material-ui/core/Fab'
import styled from 'styled-components'

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

function MediaButtons({facebookURL = null, instagramURL = null, googleURL = null}) {
  return (
    <Container>
      <Fab style={{background: 'white'}}>
        <img
          alt="facebook"
          src={'/assets/images/authentication/facebookIcon.min.svg'}
        ></img>
      </Fab>
      <Fab style={{background: 'white'}}>
        <img
          alt="facebook"
          src={'/assets/images/authentication/instagramIcon.min.svg'}
        ></img>
      </Fab>
      <Fab style={{background: 'white'}}>
        <img
          alt="facebook"
          src={'/assets/images/authentication/googleIcon.min.svg'}
        ></img>
      </Fab>
    </Container>
  )
}

export default MediaButtons
