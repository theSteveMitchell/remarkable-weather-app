import React, { useState } from 'react';

const MOCK_CONDITIONS = {
  "LocalObservationDateTime": "2021-09-08T23:27:00+02:00",
  "EpochTime": 1631136420,
  "WeatherText": "Clear",
  "WeatherIcon": 33,
  "HasPrecipitation": false,
  "PrecipitationType": null,
  "IsDayTime": false,
  "Temperature": {
    "Metric": {
      "Value": 19.7,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": 67,
      "Unit": "F",
      "UnitType": 18
    }
  },
  "MobileLink": "http://www.accuweather.com/en/ch/trachselwald/3456/current-weather/384077_pc?lang=en-us",
  "Link": "http://www.accuweather.com/en/ch/trachselwald/3456/current-weather/384077_pc?lang=en-us"
}


function WeatherView({ location }) {
  const [conditions, setConditions] = useState(MOCK_CONDITIONS)

  return (
    <div className="WeatherView">

      <div>
        Showing weather for location:{' '}{location.LocalizedName},{' '}{location.AdministrativeArea.LocalizedName}
      </div>

      <div>
        Current Temp:{' '}{conditions.Temperature.Imperial.Value}ºF
      </div>
    </div>
  );
}

export default WeatherView;