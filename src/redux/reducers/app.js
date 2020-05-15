import { CHANGE_TITLE } from '../actions/actionTypes.js'

const app = (state = {title:'位号',name:'这是state'}, action) => {
  switch (action.type) {
    case CHANGE_TITLE: {
      return {
        ...state,
        title: action.playLoad
      }
    }
    default:
			return state;
  }
}

export default app;