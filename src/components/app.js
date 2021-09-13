import React, { useState } from 'react';
import '../styles/app.css';
import LocationInput from './locationInput';
import WeatherView from './weatherView';
import AccuweatherApi from '../api/accuweatherApi'
import zipcodes from 'zipcodes-regex';
import { Box } from '@palmetto/palmetto-components';
import logo from '../images/accuweather.png';



function App(props) {
  const [location, setLocation] = useState(props.defaultLocation)
  const [queryStatus, setQueryStatus] = useState()

  function handleLocationChange(new_location) {
    if (new_location.length < 2)
      return //prevent search if insufficient text input

    else if (new_location.match(zipcodes["US"])) {
      if (location && new_location === location.PrimaryPostalCode)
        return // postal code entered is the current location
    }
    else {
      if (location && new_location === (location.LocalizedName + ', ' + location.AdministrativeArea.LocalizedName))
        return // text entered is the current city, state
    }

    beginUpdateLocation()
    AccuweatherApi.locationsForText(new_location)
      .then((locations) => {
        if (locations && locations.length > 0)
          succeedUpdateLocation(locations[0])
        else
          failUpdateLocation()
      })
  }

  function handleGetBrowserLocation(e) {
    beginUpdateLocation()
    navigator.geolocation.getCurrentPosition(
      function (position) {
        beginUpdateLocation()
        AccuweatherApi.locationForGeoposition(position.coords.latitude, position.coords.longitude)
          .then((location) => {
            if (location && !location.length)
              succeedUpdateLocation(location)
            else
              failUpdateLocation()
          })
      })
  }

  function beginUpdateLocation() {
    setQueryStatus("loading")
  }

  function succeedUpdateLocation(location) {
    setLocation(location)
    setQueryStatus("success")
  }

  function failUpdateLocation() {
    setLocation()
    setQueryStatus("failed")
  }

  return (
    <Box minHeight="100%" background="light">
      <Box direction="column"

      >

        <LocationInput
          location={location}
          onLocationChange={handleLocationChange}
          onGetBrowserGeoposition={handleGetBrowserLocation}
        />
      </Box>

      <WeatherView
        location={location}
        queryStatus={queryStatus} />

      <footer>
        <Box alignSelf="flex-end" alignItems="center" padding="sm">
          Data provided by:
          <img src={logo} className="App-logo" alt="logo" width="70px" />
        </Box>
      </footer>
    </Box >
  );
}

export default App;
