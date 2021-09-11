import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../components/app';
import conditionMocks from "./mocks/conditions";
import locationMocks from "./mocks/locations";

async function mockFetch(url, config) {
  let mock_response

  if (url.match(/currentconditions\/v1\/18473_PC/gi)) {
    mock_response = conditionMocks.MOCK_COLUMBUS_CONDITIONS
  }
  else if (url.match(/currentconditions\/v1\/348211/gi)) {
    mock_response = conditionMocks.MOCK_HONOLULU_CONDITIONS
  }
  else if (url.match(/currentconditions\/v1\/37935_PC/gi)) {
    mock_response = conditionMocks.MOCK_BEVERLY_CONDITIONS
  }
  else if (url.match(/locations\/v1\/search.json\?q=90210/)) {
    mock_response = locationMocks.MOCK_BEVERLY
  }
  else if (url.match(/locations\/v1\/search.json\?q=Honolulu/gi)) {
    mock_response = locationMocks.MOCK_HONOLULU
  }
  if (mock_response) {
    return {
      ok: true,
      status: 200,
      json: async () => (mock_response),
    }
  }
}

beforeAll(() => jest.spyOn(window, 'fetch'))

beforeEach(() => window.fetch.mockImplementation(mockFetch))

test('updates the conditions when location changes with postal code', async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  const temp = screen.getByText('Current Temp: 38ºF')
  const zip_input = screen.getByPlaceholderText("Enter postal code")

  fireEvent.blur(zip_input, { target: { value: '90210' } })

  await waitFor(() => expect(temp.textContent).toBe("Current Temp: 85ºF"))
});

test('updates the conditions when location changes with city text', async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  const temp = screen.getByText('Current Temp: 38ºF')
  const zip_input = screen.getByPlaceholderText("Enter postal code")

  fireEvent.blur(zip_input, { target: { value: 'Honolulu' } })

  await waitFor(() => expect(temp.textContent).toBe("Current Temp: 83ºF"))
});

test('updates the textbox with the new location display name', async () => {
  render(<App />);
  await waitForElementToBeRemoved(screen.getByText("Loading..."))
  const zip_input = screen.getByPlaceholderText("Enter postal code")

  fireEvent.blur(zip_input, { target: { value: 'Honolulu' } })

  await waitFor(() => expect(zip_input.value).toBe("Honolulu, Hawaii"))

  fireEvent.blur(zip_input, { target: { value: '90210 1234' } })

  await waitFor(() => expect(zip_input.value).toBe("90210"))
});