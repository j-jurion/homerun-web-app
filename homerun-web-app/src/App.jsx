import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'
import Activities from './pages/Activities';
import RootLayout from './pages/Root';
import AddActivity from './pages/AddActivity';
import EditActivity from './pages/EditActivity';
import Statistics from './pages/Statistics';
import { getActivity } from './http';
import {HOME, ADD_ACTIVITY, EDIT_ACTIVITY, STATISTICS} from "./assets/routes"

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
