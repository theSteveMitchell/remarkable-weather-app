import React, { useState } from 'react';
import '../styles/app.css';
import LocationInput from './locationInput';
import WeatherView from './weatherView';

const MOCK_LOCATION = {
  "Key": "18473_PC",
  "LocalizedName": "Columbus",
  "EnglishName": "Columbus",
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
    // setLocation(location)
    // only update the key for now...
    if (new_location === location.Key)
      return
    console.log("setting new location: " + new_location)
    setLocation({
      "Key": new_location,
      "LocalizedName": "Honolulu",
      "EnglishName": "Honolulu",
      "AdministrativeArea": {
        "ID": "OH",
        "LocalizedName": "Ohio",
        "EnglishName": "Ohio",
      },
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
