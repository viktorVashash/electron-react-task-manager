import React, { Component } from 'react';
import { FaArrowCircleUp, FaArrowCircleDown, FaSortAmountAsc, FaSortAmountDesc } from 'react-icons/lib/fa';
import { MdPerson, MdWatchLater } from 'react-icons/lib/md';
import GoIssueOpened from 'react-icons/lib/go/issue-opened';

class Priority extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: null,
      sort: true 
    }
  }

  componentWillMount() {
    let filtArr = [];

    this.props.projects.map(project => {
      return project.tasks.map(task => {
        filtArr.push({ 
          task_title: task.title,
          projectName: project.name,
          priority: task.priority,
          priority_title: task.priority_title
        });
      });
    });

    filtArr.sort((arr_1, arr_2) => {
        return arr_1.priority - arr_2.priority;
    });

    this.setState({
        projects: filtArr
    });
  }

  componentWillReceiveProps(props) {
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

      filtArr.sort((arr_1, arr_2) => {
        return arr_1.priority - arr_2.priority;
      });

      this.setState({
        projects: filtArr
      });
    }
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

  renderIcon = priority => {
    switch(priority) {
      case 1:
        return <GoIssueOpened size={ 25 } color="red" />
      case 2:
        return <FaArrowCircleUp size={ 25 } color="orange" />
      case 3:
        return <MdWatchLater size={ 25 } color="#f0c143" />
      case 4:
        return <FaArrowCircleDown size={ 25 } color="green" />
      case 5:
        return <MdPerson size={ 25 } color="green" />
      default:
        null;
    }
  }

  renderTasks = (projects) => {
    return projects.map((project, i) => {
      return (
        <div key={ i } className="card-body border-bottom row m-0 p-0">
            <div className="p-2">
              { this.renderIcon(project.priority) }
            </div>
            <div className={ `bg-${this.checkColor(project)} rounded p-2` }>
              <span className="text-white">{ project.priority_title }</span>
            </div>
            <div className="p-2 text-center">
              { project.task_title }
            </div>
            <span className="text-right text-secondary p-2 col">{ project.projectName }</span>
        </div>
      )
    })
  }

  renderSortIcon = () => {
    const { sort } = this.state;

    if(sort) {
      return <FaSortAmountAsc size={ 20 } color="blue" />
    } else {
      return <FaSortAmountDesc size={ 20 } color="blue" />
    }
  }

  onSortClick = () => {
    this.setState({
      sort: !this.state.sort
    }, () => {
      if(this.state.sort) {
        this.state.projects.sort((task_1, task_2) => {
          return task_1.priority - task_2.priority;
        });
      } else {
        this.state.projects.sort((task_1, task_2) => {
          return task_2.priority - task_1.priority;
        });
      }
    });
  }

  renderProjects = (projects) => {
    return (
      <div className="card m-2">
        <div className="card-header p-0">
          <div className="row">
            <h5 className="col mb-0">
              <button className="btn btn-link" data-toggle="collapse" data-target="#collapse-tasks" aria-expanded="false" aria-controls="collapse-tasks">
                By Priority
              </button>
            </h5>
            <h5 className="col d-flex justify-content-end mb-0">
              <button className="btn btn-link" onClick={ this.onSortClick }>
                { this.renderSortIcon() }
                {`Sort ${this.state.sort ? "Ascending" : "Descending"}`}
              </button>
            </h5>
          </div>
        </div>

        <div id="collapse-tasks" className="collapse multi-collapse show">
          { this.renderTasks(projects) }
        </div>
      </div>
    )
  }

  render() {
    const { projects } = this.state;
    
    return(
      <main className="container">
        <div id="accordion">
          { projects && projects.length > 0 ? this.renderProjects(projects) : 'No Tasks...' }
        </div>
      </main>
    );
  }
}

export default Priority;

