import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: -1,
    username: '',
    email: '',
    teamOfAffiliation: {
      id: -1,
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
        id: -1,
        username: '',
        email: '',
        teamOfAffiliation: {
          id: -1,
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
