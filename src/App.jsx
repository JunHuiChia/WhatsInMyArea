import './App.css';
import { useEffect, useState } from 'react';
import News from './News';

function App() {

  const [userCity, setUserCity] = useState('');

  function reverseGeocode(coords) {
    const query = `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en&key=${process.env.REACT_APP_BIGDATACLOUD_API_KEY}`

    fetch(query)
      .then((response) => response.json())
      .then((data) => setUserCity(data.city))
  }

  function handlePermission() {
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
      if (result.state === 'granted') {
        console.log(result.state);
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
      } else if (result.state === 'prompt') {
        console.log(result.state);
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
      } else if (result.state === 'denied') {
        console.log(result.state);
      }
    })
  }

  function positionSuccess(position) {
    const coords = position.coords;
    reverseGeocode(coords)
    console.log(`Lat: ${coords.latitude}`);
    console.log(`Long: ${coords.longitude}`);
  }

  function positionError(err) {
    console.warn(`Error: ${err.code} : ${err.message}`);
  }

  useEffect(() => {
    handlePermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="App">
        You are in {userCity ? userCity : ''}
      </div>
      {userCity ? <News location={userCity}></News> : ''}
    </>
  );
}

export default App;
