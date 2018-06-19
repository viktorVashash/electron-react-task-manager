import { ACTIONS } from '../consts/action_types';
import { PROJECTS } from '../consts/default_state';

export default (state = PROJECTS, action) => {
  switch (action.type) {
    case ACTIONS.GET_PROJECTS:
      return { ...state, projects: action.payload };
    case ACTIONS.NEW_PROJECT:
      return { ...state, projects: action.payload };
    case ACTIONS.NEW_TASK:
      return { ...state, projects: action.payload };
    case ACTIONS.EDIT_TASK:
      return { ...state, projects: action.payload };
    case ACTIONS.REMOVE_TASK:
      return { ...state, projects: action.payload };
    case ACTIONS.DELETE_PROJECT:
      return { ...state, projects: action.payload };
    default:
      return state;
  }
};
