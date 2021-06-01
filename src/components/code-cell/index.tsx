import React, { useEffect } from 'react';
import CodeEditor from '../code-editor';
import Resizable from '../resizable';
import Preview from '../preview';
import { Cell } from '../../redux';
import { useActions } from '../../hooks/use-action';
import { useTypedSelector } from '../../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundle[cell.id]);
  console.log(bundle);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content || '// Start here'}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {/* <Preview code={code} error={error} /> */}
      </div>
    </Resizable>
  );
};

export default CodeCell;
