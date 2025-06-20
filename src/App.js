import Contact from './components/Contact/index'; 
import { GlobalStyle } from './globalStyles';
import Header from './components/Header/index';
import Load from './Loader/Load';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingContext } from './Context/LoadingContext';

const App = () => {
  const { loading, setloading } = useContext(LoadingContext);
 
 useEffect(() => {
   setloading(true);
   const checkAuth = async () => {
     try {
       const response = await fetch(
         'https://server.markethealers.com/markethealers/auth/authCheck',
         {
           method: 'GET',
           credentials: 'include',  
         }
       );
       if (response.ok) {
           setloading(false); 
       } else{ 
        throw new Error("Not ok")
       }
     } catch (error) {   
      window.location.href='https://markethealers.com';
     } 
   };
   checkAuth();
 },[setloading]);

  return loading ? (
    <Load />
  ) : (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Contact /> 
    </>
  );
};

export default App;
