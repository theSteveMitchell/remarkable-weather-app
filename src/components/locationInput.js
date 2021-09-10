import React, { useState } from 'react';
import { TextInput } from '@palmetto/palmetto-components';
import '../styles/palmetto.css';

function LocationInput(props) {
  const [locationEntry, setLocationEntry] = useState(props.location.PrimaryPostalCode)
  function handleChange(e) {
    props.onLocationChange(e.target.value);
  }

  function handleEntryChange(e) {
    setLocationEntry(e.target.value)
  }

  return (
    <TextInput
      placeholder="Enter postal code"
      value={locationEntry}
      onBlur={handleChange}
      onChange={handleEntryChange} />
  );
}

export default LocationInput;