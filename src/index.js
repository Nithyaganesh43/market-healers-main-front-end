import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingProvider } from './Context/LoadingContext';
import ReactDOM from 'react-dom/client';  
import Main from './Pages/Main';
import News from './Pages/News';
import Market from './Pages/Market';
import App from './App';
const RootApp = () => (
  <LoadingProvider> 
    <App/>
  </LoadingProvider>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootApp />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/news',
        element: <News />,
      },
      {
        path: '/market',
        element: <Market />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
