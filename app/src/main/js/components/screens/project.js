import React, { Component } from 'react';
import { NewTaskForm, Task, Project, NewProjectForm } from '../ui';
import { arrayMove} from 'react-sortable-hoc';

class ProjectComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: props.projects,
      tasks: null,
      isAddTask: false,
      isEditTask: false,
      project_id: null,
      task_id: null,
      isCreateProject: false,
      priority: 1,
      priority_title: '',
      task_title: '',
      projectName: ''
    }
  }

  componentWillReceiveProps(props) {
    if(Array.isArray(props.projects)) {
      if(props.projects !== this.state.projects) {
        let filtArr = [];

        props.projects.map(project => {
          return project.tasks.map(task => {
            filtArr.push({ 
              task_title: task.title,
              projectName: project.name,
              priority: task.priority,
              priority_title: task.priority_title
            });
          });
        });
        this.setState({
          projects: props.projects,
          tasks: filtArr
        });
      }
    } else {
      const newProjectToArray = this.state.projects;
      newProjectToArray.push(props.projects);
      this.setState({
        projects: newProjectToArray
      });
    }
  }

  componentWillUnmount() {
    const { projects } = this.state;
    
    projects.map((project, index) => {
      project.index = index + 1;
      console.log(projects.length, index);
    });

    this.props.actions.saveOrderOfTheProjects(projects);
  }

  addTaskInputListener = (id, isEditTask) => {
    this.taskInput = document.getElementById("taskInput");
    this.taskInput.addEventListener('keyup', event => {
      event.preventDefault();

      if (event.keyCode === 13) {
        this.newTask(id, false);
        this.addTask(id, isEditTask);
      }
    });
  }

  newTask = (id, isEditTask) => {
    const { isAddTask, task_id, task_title, priority, priority_title } = this.state;

    if(this.state.project_id === id) {
      this.setState({
        task_title: !isAddTask ? '' : task_title,
        priority: !isAddTask ? 1 : priority,
        priority_title: !isAddTask ? '' : priority_title,
        isAddTask: !isAddTask,
        project_id: id,
        task_id: !isAddTask ? null : task_id,
        isEditTask
      }, () => {
        if(this.state.isAddTask) {
          this.addTaskInputListener(id, isEditTask);
        }
      });
    } else {
      this.setState({
        task_title: !isAddTask ? '' : task_title,
        priority: !isAddTask ? 1 : priority,
        priority_title: !isAddTask ? '' : priority_title,
        isAddTask: true,
        project_id: id,
        task_id: !isAddTask ? null : task_id,
        task_id: null,
        isEditTask
      }, () => {
        if(this.state.isAddTask) {
          this.addTaskInputListener(id, isEditTask);
        }
      });
    }
    
  }

  addProjectInputListener = () => {
    this.projectInput = document.getElementById("projectInput");
    this.projectInput.addEventListener('keyup', (event) => {
      event.preventDefault();
      
      if(event.keyCode === 13) {
        this.createProject();
        this.addProject();
      } else if(event.keyCode === 27) {
        this.createProject();
      }
    });
  }

  createProject = () => {
    this.setState({
      isCreateProject: !this.state.isCreateProject
    }, () => {
      if(this.state.isCreateProject) {
        this.addProjectInputListener();
      }
    });
  }

  addProject = () => {
    const { projectName, projects } = this.state;
    const index = projects.length + 1;
    this.props.actions.addProject(projectName, index);
    this.setState({
      projectName: ''
    });
  }

  addTask = (id, isEditTask) => {
    const { task_id, task_title, priority, priority_title } = this.state;
    const data = {
      id,
      task_id,
      title: task_title,
      priority,
      priority_title
    }

    let filtArr = [];

    this.state.projects.map(project => {
      if(project._id === this.state.project_id) {
        return project.tasks.map(task => {
          filtArr.push({ 
            title: task.title,
            task_id: task.task_id,
            priority: task.priority,
            priority_title: task.priority_title
          });
        });
      }
    });

    isEditTask ? 
      this.props.actions.editTask(data, filtArr) :
      this.props.actions.addTask(data);

    this.setState({
      task_title: '',
      priority: 1,
      priority_title: '',
      isEditTask: false
    });
  }

  removeProject = id => {
    this.props.actions.removeProject(id);
  }

  checkColor = task => {
    switch(task.priority) {
      case 1:
        return 'danger';
      case 2:
        return 'orange';
      case 3:
        return 'yellow';
      case 4:
        return 'success';
      case 5:
        return 'success';
      default:
        'success';
    }
  }

  setPriority = (priority) => {
    this.setState({ priority });
  }

  onTaskTitleChange = (event) => {
    this.setState({
      task_title: event.target.value
    });
  }

  onBadgeChange = (event) => {
    this.setState({
      priority_title: event.target.value.toUpperCase()
    });
  }

  saveTask = (id, isEditTask) => {
    this.newTask(id, false);
    this.addTask(id, isEditTask);
  }

  renderAddTaskInputs = (id, isEditTask) => (
    <NewTaskForm
      id={ id }
      key={ id }
      isEditTask={ isEditTask }
      saveTask={ this.saveTask }
      task_title={ this.state.task_title }
      priority={ this.state.priority }
      priority_title={ this.state.priority_title }
      setPriority={ this.setPriority }
      onBadgeChange={ this.onBadgeChange }
      onTaskTitleChange={ this.onTaskTitleChange }
    />
  )

  onEditTask = (project_id, task) => {
    this.newTask(project_id, true);
    this.setState({
      task_id: task.task_id,
      task_title: task.title,
      priority: task.priority,
      priority_title: task.priority_title,
      isEditTask: true
    });
  }

  onRemoveTask = (project_id, task) => {
    this.props.actions.removeTask(project_id, task)
  }

  renderTasks = (tasks, project) => {
    project.tasks.sort((task_1, task_2) => {
      return task_1.priority - task_2.priority;
    });
    this.tasks = tasks;
    return (
      <Task
        task_id={ this.state.task_id }
        isEditTask={ this.state.isEditTask }
        project={ project }
        tasks={ tasks }
        project_id={ this.state.project_id }
        task_title={ this.state.task_title }
        checkColor={ this.checkColor }
        onEditTask={ this.onEditTask }
        onRemoveTask={ this.onRemoveTask }
        isAddTask={ this.state.isAddTask }
        renderAddTaskInputs={ this.renderAddTaskInputs }
      />
    )
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    
    this.setState({
      projects: arrayMove(this.state.projects, oldIndex, newIndex),
    });
  }

  renderProjects = (projects) => (
    <Project
      isEditTask={ this.state.isEditTask }
      lockAxis="y"
      onSortEnd={this.onSortEnd}
      project_id={ this.state.project_id }
      projects={ projects }
      newTask={ this.newTask }
      removeProject={ this.removeProject }
      renderTasks={ this.renderTasks }
      isAddTask={ this.state.isAddTask }
      renderAddTaskInputs={ this.renderAddTaskInputs }
    />
  )

  onProjectNameChange = (event) => {
    this.setState({
      projectName: event.target.value
    });
  }

  render() {
    const { projects, isCreateProject } = this.state;
    
    return(
      <main className="container">
        <div id="accordion">
          { projects && projects.length > 0 ? this.renderProjects(projects) : 'No Projects...' }
          { isCreateProject ?
            <NewProjectForm
              onProjectNameChange={ this.onProjectNameChange }
            /> :
            <button className="btn btn-outline-info mx-2" onClick={ this.createProject }>
              Create Project
            </button>
          }
        </div>
      </main>
    );
  }
}

export default ProjectComponent;

