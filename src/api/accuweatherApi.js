
async function conditionsForLocation(location_key) {
  const uri = conditions_url() + location_key
  const queryString = objToQueryString({
    apikey: process.env.REACT_APP_ACCUWEATHER_API_SECRET_KEY,
  });
  try {
    const response = await fetch(
      uri + '?' + queryString);
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

const AccuweatherApi = {
  conditionsForLocation
};
export default AccuweatherApi;