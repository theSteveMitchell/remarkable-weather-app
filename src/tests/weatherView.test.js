import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import WeatherView from '../components/weatherView';
import conditionMocks from "./mocks/conditions";
import locationMocks from "./mocks/locations";

async function mockFetch(url, config) {
  return {
    ok: true,
    status: 200,
    json: async () => (conditionMocks.MOCK_COLUMBUS_CONDITIONS),
  }
}

beforeAll(() => jest.spyOn(window, 'fetch'))

beforeEach(() => window.fetch.mockImplementationOnce(mockFetch))

test('renders passed location', async () => {
  render(<WeatherView location={locationMocks.MOCK_COLUMBUS} />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  screen.getByText('Showing weather for location: Columbus, Ohio')
});

test('renders fetched condition', async () => {
  render(<WeatherView location={locationMocks.MOCK_COLUMBUS} />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  screen.getByText('Current Temp: 38ºF')
});
