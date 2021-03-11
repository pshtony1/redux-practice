import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO_TYPE = "ADD_TODO";
const DELETE_TODO_TYPE = "DELETE_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO_TYPE:
      return [...state, { text: action.text, id: action.createdAt }];

    case DELETE_TODO_TYPE:
      return state.filter((todo) => todo.id !== parseInt(action.id));

    default:
      return state;
  }
};

const addToDo = (text) => {
  store.dispatch({ type: ADD_TODO_TYPE, text, createdAt: Date.now() });
};

const deleteTodo = (e) => {
  const id = e.currentTarget.parentNode.id;

  store.dispatch({ type: DELETE_TODO_TYPE, id });
};

const onSubmit = (e) => {
  e.preventDefault();

  const todo = input.value;
  input.value = "";

  addToDo(todo);
};

const paintTodos = () => {
  const todos = store.getState();
  ul.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.id = todo.id;
    li.textContent = todo.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", deleteTodo);

    li.appendChild(delBtn);
    ul.appendChild(li);
  });
};

const store = createStore(reducer);
store.subscribe(paintTodos);

form.addEventListener("submit", onSubmit);
