import React from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItem from './item';

const CellList: React.FC = () => {
  const cell = useTypedSelector(({ cell }) =>
    cell?.order.map((id) => cell.data[id])
  );

  const renderedCell = cell?.map((c) => <CellListItem cell={c} key={c.id} />);

  return <div>{renderedCell}</div>;
};

export default CellList;
