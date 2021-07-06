import { render, screen } from '@testing-library/react';
import Home from '../HomeContainer';
import store from '../../main/store/store';
import { Provider } from 'react-redux'
import _ from 'lodash';

test('test Home Page', () => {
    render(<Provider store={store}> // Set context
        <Home /> // Now App has access to context
    </Provider>
    );
    console.log(store.getState().loader.loading )
    //await waitForLoader();
    //expect(screen.getByText("Men")).toBeInTheDocument();
});
