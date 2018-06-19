import React from 'react';
import { PriorityIcon } from '../ui';
import { FaTrash, FaEdit } from 'react-icons/lib/fa';

const Task = ({ task_id, isEditTask, project, project_id, isAddTask, tasks, checkColor, onEditTask, onRemoveTask, task_title, renderAddTaskInputs }) => (
  <div id={ project._id } className="collapse multi-collapse show">
    { tasks.map((task, i) => (
      (project_id === project._id && task_id === task.task_id && isEditTask && isAddTask) ? renderAddTaskInputs(project._id, task_title === task.title) :
      <div key={ task.task_id } className="card-body border-bottom row m-0 p-0">
        <div className="p-2">
          <PriorityIcon priority={ task.priority } />
        </div>
        <div className={ `bg-${checkColor(task)} rounded p-2` }>
          <span className="text-white">{ task.priority_title }</span>
        </div>
        <div className="p-2 text-center">
          { task.title }
        </div>
        <div className="col d-flex justify-content-end p-0">
          <button className="bg-transparent p-2" onClick={ () => onEditTask(project._id, task) }>
            <FaEdit size={ 20 } color="green" />
          </button>
          <button className="bg-transparent p-2" onClick={ () => onRemoveTask(project._id, task) }>
            <FaTrash size={ 20 } color="red" />
          </button>
        </div>
      </div>

      ))
    }
  </div>
);

export default Task;
