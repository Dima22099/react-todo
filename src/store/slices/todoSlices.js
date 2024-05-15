import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filter: 'all',

};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if (!action.payload.trim()) {
        return;
      }
      state.todos.push({
        id: crypto.randomUUID(),
        title: action.payload,
        completed: false,
        edit: false,
      });
    },

    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    toggleEdit: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.edit = !todo.edit;
      } 
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    renameTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todos.find(todo => todo.id == id);
      if(todo) {
        todo.title = title;
      }
    }, 

    filteredTodos: (state, action) => {
      if (action.payload === 'notCompleted') {
        state.filter = 'notCompleted';
        return;
      } else if (action.payload === 'completed') {
        state.filter = 'completed';
        return;
      }
      state.filter = 'all';
        return;
    },
  }
});

export const { addTodo, toggleTodo, deleteTodo, renameTodo, toggleEdit, filteredTodos } = todosSlice.actions;
export default todosSlice.reducer;
