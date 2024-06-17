import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import Activities from './pages/Activities';
import RootLayout from './pages/Root';
import AddActivity from './pages/AddActivity';
import EditActivity from './pages/EditActivity';
import Statistics from './pages/Statistics';
import { getActivity } from './http';

export async function activityIdLoader({params}) {
  const activity = await getActivity(params.activityId);
  return { activity };
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <></>,
    children: [
      {index: true, element: <Activities/>},
      {path: 'add-activity', element: <AddActivity/>},
      {path: 'edit-activity/:activityId', element: <EditActivity/>, loader: activityIdLoader},
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
