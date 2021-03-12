import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addTodo = (text) => {
  return {
    type: ADD,
    text,
    createdAt: Date.now(),
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: action.createdAt }, ...state];

    case DELETE:
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
export const actionCreators = {
  addTodo,
  deleteTodo,
};
