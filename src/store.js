import { createStore } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

const addTodo = createAction("ADD");
const deleteTodo = createAction("DELETE");

const reducer = createReducer([], {
  [addTodo]: (state, action) => {
    const {
      payload: { text, createdAt },
    } = action;

    state.unshift({ text, id: createdAt });
  },
  [deleteTodo]: (state, action) => {
    const {
      payload: { id },
    } = action;

    return state.filter((todo) => todo.id !== parseInt(id));
  },
});

const store = createStore(reducer);

export default store;
export const actionCreators = {
  addTodo,
  deleteTodo,
};
