import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import 'bulmaswatch/darkly/bulmaswatch.min.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
}

export default App;
