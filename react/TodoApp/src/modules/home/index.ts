import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const delayIncrease = createAsyncThunk(
  'home/delayIncrease',
  async () => {
    console.log('#### delayIncrease start');
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('#### delayIncrease end');
        resolve();
      }, 5000);
    });
  }
);

const counterSlice = createSlice({
  name: 'home',
  initialState: {
    count: 1,
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
    [delayIncrease.fulfilled]: (state, action) => {
      console.log('#### extraReducers delayIncrease.fulfilled');
      console.log('## action = ', action);

      state.count += 1;
    },
  },
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;
