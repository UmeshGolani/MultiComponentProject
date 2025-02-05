import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import RichTextEditor from './Components/RichTextEditor';
import MovingCounter from './Components/Counter';
import Login from './Components/GoogleLogin';

const theme = createTheme();

const App =() => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <RichTextEditor/>
      <MovingCounter/> */}
      <Login/>
    </ThemeProvider>
  );
}
export default App;