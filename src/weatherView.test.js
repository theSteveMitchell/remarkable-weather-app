import { render, screen } from '@testing-library/react';
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

test('renders passed location and condition objects', () => {
  render(<WeatherView location={MOCK_LOCATION} />);

  expect(screen.getByText('Showing weather for location: Columbus, Ohio')).not.toBeNull
  expect(screen.getByText('Current Temp: 67ºF')).not.toBeNull

});
