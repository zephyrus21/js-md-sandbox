import React, { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

function CodeCell() {
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
        <button className='button  is-success is-small' onClick={onClick}>
          Submit
        </button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default CodeCell;
