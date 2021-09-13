import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../components/app';
import conditionMocks from "./mocks/conditions";
import locationMocks from "./mocks/locations";

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

test('set location based on gps without a default locations', async () => {
  render(<App />);
  global.navigator.geolocation = mockGeolocation;
  const gps_button = screen.getByLabelText("geolocation")

  fireEvent.click(gps_button)

  await waitFor(() => expect(location_input().value).toBe("Denver, Colorado"))
  await waitFor(() => screen.getByText("Current Temp: 20ºF"))
});

test('updates location when enter key is hit in locationInput', async () => {
  render(<App />);
  const input = location_input()
  input.value = "90210"
  fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
  await waitFor(() => screen.getByText("Beverly Hills, California"))
  await waitFor(() => screen.getByText("Current Temp: 85ºF"))
});