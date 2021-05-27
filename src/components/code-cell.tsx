import React, { useState } from 'react';
import CodeEditor from './code-editor';
import Resizable from './resizable';
import Preview from './preview';
import bundle from '../bundler';

function CodeCell() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    setCode(await bundle(input));
  };

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='// Hello World
          '
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
}

export default CodeCell;
