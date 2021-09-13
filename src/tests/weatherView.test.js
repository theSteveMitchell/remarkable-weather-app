import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import WeatherView from '../components/weatherView';
import conditionMocks from "./mocks/conditions";
import locationMocks from "./mocks/locations";

async function waitForAppLoad() {
  render(<WeatherView location={locationMocks.MOCK_COLUMBUS[0]} />)
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
}

test('renders passed location', async () => {
  await waitForAppLoad()
  screen.getByText('Columbus, Ohio')
});

test('renders fetched condition', async () => {
  await waitForAppLoad()
  screen.getByText('Current Temp: 38ºF')
});

test('renders condition details and icon', async () => {
  render(<WeatherView location={locationMocks.MOCK_HONOLULU[0]} />)
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  screen.getByText('Current Temp: 83ºF')
  screen.getByText('Thunderstorm')
  screen.getByText('Rain')
  screen.getAllByAltText("Rain")

});

test('fetches only once when rendered', async () => {
  render(<WeatherView location={locationMocks.MOCK_HONOLULU[0]} />)
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  screen.getByText('Current Temp: 83ºF')
  screen.getByText('Thunderstorm')
  screen.getByText('Rain')
  screen.getAllByAltText("Rain")

  expect(window.fetch).toHaveBeenCalledTimes(1)

});
