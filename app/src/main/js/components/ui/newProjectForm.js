import React from 'react';

const NewProjectForm = ({ onProjectNameChange }) => (
  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text" id="inputGroup-sizing-default">Project Name</span>
    </div>
    <input autoFocus type="text" id="projectInput" className="form-control" onChange={ onProjectNameChange } />
  </div>
);

export default NewProjectForm;
