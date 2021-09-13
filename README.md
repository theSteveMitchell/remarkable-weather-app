# The Remarkable Weather App

A browser app to show current weather conditions anywhere on Earth. 

### View Screenshot at public/Screenshot.png 

# Running locally 

1. clone this repo locally 
    * `git clone *****.gitbundle`
    * or unpack the zip archive
2. `cd` to project root directoy
3. run `yarn install`
4. Run the development server:
    * `yarn start` 
    * (and if yarn doesn't do it for you) open a browser to `localhost:3000`)
5. Or, run the production build:
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

## Tests
run `yarn test` to see tests pass

## Design / Implementation / Tradeoffs.

I had four primary goals for this project:

1. Use React with the latest version and current best practices, where I could
2. Create the app in small, incremental steps, with tests included at each step (sort of TDD, but not quite)
3. Build a cool app that looked nice and is easy to use.
4. Learn about Palmetto-Components and use them effectively

## Tech stack and design

The app was initially created with [create-react-app](https://create-react-app.dev/). this provides reasonable defaults for project structure, node/yarn configuration, testing with jest, and linting/error checking. At low level, the app is a standard React app. `index.html` includes `index.js`, which requires `app.js`, the main entrypoint for the application

The three main components in the app are all React functional components. There is also an AccuweatherAPI module which encpsulates the API communication

`app.js` is the primary view, rendering the other two components as children. App maintains its state with a `location` object, which is structured representation of an Accuweather location. It also maintains a `queryStatus`, which represents state of API interaction (loading, success, or failed). Additionally, App handles the fetching location based on text input of GPS coordinates, and handles some filtering to reduce unnecessary fetches. 

the `LocationInput` component represents the mechanisms to enter location input. It's mostly based on a controlled Palmetto TextInput comonent. It's rendered with properties including a change handler, and will trigger that handler whenever the text is modified and then either blurred (onBlur called) or when the enter key is pressed. LocationInput attempts to maintain the context of how a search was done. So if you enter a postal code, the text will not change after a location is fetched. But if you enter a partial city name, the text may update with the full city and state once the location is fetched. There is also a button with a gps icon which triggers the function-property to fetch browser geopposition. 

the `WeatherView` component is responsible for fetching weather conditions at the provided location and displaying them. Conditions are structured as an Accuweather condition. It's retriggered to update whenever location is updated, and refreses itself on a 5 minute interval. It mostly displays raw text values returned from the API, and also displays the weather icon returned from the API.

`AccuweatherAPI` is a simple function module that wraps the API interactions. It uses window.fetch to call the API and handles wrapping queryparams and unpacking the response. The API configuration is set in .env (and .env.local)

## Testing and TDD

This app uses react-testing-library. My approach to testing was to test interactions that normal users would go through. So most of the fireEvents simulate real user interactinos, and the assertions are based on what an actual user would see and use to verify the behavior

The obvious exception is API stubs. I used Jest spy to mock the API calls for all the tets. These are setup in `src/setupTests.js`. That ugly code uses a series of regex matches to determine what data to return in the mocked fetch calls. `src/tests/mocks` contains the mocked data for locations and conditions.

I'm submitting this project as a .gitbundle in addition to a .zip file, mostly because I think the commit history is important to show the process of incremental building. I began with a simple `WeatherView` that used stubbed location and condition data. I build tests, and then incrementally eveolved the functionality. No doubt this took a lot longer, but I learned a lot. 

## Look, feel, and production readiness

As a simple app, I'm happy with what this does, and the interaction feels very comfortable for me. 

Things I would have done differently to make a production app:
1. Autocomplete city search. I originally chose Accuweather's API because it was the only service the offered an autocomplete API. Unfortunately, with its really low call limits, I don't think that would be practical. Also, since my input is wrapped in the TextInput component, it would be a lot of time-consuming fun to implement the UI for this.
3. Radar display. Radar was something I really wanted to show, and was another reason I chose Accuweather's API. I didn't notice at the time that it was only available for the Prime package at $250/month. A discerning engineer might appreciate my fiscal restaint in cutting this from scope.  
4. Hourly forecast. This wouldn't have been too complicated to add. But it only expands on the patterns I've already built, so I wouldn't have learned much new, I don't think. 
5. Protected the API key. I intentionally included my API key in this submission, for your convenience. But if this were a real production app, the key would be exposed in the user's browser calls. I could address this by proxying calls to my own backend, but unless I also added my own authenticaion, that wouldn't help with throttling ratelimiting the api calls

## Palmetto Components. 

This was an obvious choice, as everyone knows @palmetto-components is the gold standard of amazing corporate branded components. 

These compoents made it easy to setup nice-looking and consistent app layout. There were a couple of cases where I had to dig beyond the documentation and into source code to figure out how some pieces worked, which was a fun exercise:
1. Palmetto Spinner doesn't support aria-labels, and the test-id is hard-coded as "spinner-testid". This caused a little extra work, since I wanted to only assert on what the user could actually see/know. Keeping the "Loading..." text under the spinner was a fine workaround.
2. I needed the TextInput component to trigger an onKeyPress handler, so found the `InputProps` that it passes to its child `Input`. This actually is in the documentation, but I didn't see it there until after the fact.






