import {useEffect} from 'react'
import PropTypes from 'prop-types'
import InputBase from '@material-ui/core/InputBase'
// import InputAdornment from '@material-ui/core/InputAdornment'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const Wrapper = styled.div`
  padding: 2%;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
const Container = styled(Paper)`
  && {
    box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    margin-top: 3%;
    margin-bottom: 3%;
    caret-color: red;
  }
`
const Icon = styled.img`
  margin-right: 2.5%;
`

export const Input = ({ error, type, value, placeholder, ...props}) => {
  // Hooks
  useEffect(() => {}, [error])

  return (
    <Container elevation={3}>
      <Wrapper
        style={{
          boxShadow: error ? '0px 0px 0px 1.5px #E22D2D' : 'none',
        }}
      >
        <InputBase
          // key={key}
          //style={{ color: invalidInput }}
          color="secondary"
          autoComplete="new-password"
          placeholder={placeholder}
          error={error}
          type={type}
          //label={label}
          value={value}
          fullWidth={true}
          {...props}
        ></InputBase>

        <Icon
          style={{
            opacity: error ? '100%' : '0%',
          }}
          src="/assets/images/authentication/invalid.svg"
          alt="warning"
        ></Icon>
      </Wrapper>
    </Container>
  )
}

Input.propTypes = {
  type: PropTypes.oneOf(['Email', 'Password', 'Text']),
  label: PropTypes.string.isRequired,
}
export default Input
