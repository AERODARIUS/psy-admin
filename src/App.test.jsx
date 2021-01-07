import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import App from './App';
import rootReducer from './reducer';

test('renders auth page', () => {
  const mockStore = createStore(rootReducer);
  const { getAllByText } = render(
    <Provider store={mockStore}>
      <App />
    </Provider>,
  );
  const elements = getAllByText(/Psy Admin/i);
  elements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});
