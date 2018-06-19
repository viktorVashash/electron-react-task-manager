import React from 'react';
import { FaTrash } from 'react-icons/lib/fa';
import { MdAddBox } from 'react-icons/lib/md';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const Project = SortableElement(({ isEditTask, project_id, project, newTask, removeProject, renderTasks, isAddTask, renderAddTaskInputs}) => {
  return (
    <div key={ project._id } className="card m-2">
        <div className="card-header p-0">
          <div className="row">
            <h5 className="col-auto mb-0">
              <button className="btn btn-link" data-toggle="collapse" data-target={`#${ project._id }`} aria-expanded="false" aria-controls={ project.id }>
                { project.name }
              </button>
            </h5>
            <div className="col d-flex align-items-center justify-content-end">
              <button className="bg-transparent button" onClick={ () => newTask(project._id) }>
                Add task <MdAddBox size={ 20 } color="blue" />
              </button>
              <button className="bg-transparent button" onClick={ () => removeProject(project._id) }>
                Delete project <FaTrash size={ 20 } color="red" />
              </button>
            </div>
          </div>
        </div>
        { project.tasks && project.tasks.length > 0 ?
          renderTasks(project.tasks, project) :
          <div id={ project._id } className="collapse multi-collapse show">
            <div className="card-body px-2 py-0">
              No tasks yet...
            </div>
          </div>
        }
        { (project_id === project._id && !isEditTask && isAddTask) && renderAddTaskInputs(project._id) }
      </div>
  )
});

const Projects = SortableContainer(({ isEditTask, project_id, projects, newTask, removeProject, renderTasks, isAddTask, renderAddTaskInputs }) => {
  return (
    <ul>
      { projects.map((project, index) => (
        <Project
          isEditTask={ isEditTask }
          key={ project._id }
          project={project}
          index={index}
          project_id={project_id}
          newTask={newTask}
          removeProject={removeProject}
          renderTasks={renderTasks}
          isAddTask={isAddTask}
          renderAddTaskInputs={renderAddTaskInputs}
        />
      ))
    }
  </ul>
)
});

export default Projects;
