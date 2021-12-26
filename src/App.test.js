import { render, screen } from '@testing-library/react';
import App from './App';

test('Profesores link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Profesores/i);
  expect(linkElement).toBeInTheDocument();
});
