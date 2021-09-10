import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import WeatherView from '../components/weatherView';

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

async function mockFetch(url, config) {
  return {
    ok: true,
    status: 200,
    json: async () => (MOCK_CONDITIONS),
  }
}

beforeAll(() => jest.spyOn(window, 'fetch'))

beforeEach(() => window.fetch.mockImplementationOnce(mockFetch))

test('renders passed location', async () => {
  render(<WeatherView location={MOCK_LOCATION} />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  screen.getByText('Showing weather for location: Columbus, Ohio')
});

test('renders fetched condition', async () => {
  render(<WeatherView location={MOCK_LOCATION} />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  screen.getByText('Current Temp: 38ºF')
});
