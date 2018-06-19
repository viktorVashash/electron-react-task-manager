import axios from 'axios';
import { ACTIONS } from '../consts/action_types';

const getProjectsSuccess = projects => {
  return {
    type: ACTIONS.GET_PROJECTS,
    payload: projects
  }
};

const addProjectSuccess = projects => {
  return {
    type: ACTIONS.NEW_PROJECT,
    payload: projects
  }
};

const addTaskSuccess = projects => {
  return {
    type: ACTIONS.NEW_TASK,
    payload: projects
  }
};

const editTaskSuccess = projects => {
  return {
    type: ACTIONS.EDIT_TASK,
    payload: projects
  }
}

const removeTaskSuccess = projects => {
  return {
    type: ACTIONS.REMOVE_TASK,
    payload: projects
  }
}

const removeProjectSuccess = projects => {
  return {
    type: ACTIONS.DELETE_PROJECT,
    payload: projects
  }
};

export const getAllProjects = () => {
  return dispatch => {
    axios({
      method:'get',
      url:'project://'
    })
    .then(data => {     
      dispatch(getProjectsSuccess(data.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const addProject = (projectName, index) => {
  return dispatch => {
    const data = {
      name: projectName,
      tasks: [],
      index
    };
    const project = JSON.stringify(data);
    
    axios({
      method:'post',
      url:'project://' + project
    })
    .then(data => {
      dispatch(addProjectSuccess(data.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const addTask = data => {
  const { id, title, priority, priority_title } = data;

  return dispatch => {
    const data = {
      id: id,
      task: { title, priority, priority_title }
    };
    const project = JSON.stringify(data);
    
    axios({
      method:'put',
      url:'project://' + project
    })
    .then(data => {
      dispatch(addTaskSuccess(data.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const editTask = (data, tasks) => {
  const { id, task_id, title, priority, priority_title } = data;
  
  return dispatch => {
    const data = {
      id: id,
      edit: true,
      task: { task_id, title, priority, priority_title },
      tasks
    };
    const project = JSON.stringify(data);
    
    axios({
      method:'patch',
      url:'project://' + project
    })
    .then(data => {
      dispatch(editTaskSuccess(data.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const removeTask = (project_id, task) => {
  const data = {
    id: project_id,
    task: {
      task_id: task.task_id,
      title: task.title,
      priority: task.priority,
      priority_title: task.priority_title
    }
  };
  const project = JSON.stringify(data);

  return dispatch => {
    axios({
      method: 'patch',
      url: 'project://' + project
    })
    .then(data => {
      dispatch(removeTaskSuccess(data.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const removeProject = id => {
  return dispatch => {
    axios({
      method: 'delete',
      url: 'project://' + id
    })
    .then(data => {
      dispatch(removeProjectSuccess(data.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};

export const saveOrderOfTheProjects = projects => {
  const data = {
    change_order: true,
    projects
  };
  const projectsData = JSON.stringify(data);

  return dispatch => {
    axios({
      method: 'put',
      url: 'project://' + projectsData
    })
    .then(data => {
      dispatch(removeProjectSuccess(data.data));
    })
    .catch(err => {
      console.log(err);
    });
  }
};
