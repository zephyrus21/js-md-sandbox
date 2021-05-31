import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useActions } from '../../hooks/use-action';

import './add-cell.css';

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className={`add-cell ${forceVisible && 'btn-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-primary is-small is-rounded add-btn'
          onClick={() => insertCellBefore(nextCellId, 'code')}>
          <FaPlus />
          Code
        </button>
        <button
          className='button is-primary is-small is-rounded add-btn'
          onClick={() => insertCellBefore(nextCellId, 'text')}>
          <FaPlus />
          Text
        </button>
        <div className='divider'></div>
      </div>
    </div>
  );
};

export default AddCell;
