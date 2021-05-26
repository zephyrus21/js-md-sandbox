import React, { useState } from 'react';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import bundle from './bundler';

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    setCode(await bundle(input));
  };

  return (
    <div>
      <CodeEditor
        initialValue='// Hello World
'
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default App;
