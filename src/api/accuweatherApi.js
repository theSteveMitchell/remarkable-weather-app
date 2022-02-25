const AccuweatherApi = {
  conditions_url: process.env.REACT_APP_ACCUWEATHER_API_BASE_URL + process.env.REACT_APP_ACCUWEATHER_API_CONDITIONS_ENDPOINT,
  locations_url: process.env.REACT_APP_ACCUWEATHER_API_BASE_URL + process.env.REACT_APP_ACCUWEATHER_API_LOCATIONS_SEARCH_ENDPOINT,
  locations_geo_url: process.env.REACT_APP_ACCUWEATHER_API_BASE_URL + process.env.REACT_APP_ACCUWEATHER_API_LOCATIONS_GEO_SEARCH_ENDPOINT,

  async conditionsForLocation(location_key) {
    const uri = this.conditions_url + location_key
    const queryString = this.objToQueryString({
      apikey: process.env.REACT_APP_ACCUWEATHER_API_SECRET_KEY,
    });

    return this.json_fetch(`${uri}?${queryString}`)
  },
  async locationsForText(text) {
    const uri = this.locations_url
    const queryString = this.objToQueryString({
      q: text,
      apikey: process.env.REACT_APP_ACCUWEATHER_API_SECRET_KEY,
    });

    return this.json_fetch(`${uri}?${queryString}`)
  },

  async locationForGeoposition(lat, lon) {
    const uri = this.locations_geo_url
    const queryString = this.objToQueryString({
      q: lat + "," + lon,
      apikey: process.env.REACT_APP_ACCUWEATHER_API_SECRET_KEY,
    });

    return this.json_fetch(`${uri}?${queryString}`)
  },

  async json_fetch(uri_query) {
    try {
      const response = await fetch(
        uri_query);
      if (!response.ok)
        throw new Error(response.status);
      else
        return response.json();
    } catch (error) {
      console.warn('error: ' + error);
    }
  },

  objToQueryString: (obj) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  },
}

export default AccuweatherApi;