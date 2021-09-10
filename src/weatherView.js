import React, { useEffect, useState } from 'react';
import AccuweatherApi from './api/AccuweatherApi'

function WeatherView({ location }) {
  const [condition, setCondition] = useState()

  useEffect(() => {
    AccuweatherApi.conditionsForLocation(location.Key)
      .then((conditions) => {
        setCondition(conditions[0])
      })
  }, []);

  return (
    <div className="WeatherView">
      {location &&
        <div>
          Showing weather for location:{' '}{location.LocalizedName},{' '}{location.AdministrativeArea.LocalizedName}
        </div>
      }
      {condition &&
        <div>

          Current Temp:{' '}{condition.Temperature.Imperial.Value}ºF
        </div>
      }
      {!condition &&
        <div>
          Loading...
        </div>
      }
    </div>
  );
}

export default WeatherView;