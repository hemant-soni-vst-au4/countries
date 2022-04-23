import React from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'

// Styles
const Button = styled(Fab)`
  && {
    color: #e22d2d;
    background-color: #ffffff;
    border-color: #e22d2d;
    border: 1.8px solid;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0);
    &:focus {
      background-color: #ffffff;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0);
    }
    &:active {
      background-color: #ffffff;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0);
    }
    &:disabled {
      background-color: #ffffff;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0);
    }
  }
`

/**
 * Reusable action button component
 */
export const ActionButton = ({color, size, direction, ...props}) => {
  if (direction === 'right') {
    return (
      <Button size={size} {...props}>
        <KeyboardArrowRightIcon fontSize={'large'} />
      </Button>
    )
  } else if (direction === 'left') {
    return (
      <Button size={size} {...props}>
        <KeyboardArrowLeftIcon fontSize={'large'} />
      </Button>
    )
  } else if (direction === 'next') {
    return (
      <Button size={size} {...props}>
        <ArrowForwardIcon fontSize={'large'} />
      </Button>
    )
  } else if (direction === 'cancel') {
    return (
      <Button size={size} {...props}>
        <CloseIcon fontSize={'large'} />
      </Button>
    )
  }
}

ActionButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  direction: PropTypes.oneOf(['right', 'left', 'next', 'cancel']),
  onClick: PropTypes.func,
}

export default ActionButton
