import React, { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import './code-editor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorChange = (value: any, event: any) => {
    onChange(value);
  };

  const onEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
  };

  const onFormat = () => {
    const unformatted = editorRef.current.getValue();

    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        onClick={onFormat}
        className='button button-format is-warning is-small'>
        Format
      </button>
      <MonacoEditor
        onChange={onEditorChange}
        onMount={onEditorMount}
        value={initialValue}
        theme='vs-dark'
        language='javascript'
        height='500px'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
