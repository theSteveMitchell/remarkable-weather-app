import React, { useEffect, useState } from 'react';
import AccuweatherApi from '../api/accuweatherApi'

function WeatherView(props) {
  const [condition, setCondition] = useState()

  useEffect(() => {
    if (props.location) {
      AccuweatherApi.conditionsForLocation(props.location.Key)
        .then((conditions) => {
          if (conditions)
            if (conditions)
              setCondition(conditions[0])
            else
              setCondition(conditions)
        })
    }
  }, [props]);

  return (
    <div className="WeatherView">
      {props.location &&
        <div>
          Showing weather for location:{' '}{props.location.LocalizedName},{' '}{props.location.AdministrativeArea.LocalizedName}
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