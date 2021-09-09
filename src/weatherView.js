function WeatherView({ location, condition }) {
  return (
    <div className="WeatherView">

      <div>
        Showing weather for location:{' '}{location}
      </div>

      <div>
        Current Temp:{' '}{condition}ºF
      </div>
    </div>
  );
}

export default WeatherView;