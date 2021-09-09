function WeatherView({ location, condition }) {

  return (
    <div className="WeatherView">

      <div>
        Showing weather for location:{' '}{location.LocalizedName},{' '}{location.AdministrativeArea.LocalizedName}
      </div>

      <div>
        Current Temp:{' '}{condition.Temperature.Imperial.Value}ºF
      </div>
    </div>
  );
}

export default WeatherView;