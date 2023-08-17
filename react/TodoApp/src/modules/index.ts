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
  const incompleteTodoList = [];
  const completeTodoList = [];

  for (let i = 0; i < todoListLength; i++) {
    const todo = todoList[i];
    if (todo.completed === true) {
      completeTodoList.push(todo);
    } else {
      incompleteTodoList.push(todo);
    }
  }

  return {
    todoList,
    incompleteTodoList,
    completeTodoList,
  };
};

export const getTodoList = createAsyncThunk<
  {
    todoList: Array<Todo>;
    incompleteTodoList: Array<Todo>;
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
  incompleteTodoList: Array<Todo>;
  completeTodoList: Array<Todo>;
  todoList: Array<Todo>;
  isFinishGetTodoList: boolean;
}

const initialState: TodoState = {
  incompleteTodoList: [],
  completeTodoList: [],
  todoList: [],
  isFinishGetTodoList: false,
};

const todoSlice = createSlice({
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

      const newTodo = {
        id: newId,
        text: action.payload?.todo,
        completed: false,
      };

      // Todoを追加
      state.todoList.push(newTodo);
      state.incompleteTodoList.push(newTodo);
    },
    completeTodo: (state, action) => {
      const todoId = action.payload?.id;

      // 同じIdがあれば、完了にする
      const foundTodo = state.todoList.find((todo) => todo.id === todoId);
      if (foundTodo) {
        foundTodo.completed = true;

        // 完了リストに追加
        state.completeTodoList.push(foundTodo);

        // 未完了リストから除外
        state.incompleteTodoList = state.incompleteTodoList.filter(
          (todo) => todo.id !== todoId
        );
      }
    },
    incompleteTodo: (state, action) => {
      const todoId = action.payload?.id;

      // 同じIdがあれば、未完了に戻す
      const foundTodo = state.todoList.find((todo) => todo.id === todoId);
      if (foundTodo) {
        foundTodo.completed = false;

        // 未完了リストに追加
        state.incompleteTodoList.push(foundTodo);

        // 完了リストから除外
        state.completeTodoList = state.completeTodoList.filter(
          (todo) => todo.id !== todoId
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoId = action.payload?.id;

      // 指定のIdを除外したTodoList
      const tmpTodoList = state.todoList.filter((todo) => todo.id !== todoId);
      const tmpIncompleteTodoList = state.incompleteTodoList.filter(
        (todo) => todo.id !== todoId
      );
      const tmpCompleteTodoList = state.completeTodoList.filter(
        (todo) => todo.id !== todoId
      );

      state.todoList = tmpTodoList;
      state.incompleteTodoList = tmpIncompleteTodoList;
      state.completeTodoList = tmpCompleteTodoList;
    },
    undoTodo: (state, action) => {
      const { id: todoId, index = 0 } = action.payload || {};

      // 同じIdがあれば、逆にする
      const foundTodo = state.todoList.find((todo) => todo.id === todoId);
      if (foundTodo) {
        const prevCompleted = foundTodo.completed;
        foundTodo.completed = !foundTodo.completed;

        if (prevCompleted) {
          // 完了を未完了に戻す

          // 未完了に追加
          if (index < state.incompleteTodoList.length) {
            state.incompleteTodoList.splice(index, 0, foundTodo);
          } else {
            state.incompleteTodoList.push(foundTodo);
          }

          // 完了リストから除外
          state.completeTodoList = state.completeTodoList.filter(
            (todo) => todo.id !== todoId
          );
        } else {
          // 未完了を完了に戻す

          // 完了に追加
          if (index < state.completeTodoList.length) {
            state.completeTodoList.splice(index, 0, foundTodo);
          } else {
            state.completeTodoList.push(foundTodo);
          }

          // 未完了リストから除外
          state.incompleteTodoList = state.incompleteTodoList.filter(
            (todo) => todo.id !== todoId
          );
        }
      }
    },
    setIncompleteTodoList: (state, action) => {
      state.incompleteTodoList = action.payload?.incompleteTodoList;
    },
    setCompleteTodoList: (state, action) => {
      state.completeTodoList = action.payload?.completeTodoList;
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload?.todoList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTodoList.fulfilled,
      (
        state: TodoState,
        action: PayloadAction<{
          incompleteTodoList: Array<Todo>;
          completeTodoList: Array<Todo>;
          todoList: Array<Todo>;
        }>
      ) => {
        const {
          incompleteTodoList = [],
          completeTodoList = [],
          todoList = [],
        } = action.payload;
        state.incompleteTodoList = incompleteTodoList;
        state.completeTodoList = completeTodoList;
        state.todoList = todoList;
        state.isFinishGetTodoList = true;
      }
    );
  },
});

export const {
  postTodo,
  completeTodo,
  incompleteTodo,
  deleteTodo,
  undoTodo,
  setIncompleteTodoList,
  setCompleteTodoList,
  setTodoList,
} = todoSlice.actions;

export default todoSlice.reducer;
