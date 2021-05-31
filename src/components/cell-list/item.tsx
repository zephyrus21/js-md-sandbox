import React from 'react';
import { Cell } from '../../redux';
import CodeCell from '../code-cell';
import TextEditor from '../text-editor';
import ActionBar from '../action-bar';

import './item.css';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  child =
    cell.type === 'code' ? (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );

  return <div className='item'>{child}</div>;
};

export default CellListItem;
