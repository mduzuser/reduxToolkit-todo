import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  id: Date.now(),
  checkrd: false,
  text: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list = [action.payload, ...state.list];
    },

    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action) => {
      state.list = state.list.map((todo) =>
        todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo
      );

      state.list = state.list.sort((a, b) => a.checked - b.checked);
    },

    saveTodo: (state, action) => {
      state.list = state.list.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, saveTodo } = todoSlice.actions;

export default todoSlice.reducer;
