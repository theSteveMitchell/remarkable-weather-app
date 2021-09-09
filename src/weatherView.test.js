import { render, screen } from '@testing-library/react';
import WeatherView from './weatherView';

test('renders passed location and condition strings', () => {
  render(<WeatherView location="Denver" condition="34" />);

  expect(screen.getByText('Showing weather for location: Denver')).not.toBeNull
  expect(screen.getByText('Current Temp: 34ºF')).not.toBeNull

});
