import {createTheme} from '@material-ui/core/styles'

const GlobalMaterialStyles = createTheme({
  palette: {
    primary: {
      main: '#E22D2D',
    },
    secondary: {
      main: '#CFC5FA',
    },
    warning: {
      main: '#fff176',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        fontStyle: 'normal',
        borderRadius: '16px',
      },
      outlinedPrimary: {
        border: '2px solid',
        '&:hover': {
          border: '2px solid',
        },
      },
    },
  },
})

export default GlobalMaterialStyles
