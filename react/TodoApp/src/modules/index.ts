import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const initTodoList: Array<Todo> = [
  {
    id: 0,
    text: '洗濯物をたたむ',
    completed: false,
  },
  {
    id: 1,
    text: '食器を洗う',
    completed: true,
  },
  {
    id: 2,
    text: 'ゴミを出す',
    completed: true,
  },
  {
    id: 3,
    text: '風呂掃除',
    completed: false,
  },
  {
    id: 4,
    text: 'パンを買いに行く',
    completed: false,
  },
  {
    id: 5,
    text: '電球をかえる',
    completed: false,
  },
  {
    id: 6,
    text: '塾の送り迎え',
    completed: true,
  },
  {
    id: 7,
    text: 'ご飯を炊く',
    completed: false,
  },
  {
    id: 8,
    text: 'ご飯を炊く2',
    completed: false,
  },
  {
    id: 9,
    text: 'ご飯を炊く3',
    completed: false,
  },
  {
    id: 10,
    text: 'ご飯を炊く4',
    completed: false,
  },
];

export const getTodoList = createAsyncThunk('global/getTodoList', async () => {
  // TODO：外部から取得するようにする
  const todoList = [...initTodoList];

  const count = todoList.length;
  const inCompleteTodoList = [];
  const completeTodoList = [];
  for (let i = 0; i < count; i++) {
    const todo = todoList[i];
    if (todo.completed === true) {
      completeTodoList.push(todo);
    } else {
      inCompleteTodoList.push(todo);
    }
  }
  return Promise.resolve({
    todoList,
    inCompleteTodoList,
    completeTodoList,
  });
});

interface TodoState {
  todoList: Array<Todo>;
  inCompleteTodoList: Array<Todo>;
  completeTodoList: Array<Todo>;
  isFinishGetTodoList: boolean;
}

// Define the initial state using that type
const initialState: TodoState = {
  todoList: [],
  inCompleteTodoList: [],
  completeTodoList: [],
  isFinishGetTodoList: false,
};

const counterSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTodoList.fulfilled,
      (
        state: TodoState,
        action: PayloadAction<{
          todoList: Array<Todo>;
          inCompleteTodoList: Array<Todo>;
          completeTodoList: Array<Todo>;
        }>
      ) => {
        const {
          todoList = [],
          inCompleteTodoList = [],
          completeTodoList = [],
        } = action.payload;
        state.todoList = todoList;
        state.inCompleteTodoList = inCompleteTodoList;
        state.completeTodoList = completeTodoList;
        state.isFinishGetTodoList = true;
      }
    );
  },
});

export default counterSlice.reducer;
