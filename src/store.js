import { configureStore, createSlice } from "@reduxjs/toolkit";

const todos = createSlice({
  name: "todosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const {
        payload: { text, createdAt },
      } = action;

      state.unshift({ text, id: createdAt });
    },
    remove: (state, action) => {
      const {
        payload: { id },
      } = action;

      return state.filter((todo) => todo.id !== parseInt(id));
    },
  },
});

const store = configureStore({ reducer: todos.reducer });

export default store;
export const { add, remove } = todos.actions;
