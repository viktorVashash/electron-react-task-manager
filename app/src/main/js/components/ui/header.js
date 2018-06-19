import React from 'react';
import logo from '../../../res/images/logo.png';
import { history } from '../../store';

const Header = () => (
  <header style={{ marginTop: 20 }} className="header">
    <div className="logo">
      <img src={logo} alt="react logo" />
    </div>
    <h1>Task Manager</h1>
    <div className="btn-group-toggle row mx-2 shadow-sm" data-toggle="buttons">
      <label id="Feed" onClick={ () => history.push('/by-project') } className="btn btn-secondary col rounded-0">
        <input
          id="feed"
          type="radio"
          name="options"
          value="feed" /> By Project
      </label>
      <label id="Trending" onClick={ () => history.push('/by-priority') } className="btn btn-secondary col rounded-0">
        <input
          id="trending"
          type="radio"
          name="options"
          value="trending" /> By Priority
      </label>
    </div>
  </header>
);

export default Header;
