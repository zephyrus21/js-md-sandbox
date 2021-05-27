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
      <CodeEditor
        initialValue='// Hello World
'
        onChange={(value) => setInput(value)}
      />
      <div>
        <button className='button  is-success is-small' onClick={onClick}>
          Submit
        </button>
      </div>
      <Preview code={code} />
    </Resizable>
  );
}

export default CodeCell;
