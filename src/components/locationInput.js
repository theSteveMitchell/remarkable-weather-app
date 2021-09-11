import React, { useState, useEffect } from 'react';
import { TextInput, Box, Button, Icon } from '@palmetto/palmetto-components';
import '../styles/palmetto.css';

function LocationInput(props) {
  const [locationEntry, setLocationEntry] = useState(props.location.PrimaryPostalCode)

  useEffect(() => {
    if (props.location) {
      if (props.location.Type === "PostalCode")
        setLocationEntry(props.location.PrimaryPostalCode)
      else
        setLocationEntry(props.location.LocalizedName + ', ' + props.location.AdministrativeArea.LocalizedName)
    }
  }, [props])

  function handleChange(e) {
    props.onLocationChange(e.target.value);
  }

  function handleEntryChange(e) {
    setLocationEntry(e.target.value)
  }

  function getBrowserLocation(e) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        props.onLocationChange(position)
      })
  }

  return (

    <Box
      direction="row"
      padding="base"
      childGap="base">
      <TextInput
        placeholder="Enter postal code"
        value={locationEntry}
        onBlur={handleChange}
        onChange={handleEntryChange} />
      {navigator.geolocation &&
        <Button
          iconPrefix="gps"
          isNaked
          aria-label="geolocation"
          onClick={getBrowserLocation} />
      }
    </Box >

  );
}

export default LocationInput;