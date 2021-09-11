import React, { useState } from 'react';
import '../styles/app.css';
import LocationInput from './locationInput';
import WeatherView from './weatherView';
import AccuweatherApi from '../api/accuweatherApi'
import zipcodes from 'zipcodes-regex';
import { Box } from '@palmetto/palmetto-components';



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
    if (new_location.coords) {
      AccuweatherApi.locationsForGeoposition(new_location.coords.latitude, new_location.coords.longitude)
        .then((locations) => {
          if (locations)
            setLocation(locations[0])
          else
            setLocation(locations)
        })
      return
    }

    else if (new_location.match(zipcodes["US"])) {
      if (new_location === location.PrimaryPostalCode)
        return // postal code entered is the current location
    }
    else {
      if (new_location === (location.LocalizedName + ', ' + location.AdministrativeArea.LocalizedName))
        return // text entered is the current city, state
    }

    AccuweatherApi.locationsForText(new_location)
      .then((locations) => {
        if (locations)
          setLocation(locations[0])
        else
          setLocation(locations)
      })
  }

  return (
    <Box direction="column"
      spacing="base"
      childGap="base" >
      <LocationInput
        location={location}
        onLocationChange={handleLocationChange}
      />

      <WeatherView location={location} />
    </Box>
  );
}

export default App;
