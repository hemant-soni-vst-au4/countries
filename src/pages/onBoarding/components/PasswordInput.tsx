import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import React, {useEffect} from 'react'
import styled from 'styled-components'

const Container = styled(Paper)`
  && {
    box-shadow: 0px 4px 10px 4px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    margin-top: 3%;
    margin-bottom: 3%;
    caret-color: red;
  }
`

export default function PasswordInput({error, type, label, value, ...props}) {
  const [values, setValues] = React.useState({
    showPassword: false,
  })

  useEffect(() => {}, [error])

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value})
  }

  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword})
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Container elevation={3} style={{marginTop: '2%', marginBottom: '2%'}}>
      <FormControl
        style={{
          padding: '2%',
          display: 'flex',
          borderRadius: '16px',
          boxShadow: error ? '0px 0px 0px 1.5px #E22D2D' : 'none',
        }}
      >
        <InputBase
          //label="Password"
          name="Password"
          color="secondary"
          error={error}
          type={values.showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange('password')}
          {...props}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                style={{color: '#212121'}}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Container>
  )
}
