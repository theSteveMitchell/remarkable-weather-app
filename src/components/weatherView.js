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

  return (
    <Box direction="column"
      spacing="base"
      childGap="base"
      margin="base" >

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
        {(props.queryStatus === "loading" || loadingConditions === "loading") &&
          <div>
            <Spinner
              variant="primary"
              size="lg"
            />
            {/* It seems Spinner doesn't support aria-label, and overrides data-testid */}
            <div>
              Loading...
            </div>
          </div>
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
      </div>
    </Box>
  );
}

export default WeatherView;