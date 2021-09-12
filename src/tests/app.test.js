import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../components/app';
import conditionMocks from "./mocks/conditions";
import locationMocks from "./mocks/locations";

async function mockFetch(url, config) {
  let mock_response

  if (url.match(/currentconditions\/v1\/18473_PC/)) {
    mock_response = conditionMocks.MOCK_COLUMBUS_CONDITIONS
  }
  else if (url.match(/currentconditions\/v1\/348211/)) {
    mock_response = conditionMocks.MOCK_HONOLULU_CONDITIONS
  }
  else if (url.match(/currentconditions\/v1\/37935_PC/)) {
    mock_response = conditionMocks.MOCK_BEVERLY_CONDITIONS
  }
  else if (url.match(/currentconditions\/v1\/98763/)) {
    mock_response = conditionMocks.MOCK_DENVER_CONDITIONS
  }
  else if (url.match(/locations\/v1\/search.json\?q=90210/)) {
    mock_response = locationMocks.MOCK_BEVERLY
  }
  else if (url.match(/locations\/v1\/search.json\?q=Honolulu/)) {
    mock_response = locationMocks.MOCK_HONOLULU
  }
  else if (url.match(/locations\/v1\/cities\/geoposition\/search\?q=40.023/)) {
    mock_response = locationMocks.MOCK_DENVER
  }
  //console.log("received: " + url + "And responding with: " + mock_response)
  if (mock_response) {
    return {
      ok: true,
      status: 200,
      json: async () => (mock_response),
    }
  }
}

async function mockGetCurrentPosition(success) {
  success(locationMocks.MOCK_DENVER_GEOPOSITION)
}
const mockGeolocation = {
  getCurrentPosition: mockGetCurrentPosition,
};

async function waitForAppLoad() {
  render(<App defaultLocation={locationMocks.MOCK_COLUMBUS} />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
}

function location_input() {
  return screen.getByPlaceholderText("Enter postal code or city name")
}

beforeAll(() => jest.spyOn(window, 'fetch'))

beforeEach(() => window.fetch.mockImplementation(mockFetch))

test('updates the conditions when location changes with postal code', async () => {
  await waitForAppLoad()
  const temp = screen.getByText('Current Temp: 38ºF')

  fireEvent.blur(location_input(), { target: { value: '90210' } })

  await waitFor(() => expect(temp.textContent).toBe("Current Temp: 85ºF"))
});

test('updates the conditions when location changes with city text', async () => {
  await waitForAppLoad()
  const temp = screen.getByText('Current Temp: 38ºF')

  fireEvent.blur(location_input(), { target: { value: 'Honolulu' } })

  await waitFor(() => expect(temp.textContent).toBe("Current Temp: 83ºF"))
});

test('updates the textbox with the new location display name', async () => {
  await waitForAppLoad()
  const input = location_input()

  fireEvent.blur(input, { target: { value: 'Honolulu' } })

  await waitFor(() => expect(input.value).toBe("Honolulu, Hawaii"))

  fireEvent.blur(input, { target: { value: '90210 1234' } })

  await waitFor(() => expect(input.value).toBe("90210"))
});

test('updates the textbox and conditions with GPS search', async () => {
  global.navigator.geolocation = mockGeolocation;

  await waitForAppLoad()
  const gps_button = screen.getByLabelText("geolocation")
  const temp = screen.getByText('Current Temp: 38ºF')


  fireEvent.click(gps_button)

  await waitFor(() => expect(location_input().value).toBe("Denver, Colorado"))
  await waitFor(() => expect(temp.textContent).toBe("Current Temp: 20ºF"))
});

test('shows warning when location is not found', async () => {
  await waitForAppLoad()

  fireEvent.blur(location_input(), { target: { value: 'Denial' } })

  await waitFor(() => screen.getByText("Location Not Found"))
});

test('works without a default locations', async () => {
  render(<App />);
  global.navigator.geolocation = mockGeolocation;
  const gps_button = screen.getByLabelText("geolocation")

  fireEvent.click(gps_button)

  await waitFor(() => expect(location_input().value).toBe("Denver, Colorado"))
  await waitFor(() => screen.getByText("Current Temp: 20ºF"))
});