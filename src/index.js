import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Contact from './components/Contact/index';
import ReactDOM from 'react-dom/client'; 
import Footer from './components/Footer';
import { GlobalStyle } from './globalStyles';
import Header from './components/Header/index';
import Main from './Pages/Main';
import News from './Pages/News';
import Market from './Pages/Market';

const RootApp = () => (
  <> 
    <GlobalStyle />
    <Header />
    <Outlet />
    <Contact />
    <Footer /> 
  </>
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
