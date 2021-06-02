import React from 'react';
import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';
import './action-bar.css';

import { useActions } from '../../hooks/use-action';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className='action-bar'>
      <button
        className='button is-success is-small is-outlined'
        onClick={() => moveCell(id, 'up')}>
        <FaArrowUp />
      </button>
      <button
        className='button is-info is-small is-outlined'
        onClick={() => moveCell(id, 'down')}>
        <FaArrowDown />
      </button>
      <button
        className='button is-danger is-small is-outlined'
        onClick={() => deleteCell(id)}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ActionBar;
