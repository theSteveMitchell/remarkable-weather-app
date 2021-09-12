import React, { useState, useEffect } from 'react';
import { TextInput, Box, Button } from '@palmetto/palmetto-components';
import '../styles/palmetto.css';

function LocationInput(props) {
  const [locationEntry, setLocationEntry] = useState("")

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
          onClick={props.onGetBrowserGeoposition} />
      }
    </Box >

  );
}

export default LocationInput;