import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import Activities from './pages/Activities';
import RootLayout from './pages/Root';
import AddActivity from './pages/AddActivity';
import EditActivity from './pages/EditActivity';
import Statistics from './pages/Statistics';
import Planning from './pages/Planning';
import { getActivity } from './assets/http';
import {HOME, ADD_ACTIVITY, EDIT_ACTIVITY, STATISTICS, PLANNING, ADD_EVENT} from "./assets/routes"
import AddEvent from './pages/AddEvent';

export async function activityIdLoader({params}) {
  const activity = await getActivity(params.activityId);
  return { activity };
}

const router = createBrowserRouter([
  {
    path: HOME,
    element: <RootLayout/>,
    errorElement: <></>,
    children: [
      {index: true, element: <Activities/>},
      {path: ADD_ACTIVITY, element: <AddActivity/>},
      {path: `${EDIT_ACTIVITY}/:activityId`, element: <EditActivity/>, loader: activityIdLoader},
      {path: STATISTICS, element: <Statistics/>},
      {path: PLANNING, element: <Planning/>},
      {path: ADD_EVENT, element: <AddEvent/>},
    ]
  }
]);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#208a3c'
    },
    secondary: {
      main: '#145926'
    }
  },
});

function App() {
  


  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router}/>
    </ThemeProvider>);
}

export default App
