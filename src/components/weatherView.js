import React, { useEffect, useState } from 'react';
import AccuweatherApi from '../api/accuweatherApi'
import { Box, Spinner, Alert } from '@palmetto/palmetto-components';

function WeatherView(props) {
  const [condition, setCondition] = useState()
  const [loadingConditions, setLoadingConditions] = useState()

  useEffect(() => {
    if (props.location) {
      setLoadingConditions("loading")
      AccuweatherApi.conditionsForLocation(props.location.Key)
        .then((conditions) => {
          if (conditions && conditions.length > 0) {
            setCondition(conditions[0])
            setLoadingConditions("success")
          }
          else {
            setCondition(conditions)
            setLoadingConditions("failed")
          }
        })
    }
    else
      setCondition(undefined)
  }, [props]);

  function backgroundColor() {
    return (condition && condition.IsDayTime) ? "secondary" : "dark"
  }

  function weatherIcon() {
    if (condition && condition.WeatherIcon) {
      return process.env.REACT_APP_ACCUWEATHER_API_ICONS_URL + condition.WeatherIcon + ".svg"
    }
  }

  function predicitationText() {
    return condition.HasPrecipitation ? condition.PrecipitationType : "No Precipitation"
  }

  return (
    <Box alignItems="center"
      flex="auto"
      background={backgroundColor()}
      radius="md"
      className="WeatherView"
      margin="sm">

      <Box direction="column"
        alignItems="center"
        childGap="md"
        fontSize="2xl"
        color="white"
      >


        {props.location &&
          <div>
            {props.location.LocalizedName},{' '}{props.location.AdministrativeArea.LocalizedName}
          </div>
        }
        {condition &&
          <Box alignItems="center">
            <div>
              Current Temp:{' '}{condition.Temperature.Imperial.Value}ºF
            </div>
            <div>
              {' '}{condition.WeatherText}
            </div>
            <div>
              {' '}{predicitationText()}
            </div>
            <Box alignItems="center" flex="auto" padding="sm" background="transparent">
              <img src={weatherIcon()}
                width="200px"
                height="200px"
                alt={predicitationText()} />
            </Box>
          </Box>

        }

        {(props.queryStatus === "loading" || loadingConditions === "loading") &&
          <Box direction="column"
            alignItems="center">
            {/* Spinner doesn't support (AFAICT) aria-label, and overrides data-testid https://github.com/palmetto/palmetto-components/blob/main/src/components/Spinner/Spinner.tsx#L42*/}
            <Spinner
              variant="white"
              size="xl"
            />
            <Box>
              Loading...
            </Box>
          </Box>
        }
        {(props.queryStatus === "failed") &&
          <Alert
            variant="warning"
            title="Location Not Found"
            message="Could not find a matching location"
          />

        }
        {(props.queryStatus === "success" && loadingConditions === "failed") &&
          <Alert
            variant="warning"
            title="Conditions Not Found"
            message="Could not find current conditions at that location"
          />

        }
      </Box>

    </Box >
  );
}

export default WeatherView;