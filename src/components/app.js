import React, { useState } from 'react';
import '../styles/app.css';
import LocationInput from './locationInput';
import WeatherView from './weatherView';
import AccuweatherApi from '../api/accuweatherApi'
import zipcodes from 'zipcodes-regex';


const MOCK_LOCATION = {
  "Key": "18473_PC",
  "LocalizedName": "Columbus",
  "EnglishName": "Columbus",
  "PrimaryPostalCode": "43214",
  "AdministrativeArea": {
    "ID": "OH",
    "LocalizedName": "Ohio",
    "EnglishName": "Ohio",
  },
  "TimeZone": {
    "Code": "EDT",
    "Name": "America/New_York",
    "GmtOffset": -4,
  }
}



function App() {
  const [location, setLocation] = useState(MOCK_LOCATION)
  function handleLocationChange(new_location) {
    if (!new_location.match(zipcodes["US"])) {
      console.error("Only US postal codes supported :( you entered " + new_location)
      return
    }

    if (new_location === location.PrimaryPostalCode)
      return // location did not change

    const locations = AccuweatherApi.locationsForPostalCode(new_location)
      .then((locations) => {
        if (locations)
          setLocation(locations[0])
        else
          setLocation(locations)
      })
  }

  return (
    <div className="App">
      <LocationInput
        location={location}
        onLocationChange={handleLocationChange}
      />

      <WeatherView location={location} />
    </div>
  );
}

export default App;
