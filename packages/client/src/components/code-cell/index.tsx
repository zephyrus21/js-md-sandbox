import React, { useEffect } from 'react';
import CodeEditor from '../code-editor';
import Resizable from '../resizable';
import Preview from '../preview';
import { Cell } from '../../redux';
import { useActions } from '../../hooks/use-action';
import { useTypedSelector, useCumulativeCode } from '../../hooks';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundle }) => {
    if (bundle) return bundle[cell.id];
  });

  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cumulativeCode]);

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
        {!bundle || bundle.loading ? (
          <div className='progress-cover'>
            <progress className='progress is-small is-success' max='100'>
              Loading
            </progress>
          </div>
        ) : (
          <Preview code={bundle.code} error={bundle.error} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
