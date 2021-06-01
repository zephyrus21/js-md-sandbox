import React from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import AddCell from '../add-cell';
import CellListItem from './item';
import './cell-list.css';

const CellList: React.FC = () => {
  const cell = useTypedSelector(({ cell }) =>
    cell?.order.map((id) => cell.data[id])
  );

  const renderedCell = cell?.map((c) => (
    <React.Fragment key={c.id}>
      <CellListItem cell={c} />
      <AddCell prevCellId={c.id} />
    </React.Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cell?.length === 0} prevCellId={null} />
      {renderedCell}
    </div>
  );
};

export default CellList;
