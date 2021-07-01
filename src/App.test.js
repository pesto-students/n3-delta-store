import { render, screen } from '@testing-library/react';
import App from './App';
import _ from 'lodash';
test('renders learn react link', () => {
  render(<App />);

  const linkArr = ["Home", "Shop", "About"]
  _.each(linkArr, (link) => {
    expect(screen.getByText(link)).toBeInTheDocument();
  })
});
