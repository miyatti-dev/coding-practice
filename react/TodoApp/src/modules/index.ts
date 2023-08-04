import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const todoList: Todo[] = [
  {
    id: 0,
    text: '洗濯物をたたむ',
    completed: false,
  },
  {
    id: 1,
    text: '食器を洗う',
    completed: false,
  },
  {
    id: 2,
    text: 'ゴミを出す',
    completed: false,
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
    completed: false,
  },
  {
    id: 7,
    text: 'ご飯を炊く',
    completed: false,
  },
];
let id = 7;

export const getTodoList = createAsyncThunk('global/getTodoList', async () => {
  console.log('#### getTodoList start');
  // TODO：外部から取得するようにする
  return Promise.resolve([...todoList]);
});

const counterSlice = createSlice({
  name: 'global',
  initialState: {
    count: 1,
    todoList: [],
  },
  reducers: {
    increase: (state, action) => {
      console.log('## action = ', action);
      state.count += 1;
    },
    decrease: (state, action) => {
      console.log('## action = ', action);
      state.count -= 1;
    },
  },
  extraReducers: {
    [getTodoList.fulfilled]: (state, action) => {
      console.log('#### extraReducers getTodoList.fulfilled');
      console.log('## action = ', action);

      state.todoList = action.payload;
    },
  },
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
