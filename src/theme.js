import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#824173' },
    secondary: { main: '#a04677' }
  },
  typography: { useNextVariants: true }
})

export default theme
