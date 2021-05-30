import React from 'react';
import { Cell } from '../../redux/constants';
import CodeCell from '../code-cell';
import TextEditor from '../text-editor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  child = cell.type === 'code' ? <CodeCell /> : <TextEditor />;

  return <div>{child}</div>;
};

export default CellListItem;
