import React, { useState } from 'react';
import './App.css';
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

  return (
    <div className="App">
      <WeatherView location={location} />
    </div>
  );
}

export default App;
