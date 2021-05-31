import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useActions } from '../../hooks/use-action';

import './add-cell.css';

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible && 'btn-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-primary is-small is-rounded add-btn'
          onClick={() => insertCellAfter(prevCellId, 'code')}>
          <FaPlus />
          Code
        </button>
        <button
          className='button is-primary is-small is-rounded add-btn'
          onClick={() => insertCellAfter(prevCellId, 'text')}>
          <FaPlus />
          Text
        </button>
        <div className='divider'></div>
      </div>
    </div>
  );
};

export default AddCell;
