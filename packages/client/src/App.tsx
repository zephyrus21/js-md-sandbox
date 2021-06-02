import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux';
import 'bulmaswatch/darkly/bulmaswatch.min.css';
import CellList from './components/cell-list';

function App() {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
