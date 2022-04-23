//@ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import {default as MaterialButton} from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
/**
 * Reusable button component
 */

const CustomButton = withStyles({
  root: {
    '&:disabled': {
      color: '#747474',
    },
  },
  // checked: {},
})((props) => <MaterialButton color="default" {...props} />)

export const Button = ({
  variant = 'contained',
  color = 'primary',
  size = 'small',
  label,
  ...props
}) => {
  return (
    <CustomButton variant={variant} color={color} size={size} {...props} fullWidth={true}>
      {label}
    </CustomButton>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(['contained', 'outlined']),
  color: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Button
