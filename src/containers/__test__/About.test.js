import { render, screen } from '@testing-library/react';
import About from '../AboutContainer';
import _ from 'lodash';

test('test About Page', () => {
    render(<About />);
    expect(screen.getByText("Welcome to Delta Store!")).toBeInTheDocument();
});
