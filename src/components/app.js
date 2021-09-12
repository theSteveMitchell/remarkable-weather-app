import React, { useState } from 'react';
import '../styles/app.css';
import LocationInput from './locationInput';
import WeatherView from './weatherView';
import AccuweatherApi from '../api/accuweatherApi'
import zipcodes from 'zipcodes-regex';
import { Box } from '@palmetto/palmetto-components';


function App(props) {
  const [location, setLocation] = useState(props.defaultLocation)
  const [queryStatus, setQueryStatus] = useState()

  function handleLocationChange(new_location) {
    if (new_location.coords) {
      beginUpdateLocation()
      AccuweatherApi.locationsForGeoposition(new_location.coords.latitude, new_location.coords.longitude)
        .then((locations) => {
          if (locations && locations.length > 0)
            succeedUpdateLocation(locations[0])
          else
            failUpdateLocation()
        })
      return
    }

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

  function beginUpdateLocation() {
    setQueryStatus("loading")
  }

  function succeedUpdateLocation(location) {
    setLocation(location)
    setQueryStatus("success")
  }

  function failUpdateLocation() {
    setLocation(undefined)
    setQueryStatus("failed")
  }

  function noOpUpdateLocation() {
    setQueryStatus("success")
  }

  function getBrowserLocation(e) {
    beginUpdateLocation()
    navigator.geolocation.getCurrentPosition(
      function (position) {
        handleLocationChange(position)
      })
  }

  return (
    <Box direction="column"
      spacing="base"
      childGap="base" >
      <LocationInput
        location={location}
        onLocationChange={handleLocationChange}
        onGetBrowserGeoposition={getBrowserLocation}
      />

      <WeatherView
        location={location}
        queryStatus={queryStatus} />
    </Box>
  );
}

export default App;
