# The Remarkable Weather App

A browser app to show current weather conditions anywhere on Earth. 

### GIF
![screeny](https://user-images.githubusercontent.com/950669/137359260-ac61fabd-1cdf-4836-93b9-20165844b01e.gif)

# Running locally 

1. clone this repo locally 
2. `cd` to project root directoy
3. Acquire a developer API key from https://developer.accuweather.com/ and add it to `.env` (or `.env.local`)
4. run `yarn install`
5. Run the development server:
    * `yarn start` 
    * (and if yarn doesn't do it for you) open a browser to `localhost:3000`)
6. Or, run the production build:
    * `yarn build`
    * `yarn global add serve`
    * `serve -s build`
    * point broswer to `localhost:5000`

# Using the App
Enter a location
- Enter a city name, "city, state", a US postal code, or click the GPS icon
The app will display
- the current location
- temerature
- sky conditions
- precipitation, if any
- weather icon showing current condition

## Tests
run `yarn test` to see tests pass
![screeny](https://user-images.githubusercontent.com/950669/137359239-58d2d909-b17c-496b-acb6-0f49ffec8035.gif)

## Design / Implementation / Tradeoffs.

I had four primary goals for this project:

1. Use React with the latest version and current best practices, where I could
2. Create the app in small, incremental steps, with tests included at each step (sort of TDD, but not quite)
3. Build a cool app that looked nice and is easy to use.

## Tech stack and design

The app was initially created with [create-react-app](https://create-react-app.dev/). this provides reasonable defaults for project structure, node/yarn configuration, testing with jest, and linting/error checking. At low level, the app is a standard React app. `index.html` includes `index.js`, which requires `app.js`, the main entrypoint for the application

The three main components in the app are all React functional components. There is also an AccuweatherAPI module which encpsulates the API communication

`app.js` is the primary view, rendering the other two components as children. App maintains its state with a `location` object, which is structured as an Accuweather location. It also maintains a `queryStatus`, which represents state of API interaction (loading, success, or failed). Additionally, App handles the fetching of a location based on text input of GPS coordinates, and handles some filtering to reduce unnecessary fetches. 

the `LocationInput` component represents the mechanisms to enter location input. It's mostly based on a controlled Palmetto TextInput comonent. It's rendered with properties including a change handler, and will trigger that handler whenever the text is modified and then either blurred (onBlur called) or when the enter key is pressed. LocationInput attempts to maintain the context of how a search was done. So if you enter a postal code, the text will not change after the corresponding location is fetched. But if you enter a partial city name, the text will update with the full city and state once the location is fetched. There is also a button with a gps icon which triggers the function-property to fetch browser geopposition. 

the `WeatherView` component is responsible for fetching weather conditions at the provided location and displaying them. Conditions are structured as an Accuweather condition. It's retriggered to update whenever location is updated, and refreshes itself on a 5 minute interval. It mostly displays raw text values returned from the API, and also displays the weather icon returned from the API.

`AccuweatherAPI` is a simple function module that wraps the API interactions. It uses window.fetch to call the API and handles wrapping queryparams and unpacking the response. The API configuration is set in .env (and .env.local)

## Testing and TDD

This app uses react-testing-library. My approach to testing was to test interactions that normal users would go through. So most of the fireEvents simulate real user interactinos, and the assertions are based on what an actual user would see and use to verify the behavior

The obvious exception is API stubs. I used Jest spy to mock the API calls for all the tets. These are setup in `src/setupTests.js`. That ugly code uses a series of regex matches to determine what data to return in the mocked fetch calls. `src/tests/mocks` contains the mocked data for locations and conditions.




