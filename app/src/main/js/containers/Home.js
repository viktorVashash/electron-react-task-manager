import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Projects from '../components/screens/project';
import Priority from '../components/screens/priority';

class Home extends Component {
  componentWillMount() {
    this.props.actions.getAllProjects();
  }

  render() {
    const { projects, actions } = this.props;
    console.log(projects);
    
    return (
      <Switch>
        <Route
          exact
          path="/by-project"
          render={ 
              () => <Projects
                      projects={ projects }
                      actions={ actions }
                    /> 
          }
        />
        <Route
          exact
          path="/by-priority"
          render={ 
              () => <Priority
                      projects={ projects }
                      actions={ actions }
                    /> 
          }
        />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects.projects
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...actions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
