import React from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import AddCell from '../add-cell';
import CellListItem from './item';

const CellList: React.FC = () => {
  const cell = useTypedSelector(({ cell }) =>
    cell?.order.map((id) => cell.data[id])
  );

  const renderedCell = cell?.map((c) => (
    <React.Fragment key={c.id}>
      <AddCell nextCellId={c.id} />
      <CellListItem cell={c} />
    </React.Fragment>
  ));

  return (
    <div>
      {renderedCell}
      <AddCell forceVisible={cell?.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
