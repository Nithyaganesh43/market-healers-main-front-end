import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingProvider } from './Context/LoadingContext';
import ReactDOM from 'react-dom/client';  
import { lazy, Suspense } from 'react';

const Main = lazy(() => import('./Pages/Main'));
const News = lazy(() => import('./Pages/News'));
const Market = lazy(() => import('./Pages/Market'));
const App = lazy(() => import('./App'));
const RootApp = () =>{ 

  
  return (
    <LoadingProvider>
      <Suspense>
        <App />
      </Suspense>
    </LoadingProvider>
  ); };

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
      } 
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
