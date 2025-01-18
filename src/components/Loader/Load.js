import './index.css'; 
import logo from './MH.png';
function Load() {
  return (
    <div className="App">
      <div className="loader">
        <div className="box">
          <div className="logo">
            <img src={logo}></img>
          </div>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
}

export default Load;
