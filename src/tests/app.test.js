import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../components/app';

const MOCK_CONDITIONS = [{
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
      "Value": 38,
      "Unit": "F",
      "UnitType": 18
    }
  },
  "MobileLink": "http://www.accuweather.com/en/ch/trachselwald/3456/current-weather/384077_pc?lang=en-us",
  "Link": "http://www.accuweather.com/en/ch/trachselwald/3456/current-weather/384077_pc?lang=en-us"
}]

const ALT_MOCK_CONDITIONS = [{
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
      "Value": 85,
      "Unit": "F",
      "UnitType": 18
    }
  },
  "MobileLink": "http://www.accuweather.com/en/ch/trachselwald/3456/current-weather/384077_pc?lang=en-us",
  "Link": "http://www.accuweather.com/en/ch/trachselwald/3456/current-weather/384077_pc?lang=en-us"
}]

const MOCK_LOCATION = [
  {
    "Key": "37935_PC",
    "Type": "PostalCode",
    "LocalizedName": "Beverly Hills",
    "EnglishName": "Beverly Hills",
    "PrimaryPostalCode": "90210",
    "AdministrativeArea": {
      "ID": "CA",
      "LocalizedName": "California",
      "EnglishName": "California"
    },
    "TimeZone": {
      "Code": "PDT",
      "Name": "America/Los_Angeles",
      "GmtOffset": -7,
      "IsDaylightSaving": true,
      "NextOffsetChange": "2021-11-07T09:00:00Z"
    },
  },
]

async function mockFetch(url, config) {
  console.log("mocking: " + url)
  if (url.match(/currentconditions\/v1\/18473_PC/gi)) {
    return {
      ok: true,
      status: 200,
      json: async () => (MOCK_CONDITIONS),
    }
  }
  else if (url.match(/currentconditions\/v1\//gi)) {
    return {
      ok: true,
      status: 200,
      json: async () => (ALT_MOCK_CONDITIONS),
    }
  }
  else if (url.match(/locations\/v1\//gi)) {
    return {
      ok: true,
      status: 200,
      json: async () => (MOCK_LOCATION),
    }
  }
}

beforeAll(() => jest.spyOn(window, 'fetch'))

beforeEach(() => window.fetch.mockImplementation(mockFetch))

test('updates the conditions when location changes', async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  const temp = screen.getByText('Current Temp: 38ºF')
  const zip_input = screen.getByPlaceholderText("Enter postal code")

  fireEvent.blur(zip_input, { target: { value: '90210' } })

  await waitFor(() => expect(temp.textContent).toBe("Current Temp: 85ºF"))
});