import React from 'react';
import Navigation from './src/components/navigation/Navigation';

import {Provider} from 'react-redux';
import Store from './src/redux/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
};

export default App;
