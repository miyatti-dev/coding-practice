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

const createTodoList = (todoList: Array<Todo>) => {
  const todoListLength = todoList.length;
  const inCompleteTodoList = [];
  const completeTodoList = [];

  for (let i = 0; i < todoListLength; i++) {
    const todo = todoList[i];
    if (todo.completed === true) {
      completeTodoList.push(todo);
    } else {
      inCompleteTodoList.push(todo);
    }
  }

  return {
    todoList,
    inCompleteTodoList,
    completeTodoList,
  };
};

export const getTodoList = createAsyncThunk<
  {
    todoList: Array<Todo>;
    inCompleteTodoList: Array<Todo>;
    completeTodoList: Array<Todo>;
  },
  undefined,
  {
    state: { global: TodoState };
  }
>('global/getTodoList', async (_, { getState }) => {
  const stateTodoList = getState().global.todoList;

  // TODO：外部から取得するようにする
  const todoList =
    stateTodoList.length === 0 ? [...initTodoList] : stateTodoList;

  return Promise.resolve(createTodoList(todoList));
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
  reducers: {
    postTodo: (state, action) => {
      const { todoList = [] } = state;
      const todoListLength = todoList.length;

      // newId
      let newId = 0;
      if (todoListLength > 0) {
        const todo = todoList[todoListLength - 1];
        const { id = 0 } = todo || {};
        newId = id + 1;
      }

      // Todoを追加
      state.todoList.push({
        id: newId,
        text: action.payload?.todo,
        completed: false,
      });
    },
    completeTodo: (state, action) => {
      const todoId = action.payload?.id;
      const stateTodoList = state.todoList;

      // 同じIdがあれば、完了にする
      const foundTodo = stateTodoList.find((todo) => todo.id === todoId);
      if (foundTodo) {
        foundTodo.completed = true;
      }

      const { todoList, inCompleteTodoList, completeTodoList } =
        createTodoList(stateTodoList);
      state.todoList = todoList;
      state.inCompleteTodoList = inCompleteTodoList;
      state.completeTodoList = completeTodoList;
    },
    inCompleteTodo: (state, action) => {
      const todoId = action.payload?.id;
      const stateTodoList = state.todoList;

      // 同じIdがあれば、未完了に戻す
      const foundTodo = state.todoList.find((todo) => todo.id === todoId);
      if (foundTodo) {
        foundTodo.completed = false;
      }

      const { todoList, inCompleteTodoList, completeTodoList } =
        createTodoList(stateTodoList);
      state.todoList = todoList;
      state.inCompleteTodoList = inCompleteTodoList;
      state.completeTodoList = completeTodoList;
    },
    deleteTodo: (state, action) => {
      const todoId = action.payload?.id;

      // 指定のIdを除外したTodoList
      const tmpTodoList = state.todoList.filter((todo) => todo.id !== todoId);

      const { todoList, inCompleteTodoList, completeTodoList } =
        createTodoList(tmpTodoList);
      state.todoList = todoList;
      state.inCompleteTodoList = inCompleteTodoList;
      state.completeTodoList = completeTodoList;
    },
    undoTodo: (state, action) => {
      const todoId = action.payload?.id;
      const stateTodoList = state.todoList;

      // 同じIdがあれば、逆にする
      const foundTodo = stateTodoList.find((todo) => todo.id === todoId);
      if (foundTodo) {
        foundTodo.completed = !foundTodo.completed;
      }

      const { todoList, inCompleteTodoList, completeTodoList } =
        createTodoList(stateTodoList);
      state.todoList = todoList;
      state.inCompleteTodoList = inCompleteTodoList;
      state.completeTodoList = completeTodoList;
    },
  },
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

export const { postTodo, completeTodo, inCompleteTodo, deleteTodo, undoTodo } =
  counterSlice.actions;

export default counterSlice.reducer;
