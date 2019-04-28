import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#773e72' },
    secondary: { main: '#cc368d' }
  },
  typography: { useNextVariants: true }
})

export default theme
