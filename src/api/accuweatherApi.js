
function conditionsForLocation(location_key) {
  const uri = conditions_url() + location_key
  const queryString = objToQueryString({
    apikey: process.env.REACT_APP_ACCUWEATHER_API_SECRET_KEY,
  });

  return json_fetch(uri + '?' + queryString)
}

function locationsForText(text) {
  const uri = locations_url()
  const queryString = objToQueryString({
    q: text,
    apikey: process.env.REACT_APP_ACCUWEATHER_API_SECRET_KEY,
  });

  return json_fetch(uri + '?' + queryString)
}

async function json_fetch(uri_query) {
  try {
    const response = await fetch(
      uri_query);
    if (!response.ok)
      throw new Error(response.status);
    else
      return response.json();
  } catch (error) {
    console.log('error: ' + error);
  }
}

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

function base_url() {
  return process.env.REACT_APP_ACCUWEATHER_API_BASE_URL
}

function conditions_url() {
  return base_url() + process.env.REACT_APP_ACCUWEATHER_API_CONDITIONS_ENDPOINT
}

function locations_url() {
  return base_url() + process.env.REACT_APP_ACCUWEATHER_API_LOCATIONS_SEARCH_ENDPOINT
}

const AccuweatherApi = {
  conditionsForLocation,
  locationsForText
};
export default AccuweatherApi;