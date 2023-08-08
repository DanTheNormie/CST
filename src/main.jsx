import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/status.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import TabsComponent from './components/HomePageComponents/ResultTabs.component.jsx';

import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

import ErrorPage from './routes/errorpage.jsx';


import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Homepage from './routes/home.jsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const router = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage/>
  },
  {
    path: '/',
    element: <Homepage/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/a',
    element: <TabsComponent/>
  },
  {
    path: "/status",
    element: <Root/>,
    errorElement: <ErrorPage/>
  },
  
]);

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <RouterProvider router={router}/>
        </CssBaseline>
      </ThemeProvider>
      
    </QueryClientProvider>
  
)
