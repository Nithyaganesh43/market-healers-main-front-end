import Contact from './components/Contact/index';
import Footer from './components/Footer';
import { GlobalStyle } from './globalStyles';
import Header from './components/Header/index';
import Load from './Loader/Load';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingContext } from './Context/LoadingContext';  

const App = () => {

  
  const { loading } = useContext(LoadingContext);  
console.log(loading+"yes")

  return loading ? (
    <Load />
  ) : (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
