import './App.css';
import WeatherView from './weatherView';

function App() {
  return (
    <div className="App">
      <WeatherView location="Columbus" condition="72" />
    </div>
  );
}

export default App;
