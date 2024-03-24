import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import Activities from './pages/Activities';
import RootLayout from './pages/Root';
import AddActivity from './pages/AddActivity';
import Statistics from './pages/Statistics';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <></>,
    children: [
      {index: true, element: <Activities/>},
      {path: 'add-activity', element: <AddActivity/>},
      {path: 'statistics', element: <Statistics/>},
    ]
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

function App() {
  


  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router}/>
    </ThemeProvider>);
}

export default App
