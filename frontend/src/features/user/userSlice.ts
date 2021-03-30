import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 0,
    username: '',
    email: '',
    teamOfAffiliation: {
      id: 0,
      teamName: '',
      createdAt: '',
      updatedAt: '',
    },
  },
  reducers: {
    setMyself: (state, action) => {
      state = action.payload;
    },
    reset: (state) => {
      state = {
        id: 0,
        username: '',
        email: '',
        teamOfAffiliation: {
          id: 0,
          teamName: '',
          createdAt: '',
          updatedAt: '',
        },
      };
    },
  },
});

export const { setMyself, reset } = userSlice.actions;

export default userSlice.reducer;
