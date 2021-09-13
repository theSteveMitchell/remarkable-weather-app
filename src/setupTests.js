// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import conditionMocks from "./tests/mocks/conditions";
import locationMocks from "./tests/mocks/locations";

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
    mock_response = locationMocks.MOCK_DENVER[0]
  }
  // console.log("received: " + url + "And responding with: " + mock_response)
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