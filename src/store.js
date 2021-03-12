import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

const reducer = (state = [], action) => {
  switch (action.type) {
    case addTodo.type:
      const {
        payload: { text, createdAt },
      } = action;

      return [{ text, id: createdAt }, ...state];

    case deleteTodo.type:
      const {
        payload: { id },
      } = action;

      return state.filter((todo) => todo.id !== parseInt(id));

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
