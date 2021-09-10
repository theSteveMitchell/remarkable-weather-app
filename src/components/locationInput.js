import React, { useState } from 'react';
import { TextInput } from '@palmetto/palmetto-components';
import '../styles/palmetto.css';

function LocationInput(props) {
  const [locationEntry, setLocationEntry] = useState(props.location.Key)
  function handleChange(e) {
    props.onLocationChange(e.target.value);
  }

  function handleEntryChange(e) {
    setLocationEntry(e.target.value)
  }

  return (
    <TextInput
      placeholder="Enter location Key"
      value={locationEntry}
      onBlur={handleChange}
      onChange={handleEntryChange} />
  );
}

export default LocationInput;