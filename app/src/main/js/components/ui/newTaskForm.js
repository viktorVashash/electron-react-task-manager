import React from 'react';
import { PriorityIcon } from '../ui';
import { FaFloppyO } from 'react-icons/lib/fa';

const NewTaskForm = ({
  id,
  isEditTask,
  saveTask,
  setPriority,
  task_title,
  priority,
  priority_title,
  onBadgeChange,
  onTaskTitleChange
}) => (
  <div className="card-body border-bottom row m-0 p-0">
    <div className="col-auto input-group-prepend align-items-start py-2 px-0">
      <button
        className="btn btn-outline-secondary dropdown-toggle border-0 px-2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <PriorityIcon priority={ priority } />
      </button>
      <div className="dropdown-menu">
        <button className="dropdown-item" onClick={ () => { setPriority(1) } }>
          <PriorityIcon priority={ 1 } />
          ASAP
        </button>
        <button className="dropdown-item" onClick={ () => { setPriority(2) } }>
          <PriorityIcon priority={ 2 } />
          Major
        </button>
        <button className="dropdown-item" onClick={ () => { setPriority(3) } }>
          <PriorityIcon priority={ 3 } />
          Medium
        </button>
        <button className="dropdown-item" onClick={ () => { setPriority(4) } }>
          <PriorityIcon priority={ 4 } />
          Low
        </button>
        <button className="dropdown-item" onClick={ () => { setPriority(5) } }>
          <PriorityIcon priority={ 5 } />
          Other
        </button>
      </div>
    </div>
    <div className="col p-2 text-center">
      <div className="input-group mb-3">
        <input
          autoFocus
          type="text"
          value={ priority_title }
          className="form-control"
          placeholder="Badge"
          onChange={ onBadgeChange }
        />
        <input
          id="taskInput"
          type="text"
          value={ task_title }
          className="form-control"
          placeholder="Task title"
          onChange={ onTaskTitleChange }
        />
        <div className="input-group-append">
          <button
            className="bg-transparent p-2"
            onClick={ () => saveTask(id, isEditTask) }
          >
            <FaFloppyO size={ 20 } color="blue" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NewTaskForm;
