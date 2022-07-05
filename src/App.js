import './App.css';
import { useEffect } from 'react';

function App() {

  function handlePermission(){
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
      if (result.state === 'granted'){
        console.log(result.state);
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
      }else if(result.state === 'prompt'){
        console.log(result.state);
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
      }else if(result.state === 'denied'){
        console.log(result.state);
      }
    })
  }

  function positionSuccess(position){
    const coords = position.coords;

    console.log(`Lat: ${coords.latitude}`);
    console.log(`Long: ${coords.longitude}`);
  }

  function positionError(err){
    console.warn(`Error: ${err.code} : ${err.message}`);
  }

  useEffect(() => {
    handlePermission();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      hello world
    </div>
  );
}

export default App;
