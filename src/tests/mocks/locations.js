const MOCK_COLUMBUS = {
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

const MOCK_BEVERLY = [
  {
    "Key": "37935_PC",
    "Type": "PostalCode",
    "LocalizedName": "Beverly Hills",
    "EnglishName": "Beverly Hills",
    "PrimaryPostalCode": "90210",
    "AdministrativeArea": {
      "ID": "CA",
      "LocalizedName": "California",
      "EnglishName": "California"
    },
    "TimeZone": {
      "Code": "PDT",
      "Name": "America/Los_Angeles",
      "GmtOffset": -7,
      "IsDaylightSaving": true,
      "NextOffsetChange": "2021-11-07T09:00:00Z"
    },
  },
]

const MOCK_HONOLULU = [
  {
    "Key": "348211",
    "Type": "City",
    "LocalizedName": "Honolulu",
    "EnglishName": "Honolulu",
    "PrimaryPostalCode": "96817",
    "AdministrativeArea": {
      "ID": "HI",
      "LocalizedName": "Hawaii",
      "EnglishName": "Hawaii",
      "Level": 1
    },
    "TimeZone": {
      "Code": "HST",
      "Name": "Pacific/Honolulu",
      "GmtOffset": -10,
      "IsDaylightSaving": false,
      "NextOffsetChange": null
    }
  }
]

const MOCK_DENVER = [
  {
    "Key": "98763",
    "Type": "LatLong",
    "LocalizedName": "Denver",
    "EnglishName": "Honolulu",
    "PrimaryPostalCode": "78667",
    "AdministrativeArea": {
      "ID": "CO",
      "LocalizedName": "Colorado",
      "EnglishName": "Colorado",
      "Level": 1
    },
    "TimeZone": {
      "Code": "MST",
      "Name": "Mountain/Denver",
      "GmtOffset": -6,
      "IsDaylightSaving": false,
      "NextOffsetChange": null
    }
  }
]

const MOCK_DENVER_GEOPOSITION = {
  "coords": {
    "latitude": 40.023,
    "longitude": -83.001
  }
}

const mocks = {
  MOCK_COLUMBUS,
  MOCK_BEVERLY,
  MOCK_HONOLULU,
  MOCK_DENVER,
  MOCK_DENVER_GEOPOSITION
}

export default mocks